// HEADER MAP URL
const URL = 'https://vast-inlet-55922.herokuapp.com';

//* SETTING PARSE CONFIG VARIABLES FOR PAPA PARSE
var parseConfig = {
    delimiter: "", // auto-detect
    newline: "", // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    skipEmptyLines: true,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
}

//* SETTING UNPARSE CONFIG FOR PAPA PARSE JSON BACK TO CSV
var unparseConfig = {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",",
    header: true,
    newline: "\n",
    skipEmptyLines: true, //or 'greedy',
    columns: null //or array of strings
}

//* RETRIEVING VALUES FROM PARENT PAGE VIA LOCAL STORAGE
var empIdNum = localStorage.getItem('empIdNum');
var employerConfigCsv = getMapById(empIdNum);

var empName = encodeURI(localStorage.getItem(
    'empName')); // Using encodeURI to deal with special characters in names
var empAddress1 = localStorage.getItem('empAddress1');
var empAddress2 = localStorage.getItem('empAddress2');
var empCity = localStorage.getItem('empCity');
var empState = localStorage.getItem('empState');
var empZip = localStorage.getItem('empZip');
var batchNum = localStorage.getItem('batchNum');
var contractNum = localStorage.getItem('contractNum');
var dateToday = localStorage.getItem('dateToday');
var timeNow = localStorage.getItem('timeNow');
var dateTimeStamp = localStorage.getItem('dateTimeStamp');
var empLocation = localStorage.getItem('empLocation');
var trimTop = localStorage.getItem('trimTop');
var trimBottom = localStorage.getItem('trimBottom');
var ff1 = localStorage.getItem('ff1');
var fv1 = localStorage.getItem('fv1');
var ff2 = localStorage.getItem('ff2');
var fv2 = localStorage.getItem('fv2');
var ff3 = localStorage.getItem('ff3');
var fv3 = localStorage.getItem('fv3');
var isMultiDivision = localStorage.getItem('isMultiDivision');
var removeDuplicates = localStorage.getItem('removeDuplicates');
var customHeader = localStorage.getItem('customHeader');
var removeOldTerms = localStorage.getItem('removeOldTerms');
var uploadUrlString = localStorage.getItem('uploadUrlString');
var recordKeeper = localStorage.getItem('recordKeeper');
var ascLocation = localStorage.getItem('ascLocation');
var eligDateInd = localStorage.getItem('eligDateInd');
var headerRow = localStorage.getItem('headerRow');
// var loanIds = localStorage.getItem('loanIds')

//* Calculating values not pulled directly from local storage
var thisBatchNum = parseInt(batchNum) + 1; // batchNum is a string so we must parseInt
var createDate = dateToday + ' ' + timeNow;
var recordStatus = "Active";
var source = decodeURI(empName);
var sourceId = empIdNum;
var completedStages = "Upload Mapping";
//! var empArrID = empIdNum; // this is for getting the employer template array row since it starts at index 0

// This is global for now for testing so I can inspect the object before and after changes/calculations
var csvOutTemp;


//* FOR DEBUGGING
console.log(`empIdNum ${empIdNum}`);
console.log(`empName ${empName}`)
console.log(`empLocation ${empLocation}`)

/* Initializing accordion for output */
$("#accordion").accordion({
    active: 2,
    collapsible: true,
    heightStyle: "fill",
    icons: {
        "header": "ui-icon-plus",
        "activeHeader": "ui-icon-minus"
    }
});

$('.isSalary').click(function () {
    $('#ckBox').removeAttr('hidden');
})

//*========================================================================================
/*                                                                                      *
 *                                     ALL FUNCTIONS                                    *
 *                                                                                      */
//*========================================================================================

//? XLSX INPUT FORMATTER
var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    worker: './xlsxworker.js'
};
var global_wb;

function get_radio_value(radioName) {
    var radios = document.getElementsByName(radioName);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function to_json(workbook) {
    var result = {};
    if (headerRow == undefined || headerRow == '') {
        headerRow = 0;
    } else {
        headerRow -= 1;
    }

    workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            dateNF: "mm/dd/yyyy",
            range: headerRow
        });
        // console.log(`roa: ${roa}`);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
}

function to_csv(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function (sheetName) {
        var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if (csv.length > 0) {
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(csv);
        }
    });
    return result.join("\n");
}

function to_formulae(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function (sheetName) {
        var formulae = XLSX.utils.get_formulae(workbook.Sheets[sheetName]);
        if (formulae.length > 0) {
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(formulae.join("\n"));
        }
    });
    return result.join("\n");
}

var tarea = document.getElementById('b64data');

function b64it() {
    var wb = XLSX.read(tarea.value, {
        type: 'base64'
    });
    process_wb(wb);
}




var loanIds = getLoanIds(empIdNum);


function process_wb(wb, loan_ids) {
    var loanIds = loan_ids;

    String.prototype.pad = function (_char, len, to) {
        if (!this || !_char || this.length >= len) {
            return this;
        }
        to = to || 0;
        var ret = this;
        var max = (len - this.length) / _char.length + 1;
        while (--max) {
            ret = (to) ? ret + _char : _char + ret;
        }
        return ret;
    };

    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var fileOutDisplayArea = document.getElementById('fileOutDisplayArea');
    var duplicatesDisplayElem = document.getElementById('duplicatesDisplay');
    var output = "";
    output = JSON.stringify(to_json(wb), 2, 2);
    let tempCsvOut = output.replace(/(00\/00\/0000)/g, ''); // Removing 00/00/00 dates (i.e. Quorum)
    let dateCorrect = tempCsvOut.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
    // console.log(output);
    let tempData = JSON.parse(dateCorrect);
    let newTempData = Object.keys(tempData)[0]
    // console.log(`newTempData: ${newTempData}`);

    csvOutTemp = tempData[newTempData];
    // console.log(`Sheet1: ${JSON.stringify(output.Sheet1)}`);
    // console.log(`csvOutTemp: ${JSON.stringify(csvOutTemp)}`);
    var payBegin = document.getElementById("payBeginPicker").value;
    var payEnd = document.getElementById("payEndPicker").value;
    var payDate = document.getElementById("picker").value;

    //*========================================================================================
    /*                                                                                      *
     *                        DEFINING LOCATION OF EACH COLUMN HEADER                       *
     *                                                                                      */
    //*========================================================================================

    var location = employerConfigCsv[9];
    var taxIdKeyName = employerConfigCsv[
        10]; // Getting the name of this client's Tax ID/SSN keys to find it in objects
    var taxID = employerConfigCsv[10];
    var first_name = employerConfigCsv[11];
    var middle_name = employerConfigCsv[12];
    var last_name = employerConfigCsv[13];
    var name_suffix = employerConfigCsv[14];
    var eePreTax = employerConfigCsv[15];
    var hoursWorkedYTD = employerConfigCsv[17];
    var addr1 = employerConfigCsv[18];
    var addr2 = employerConfigCsv[19];
    var cities = employerConfigCsv[20];
    var state = employerConfigCsv[21];
    var zipCode = employerConfigCsv[22];
    var birthD = employerConfigCsv[23];
    var birthDate = birthD.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
    var hireD = employerConfigCsv[24];
    var hireDate = hireD.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
    var termD = employerConfigCsv[25];
    var termDate = termD.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
    var rehireD = employerConfigCsv[26];
    var rehireDate = rehireD.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
    var employeeStatus = employerConfigCsv[28];
    var combRecordIdentifier = employerConfigCsv[30];
    var roth401kEE = employerConfigCsv[33];
    var firstLoan = employerConfigCsv[34];
    var kLoan1 = employerConfigCsv[35];
    var secondLoan = employerConfigCsv[36];
    var kLoan2 = employerConfigCsv[37];
    var statusDateField = employerConfigCsv[39];
    var statusChangeReason = employerConfigCsv[40];
    var eeEligibilityDate = employerConfigCsv[41];
    var ascLocal = employerConfigCsv[45];
    var deferralAmount = employerConfigCsv[52];
    var firstDivision = employerConfigCsv[56];
    var newPreTaxContrib = employerConfigCsv[61];
    var newRothContrib = employerConfigCsv[62];
    var rothCatchUp = employerConfigCsv[68];
    var transDateChanged = employerConfigCsv[69];
    var middleInt = employerConfigCsv[70];
    var erQacaMatch = employerConfigCsv[71];
    var compensationYTD = employerConfigCsv[72]
    var erMatchYTD = employerConfigCsv[80];
    var rothERMatch = employerConfigCsv[81];
    var division = employerConfigCsv[83];
    var payFreq = employerConfigCsv[89];
    var checkDate = employerConfigCsv[94];
    var payEndDate = employerConfigCsv[95];
    var eePreTaxPlan1 = employerConfigCsv[96];
    var eePreTaxContr1 = employerConfigCsv[97];
    var eePreTaxPlan2 = employerConfigCsv[101];
    var eePreTaxContr2 = employerConfigCsv[102];
    var eePreTaxPlan3 = employerConfigCsv[106];
    var eePreTaxContr3 = employerConfigCsv[107];
    var postTaxPlan1 = employerConfigCsv[111];
    var postTaxContr1 = employerConfigCsv[112];
    var postTaxPlan2 = employerConfigCsv[116];
    var postTaxContr2 = employerConfigCsv[117];
    var postTaxPlan3 = employerConfigCsv[121];
    var postTaxContr3 = employerConfigCsv[122];
    var catchUpPlan1Cont = employerConfigCsv[127];
    var erMatch2 = employerConfigCsv[135];
    var erMatch3 = employerConfigCsv[136];
    var erCatchUpMatch = employerConfigCsv[137];
    var thirdLoan = employerConfigCsv[140];
    var kLoan3 = employerConfigCsv[141];
    var safeHarborMatch = employerConfigCsv[142];
    var erSafeHarborNonMatch = employerConfigCsv[147];
    var erQacaNonElect = employerConfigCsv[153];
    var erQacaMatchTotal = employerConfigCsv[154];
    var jh_TransNum = employerConfigCsv[160];
    var jh_PRDate = employerConfigCsv[161];
    var jh_Calc_Eedef = employerConfigCsv[162];
    var jh_Calc_Shmac = employerConfigCsv[163];
    var jh_Calc_ermat = employerConfigCsv[164];
    var jh_Calc_Eerot = employerConfigCsv[169];
    var erps = employerConfigCsv[173];
    var calcComplete = employerConfigCsv[174];
    var calcSrc401kDollar = employerConfigCsv[175];
    var calcSrc401kPerct = employerConfigCsv[176];
    var calcSrcRothDollar = employerConfigCsv[177];
    var calsSrcRothPerct = employerConfigCsv[178];
    var calcSrc401k$Match = employerConfigCsv[179];
    var calcSrc401kPerctMatch = employerConfigCsv[180];
    var calcSrcRoth$Match = employerConfigCsv[181];
    var calcSrcRothPerctMatch = employerConfigCsv[182];
    var calcSrc401k$CU = employerConfigCsv[183];
    var calcSrc401kPerctCU = employerConfigCsv[184];
    var calcSrcRoth$CU = employerConfigCsv[185];
    var calcSrcRothPerctCU = employerConfigCsv[186];
    var calcSrc401k$CUMatch = employerConfigCsv[187];
    var calcSrc401kPerctCUMatch = employerConfigCsv[188];
    var calcSrcRoth$CUMatch = employerConfigCsv[189];
    var calcSrcRothPerctCUMatch = employerConfigCsv[190];
    var partialHours1 = employerConfigCsv[191];
    var partialHours2 = employerConfigCsv[192];
    var partialHours3 = employerConfigCsv[193];
    var partialHours4 = employerConfigCsv[194];
    var partialHours5 = employerConfigCsv[195];
    var partialHours6 = employerConfigCsv[196];
    var partialHours7 = employerConfigCsv[197];
    var partialHours8 = employerConfigCsv[198];
    var partialHours9 = employerConfigCsv[199];
    var partialHours10 = employerConfigCsv[200];
    var partialHours11 = employerConfigCsv[201];
    var partialHours12 = employerConfigCsv[202];
    var partialHours13 = employerConfigCsv[203];
    var partialHours14 = employerConfigCsv[204];
    var partialHours15 = employerConfigCsv[205];
    var partialHours16 = employerConfigCsv[206];
    var partialHours17 = employerConfigCsv[207];
    var partialHours18 = employerConfigCsv[208];
    var partialHours19 = employerConfigCsv[209];
    var partialHours20 = employerConfigCsv[210];
    var loanPmt1 = employerConfigCsv[211];
    var loanPmt2 = employerConfigCsv[212];
    var loanPmt3 = employerConfigCsv[213];
    var loanPmt4 = employerConfigCsv[214];
    var loanPmt5 = employerConfigCsv[215];
    var loanPmt6 = employerConfigCsv[216];
    var loanPmt7 = employerConfigCsv[217];
    var loanPmt8 = employerConfigCsv[218];
    var loanPmt9 = employerConfigCsv[219];
    var loanPmt10 = employerConfigCsv[220];
    var loanPmt11 = employerConfigCsv[221];
    var loanPmt12 = employerConfigCsv[222];
    var loanPmt13 = employerConfigCsv[223];
    var loanPmt14 = employerConfigCsv[224];
    var loanPmt15 = employerConfigCsv[225];
    var loanPmt16 = employerConfigCsv[226];
    var loanPmt17 = employerConfigCsv[227];
    var exclComp1 = employerConfigCsv[228];
    var exclComp2 = employerConfigCsv[229];
    var exclComp3 = employerConfigCsv[230];
    var exclComp4 = employerConfigCsv[231];
    var exclComp5 = employerConfigCsv[232];
    var exclComp6 = employerConfigCsv[233];
    var exclComp7 = employerConfigCsv[234];
    var exclComp8 = employerConfigCsv[235];
    var exclComp9 = employerConfigCsv[236];
    var exclComp10 = employerConfigCsv[237];
    // var payrollHrs = employerConfigCsv[191];
    var totalLoans = employerConfigCsv[238];
    var totalPeriodHours = employerConfigCsv[239];
    var totalExcludedComp = employerConfigCsv[240];
    var roth401kCUMatch = employerConfigCsv[241];
    var totalEEPre = employerConfigCsv[242];
    var jh_last_suffix = employerConfigCsv[243];
    var jh_Country = employerConfigCsv[245];
    var statusField = employerConfigCsv[246];
    var eligInd = employerConfigCsv[247];
    var eeStatus = employerConfigCsv[254];
    var status_date = employerConfigCsv[255];
    var jhStaticEligible = employerConfigCsv[256];
    var jhStaticEligDate = employerConfigCsv[257];
    var alwaysBlank = employerConfigCsv[259];
    var emp_calc_amt9 = employerConfigCsv[270];
    var emp_calc_amt10 = employerConfigCsv[271];
    var emp_salaryAmtQualifier = employerConfigCsv[272];
    var qacaCUMatch = employerConfigCsv[275];
    var payStartDate = employerConfigCsv[278];
    var voya_RecordType = employerConfigCsv[279];
    var voyaZipExt = employerConfigCsv[282];
    var voyaEmpId = employerConfigCsv[284];
    var voya_IrsCode = employerConfigCsv[285];
    var safeHarbor_2 = employerConfigCsv[291];
    var safeHarbor_3 = employerConfigCsv[292];
    var safeHarbor_4 = employerConfigCsv[293];

    var csvDataEmpId = csvOutTemp.map(function (o) {
        o.EmployerId = empIdNum;
        o.CreateDate = dateTimeStamp;
        o.RecordStatus = recordStatus;
        o.Source = source;
        o.SourceId = sourceId;
        o.BatchNumber = thisBatchNum;
        o.ContractNumber = contractNum;
        o.CompletedStages = completedStages;
        o.AscLocation = ascLocation;
        o.PayrollStartDate = payBegin;
        o.PayrollEndDate = payEnd;
        o.CheckDate = payDate; // From date picker (was PayrollEndDate)
        if (empLocation != '') {
            o.Division = empLocation;
            // console.log(empIdNum);
            //* Check if the employer id is from spectrum Paint and if so then put the correct sub company ID in the location field.
            if (empIdNum == 105 || empIdNum == 106 || empIdNum == 107) {
                o.Location = '2';
            } else {
                o.Location =
                    empLocation; // Some mappings use "EmpLocation" and others use "Location" or "Division"
            }
        }
        return o;
    })
    //// END Setting New/Updated Values in Data Objects ////

    csvOutputTemp = csvDataEmpId; // Debug
    var noTotalsRow
    if (removeOldTerms !== 'No') {
        var oldTermsRemoved = removeOldTermsFunc(employerConfigCsv,
            csvOutputTemp); // Need to make a clearer data path with all these arrays
        //console.log('%cRemoved terms older than 90 days', 'background: #CCFFCC; color: green');
        csvDataEmpId = removeTotalsRow(employerConfigCsv, oldTermsRemoved);
    } else {
        csvDataEmpId = removeTotalsRow(employerConfigCsv, csvOutputTemp);
    }
    console.log(`csvDataEmpId ${csvDataEmpId}`);

    // var noTotalsRow = removeTotalsRow()


    var emailBody = 'Good Day,\nWe have encountered some errors in your payroll.';
    var emailSubject = `${empName}-Errors Processing Payroll`;
    var sendEmail = false;

    //*========================================================================================
    /*                                                                                      *
     *                              ITERATE THROUGH ALL COLUMNS                             *
     *                                                                                      */
    //*========================================================================================
    function iterateRows() {
        for (i = 0; i < csvDataEmpId.length; i++) {
            // console.log(`csvDataEmpId[i]: ${csvDataEmpId[i].data}`);
            // console.log(`csvDataEmpId[i]: ${csvDataEmpId[i][i]}`);

            let firstName = csvDataEmpId[i][first_name];
            let lastName = csvDataEmpId[i][last_name];
            let suffix = csvDataEmpId[i][name_suffix];
            suffix == undefined ? suffix = '' : suffix;
            let preTaxEE = csvDataEmpId[i][eePreTax];
            if (preTaxEE == undefined || preTaxEE == '-') {
                preTaxEE = 0;
                csvDataEmpId[i][eePreTax] = 0
            }
            let hoursYTD = csvDataEmpId[i][hoursWorkedYTD];
            if (hoursYTD == undefined || hoursYTD == '-') {
                hoursYTD = 0;
                csvDataEmpId[i][hoursWorkedYTD] = 0
            }
            let birth = csvDataEmpId[i][birthDate];
            let hired = csvDataEmpId[i][hireDate];
            // console.log(`hired: ${hired}`);
            let termed = csvDataEmpId[i][termDate];
            // console.log(`termed: ${termed}`);
            let rehired = csvDataEmpId[i][rehireDate];
            // console.log(`rehired: ${rehired}`);
            let payrollHours = csvDataEmpId[i][partialHours1];
            let taxIdSsn = csvDataEmpId[i][taxID];
            let address1 = csvDataEmpId[i][addr1];
            let address2 = csvDataEmpId[i][addr2];
            let city = csvDataEmpId[i][cities];
            let stateRow = csvDataEmpId[i][state];
            let postalCode = csvDataEmpId[i][zipCode];
            let rothKEE = csvDataEmpId[i][roth401kEE];
            if (rothKEE == undefined || rothKEE == '-') {
                rothKEE = 0;
                csvDataEmpId[i][roth401kEE] = 0
            }

            //* LOAN ID AND PAYMENTS
            let loanId1 = csvDataEmpId[i][firstLoan];
            let loanK1 = csvDataEmpId[i][kLoan1];
            if (loanK1 == undefined || loanK1 == '-') {
                loanK1 = 0;
                csvDataEmpId[i][kLoan1] = 0
            }
            // console.log(`loanK1 = ${loank1}`)
            let loanId2 = csvDataEmpId[i][secondLoan];
            let loanK2 = csvDataEmpId[i][kLoan2];
            if (loanK2 == undefined || loanK2 == '-') {
                loanK2 = 0;
                csvDataEmpId[i][kLoan2] = 0
            }
            let loanId3 = csvDataEmpId[i][thirdLoan];
            let loanK3 = csvDataEmpId[i][kLoan3];
            if (loanK3 == undefined || loanK3 == '-') {
                loanK3 = 0;
                csvDataEmpId[i][kLoan3] = 0
            }


            let static_date = csvDataEmpId[i][status_date];
            let statDateField = csvDataEmpId[i][statusDateField];
            let status_Reason = csvDataEmpId[i][statusChangeReason];
            let divisionName = csvDataEmpId[i][division];
            let payFrequency = csvDataEmpId[i][payFreq];
            let ascLocale = csvDataEmpId[i][ascLocal];
            let defAmount = csvDataEmpId[i][deferralAmount];
            if (defAmount == undefined || defAmount == '-') {
                defAmount = 0;
                csvDataEmpId[i][deferralAmount] = 0
            }
            let middleNme = csvDataEmpId[i][middle_name];
            let middleIn = csvDataEmpId[i][middleInt];
            let dateChange = csvDataEmpId[i][transDateChanged];
            let qacaMatch = csvDataEmpId[i][erQacaMatch];
            if (qacaMatch == undefined || qacaMatch == '-') {
                qacaMatch = 0;
                csvDataEmpId[i][erQacaMatch] = 0
            }
            let compYTD = csvDataEmpId[i][compensationYTD];
            if (compYTD == undefined || compYTD == '-') {
                compYTD = 0;
                csvDataEmpId[i][compensationYTD] = 0
            }
            let erMatchTotal = csvDataEmpId[i][erMatchYTD];
            if (erMatchTotal == undefined || erMatchTotal == '-') {
                erMatchTotal = 0;
                csvDataEmpId[i][erMatchYTD] = 0
            }
            let jhEligIndc = csvDataEmpId[i][eligInd];
            let empStatus = csvDataEmpId[i][eeStatus];
            let payrollDate = csvDataEmpId[i][checkDate];
            let payEnd = csvDataEmpId[i][payEndDate];
            let erSHNonMatch = csvDataEmpId[i][erSafeHarborNonMatch];
            if (erSHNonMatch == undefined || erSHNonMatch == '-') {
                erSHNonMatch = 0;
                csvDataEmpId[i][erSafeHarborNonMatch] = 0
            }
            let erQacNonElective = csvDataEmpId[i][erQacaNonElect];
            if (erQacNonElective == undefined || erQacNonElective == '-') {
                erQacNonElective = 0;
                csvDataEmpId[i][erQacaNonElect] = 0
            }
            let cuPlan1Contrib = csvDataEmpId[i][catchUpPlan1Cont];
            if (cuPlan1Contrib == undefined || cuPlan1Contrib == '-') {
                cuPlan1Contrib = 0;
                csvDataEmpId[i][catchUpPlan1Cont] = 0
            }
            let match2 = csvDataEmpId[i][erMatch2];
            let match3 = csvDataEmpId[i][erMatch3];
            let pRDate = csvDataEmpId[i][jh_PRDate];
            let ERPS = csvDataEmpId[i][erps];
            if (ERPS == undefined || ERPS == '-') {
                ERPS = 0;
                csvDataEmpId[i][erps] = 0
            }
            let rkCalcComplete = csvDataEmpId[i][calcComplete];
            let dollar401k = csvDataEmpId[i][calcSrc401kDollar];
            if (dollar401k == undefined || dollar401k == '-') {
                dollar401k = 0;
                csvDataEmpId[i][calcSrc401kDollar] = 0
            }
            let perct401k = csvDataEmpId[i][calcSrc401kPerct];
            if (perct401k == undefined || perct401k == '-') {
                perct401k = 0;
                csvDataEmpId[i][calcSrc401kPerct] = 0
            }
            let dollarRoth = csvDataEmpId[i][calcSrcRothDollar];
            if (dollarRoth == undefined || dollarRoth == '-') {
                dollarRoth = 0;
                csvDataEmpId[i][calcSrcRothDollar] = 0
            }
            let perctRoth = csvDataEmpId[i][calsSrcRothPerct];
            if (perctRoth == undefined || perctRoth == '-') {
                perctRoth = 0;
                csvDataEmpId[i][calsSrcRothPerct] = 0
            }
            let dollar401kMatch = csvDataEmpId[i][calcSrc401k$Match];
            if (dollar401kMatch == undefined || dollar401kMatch == '-') {
                dollar401kMatch = 0;
                csvDataEmpId[i][calcSrc401k$Match] = 0
            }
            let perct401kMatch = csvDataEmpId[i][calcSrc401kPerctMatch];
            if (perct401kMatch == undefined || perct401kMatch == '-') {
                perct401kMatch = 0;
                csvDataEmpId[i][calcSrc401kPerctMatch] = 0
            }
            let dollarRothMatch = csvDataEmpId[i][calcSrcRoth$Match];
            if (dollarRothMatch == undefined || dollarRothMatch == '-') {
                dollarRothMatch = 0;
                csvDataEmpId[i][calcSrcRoth$Match] = 0
            }
            let perctRothMatch = csvDataEmpId[i][calcSrcRothPerctMatch];
            if (perctRothMatch == undefined || perctRothMatch == '-') {
                perctRothMatch = 0;
                csvDataEmpId[i][calcSrcRothPerctMatch] = 0
            }
            let dollar401kCU = csvDataEmpId[i][calcSrc401k$CU];
            if (dollar401kCU == undefined || dollar401kCU == '-') {
                dollar401kCU = 0;
                csvDataEmpId[i][calcSrc401k$CU] = 0
            }
            let perct401kCU = csvDataEmpId[i][calcSrc401kPerctCU];
            if (perct401kCU == undefined || perct401kCU == '-') {
                perct401kCU = 0;
                csvDataEmpId[i][calcSrc401kPerctCU] = 0
            }
            let dollarRothCU = csvDataEmpId[i][calcSrcRoth$CU];
            if (dollarRothCU == undefined || dollarRothCU == '-') {
                dollarRothCU = 0;
                csvDataEmpId[i][calcSrcRoth$CU] = 0
            }
            let perctRothCU = csvDataEmpId[i][calcSrcRothPerctCU];
            if (perctRothCU == undefined || perctRothCU == '-') {
                perctRothCU = 0;
                csvDataEmpId[i][calcSrcRothPerctCU] = 0
            }
            let dollar401kCUMatch = csvDataEmpId[i][calcSrc401k$CUMatch];
            if (dollar401kCUMatch == undefined || dollar401kCUMatch == '-') {
                dollar401kCUMatch = 0;
                csvDataEmpId[i][calcSrc401k$CUMatch] = 0
            }
            let perct401kCUMatch = csvDataEmpId[i][calcSrc401kPerctCUMatch];
            if (perct401kCUMatch == undefined || perct401kCUMatch == '-') {
                perct401kCUMatch = 0;
                csvDataEmpId[i][calcSrc401kPerctCUMatch] = 0
            }
            let dollarRothCUMatch = csvDataEmpId[i][calcSrcRoth$CUMatch];
            if (dollarRothCUMatch == undefined || dollarRothCUMatch == '-') {
                dollarRothCUMatch = 0;
                csvDataEmpId[i][calcSrcRoth$CUMatch] = 0
            }
            let perctRothCUMatch = csvDataEmpId[i][calcSrcRothPerctCUMatch];
            if (perctRothCUMatch == undefined || perctRothCUMatch == '-') {
                perctRothCUMatch = 0;
                csvDataEmpId[i][calcSrcRothPerctCUMatch] = 0
            }
            let hours1 = csvDataEmpId[i][partialHours1];
            if (hours1 == undefined || hours1 == '-') {
                hours1 = 0;
                csvDataEmpId[i][partialHours1] = 0
            }
            let hours2 = csvDataEmpId[i][partialHours2];
            if (hours2 == undefined || hours2 == '-') {
                hours2 = 0;
                csvDataEmpId[i][partialHours2] = 0
            }
            let hours3 = csvDataEmpId[i][partialHours3];
            if (hours3 == undefined || hours3 == '-') {
                hours3 = 0;
                csvDataEmpId[i][partialHours3] = 0
            }
            let hours4 = csvDataEmpId[i][partialHours4];
            if (hours4 == undefined || hours4 == '-') {
                hours4 = 0;
                csvDataEmpId[i][partialHours4] = 0
            }
            let hours5 = csvDataEmpId[i][partialHours5];
            if (hours5 == undefined || hours5 == '-') {
                hours5 = 0;
                csvDataEmpId[i][partialHours5] = 0
            }
            let hours6 = csvDataEmpId[i][partialHours6];
            if (hours6 == undefined || hours6 == '-') {
                hours6 = 0;
                csvDataEmpId[i][partialHours6] = 0
            }
            let hours7 = csvDataEmpId[i][partialHours7];
            if (hours7 == undefined || hours7 == '-') {
                hours7 = 0;
                csvDataEmpId[i][partialHours7] = 0
            }
            let hours8 = csvDataEmpId[i][partialHours8];
            if (hours8 == undefined || hours8 == '-') {
                hours8 = 0;
                csvDataEmpId[i][partialHours8] = 0
            }
            let hours9 = csvDataEmpId[i][partialHours9];
            if (hours9 == undefined || hours9 == '-') {
                hours9 = 0;
                csvDataEmpId[i][partialHours9] = 0
            }
            let hours10 = csvDataEmpId[i][partialHours10];
            if (hours10 == undefined || hours10 == '-') {
                hours10 = 0;
                csvDataEmpId[i][partialHours10] = 0
            }
            let hours11 = csvDataEmpId[i][partialHours11];
            if (hours11 == undefined || hours11 == '-') {
                hours11 = 0;
                csvDataEmpId[i][partialHours11] = 0
            }
            let hours12 = csvDataEmpId[i][partialHours12];
            if (hours12 == undefined || hours12 == '-') {
                hours12 = 0;
                csvDataEmpId[i][partialHours12] = 0
            }
            let hours13 = csvDataEmpId[i][partialHours13];
            if (hours13 == undefined || hours13 == '-') {
                hours13 = 0;
                csvDataEmpId[i][partialHours13] = 0
            }
            let hours14 = csvDataEmpId[i][partialHours14];
            if (hours14 == undefined || hours14 == '-') {
                hours14 = 0;
                csvDataEmpId[i][partialHours14] = 0
            }
            let hours15 = csvDataEmpId[i][partialHours15];
            if (hours15 == undefined || hours15 == '-') {
                hours15 = 0;
                csvDataEmpId[i][partialHours15] = 0
            }
            let hours16 = csvDataEmpId[i][partialHours16];
            if (hours16 == undefined || hours16 == '-') {
                hours16 = 0;
                csvDataEmpId[i][partialHours16] = 0
            }
            let hours17 = csvDataEmpId[i][partialHours17];
            if (hours17 == undefined || hours17 == '-') {
                hours17 = 0;
                csvDataEmpId[i][partialHours17] = 0
            }
            let hours18 = csvDataEmpId[i][partialHours18];
            if (hours18 == undefined || hours18 == '-') {
                hours18 = 0;
                csvDataEmpId[i][partialHours18] = 0
            }
            let hours19 = csvDataEmpId[i][partialHours19];
            if (hours19 == undefined || hours19 == '-') {
                hours19 = 0;
                csvDataEmpId[i][partialHours19] = 0
            }
            let hours20 = csvDataEmpId[i][partialHours20];
            if (hours20 == undefined || hours20 == '-') {
                hours20 = 0;
                csvDataEmpId[i][partialHours20] = 0
            }
            let loan1 = csvDataEmpId[i][loanPmt1];
            if (loan1 == undefined || loan1 == '-') {
                loan1 = 0;
                csvDataEmpId[i][loanPmt1] = 0
            }
            let loan2 = csvDataEmpId[i][loanPmt2];
            if (loan2 == undefined || loan2 == '-') {
                loan2 = 0;
                csvDataEmpId[i][loanPmt2] = 0
            }
            let loan3 = csvDataEmpId[i][loanPmt3];
            if (loan3 == undefined || loan3 == '-') {
                loan3 = 0;
                csvDataEmpId[i][loanPmt3] = 0
            }
            let loan4 = csvDataEmpId[i][loanPmt4];
            if (loan4 == undefined || loan4 == '-') {
                loan4 = 0;
                csvDataEmpId[i][loanPmt4] = 0
            }
            let loan5 = csvDataEmpId[i][loanPmt5];
            if (loan5 == undefined || loan5 == '-') {
                loan5 = 0;
                csvDataEmpId[i][loanPmt5] = 0
            }
            let loan6 = csvDataEmpId[i][loanPmt6];
            if (loan6 == undefined || loan6 == '-') {
                loan6 = 0;
                csvDataEmpId[i][loanPmt6] = 0
            }
            let loan7 = csvDataEmpId[i][loanPmt7];
            if (loan7 == undefined || loan7 == '-') {
                loan7 = 0;
                csvDataEmpId[i][loanPmt7] = 0
            }
            let loan8 = csvDataEmpId[i][loanPmt8];
            if (loan8 == undefined || loan8 == '-') {
                loan8 = 0;
                csvDataEmpId[i][loanPmt8] = 0
            }
            let loan9 = csvDataEmpId[i][loanPmt9];
            if (loan9 == undefined || loan9 == '-') {
                loan9 = 0;
                csvDataEmpId[i][loanPmt9] = 0
            }
            let loan10 = csvDataEmpId[i][loanPmt10];
            if (loan10 == undefined || loan10 == '-') {
                loan10 = 0;
                csvDataEmpId[i][loanPmt10] = 0
            }
            let loan11 = csvDataEmpId[i][loanPmt11];
            if (loan11 == undefined || loan11 == '-') {
                loan11 = 0;
                csvDataEmpId[i][loanPmt11] = 0
            }
            let loan12 = csvDataEmpId[i][loanPmt12];
            if (loan12 == undefined || loan12 == '-') {
                loan12 = 0;
                csvDataEmpId[i][loanPmt12] = 0
            }
            let loan13 = csvDataEmpId[i][loanPmt13];
            if (loan13 == undefined || loan13 == '-') {
                loan13 = 0;
                csvDataEmpId[i][loanPmt13] = 0
            }
            let loan14 = csvDataEmpId[i][loanPmt14];
            if (loan14 == undefined || loan14 == '-') {
                loan14 = 0;
                csvDataEmpId[i][loanPmt14] = 0
            }
            let loan15 = csvDataEmpId[i][loanPmt15];
            if (loan15 == undefined || loan15 == '-') {
                loan15 = 0;
                csvDataEmpId[i][loanPmt15] = 0
            }
            let loan16 = csvDataEmpId[i][loanPmt16];
            if (loan16 == undefined || loan16 == '-') {
                loan16 = 0;
                csvDataEmpId[i][loanPmt16] = 0
            }
            let loan17 = csvDataEmpId[i][loanPmt17];
            if (loan17 == undefined || loan17 == '-') {
                loan17 = 0;
                csvDataEmpId[i][loanPmt17] = 0
            }
            let excl1 = csvDataEmpId[i][exclComp1];
            if (excl1 == undefined || excl1 == '-') {
                excl1 = 0;
                csvDataEmpId[i][exclComp1] = 0
            }
            let excl2 = csvDataEmpId[i][exclComp2];
            if (excl2 == undefined || excl2 == '-') {
                excl2 = 0;
                csvDataEmpId[i][exclComp2] = 0
            }
            let excl3 = csvDataEmpId[i][exclComp3];
            if (excl3 == undefined || excl3 == '-') {
                excl3 = 0;
                csvDataEmpId[i][exclComp3] = 0
            }
            let excl4 = csvDataEmpId[i][exclComp4];
            if (excl4 == undefined || excl4 == '-') {
                excl4 = 0;
                csvDataEmpId[i][exclComp4] = 0
            }
            let excl5 = csvDataEmpId[i][exclComp5];
            if (excl5 == undefined || excl5 == '-') {
                excl5 = 0;
                csvDataEmpId[i][exclComp5] = 0
            }
            let excl6 = csvDataEmpId[i][exclComp6];
            if (excl6 == undefined || excl6 == '-') {
                excl6 = 0;
                csvDataEmpId[i][exclComp6] = 0
            }
            let excl7 = csvDataEmpId[i][exclComp7];
            if (excl7 == undefined || excl7 == '-') {
                excl7 = 0;
                csvDataEmpId[i][exclComp7] = 0
            }
            let excl8 = csvDataEmpId[i][exclComp8];
            if (excl8 == undefined || excl8 == '-') {
                excl8 = 0;
                csvDataEmpId[i][exclComp8] = 0
            }
            let excl9 = csvDataEmpId[i][exclComp9];
            if (excl9 == undefined || excl9 == '-') {
                excl9 = 0;
                csvDataEmpId[i][exclComp9] = 0
            }
            let excl10 = csvDataEmpId[i][exclComp10];
            if (excl10 == undefined || excl10 == '-') {
                excl10 = 0;
                csvDataEmpId[i][exclComp10] = 0
            }
            let jhIsEligible = csvDataEmpId[i][jhStaticEligible]
            let jhStEligDate = csvDataEmpId[i][jhStaticEligDate]
            let blank = csvDataEmpId[i][alwaysBlank];
            if (blank == undefined || blank == '-') {
                blank = 0;
                csvDataEmpId[i][alwaysBlank] = 0
            }
            let erQacaCUMatch = csvDataEmpId[i][qacaCUMatch];
            if (erQacaCUMatch == undefined || erQacaCUMatch == '-') {
                erQacaCUMatch = 0;
                csvDataEmpId[i][qacaCUMatch] = 0
            }
            let payStart = csvDataEmpId[i][payStartDate];
            let employeeStat = csvDataEmpId[i][employeeStatus]
            let voyaEmplrId = csvDataEmpId[i][voyaEmpId];
            let jhStatusField = csvDataEmpId[i][statusField];
            let safeHarborMatch_2 = csvDataEmpId[i][safeHarbor_2];
            if (safeHarborMatch_2 == undefined || safeHarborMatch_2 == '-') {
                safeHarborMatch_2 = 0;
                csvDataEmpId[i][safeHarbor_2] = 0
            }
            let safeHarborMatch_3 = csvDataEmpId[i][safeHarbor_3];
            if (safeHarborMatch_3 == undefined || safeHarborMatch_3 == '-') {
                safeHarborMatch_3 = 0;
                csvDataEmpId[i][safeHarbor_3] = 0
            }
            let safeHarborMatch_4 = csvDataEmpId[i][safeHarbor_4];
            if (safeHarborMatch_4 == undefined || safeHarborMatch_4 == '-') {
                safeHarborMatch_4 = 0;
                csvDataEmpId[i][safeHarbor_4] = 0
            }
            let anotherDivision = csvDataEmpId[i][firstDivision];
            let resultArr;


            //* For employers if the date format is YYYYMMDD
            if (empIdNum === '119') {
                let birth2 = moment(birth, 'YYYYMMDD');
                csvDataEmpId[i][birthDate] = birth == undefined ? '' : birth2.format('L');
                let newBirth = csvDataEmpId[i][birthDate];

                let hired2 = moment(hired, 'YYYYMMDD');
                csvDataEmpId[i][hireDate] = hired == undefined ? '' : hired2.format('L');
                let newHired = csvDataEmpId[i][hireDate];

                let termed2 = moment(termed, 'YYYYMMDD');
                csvDataEmpId[i][termDate] = termed == undefined ? '' : termed2.format('L');
                let newTermed = csvDataEmpId[i][termDate];

                let rehired2 = moment(rehired, 'YYYYMMDD');
                csvDataEmpId[i][rehireDate] = rehired == undefined ? '' : rehired2.format('L');
                let newRehired = csvDataEmpId[i][rehireDate];

                let payrollDate2 = moment(payrollDate, 'YYYYMMDD');
                csvDataEmpId[i][checkDate] = payrollDate == undefined ? '' : payrollDate2.format('L');
                let newPayrollDate = csvDataEmpId[i][checkDate];

                resultArr = determineEmpStatus(newHired, newTermed, newRehired, newPayrollDate);
            } else {
                resultArr = determineEmpStatus(hired, termed, rehired, payrollDate);
            }

            // console.log(`resultArr: ${resultArr}`); // debug

            //* GLOBAL CALCULATIONS
            // console.log(`preTaxEE: ${preTaxEE}`);
            // console.log(`type preTaxEE: ${typeof preTaxEE}`);

            //? Total 401k 
            csvDataEmpId[i][totalEEPre] =
                preTaxEE + dollar401k + perct401k + dollar401kCU + perct401kCU + defAmount;
            //? Total Roth
            csvDataEmpId[i][roth401kEE] = (dollarRoth + perctRoth + dollarRothCU + perctRothCU);
            //? Add all ER Matches
            csvDataEmpId[i][erMatchYTD] =
                (dollar401kMatch +
                    perct401kMatch +
                    dollarRothMatch +
                    perctRothMatch +
                    dollar401kCUMatch +
                    perct401kCUMatch +
                    dollarRothCUMatch +
                    perctRothCUMatch);
            //? Add all Roth Match
            csvDataEmpId[i][rothERMatch] = dollarRothMatch + perctRothMatch;
            //? Add all 401k Catch Up
            csvDataEmpId[i][catchUpPlan1Cont] = dollar401kCU + perct401kCU;
            //? Add all Roth Catch Up
            csvDataEmpId[i][rothCatchUp] = dollarRothCU + perctRothCU;
            //? Add all Roth Catch Up Match
            csvDataEmpId[i][roth401kCUMatch] =
                dollarRothCUMatch + perctRothCUMatch;
            //? Add all 401k Catch Up Match
            csvDataEmpId[i][erCatchUpMatch] =
                dollar401kCUMatch + perct401kCUMatch;
            //? Add all Partial Period Hours
            csvDataEmpId[i][totalPeriodHours] = hours1 + hours2 + hours3 + hours4 + hours5 + hours6 +
                hours7 + hours8 + hours9 + hours10 + hours11 + hours12 + hours13 + hours14 + hours15 +
                hours16 + hours17 + hours18 + hours19 + hours20;
            //? Add all Loan Payments
            csvDataEmpId[i][totalLoans] = loan1 + loan2 + loan3 + loan4 + loan5 + loan6 + loan7 + loan8 +
                loan9 + loan10 + loan11 + loan12 + loan13 + loan14 + loan15 + loan16 + loan17;
            //? Add all Excluded Comp
            csvDataEmpId[i][totalExcludedComp] = excl1 + excl2 + excl3 + excl4 + excl5 + excl6 + excl7 +
                excl8 + excl9 + excl10;
            //? Add QACA Match and QACA CU Match
            csvDataEmpId[i][erQacaMatchTotal] = qacaMatch + blank + erQacaCUMatch;
            //? Add Roth$ and Roth%
            csvDataEmpId[i][newRothContrib] = dollarRoth + perctRoth;
            //? Add ER Match
            csvDataEmpId[i][newPreTaxContrib] =
                dollar401kMatch + perct401kMatch;
            //? Add all SafeHarborMatch 2-4 fields and enter into SafeHarborMatch field
            csvDataEmpId[i][safeHarborMatch] =
                safeHarborMatch_2 + safeHarborMatch_3 + safeHarborMatch_4;

            csvDataEmpId[i][middleInt] = middleNameFunc(middleNme);
            try {
                if (taxIdSsn !== undefined && taxIdSsn !== '') {
                    let newTaxString = taxIdLength(taxIdSsn);
                    let regExPatern = new RegExp(/-/g);
                    let testSsn = regExPatern.test(newTaxString)
                    let taxStrng;
                    if (recordKeeper == 'Voya' && testSsn == true) {
                        taxStrng = newTaxString.replace(regExPatern, '');
                        console.log(`taxStrng ${taxStrng}`);

                    } else if (recordKeeper !== 'Voya' && testSsn == false) {
                        taxStrng = `${newTaxString.substring(0, 3)}-${newTaxString.substring(3, 5)}-${newTaxString.substring(5)}`;
                    } else {
                        taxStrng = newTaxString;
                    }
                    csvDataEmpId[i][taxID] = taxStrng;
                }
            } catch (err) {
                alert(err);
            }
            //* If Salary box is checked get value of radio button
            if ($('.isSalary').is(':checked')) {
                csvDataEmpId[i][partialHours1] = checkIfSalary(
                    hired,
                    termed,
                    rehired,
                    payrollHours
                );
            }
            //* For Quorum - all divisions need to be SHMAC not ERMAT and add all ERMAT into SHMAC
            if (empIdNum == 273 || empIdNum == 96 || empIdNum == 87 || empIdNum == 93 || empIdNum == 190 ||
                empIdNum == 97 || empIdNum == 95 || empIdNum == 94 || empIdNum == 92) {
                csvDataEmpId[i][erMatchYTD] = '';
                csvDataEmpId[i][safeHarborMatch] = safeHarborMatch_2 +
                    safeHarborMatch_3 +
                    safeHarborMatch_4 +
                    dollar401kMatch +
                    perct401kMatch +
                    dollarRothMatch +
                    perctRothMatch +
                    dollar401kCUMatch +
                    perct401kCUMatch +
                    dollarRothCUMatch +
                    perctRothCUMatch;
            }

            //* Set employee status and the date 
            // console.log(`birth date before: ${birth}`);

            if (empStatus == undefined || empStatus == '') {
                // console.log(`birth inside if: ${birth}`);
                if (resultArr !== undefined) {
                    csvDataEmpId[i][statusField] = resultArr[0]; //* setting the employee status value
                    csvDataEmpId[i][statusDateField] = resultArr[1]; //* setting status change date
                    if (resultArr[0] == 'A') {
                        csvDataEmpId[i][status_date] = payrollDate;
                        // if(rehired !== undefined || rehired !== ''){
                        //     csvDataEmpId[i][statusDateField] = rehired;
                        // } else {
                        //     csvDataEmpId[i][statusDateField] = hired;
                        // }
                    } else if (resultArr[0] == 'T') {
                        csvDataEmpId[i][status_date] = termed;
                    }
                } else {
                    csvDataEmpId[i][statusField] = resultArr[0]; // setting the employee status value
                    csvDataEmpId[i][statusDateField] = resultArr[1];
                }

            } else {
                csvDataEmpId[i][statusField] = empStatus;
            }
            if (stateRow !== undefined && stateRow.length > 2) {
                // console.log(`stateRow: ${stateRow}`);
                csvDataEmpId[i][state] = convert_state(stateRow, 'abbrev');
            }

            //*========================================================================================
            /*                                                                                      *
             * //CHECK JOHN HANCOCK AND TRANSAMERICA ADDRESS AND NAME COLUMNS                       *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'John Hancock' || recordKeeper == 'Transamerica') {
                //──── CHECK NAME COLUMNS ────────────────────────────────────────────────────────────────
                try {
                    if (firstName.length > 15) {
                        sendEmail = true;
                        let newFirstName = firstName.slice(0, 14);
                        // console.log(`newfirstName: ${newFirstName}`);
                        csvDataEmpId[i][first_name] = newFirstName;
                        emailBody +=
                            `\n\n*The First Name for the Employee with Last Name "${lastName}" was listed as ${firstName}. The First Name field cannot be more than 15 characters long. We have modified the First Name Field to accommodate only 15 characters. Please update the employees First Name for the next payroll.`;
                    } else if (lastName.length > 20) {
                        let newLastName = lastName.slice(0, 19);
                        // console.log(`newLastName: ${newLastName}`);
                        csvDataEmpId[i][last_name] = newLastName;
                        emailBody +=
                            `\n\n*The Last Name listed as "${lastName}" which is more than 20 characters long. The Last Name field cannot be more than 20 characters long. We have modified the Last Name Field to accommodate only 20 characters. Please update the employees Last Name for the next payroll.`;
                    }
                    //*──── CHECK ADDRESS1 COLUMN ───────────────────────────────────────────────────────────
                    if (address1 !== undefined) {
                        var regPat = new RegExp(/^\d+$/);
                        let add1Num = regPat.test(address1);
                        // console.log(`address 1 for ${lastName} is ${add1Num}`);
                        if (add1Num == true) {
                            csvDataEmpId[i][addr1] = empAddress1;
                            csvDataEmpId[i][addr2] = empAddress2;
                            csvDataEmpId[i][cities] = empCity;
                            csvDataEmpId[i][state] = empState;
                            csvDataEmpId[i][zipCode] = empZip;
                            sendEmail = true;
                            emailBody +=
                                `\n\n*Address 1 for the Employee with Last Name "${lastName}" was listed as ${address1} and Address 2 was listed as ${address2}. The Address 1 field cannot contain only numbers and the Address 2 field is for APT or Unit information only. So we have modified the entire address to your companies address. Please update the employees address for the next payroll.`;
                        }
                        //*──── CHECK ADDRESS1 LENGTH ─────────────────────────────────────────────────────────────
                        if (address1.length > 29) {
                            sendEmail = true;

                            try {
                                let newAddress1 = address1;
                                let pos = address1.search(/apt/gi);
                                if (pos !== -1) {
                                    csvDataEmpId[i][addr2] = address1.slice(pos);
                                    newAddress1 = address1.slice(0, pos);
                                }

                                //? Check length of address1 field and if over 30 characters trim and/or split into address 2
                                newAddress1 = newAddress1.replace(/drive/gi, 'DR');
                                newAddress1 = newAddress1.replace(/avenue/gi, 'AVE');
                                newAddress1 = newAddress1.replace(/lane/gi, 'LN');
                                newAddress1 = newAddress1.replace(/circle/gi, 'CIR');
                                newAddress1 = newAddress1.replace(/boulevard/gi, 'BLVD');
                                newAddress1 = newAddress1.replace(/place/gi, 'PL');
                                newAddress1 = newAddress1.replace(/road/gi, 'RD');
                                newAddress1 = newAddress1.replace(/court/gi, 'CT');
                                newAddress1 = newAddress1.replace(/trail/gi, 'TRL');
                                newAddress1 = newAddress1.replace(/terrace/gi, 'TER');

                                if (newAddress1.length > 19) {
                                    let updateAddress = newAddress1.slice(0, 19);
                                    csvDataEmpId[i][addr1] = updateAddress;
                                    emailBody +=
                                        `\n\n*Address 1 for the Employee with Last Name "${lastName}" was listed as ${address1}. The address cannot be more than 30 characters long. We have updated the address to be "${updateAddress}". Please update the address to accommodate only 30 characters.`;
                                } else {
                                    csvDataEmpId[i][addr1] = newAddress1;
                                    emailBody +=
                                        `\n\n*Address 1 for the Employee with Last Name "${lastName}" was listed as ${address1}. The address cannot be more than 30 characters long. We have updated the address to be "${newAddress1}". Please update the address to accommodate only 30 characters.`;
                                }


                            } catch (err) {
                                alert(
                                    `The address has encountered an error: ${err}.\n\nThe address causing the error is: ${address1}\n\nClick Ok to continue processing the file and you may need to fix the output file before upload.`);
                            }
                        }
                    }
                    //*──── CHECK ADDRESS2 ────────────────────────────────────────────────────────────────────
                    if (address2 !== undefined && address2 !== '') {
                        let newRegPat = new RegExp(/^\d+$/);
                        try {
                            let unitExp = new RegExp(/unit/gi);
                            let add2UnitPos = unitExp.test(address2);
                            let aptExp = new RegExp(/apt/gi);
                            let add2AptPos = aptExp.test(address2);
                            let lotExp = new RegExp(/lot/gi);
                            let add2LotPos = lotExp.test(address2);
                            let suiteExp = new RegExp(/ste/gi);
                            let add2SuitePos = suiteExp.test(address2);
                            let boxExp = new RegExp(/box/gi);
                            let checkForPoBox = boxExp.test(address2);
                            let loftExp = new RegExp(/loft/gi);
                            let checkForLoft = loftExp.test(address2);
                            let bsmtExp = new RegExp(/bsmt/gi);
                            let checkForBasement = bsmtExp.test(address2);
                            let spaceExp = new RegExp(/spc/gi);
                            let checkForSpace = spaceExp.test(address2);
                            //*──── CHECK ADDRESS2 FOR ABBREVIATIONS ──────────────────────────────────────────────────
                            if (regPat.test(address1) == false && add2UnitPos == false && add2AptPos == false &&
                                add2LotPos == false && add2SuitePos == false && checkForPoBox == false && checkForLoft ==
                                false && checkForBasement == false && checkForSpace == false) {
                                sendEmail = true;

                                // alert(`I got into the check`);
                                try {
                                    let stringApt = 'APT ';
                                    let stringRes = stringApt.concat(address2);
                                    if (stringRes.length <= 29 && stringRes !== '' && stringRes !== ' ') {
                                        csvDataEmpId[i][addr2] = stringRes;
                                        emailBody +=
                                            `\n\n*Address 2 for the Employee with Last Name "${lastName}" was listed as "${address2}". We have uploaded with "APT" as the abbreviation, but please update with appropriate abbreviation before number.`;
                                    } else if (stringRes.length > 29 && stringRes !== '' && stringRes !== ' ') {
                                        let reducedAddress2 = stringRes.slice(0, 29);
                                        csvDataEmpId[i][addr2] = reducedAddress2;
                                        emailBody +=
                                            `\n\n*Address 2 for the Employee with Last Name "${lastName}" was listed as "${address2}" which is longer then 30 characters. We have changed the address to "${reducedAddress2}" and uploaded, but please modify the Address 2 field to less then 30 characters, and provide the appropriate abbreviation in the payroll system before the next payroll.`;
                                    } else {
                                        csvDataEmpId[i][addr2] = address2;
                                    }

                                } catch (err) {

                                    let add2Choice = prompt(
                                        `The address 2 field: ${address2} has errored. ${err}\nDoes not have 'APT' or 'UNIT' in the address 2 field.\nPlease add in either 'UNIT' or 'APT' to the number!`,
                                        `${address2}`);
                                    csvDataEmpId[i][addr2] = add2Choice;
                                }
                            } else if (address2.length > 29) {
                                sendEmail = true;
                                let reducedAddress21 = address2.slice(0, 29);
                                csvDataEmpId[i][addr2] = reducedAddress21;
                                emailBody +=
                                    `\n\n*Address 2 for the Employee with Last Name "${lastName}" was listed as "${address2}" which is longer then 30 characters. We have changed the address to "${reducedAddress21}" and uploaded, but please modify the Address 2 field to less then 30 characters, and provide the appropriate abbreviation in the payroll system before the next payroll.`;
                            }
                        } catch (err) {
                            let address2Err = prompt(
                                `The address 2 field alerted ${err}.\nAddress 2: ${address2}\nPlease correct the address!!!`,
                                `${address2}`);
                            csvDataEmpId[i][addr2] = address2Err;
                        }
                    }
                    //*──── CHECK CITY ────────────────────────────────────────────────────────────────────────
                    try {
                        var cityRegEx = new RegExp(/^\d+$/g);
                        var cityMatch = cityRegEx.test(city);
                        // console.log(`City: ${city}`);
                        // console.log(`cityMatch: ${cityMatch}`);
                        if (regPat.test(address1) == false && cityMatch == true) {
                            sendEmail = true;
                            emailBody +=
                                `\n\n*The City associated with Employee Last Name, "${lastName}" was "${city}" so we have modified the entire address to your companies address. Please update the employees address for the next payroll.`;

                            csvDataEmpId[i][addr1] = empAddress1;
                            csvDataEmpId[i][addr2] = empAddress2;
                            csvDataEmpId[i][cities] = empCity;
                            csvDataEmpId[i][state] = empState;
                            csvDataEmpId[i][zipCode] = empZip;
                        }
                    } catch (err) {
                        alert(`The City: ${city} is showing error ${err}.`);
                    }
                    //*──── CHECK ZIP/POSTALCODE ──────────────────────────────────────────────────────────────
                    try {
                        let postCode = postalCode.toString();
                        let postPattern = new RegExp(/-/g);
                        if (postCode.length > 5 || postPattern.test(postCode) == true) {
                            let newPostCode = postCode.substring(0, 5);
                            let newPostExt = postCode.split('-').pop();
                            csvDataEmpId[i][zipCode] = newPostCode;
                            csvDataEmpId[i][voyaZipExt] = newPostExt;
                        }
                    } catch (err) {
                        alert(`The Zip/Postal Code: ${postalCode} is showing error ${err}`);
                    }
                } catch (err) {
                    alert(`Something went wrong ${err}`)
                }
            }
            //*========================================================================================
            /*                                                                                      *
             *                               TRANSAMERICA CALCULATIONS                              *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'Transamerica') {
                newRehireDate = sftpDateFix(hired, termed, rehired);
                // console.log(`newRehireDate: ${newRehireDate}`);
                csvDataEmpId[i][rehireDate] = newRehireDate;
            }
            //*========================================================================================
            /*                                                                                      *
             *                               JOHN HANCOCK CALCULATIONS                              *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'John Hancock') {
                try {
                    //? Fill Trans #
                    csvDataEmpId[i][jh_TransNum] = '505';
                    //? Fill JH_Country as USA
                    csvDataEmpId[i][jh_Country] = 'USA';
                    //? Calc EEDEF
                    csvDataEmpId[i][jh_Calc_Eedef] =
                        preTaxEE +
                        dollar401k +
                        perct401k +
                        dollar401kCU +
                        perct401kCU +
                        cuPlan1Contrib;
                    //? Concat Last and Suffix
                    let withSpace = lastName.concat(' ');
                    csvDataEmpId[i][jh_last_suffix] = withSpace.concat(suffix);

                    //? Calculate JH_SHMAC
                    csvDataEmpId[i][jh_Calc_Shmac] =
                        qacaMatch +
                        safeHarborMatch_2 +
                        safeHarborMatch_3 +
                        safeHarborMatch_4;
                    //? Calculate JH_ERMAT
                    csvDataEmpId[i][jh_Calc_ermat] =
                        dollar401kMatch +
                        perct401kMatch +
                        dollar401kCUMatch +
                        perct401kCUMatch;
                    //? Calculate JH_EEROT
                    csvDataEmpId[i][jh_Calc_Eerot] =
                        dollarRoth + perctRoth + dollarRothCU + perctRothCU;
                    //? Copy Loan 1 Payment
                    if (loan4 !== 0) {
                        if (loan1 !== 0) {
                            csvDataEmpId[i][kLoan1] = loan1 + loan4;
                            loanK1 = loan1 + loan4
                        } else {
                            csvDataEmpId[i][kLoan1] = loan4;
                            loanK1 = loan4;
                        }
                    } else if (loan7 !== 0) {
                        if (loan1 !== 0) {
                            csvDataEmpId[i][kLoan1] = loan1 + loan7;
                            loanK1 = loan1 + loan7;
                        } else {
                            csvDataEmpId[i][kLoan1] = loan7;
                            loanK1 = loan7;
                        }
                    } else if (loan10 !== 0) {
                        if (loan1 !== 0) {
                            csvDataEmpId[i][kLoan1] = loan1 + loan10;
                            loanK1 = loan1 + loan10;
                        } else {
                            csvDataEmpId[i][kLoan1] = loan10;
                            loanK1 = loan10;
                        }
                    } else {
                        csvDataEmpId[i][kLoan1] = loan1;
                        loanK1 = loan1;
                    }

                    //? Copy Loan 2 Payment
                    //! csvDataEmpId[i][kLoan2] = loan2;
                    if (loan5 !== 0) {
                        if (loan2 !== 0) {
                            csvDataEmpId[i][kLoan2] = loan2 + loan5;
                            loanK2 = loan2 + loan5;
                        } else {
                            csvDataEmpId[i][kLoan2] = loan5;
                            loanK2 = loan5;
                        }
                    } else if (loan8 !== 0) {
                        if (loan2 !== 0) {
                            csvDataEmpId[i][kLoan2] = loan2 + loan8;
                            loanK2 = loan2 + loan8;
                        } else {
                            csvDataEmpId[i][kLoan2] = loan8;
                            loanK2 = loan8;
                        }
                    } else {
                        csvDataEmpId[i][kLoan2] = loan2;
                        loanK2 = loan2;
                    }
                    //? Copy Loan 3 Payment
                    //! csvDataEmpId[i][kLoan3] = loan3;
                    if (loan6 !== 0) {
                        if (loan3 !== 0) {
                            csvDataEmpId[i][kLoan2] = loan3 + loan6;
                            loanK3 = loan3 + loan6;
                        } else {
                            csvDataEmpId[i][kLoan2] = loan6;
                            loanK3 = loan6;
                        }
                    } else if (loan9 !== 0 && loan3 == 0) {
                        if (loan3 !== 0) {
                            csvDataEmpId[i][kLoan2] = loan3 + loan9;
                            loanK3 = loan3 + loan9;
                        } else {
                            csvDataEmpId[i][kLoan2] = loan6;
                            loanK3 = loan6;
                        }
                    } else {
                        csvDataEmpId[i][kLoan3] = loan3;
                        loanK3 = loan3;
                    }
                    //? Fill Combination Record Identifier
                    csvDataEmpId[i][combRecordIdentifier] = 'comb.d';

                    //? Eligibility Indicator and Eligibility Date
                    if (eligDateInd !== 'Yes') {
                        if (jhIsEligible == undefined || jhIsEligible == '' || jhIsEligible == ' ') {
                            csvDataEmpId[i][eligInd] = '';
                            csvDataEmpId[i][jhStaticEligible] = 'Y';
                        } else if (jhIsEligible == 'N') {
                            csvDataEmpId[i][eligInd] = '';
                            csvDataEmpId[i][jhStaticEligible] = jhIsEligible;
                        } else {
                            csvDataEmpId[i][eligInd] = jhIsEligible;
                        }
                    } else {
                        if (jhIsEligible == undefined || jhIsEligible == '' || jhIsEligible == ' ') {
                            csvDataEmpId[i][eligInd] = 'Y';
                            csvDataEmpId[i][jhStaticEligible] = 'Y';
                            if (jhStEligDate == undefined && jhIsEligible == 'Y') {
                                let jhNewEligDate = Date.parse(checkEligibility(birth, hired, termed, 365));
                                // console.log(`jhNewEligDate: ${jhNewEligDate}`);
                                csvDataEmpId[i][jhStaticEligDate] = timestampToStr(jhNewEligDate);
                            }
                        } else if (jhIsEligible == 'N') {
                            csvDataEmpId[i][eligInd] = '';
                            csvDataEmpId[i][jhStaticEligible] = jhIsEligible;
                            if (jhStEligDate == undefined && jhIsEligible == 'Y') {
                                let jhNewEligDate = Date.parse(checkEligibility(birth, hired, termed, 365));
                                // console.log(`jhNewEligDate: ${jhNewEligDate}`);
                                csvDataEmpId[i][jhStaticEligDate] = timestampToStr(jhNewEligDate);
                            }
                        } else {
                            csvDataEmpId[i][eligInd] = 'Y';
                            if (jhStEligDate == undefined && jhIsEligible == 'Y') {
                                let jhNewEligDate = Date.parse(checkEligibility(birth, hired, termed, 365));
                                // console.log(`jhNewEligDate: ${jhNewEligDate}`);
                                csvDataEmpId[i][jhStaticEligDate] = timestampToStr(jhNewEligDate);
                            }
                        }
                    }

                    if (stateRow == 'PR') {
                        csvDataEmpId[i][eligInd] = 'N';
                    }
                    if (empIdNum == 148) {
                        csvDataEmpId[i][jh_Calc_ermat] = '';
                        csvDataEmpId[i][jh_Calc_Shmac] =
                            qacaMatch +
                            safeHarborMatch_2 +
                            safeHarborMatch_3 +
                            safeHarborMatch_4 +
                            dollar401kMatch +
                            perct401kMatch +
                            dollar401kCUMatch +
                            perct401kCUMatch;
                    } else if (empIdNum == 304) {
                        csvDataEmpId[i][compensationYTD] = excl1 + excl2 + excl3 + excl4 + excl5 + excl6 + excl7 +
                            excl8 + excl9 + excl10;
                        csvDataEmpId[i][hoursWorkedYTD] = hours1 + hours2 + hours3 + hours4 + hours5 + hours6 +
                            hours7 + hours8 + hours9 + hours10 + hours11 + hours12 + hours13 + hours14 + hours15 +
                            hours16 + hours17 + hours18 + hours19 + hours20;
                    }
                    try {
                        if (lastName !== undefined && lastName.length > 19) {
                            // console.log(`The last name ${lastName} is ${lastName.length} characters long!`)
                            emailBody +=
                                `\n\n*The Last Name: ${lastName} is too long. We have shortened it to less than 20 characters but please go into your system and update it to less than 20 characters.`;
                            csvDataEmpId[i][last_name] = lastName.slice(19);
                            sendEmail = true;

                        }
                    } catch (err) {
                        alert(`The Last Name ${lastName} is showing undefined.`);
                    }
                    // check for APT and number in address1 and then remove and put in address2


                    if (birth == undefined || birth == '') {
                        sendEmail = true;
                        emailBody +=
                            `\n\n*The Birth Date associated with Employee Last Name, "${lastName}" was "${birth}". We have left the field blank so please update the employees Birth Date before the next payroll.`;

                    }

                    let taxDash = new RegExp(/-/g);
                    let newTaxString = taxIdSsn.toString();
                    let newTaxIdNum;
                    if (taxDash.test(taxIdSsn) == false) {
                        let first3 = newTaxString.slice(0, 3);
                        // console.log(`first3: ${first3}`);
                        let second2 = newTaxString.slice(3, 5);
                        // console.log(`second2: ${second2}`);
                        let last4 = newTaxString.slice(5);
                        // console.log(`last4: ${last4}`);

                        newTaxIdNum = first3.concat('-', second2, '-', last4);
                        // console.log(`newTaxIdNum: ${newTaxIdNum}`)
                    } else {
                        newTaxIdNum = Number(taxIdSsn);
                    }
                    if (loanIds !== undefined) {
                        for (let k = 0; k < loanIds.length; k++) {
                            var element = loanIds[k];
                            var loanId = element.ID
                            var pmt1 = element.Loan_1_PMT;
                            var pmt2 = element.Loan_2_PMT;
                            var pmt3 = element.Loan_3_PMT;
                            var pmt4 = element.Loan_4_PMT;
                            var pmt5 = element.Loan_5_PMT;
                            var pmt6 = element.Loan_6_PMT;
                            var pmt7 = element.Loan_7_PMT;
                            var pmt8 = element.Loan_8_PMT;
                            var pmt9 = element.Loan_9_PMT;
                            var pmt10 = element.Loan_10_PMT;
                            //*──── IF THE TAXID LOADED IN MATCHES A TAX ID FROM THE DATABASE ─────────────────────────
                            if (newTaxIdNum == element.Tax_ID) {
                                //*──── CHECK IF THE FIRST LOAN AMOUNT MATCHES ANY OF THE PAYMENTS IN THE DATABASE ────────
                                if (loanK1 == pmt1) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_1_ID;
                                } else if (loanK1 == pmt2) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_2_ID;
                                } else if (loanK1 == pmt3) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_3_ID;
                                } else if (loanK1 == pmt4) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_4_ID;
                                } else if (loanK1 == pmt5) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_5_ID;
                                } else if (loanK1 == pmt6) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_6_ID;
                                } else if (loanK1 == pmt7) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_7_ID;
                                } else if (loanK1 == pmt8) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_8_ID;
                                } else if (loanK1 == pmt9) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_9_ID;
                                } else if (loanK1 == pmt10) {
                                    csvDataEmpId[i][firstLoan] = element.Loan_10_ID;
                                } else if (loanK1 !== 0) {
                                    let ID1Loan = prompt(
                                        `The loan payment ($${loanK1}) for the employee with last name ${lastName} does not match any in the database.\nPlease add the correct loan ID for the participant.`);
                                    csvDataEmpId[i][firstLoan] = ID1Loan;

                                    // postLoanId(id, newTaxIdNum, 'Loan_1_ID', ID1Loan, 'Loan_1_PMT', loanK1)
                                }

                                if (loanK2 == pmt1) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_1_ID;
                                } else if (loanK2 == pmt2) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_2_ID;
                                } else if (loanK2 == pmt3) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_3_ID;
                                } else if (loanK2 == pmt4) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_4_ID;
                                } else if (loanK2 == pmt5) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_5_ID;
                                } else if (loanK2 == pmt6) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_6_ID;
                                } else if (loanK2 == pmt7) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_7_ID;
                                } else if (loanK2 == pmt8) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_8_ID;
                                } else if (loanK2 == pmt9) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_9_ID;
                                } else if (loanK2 == pmt10) {
                                    csvDataEmpId[i][secondLoan] = element.Loan_10_ID;
                                } else if (loanK2 !== 0) {
                                    let ID2Loan = prompt(
                                        `The loan payment ($${loanK2}) for the employee with last name ${lastName} does not match any in the database.\nPlease add the correct loan ID for the participant.`);
                                    csvDataEmpId[i][secondLoan] = ID2Loan;
                                }


                                if (loanK3 == pmt1) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_1_ID;
                                } else if (loanK3 == pmt2) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_2_ID;
                                } else if (loanK3 == pmt3) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_3_ID;
                                } else if (loanK3 == pmt4) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_4_ID;
                                } else if (loanK3 == pmt5) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_5_ID;
                                } else if (loanK3 == pmt6) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_6_ID;
                                } else if (loanK3 == pmt7) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_7_ID;
                                } else if (loanK3 == pmt8) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_8_ID;
                                } else if (loanK3 == pmt9) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_9_ID;
                                } else if (loanK3 == pmt10) {
                                    csvDataEmpId[i][thirdLoan] = element.Loan_10_ID;
                                } else if (loanK3 !== 0) {
                                    let ID3Loan = prompt(
                                        `The loan payment ($${loanK3}) for the employee with last name ${lastName} does not match any in the database.\nPlease add the correct loan ID for the participant.`);
                                    csvDataEmpId[i][thirdLoan] = ID3Loan;
                                }
                            }
                        }
                    }
                } catch (err) {
                    alert(`John Hancock Error:\n${err}`);
                }
            }
            //*========================================================================================
            /*                                                                                      *
             *                            VANGUARD-ASCENSUS CALCULATIONS                            *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'Vanguard-Ascensus') {
                try {
                    let newEligDate = checkEligibility(birth, hired, termed, 60);
                    let stringDate = JSON.stringify(newEligDate)
                    let regExEligDate = stringDate.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
                    let dateToJson = JSON.parse(regExEligDate);
                    csvDataEmpId[i][eeEligibilityDate] = dateToJson;
                } catch (err) {
                    alert(`Vanguard Error:\n${err}`);
                }

            }
            //*========================================================================================
            /*                                                                                      *
             *                                   VOYA CALCULATIONS                                  *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'Voya') {
                try {
                    //Zip Extension
                    let postCode = postalCode.toString();
                    let postPattern = new RegExp(/-/g);
                    if (postCode.length > 5 || postPattern.test(postCode) == true) {
                        let newPostCode = postCode.substring(0, 5);
                        let newPostExt = postCode.split('-').pop();
                        csvDataEmpId[i][zipCode] = newPostCode;
                        csvDataEmpId[i][voyaZipExt] = newPostExt;

                    }
                    //? Contribution Amount Source #1
                    csvDataEmpId[i][eePreTaxContr1] = preTaxEE +
                        dollar401k +
                        perct401k +
                        dollar401kCU +
                        perct401kCU;
                    //? Contribution Amount Source #2
                    csvDataEmpId[i][eePreTaxContr2] =
                        dollar401kMatch +
                        perct401kMatch +
                        dollarRothMatch +
                        perctRothMatch +
                        dollar401kCUMatch +
                        perct401kCUMatch +
                        dollarRothCUMatch +
                        perctRothCUMatch;
                    //? Contribution Amount Source #3
                    csvDataEmpId[i][eePreTaxContr3] = ERPS;
                    //? Contribution Amount Source #4
                    csvDataEmpId[i][postTaxContr1] =
                        dollarRoth + perctRoth + dollarRothCU + perctRothCU;
                    //? Contribution Amount Source #5
                    csvDataEmpId[i][postTaxContr2] =
                        erSHNonMatch + erQacNonElective;
                    //? Contribution Amount Source #6
                    csvDataEmpId[i][postTaxContr3] =
                        qacaMatch +
                        safeHarborMatch_2 +
                        safeHarborMatch_3 +
                        safeHarborMatch_4;
                    //? Source Code 1
                    csvDataEmpId[i][eePreTaxPlan1] = 'A';
                    //? Source Code 2
                    csvDataEmpId[i][eePreTaxPlan2] = 'D';
                    //? Source Code 3
                    csvDataEmpId[i][eePreTaxPlan3] = 'F';
                    //? Source Code 4
                    csvDataEmpId[i][postTaxPlan1] = 'G';
                    //? Source Code 5
                    csvDataEmpId[i][postTaxPlan2] = 'W';
                    //? Source Code 6
                    csvDataEmpId[i][postTaxPlan3] = 'X';
                    //? Record Type
                    csvDataEmpId[i][voya_RecordType] = 'INGWIN6';
                    //? Fill Voya_IRSCode with "401k"
                    csvDataEmpId[i][voya_IrsCode] = '401k';
                    //? Fill Location with "1"
                    if (empIdNum == 15 || empIdNum == 225 || empIdNum == 281 || empIdNum == 235 || empIdNum == 256) {
                        csvDataEmpId[i][location] = '1';
                    } else if (empIdNum == 228) {
                        csvDataEmpId[i][location] = '1001';
                    }
                    //? Contract Number
                    // console.log('the record keeper is Voya so I am in the recordKeeper check');
                    csvDataEmpId[i][voyaEmpId] = contractNum;

                    if (empIdNum == 281 || empIdNum == 228) {
                        csvDataEmpId[i][payFreq] = 6;
                    } else {
                        switch (payFrequency) {
                            case 'Weekly':
                                csvDataEmpId[i][payFreq] = 7;
                                break;
                            case 'Bi-weekly':
                                csvDataEmpId[i][payFreq] = 6;
                                break;
                            case 'Semi-monthly':
                                csvDataEmpId[i][payFreq] = 5;
                                break;
                            case '24':
                                csvDataEmpId[i][payFreq] = 5;
                                break;
                            default:
                                csvDataEmpId[i][payFreq] = payFrequency;
                                break;
                        }
                    }

                    switch (employeeStat) {
                        case 'Active':
                            csvDataEmpId[i][employeeStatus] = 'A';
                            break;
                        case 'A':
                            csvDataEmpId[i][employeeStatus] = 'A';
                            break;
                        case 'Terminated':
                            csvDataEmpId[i][employeeStatus] = 'T';
                            break;
                        case 'T':
                            csvDataEmpId[i][employeeStatus] = 'T';
                            break;
                        case 'Resigned':
                            csvDataEmpId[i][employeeStatus] = 'T';
                            break;
                        case 'Disability':
                            csvDataEmpId[i][employeeStatus] = 'D';
                            break;
                        case 'D':
                            csvDataEmpId[i][employeeStatus] = 'D';
                            break;
                        case 'LOA':
                            csvDataEmpId[i][employeeStatus] = 'L';
                            break;
                        case 'L':
                            csvDataEmpId[i][employeeStatus] = 'L';
                            break;
                        case 'Military LOA':
                            csvDataEmpId[i][employeeStatus] = 'M';
                            break;
                        case 'Temporary Layoff':
                            csvDataEmpId[i][employeeStatus] = 'O';
                            break;
                        case 'Retired':
                            csvDataEmpId[i][employeeStatus] = 'R';
                            break;
                        case 'Suspended':
                            csvDataEmpId[i][employeeStatus] = 'S';
                            break;
                        case 'Deceased':
                            csvDataEmpId[i][employeeStatus] = 'X';
                            break;
                        default:
                            csvDataEmpId[i][employeeStatus] = 'A';
                            break;
                    }
                } catch (err) {
                    alert(`Voya Error:\n${err}`);
                }

            }

            //*========================================================================================
            /*                                                                                      *
             *                                        EMPOWER                                       *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'Empower') {
                try {
                    //? Copy Loan Values
                    csvDataEmpId[i][emp_calc_amt9] = loan1;
                    //? Copy Loan 2 Values
                    csvDataEmpId[i][emp_calc_amt10] = loan2;
                    //? Ending Payroll Date Fill
                    csvDataEmpId[i][payEndDate] = payrollDate;
                    //? Salary Amount Qualifier (Bi-Weekly)
                    csvDataEmpId[i][emp_salaryAmtQualifier] = 'B';
                    //? Assign Division Name
                    // console.log(`divisionName: ${divisionName}`)
                    switch (anotherDivision) {
                        case '0Q286':
                            csvDataEmpId[i][firstDivision] = 1;
                            break;
                        case '0Q287':
                            csvDataEmpId[i][firstDivision] = 2;
                            break;
                        case '0Q288':
                            csvDataEmpId[i][firstDivision] = 3;
                            break;
                        case '0T329':
                            csvDataEmpId[i][firstDivision] = 4;
                            break;
                    }
                } catch (err) {
                    alert(`Empower Error:\n${err}`);
                }

            }
            //*========================================================================================
            /*                                                                                      *
             *                                         CUNA                                         *
             *                                                                                      */
            //*========================================================================================

            if (recordKeeper == 'CUNA Mutual') {
                try {
                    csvDataEmpId[i][statusChangeReason] = getStatusChange(hired, termed, rehired)
                    if (employeeStat == undefined || employeeStat == '') {
                        if (termed == undefined || termed == '') {
                            csvDataEmpId[i][employeeStatus] = "";
                        } else {
                            csvDataEmpId[i][employeeStatus] = "1";
                        }
                    }
                } catch (err) {
                    alert(`Cuna error:\n${err}`)
                }

            }
            if (isMultiDivision.toUpperCase() == 'YES' && divisionName !== undefined) {
                let divisionArray = divisionToAscLocation(divisionName, ascLocation);
                if (divisionName !== undefined) {
                    csvDataEmpId[i][division] = divisionArray[0];
                    csvDataEmpId[i][location] = divisionArray[1];
                    csvDataEmpId[i][ascLocal] = divisionArray[1];
                } else {
                    csvDataEmpId[i][ascLocal] = 1;
                }
            } else {
                csvDataEmpId[i][ascLocal] = 1;
            }

            try {
                let newPostal = postalCode.toString();
                if (newPostal.length < 5) {
                    let newZip = newPostal.pad('0', 5);
                    csvDataEmpId[i][zipCode] = newZip;
                }
            } catch (err) {
                alert(`Postal Code is "UNDEFINED" Please check if there is a totals row!\n\n${err}`)
            }

            if (termed < hired) {
                csvDataEmpId[i][termDate] = '';
            }

            // not sure why I have this here will have to check at a later time.
            // console.log(`rehired instanceof: ${rehired instanceof Date}`);
            // csvDataEmpId[i][rehireDate] = rehired instanceof Date ? rehired : '';

            csvDataEmpId[i][calcComplete] = 'Completed';
        }
    }

    iterateRows();

    var urlEmail = encodeURI(emailBody);
    var urlSubject = encodeURI(emailSubject);

    if (sendEmail == true) {
        download(`Email_Body_For_${empName}.doc`, emailBody)

        //!──── THE MAILTO IS NOT CURRENTLY WORKING ON SITE ───────────────────────────────────────
        // window.open(
        //     `mailto:test@example.com?cc=andy.molzahn@316fiduciaries.com;sue.perry@316fiduciaries.com&subject=${emailSubject}&body=${urlEmail}`
        //     );

    }

    var filteredArr = filterArr(csvOutputTemp, taxIdKeyName);

    // Calling the above function
    var tempOut1 = filterByDifference(filteredArr, csvOutputTemp, taxIdKeyName);
    var tempOut2 = filterByDifference(tempOut1, csvOutputTemp, taxIdKeyName);
    finalFilteredVal = tempOut2; // Debug                        

    // Show duplicates output field if any are found
    // var strFilteredArr = [];
    if (tempOut2.length > 0) {
        duplicatesDisplayElem.innerHTML = json2table(tempOut2, 'table');
    } else {
        duplicatesDisplayElem.innerText = 'No duplicates were found in this file';
    }
    /* End of duplicates search and display */



    //? Unparsing JSON object back to CSV
    var csvOut = Papa.unparse({
        fields: employerConfigCsv, //*array of headers
        data: csvDataEmpId,
        config: unparseConfig
    })

    fileOutDisplayArea.innerText = csvOut;
    $(".loader").css("display", "none");

    //Old download
    // download("FO Payroll Report - Igor Upload - " + decodeURI(empName) + ".csv", csvOut);

    //?New Download Using Blob
    download("FO Payroll Report - Igor Upload - " + decodeURI(empName) + ".csv", csvOut);

}
var do_file = (function () {
    //!THIS PART OF THE FILE UPLOAD IS NOT CURRENTLY USED
    // var rABS = typeof FileReader !== "undefined" && (FileReader.prototype || {}).readAsBinaryString;
    // var domrabs = document.getElementsByName("userabs")[0];
    // if (!rABS) domrabs.disabled = !(domrabs.checked = false);
    // var use_worker = typeof Worker !== 'undefined';
    // var domwork = document.getElementsByName("useworker")[0];
    // if (!use_worker) domwork.disabled = !(domwork.checked = false);
    // var xw = function xw(data, cb) {
    //     var worker = new Worker(XW.worker);
    //     worker.onmessage = function (e) {
    //         switch (e.data.t) {
    //             case 'ready': break;
    //             case 'e': console.error(e.data.d); break;
    //             case XW.msg: cb(JSON.parse(e.data.d)); break;
    //         }
    //     };
    //     worker.postMessage({ d: data, b: rABS ? 'binary' : 'array' });
    // };
    return function do_file(files) {
        // rABS = domrabs.checked;
        // use_worker = domwork.checked;
        var f = files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            if (typeof console !== 'undefined') console.log("onload", new Date());
            var data = e.target.result;
            data = new Uint8Array(data);

            process_wb(X.read(data, {
                cellDates: true
            }), loanIds);
        };

        // if (rABS) reader.readAsBinaryString(f);
        // else 
        reader.readAsArrayBuffer(f);
    };
})();

(function () {
    var drop = document.getElementById('drop');
    if (!drop.addEventListener) return;

    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        // do_file(e.dataTransfer.files);
        var files = e.dataTransfer.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;
                //var wb = XLSX.read(data, {type: 'binary'});
                var arr = String.fromCharCode.apply(null, new Uint8Array(data));
                var wb = XLSX.read(btoa(arr), {
                    cellDates: true
                });
                process_wb(wb, loanIds);

            };
            //reader.readAsBinaryString(f);
            reader.readAsArrayBuffer(f);
        }
    }

    function handleDragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    drop.addEventListener('dragenter', handleDragover, false);
    drop.addEventListener('dragover', handleDragover, false);
    drop.addEventListener('drop', handleDrop, false);
})();
(function () {
    var xlf = document.getElementById('xlf');
    if (!xlf.addEventListener) return;

    function handleFile(e) {
        do_file(e.target.files);
    }
    xlf.addEventListener('change', handleFile, false);
})();


//*──── Function to retrieve mapping from server ──────────────────────────────────────────

function getMapById(id, callback) {
    $.ajax({
            type: 'GET',
            url: `${URL}/api/getMap?companyID=${id}`,
            dataType: 'json',
            contentType: 'application/json',

        })
        .done(function (response) {

            // console.log('I got here')
            // console.log(response)
            // console.log(response._id);
            employerConfigCsv = Object.values(response);
            employerConfigCsv.splice(0, 3)
            employerConfigCsv.splice(295)
            // console.log(employerConfigCsv)

            return employerConfigCsv;

        })
        .fail(function (err) {
            alert(`There was an error: ${err}`);
        })
};

//*──── FUNCTION TO RETRIEVE LOAN IDs ─────────────────────────────────────────────────────
function getLoanIds(id, callback) {
    $.ajax({
            type: 'GET',
            url: `https://loanandchangestest.azurewebsites.net/loans/ids?id=${id}`,
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        })
        .done(function (response) {

            // console.log('I got here')
            // console.log(response);
            // console.log(typeof response);
            // console.log(`response[0]: ${response[0]}`);
            // console.log(`Object.keys: ${Object.keys(response[0])}`);
            loanIds = response;
            // console.log(`loanId: ${loanId}`);
            // console.log(`loanIds: ${loanIds}`);
            // console.log(`typeOf loanIds: ${typeof loanIds}`);

            return loanIds;
        })
        .fail(function (err) {
            alert(`There was an error: ${err[0]}`);
        })
}

function postLoanId(id, taxId, idLoc, idNum, pmtLoc, amount) {
    postJson = {
        id: id,
        taxId: taxId,
        idLoc: idLoc,
        idNum: idNum,
        pmtLoc: pmtLoc,
        amt: amount
    }
    $.ajax({
            //https://loanandchangestest.azurewebsites.net/loans/upload/id
            type: 'PUT',
            url: `https://loanandchangestest.azurewebsites.net/loans/upload/update?id=${id}`,
            data: JSON.stringify(postJson),
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        })
        .done(function (response) {

            // console.log('I got here')
            // console.log(response);
            // console.log(typeof response);
            // console.log(`response[0]: ${response[0]}`);
            // console.log(`Object.keys: ${Object.keys(response[0])}`);
            loanIds = response;
            // console.log(`loanId: ${loanId}`);
            // console.log(`loanIds: ${loanIds}`);
            // console.log(`typeOf loanIds: ${typeof loanIds}`);

            return loanIds;
        })
        .fail(function (err) {
            alert(`There was an error: ${err[0]}`);
        })
}

//*──── Function to automatically export the converted data as a file - called on conversion 
function download(filename, data) {
    var csvData = new Blob([data], {
        type: 'text/csv;charset=utf-8;'
    });
    //IE11 & Edge
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, filename);
    } else {
        //In FF link must be added to DOM to be clicked
        var lnk = document.createElement('a');
        var url = window.URL;
        var objectURL;

        lnk.download = filename || 'untitled';
        lnk.href = objectURL = url.createObjectURL(csvData);
        lnk.dispatchEvent(new MouseEvent('click'));
        setTimeout(url.revokeObjectURL.bind(url, objectURL));
    }
}

//*──── FUNCTION TO ABBREVIATE STATE NAMES ────────────────────────────────────────────────
function convert_state(title, to) {
    var titleName = title.trim();
    var name = titleName.toUpperCase();
    var states = new Array({
        'name': 'Alabama',
        'abbrev': 'AL'
    }, {
        'name': 'Alaska',
        'abbrev': 'AK'
    }, {
        'name': 'Arizona',
        'abbrev': 'AZ'
    }, {
        'name': 'Arkansas',
        'abbrev': 'AR'
    }, {
        'name': 'California',
        'abbrev': 'CA'
    }, {
        'name': 'Colorado',
        'abbrev': 'CO'
    }, {
        'name': 'Connecticut',
        'abbrev': 'CT'
    }, {
        'name': 'Delaware',
        'abbrev': 'DE'
    }, {
        'name': 'Florida',
        'abbrev': 'FL'
    }, {
        'name': 'Georgia',
        'abbrev': 'GA'
    }, {
        'name': 'Hawaii',
        'abbrev': 'HI'
    }, {
        'name': 'Idaho',
        'abbrev': 'ID'
    }, {
        'name': 'Illinois',
        'abbrev': 'IL'
    }, {
        'name': 'Indiana',
        'abbrev': 'IN'
    }, {
        'name': 'Iowa',
        'abbrev': 'IA'
    }, {
        'name': 'Kansas',
        'abbrev': 'KS'
    }, {
        'name': 'Kentucky',
        'abbrev': 'KY'
    }, {
        'name': 'Louisiana',
        'abbrev': 'LA'
    }, {
        'name': 'Maine',
        'abbrev': 'ME'
    }, {
        'name': 'Maryland',
        'abbrev': 'MD'
    }, {
        'name': 'Massachusetts',
        'abbrev': 'MA'
    }, {
        'name': 'Michigan',
        'abbrev': 'MI'
    }, {
        'name': 'Minnesota',
        'abbrev': 'MN'
    }, {
        'name': 'Mississippi',
        'abbrev': 'MS'
    }, {
        'name': 'Missouri',
        'abbrev': 'MO'
    }, {
        'name': 'Montana',
        'abbrev': 'MT'
    }, {
        'name': 'Nebraska',
        'abbrev': 'NE'
    }, {
        'name': 'Nevada',
        'abbrev': 'NV'
    }, {
        'name': 'New Hampshire',
        'abbrev': 'NH'
    }, {
        'name': 'New Jersey',
        'abbrev': 'NJ'
    }, {
        'name': 'New Mexico',
        'abbrev': 'NM'
    }, {
        'name': 'New York',
        'abbrev': 'NY'
    }, {
        'name': 'North Carolina',
        'abbrev': 'NC'
    }, {
        'name': 'North Dakota',
        'abbrev': 'ND'
    }, {
        'name': 'Ohio',
        'abbrev': 'OH'
    }, {
        'name': 'Oklahoma',
        'abbrev': 'OK'
    }, {
        'name': 'Oregon',
        'abbrev': 'OR'
    }, {
        'name': 'Pennsylvania',
        'abbrev': 'PA'
    }, {
        'name': 'Rhode Island',
        'abbrev': 'RI'
    }, {
        'name': 'South Carolina',
        'abbrev': 'SC'
    }, {
        'name': 'South Dakota',
        'abbrev': 'SD'
    }, {
        'name': 'Tennessee',
        'abbrev': 'TN'
    }, {
        'name': 'Texas',
        'abbrev': 'TX'
    }, {
        'name': 'Utah',
        'abbrev': 'UT'
    }, {
        'name': 'Vermont',
        'abbrev': 'VT'
    }, {
        'name': 'Virginia',
        'abbrev': 'VA'
    }, {
        'name': 'Washington',
        'abbrev': 'WA'
    }, {
        'name': 'West Virginia',
        'abbrev': 'WV'
    }, {
        'name': 'Wisconsin',
        'abbrev': 'WI'
    }, {
        'name': 'Wyoming',
        'abbrev': 'WY'
    });
    var returnthis = false;
    $.each(states, function (index, value) {
        if (to == 'name') {
            if (value.abbrev == name) {
                returnthis = value.name;
                return false;
            }
        } else if (to == 'abbrev') {
            if (value.name.toUpperCase() == name) {
                returnthis = value.abbrev;
                return false;
            }
        }
    });
    return returnthis;
}
//*──── Function to add salary hours to payroll hours field ───────────────────────────────
checkIfSalary = function (hired, termed, rehired, payrollHours) {
    var payPrdHours;
    if (payrollHours == '' || payrollHours == 0 || payrollHours == undefined) {
        if (termed == '' || rehired !== '') {
            payPrdHours = $("#ckBox input[type='radio']:checked").val();

            // console.log(csvDataEmpId[i][payrollHrs]);
        } else {
            payPrdHours = payrollHours;
        }
    } else {
        payPrdHours = payrollHours;
    }
    return payPrdHours;
}

//*──── GETTING MIDDLE INITIAL VALUE ──────────────────────────────────────────────────────
//? Taking only the first character of the middle name to populate the M.I. field
middleNameFunc = function (middleNme) {
    var middleInit = '';
    if (middleNme === undefined) {
        // console.log('Middle Name: ' + middleNme);
        return middleInit;
    } else {
        if (middleNme.length < 2 && middleNme !== undefined) {
            middleInit = middleNme.substring(0, 1);
            return middleInit;
        } else {
            middleInit = middleNme.substring(0, 1);
            return middleInit;
        }
    }
}
//// END Getting Middle Initial Value ////

//*──── Check taxId length and if less than 9 put in the correct amount of zeros ──────────
taxIdLength = function (taxIdSsn) {
    var zero = '0';
    let taxString = taxIdSsn.toString();
    let newTaxId;
    if (taxIdSsn === undefined) {
        newTaxId = taxIdSsn;
        // console.log(`undefined Tax ID: ${newTaxId}`);
        return newTaxId;
    } else {
        // console.log('I am in the else of the tax id func');
        if (taxString.length <= 7) {
            newTaxId = `${zero}${zero}${taxString}`
            // console.log(newTaxId);
            // return newTaxId;
        } else if (taxString.length < 9) {
            newTaxId = `${zero}${taxString}`
            // console.log(newTaxId);
            // return newTaxId;
        } else {
            newTaxId = taxString;
            // console.log(`I am in the other else taxId: ${newTaxId}`);
        }
        return newTaxId;
    }
}
//*──── Check if a term date is older than 90 days - expects a date in the format 'MM/DD/YYYY' or 'YYYY/MM/DD' and will handle empty strings 
checkTermDate = function (testDate, reDate) {
    // console.log(`testDate: ${testDate}`);
    // console.log(`reDate: ${reDate}`);
    let tDate = undefined ? testDate = '' : Date.parse(testDate);
    let rDate = undefined ? reDate = '' : Date.parse(reDate);
    if (tDate == '') {
        return true;
    } else if (rDate !== undefined && rDate > tDate) {
        return true;
    } else {
        let inputDate = Date.parse(testDate); // Parsing the date from the payroll file
        // console.log(`inputDate: ${inputDate}`);
        let todayMinus90 = Date.parse(new Date(new Date().setDate(new Date().getDate() -
            90))); // Getting the date from 90 days ago and converting to same format
        // console.log(`todayMinus90: ${todayMinus90}`);
        return (tDate < todayMinus90 ? false : true);
    }
}

removeOldTermsFunc = function (employerArr, csvArr) { // This function removes the dates
    let termFilteredArr = [];
    let termDateFieldName = employerArr[25]; // Getting the name of this client's termination date field
    let rehireDate = employerArr[26];
    for (i = 0; i < csvArr.length; i++) {
        // console.log(`checkTermDate: ${checkTermDate(csvArr[i][termDateFieldName], csvArr[i][rehireDate])}`)
        let termDateF = csvArr[i][termDateFieldName];
        let rehireDa = csvArr[i][rehireDate];
        if (checkTermDate(termDateF, rehireDa) == true) {
            termFilteredArr.push(csvArr[i]);

        }
    }
    return termFilteredArr;
}

//*──── FUNCTION TO REMOVE TOTALS ROW IF THERE IS ONE ─────────────────────────────────────
removeTotalsRow = function (employerArr, csvArr) {
    let newFilterArr = [];
    let totalSignal = false;
    for (let j = 0; j < csvArr.length; j++) {
        // console.log(`csvArr[j]: ${csvArr[j]}`)
        for (let i = 0; i < employerArr.length; i++) {
            let employerLoc = employerArr[i];
            // console.log(`employerLoc: ${employerLoc} = ${csvArr[j][employerLoc]}`);
            // console.log(`typeof csvArr[j][employerLoc]: ${typeof csvArr[j][employerLoc]}`)
            if (csvArr[j][employerLoc] == 'Totals' ||
                csvArr[j][employerLoc] == 'Total') {
                totalSignal = true;
            }
        }
        // console.log(`totalSignal ${totalSignal}`);
        if (totalSignal == false) {
            newFilterArr.push(csvArr[j]);
        } else {
            totalSignal = false;
        }
    }
    // console.log(`newFilterArr: ${newFilterArr}`)
    return newFilterArr;
}

//*──── this function ensures single digit numbers are given a leading 0 ──────────────────
fillZero = function (num) {
    return num < 10 ? '0' + num : num;
}

//*──── converting timestamp back to string in the format MM/DD/YYYY ──────────────────────
timestampToStr = function (ts) {
    let timeStamp = ts;
    let tsObj = new Date(timeStamp);
    let month = tsObj.getMonth() + 1; // months returned using starting index of 0
    let day = tsObj.getDate() + 1;
    let year = tsObj.getFullYear();
    let dateString = fillZero(month) + '/' + fillZero(day) + '/' + year;
    return dateString;
}

//*──── DETERMINE EMPLOYEE STATUS ─────────────────────────────────────────────────────────
//? Accepts three dates as input: hire date, term date and rehire date ('MM/DD/YYYY' or 'YYYY/MM/DD')
//? Returns an array of two values: [ <employee status>, <employee status date> ]
determineEmpStatus = function (hire, term, rehire, checkdate) {
    let hired = Date.parse(hire);
    // console.log(`Hired Date: ${hired}`);
    let termed = Date.parse(term);
    // console.log(`Term Date: ${termed}`);
    let rehired = Date.parse(rehire);
    // console.log(`Rehire Date: ${rehired}`);
    let check = Date.parse(checkdate);
    let results = [];
    if (Number.isNaN(hired) && Number.isNaN(termed) && Number.isNaN(
            rehired)) { // Date.parse on non-dates = NaN
        //console.log('No status dates were found');
        results = ['', '']; // returning empty values if no dates are provided
        return results;
    } else if (Number.isNaN(hired) == false && Number.isNaN(termed) == true && Number.isNaN(rehired) ==
        true) {
        results = ['A', timestampToStr(hired)];
        return results;
    } else if (Number.isNaN(hired) == false && Number.isNaN(termed) == false && Number.isNaN(rehired) ==
        true) {
        results = ['T', timestampToStr(termed)];
        return results;
    } else if (Number.isNaN(hired) == false && Number.isNaN(termed) == true && Number.isNaN(rehired) ==
        false) {
        results = ['A', timestampToStr(rehired)];
        return results;
    } else if (Number.isNaN(hired) == false && Number.isNaN(termed) == false && Number.isNaN(rehired) ==
        false) {
        if (termed > rehired) {
            // console.log('I made it here!')
            results = ['T', timestampToStr(termed)];
            return results;
        } else if (termed < rehired) {
            results = ['A', timestampToStr(rehired)];
            return results;
        } else if (hired < rehired) {
            results = ['A', timestampToStr(rehired)];
            return results;
        } else {
            results = ['A', timestampToStr(rehired)];
            return results;
        }
    } else {
        results = ['A', timestampToStr(check)];
        return results;
    }
}

//*Function to fix rehire date if the term date is greater.
sftpDateFix = function (hire, term, rehire) {
    let hire2 = Date.parse(hire);
    let term2 = Date.parse(term);
    let rehire2 = Date.parse(rehire);
    // console.log(`rehire: ${rehire}`)
    let answer;
    if (rehire == undefined || rehire == '' || term2 > rehire2) {
        answer = '';
    } else {
        answer = timestampToStr(rehire2);
    }
    return answer;
}

capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// To be moved later!
json2table = function (json, classes) {
    var cols = Object.keys(json[0]);
    var headerRow = '';
    var bodyRows = '';
    classes = classes || '';

    cols.map(function (col) {
        headerRow += `<th>${capitalizeFirstLetter(col)}</th>`;
    });
    json.map(function (row) {
        bodyRows += '<tr>';
        cols.map(function (colName) {

            bodyRows += `<td>${row[colName]}</td>`;
        })
        bodyRows += '</tr>';
    });
    return `<table style="font-size:10pt;" class="${classes}">
                                        <thead>
                                            <tr>${headerRow}</tr>
                                        </thead>
                                        <tbody>
                                            ${bodyRows}
                                        </tbody>
                                    </table>`;


}

//*──── CHECK IF THERE ARE DIFFERENCES ────────────────────────────────────────────────────
//? Although the filteredArr variable should contain at least one row of each of the duplicated entries, it is not all inclusive
//? As a result, we need to create a difference array based on those values - then finally find the reverse as our result
filterByDifference = function (array1, array2, compareField) {
    var onlyInA = differenceInFirstArray(array1, array2, compareField);
    var onlyInb = differenceInFirstArray(array2, array1, compareField);
    return onlyInA.concat(onlyInb);
}
differenceInFirstArray = function (array1, array2, compareField) {
    return array1.filter(function (current) {
        return array2.filter(function (current_b) {
            return current_b[compareField] === current[compareField];
        }).length == 0;
    });
}

filterArr = function (csvOut, taxKey) {
    let filtArr = [];
    for (var i = 0; i < csvOut.length; i++) {
        for (var n = i + 1; n < csvOut.length; n++) {
            if (csvOut[i][taxKey] == csvOut[n][taxKey]) {
                filtArr.push(csvOut[n]);
            }
        }
    }
    return filtArr;
}

//*──── CHECK THE ELIGIBILITY FOR VANGUARD ────────────────────────────────────────────────

getFirstDateOfMonth = function (date) {
    const now = new Date(date);
    return new Date(now.getFullYear(), now.getMonth());
}
getLastDateOfMonth = function (date) {
    let newDate = new Date(date);
    let y = newDate.getFullYear();
    let m = newDate.getMonth();
    let lastDay = new Date(y, m + 1, 0);
    return lastDay;
}

addDays = function (date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

getAge = function (dateString) {
    let today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
checkEligibility = function (birth, hired, termed, days) {
    let today = new Date();
    let eligDate;
    let dayPlus60 = new Date(addDays(hired, days));
    let bDay = getAge(birth);
    let firstDayOfMonth = new Date(getFirstDateOfMonth(dayPlus60));
    let lastDayOfMonth = new Date(getLastDateOfMonth(dayPlus60));
    let firstOfNewMonth = new Date(addDays(lastDayOfMonth, 1));
    if (bDay >= 21 && dayPlus60 <= today) {
        // console.log('I am in the bday greater than 21')
        // console.log(`bday: ${bDay}`)
        if (dayPlus60 !== firstDayOfMonth) {
            eligDate = firstOfNewMonth;
        } else {
            eligDate = dayPlus60;
        }
    } else if (dayPlus60 >= today && bDay < 21) {
        // console.log('I am in the bday less than 21')
        // console.log(`bday: ${bDay}`)
        var when21 = new Date(new Date(birth).setFullYear(new Date(birth).getFullYear() + 21));
        var firstOfbDayMonth = new Date(getFirstDateOfMonth(when21));
        var lastDayOfbDayMonth = new Date(getLastDateOfMonth(when21));
        var firstOfMonthAftbDay = new Date(addDays(lastDayOfbDayMonth, 1));
        if (when21.getTime() !== firstOfbDayMonth.getTime()) {
            eligDate = firstOfMonthAftbDay;

        } else {

            eligDate = when21;
        }
    } else {
        eligDate = firstOfNewMonth;
    }
    return eligDate;
}
getStatusChange = function (hired, termed, rehired) {
    let hire = new Date(hired);
    // console.log(`Hire Date: ${hire}`);
    let term = new Date(termed);
    // console.log(`term Date: ${term}`)
    let rehire = new Date(rehired);
    // console.log(`rehire Date: ${rehire}`)
    let result;
    if (hire !== undefined && term !== undefined) {
        if (rehire !== undefined && rehire > term) {
            result = '';
        } else if (term > hire || term > rehire) {
            result = 1;
        }
    } else {
        // console.log('in the else statement');
        result = '';
    }
    // console.log(`This is the Result: ${result}`);
    return result;
}
divisionToAscLocation = function (division, ascLoc) {
    let result = [];
    if (division.toUpperCase() == 'A') {
        result = ['A', 1];
    } else if (division.toUpperCase() == 'B') {
        result = ['B', 2];
    } else if (division.toUpperCase() == 'C') {
        result = ['C', 3];
    } else {
        result = ['D', ascLoc];
    }
    return result;
}


function clamp_range(range) {
    if (range.e.r >= (1 << 20)) range.e.r = (1 << 20) - 1;
    if (range.e.c >= (1 << 14)) range.e.c = (1 << 14) - 1;
    return range;
}

var crefregex = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;

/*
	deletes `nrows` rows STARTING WITH `start_row`
	- ws         = worksheet object
	- start_row  = starting row (0-indexed) | default 0
	- nrows      = number of rows to delete | default 1
*/

function delete_rows(ws, start_row, nrows) {
    if (!ws) throw new Error("operation expects a worksheet");
    var dense = Array.isArray(ws);
    if (!nrows) nrows = 1;
    if (!start_row) start_row = 0;

    /* extract original range */
    var range = XLSX.utils.decode_range(ws["!ref"]);
    var R = 0,
        C = 0;

    var formula_cb = function ($0, $1, $2, $3, $4, $5) {
        var _R = XLSX.utils.decode_row($5),
            _C = XLSX.utils.decode_col($3);
        if (_R >= start_row) {
            _R -= nrows;
            if (_R < start_row) return "#REF!";
        }
        return $1 + ($2 == "$" ? $2 + $3 : XLSX.utils.encode_col(_C)) + ($4 == "$" ? $4 + $5 : XLSX.utils.encode_row(_R));
    };

    var addr, naddr;
    /* move cells and update formulae */
    if (dense) {
        for (R = start_row + nrows; R <= range.e.r; ++R) {
            if (ws[R]) ws[R].forEach(function (cell) {
                cell.f = cell.f.replace(crefregex, formula_cb);
            });
            ws[R - nrows] = ws[R];
        }
        ws.length -= nrows;
        for (R = 0; R < start_row; ++R) {
            if (ws[R]) ws[R].forEach(function (cell) {
                cell.f = cell.f.replace(crefregex, formula_cb);
            });
        }
    } else {
        for (R = start_row + nrows; R <= range.e.r; ++R) {
            for (C = range.s.c; C <= range.e.c; ++C) {
                addr = XLSX.utils.encode_cell({
                    r: R,
                    c: C
                });
                naddr = XLSX.utils.encode_cell({
                    r: R - nrows,
                    c: C
                });
                if (!ws[addr]) {
                    delete ws[naddr];
                    continue;
                }
                if (ws[addr].f) ws[addr].f = ws[addr].f.replace(crefregex, formula_cb);
                ws[naddr] = ws[addr];
            }
        }
        for (R = range.e.r; R > range.e.r - nrows; --R) {
            for (C = range.s.c; C <= range.e.c; ++C) {
                addr = XLSX.utils.encode_cell({
                    r: R,
                    c: C
                });
                delete ws[addr];
            }
        }
        for (R = 0; R < start_row; ++R) {
            for (C = range.s.c; C <= range.e.c; ++C) {
                addr = XLSX.utils.encode_cell({
                    r: R,
                    c: C
                });
                if (ws[addr] && ws[addr].f) ws[addr].f = ws[addr].f.replace(crefregex, formula_cb);
            }
        }
    }

    /* write new range */
    range.e.r -= nrows;
    if (range.e.r < range.s.r) range.e.r = range.s.r;
    ws["!ref"] = XLSX.utils.encode_range(clamp_range(range));

    /* merge cells */
    if (ws["!merges"]) ws["!merges"].forEach(function (merge, idx) {
        var mergerange;
        switch (typeof merge) {
            case 'string':
                mergerange = XLSX.utils.decode_range(merge);
                break;
            case 'object':
                mergerange = merge;
                break;
            default:
                throw new Error("Unexpected merge ref " + merge);
        }
        if (mergerange.s.r >= start_row) {
            mergerange.s.r = Math.max(mergerange.s.r - nrows, start_row);
            if (mergerange.e.r < start_row + nrows) {
                delete ws["!merges"][idx];
                return;
            }
        } else if (mergerange.e.r >= start_row) mergerange.e.r = Math.max(mergerange.e.r - nrows, start_row);
        clamp_range(mergerange);
        ws["!merges"][idx] = mergerange;
    });
    if (ws["!merges"]) ws["!merges"] = ws["!merges"].filter(function (x) {
        return !!x;
    });

    /* rows */
    if (ws["!rows"]) ws["!rows"].splice(start_row, nrows);
}