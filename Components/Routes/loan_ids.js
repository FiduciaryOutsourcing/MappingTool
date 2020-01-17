const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const papa = require('papaparse');
const XLSX = require('xlsx');
const cors = require('../_cors');
var data = "a,b,c\n1,2,3".split("\n").map(function (x) {
    return x.split(",");
});
var fs = require('fs'),
    path = require('path'),
    URL = require('url');

// var app = express();
const router = express.Router();
const jsonParser = bodyParser.json();

var upload = multer({
    dest: 'uploads/'
});

const {
    DATABASE_URL,
    DB_PORT,
    USER,
    PASSWORD,
} = require('../Config/mySqlconfig');

var connection = mysql.createConnection({
    host: DATABASE_URL,
    user: USER,
    password: PASSWORD,
    database: 'loans',
    port: DB_PORT
});

/* helper to generate the workbook object */
function make_book() {
    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    return wb;
};

function get_data(req, res, type) {
    var wb = make_book();
    /* send buffer back */
    res.status(200).send(XLSX.write(wb, {
        type: 'buffer',
        bookType: type
    }));
};

function get_file(req, res, file) {
    var wb = make_book();
    /* write using XLSX.writeFile */
    XLSX.writeFile(wb, file);
    res.status(200).send("wrote to " + file + "\n");
};

function load_data(file) {
    var wb = XLSX.readFile(file);
    /* generate array of arrays */
    data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        header: 1
    });
    console.log(data[1][0]);
    post_to_database(data);
};

function post_data(req, res) {
    console.log(`req.files: ${req.files}`)
    var keys = Object.keys(req.files),
        k = keys[0];
    load_data(req.files[k].path);
    res.status(200).send("ok\n");
};

function post_file(req, res, file) {
    load_data(file);
    res.status(200).send("ok\n");
};

function post_to_database(file) {
    let values = [];
    // console.log(`values: ${file}`);
    var output = JSON.stringify(file, 2, 2);
    // console.log(`output: ${output}`);
    let tempCsvOut = output.replace(/(00\/00\/0000)/g, ''); // Removing 00/00/00 dates (i.e. Quorum)
    let dateCorrect = tempCsvOut.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
    // console.log(output);
    let tempData = JSON.parse(dateCorrect);
    let newTempData = Object.keys(tempData)[0]
    csvOutTemp = tempData[newTempData];
    // console.log(`csvOutTemp: ${csvOutTemp}`);

    for (let i = 1; i < tempData.length; i++) {
        // console.log(`Output[${i}]: ${tempData[i]}\nEmployer_ID: ${tempData[i][0]}`);
        values.push([tempData[i][0], tempData[i][1], tempData[i][2], tempData[i][3], tempData[i][4], tempData[i][5], tempData[i][6], tempData[i][7], tempData[i][8], tempData[i][9], tempData[i][10], tempData[i][11], tempData[i][12], tempData[i][13], tempData[i][14], tempData[i][15], tempData[i][16], tempData[i][17], tempData[i][18], tempData[i][19], tempData[i][20], tempData[i][21], tempData[i][22]])
    }
    connection.query('INSERT INTO loan_ids (Employer_ID, Tax_ID, LastName, Loan_1_ID, Loan_1_PMT, Loan_2_ID, Loan_2_PMT, Loan_3_ID, Loan_3_PMT, Loan_4_ID, Loan_4_PMT, Loan_5_ID, Loan_5_PMT, Loan_6_ID, Loan_6_PMT, Loan_7_ID, Loan_7_PMT, Loan_8_ID, Loan_8_PMT, Loan_9_ID, Loan_9_PMT, Loan_10_ID, Loan_10_PMT) VALUES ?', [values], function (err, res) {
        if (err) throw err;
        // console.log("1 record inserted");
    });
};

router.use(cors.mw);
router.use(require('express-formidable')());

//*──── GET ROUTE ─────────────────────────────────────────────────────────────────────────
router.get('/ids', (req, res) => {
    console.log('I got into the GET route!')
    let id = req.query.id;
    // let taxId = req.query.taxId;
    // console.log(`empId: ${id}`);
    // let empId = 174;
    let sql = `SELECT * FROM loan_ids WHERE Employer_ID=${id}`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        let answer = result;
        console.log(`answer: ${Object.values(answer)}`);
        res.send(answer);
    });
});

//*──── UPLOAD ROUTE ──────────────────────────────────────────────────────────────────────
router.post('/upload', function (req, res, next) {
    console.log(`req: ${req}`)
    var url = URL.parse(req.url, true);
    console.log(`url: ${url.query.f}`)
    if (url.query.f) return post_file(req, res, url.query.f);
    return post_data(req, res);
});





module.exports = {
    router
};