const cloudinary = require('cloudinary');
const Papa = require('papaparse');
const axios = require('axios');
const { DATABASE_URL } = require('./Components/Config/config');
const { Mapping } = require('./Components/Models/mappingModel');
const URL = 'https://vast-inlet-55922.herokuapp.com';


var parseConfig = {
	delimiter: '', // auto-detect
	newline: '', // auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: true,
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: '',
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
	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
};
var unparseConfig = {
	quotes: false, //or array of booleans
	quoteChar: '"',
	escapeChar: '"',
	delimiter: ',',
	header: true,
	newline: '\n',
	skipEmptyLines: true, //or 'greedy',
	columns: null, //or array of strings
};


//console.log(fileIn);
var fileIn;
var csvOutTemp;

function processFile(req, res) {
    
    fileIn = req.body;
    var empIdNum = req.body.empIdNum;
    var employerConfigCsv = employerConfigCsv(empIdNum);
    

	var fileInParsed = fileIn.replace(/(00\/00\/0000)/g, '');
    var csvData = Papa.parse(fileInParsed, parseConfig);
    csvOutTemp = csvData.data;
}

const employerConfigCsv = async () => {
    axios.get(`${URL}/api/getMap`)
        .then(res => {
        employerConfigCsv = Object.values(res);
        employerConfigCsv.splice(0, 3)
        employerConfigCsv.splice(294)
        return employerConfigCsv;
        })
        .catch(function (err) {
            console.error(err);
    })
}

function getPeriodHours() {
	for (var i = 0; i < csvOutTemp.length; i++) {
		if (csvOutTemp[74] == 0) {
			console.log(csvOutTemp);
		}

		if (
			csvOutTemp[i]['CalcSrc_PartialHours1'] == null ||
			csvOutTemp[i]['CalcSrc_PartialHours1'] == 0
		) {
			payPrdHours = $("#ckBox input[type='radio']:checked").val();
			console.log(csvOutTemp[i]['CalcSrc_PartialHours1']);
		}
	}
}

// GETTING MIDDLE INITIAL VALUE 
// Taking only the first character of the middle name to populate the M.I. field
for (var i = 0, l = csvOutTemp.length; i < l; i++) {
	if (csvOutTemp[i]['Middle Name'] !== undefined) {
		var middleName = csvOutTemp[i]['Middle Name'];
		var middleInit = middleName.substring(0, 1);
		csvOutTemp[i]['MiddleInitial'] = middleInit;
	}
	if (csvOutTemp[i]['MiddleName'] !== undefined) {
		var middleName = csvOutTemp[i]['MiddleName'];
		var middleInit = middleName.substring(0, 1);
		csvOutTemp[i]['MiddleInitial'] = middleInit;
	}
}
// END Getting Middle Initial Value 
// SETTING NEW/UPDATED VALUES IN DATA OBJECTS 
//console.log(csvOutTemp);
/*Modifying original CSV data to add the employer ID in the output CSV
These values are being brought in above from local storage
Getting date picker value first for efficiency*/
var payBegin = document.getElementById('payBeginPicker').value;
var payEnd = document.getElementById('payEndPicker').value;
var payDate = document.getElementById('picker').value;
var csvDataEmpId = csvOutTemp.map(function(o) {
	o.EmployerId = empIdNum;
	o.CreateDate = dateTimeStamp;
	o.RecordStatus = recordStatus;
	o.Source = source;
	o.BatchNumber = thisBatchNum;
	o.ContractNumber = contractNum;
	o.CompletedStages = completedStages;
	o.AscLocation = ascLocation;
	o.PayrollStartDate = payBegin;
	o.PayrollEndDate = payEnd;
	o.CheckDate = payDate; // From date picker (was PayrollEndDate)
	if (empLocation != '') {
		o.EmpLocation = empLocation; // Some mappings use "EmpLocation" and others use "Location" or "Division"
		o.Location = empLocation;
		o.Division = empLocation;
	}
	return o;
});
//* END Setting New/Updated Values in Data Objects

csvOutputTemp = csvDataEmpId; // Debug
// var employerConfigCsv = getMapById(empIdNum);
// console.log('I am here')
// console.log(employerConfigCsv)
/*
 *Check if a term date is older than 90 days - expects a date in the format 'MM/DD/YYYY' or 'YYYY/MM/DD' and will handle empty strings
 */
var checkTermDate = function(testDate) {
	if (testDate == '') {
		return true;
	} else {
		var inputDate = Date.parse(testDate); // Parsing the date from the payroll file
		var todayMinus90 = Date.parse(
			new Date(new Date().setDate(new Date().getDate() - 90))
		); // Getting the date from 90 days ago and converting to same format
		return inputDate < todayMinus90 ? false : true;
	}
};
var removeOldTermsFunc = function() {
	// This function removes the dates
	var termFilteredArr = [];
	var termDateFieldName = employerConfigCsv[25]; // Getting the name of this client's termination date field
	for (i = 0; i < csvOutputTemp.length; i++) {
		if (checkTermDate(csvOutputTemp[i][termDateFieldName]) == true) {
			termFilteredArr.push(csvOutputTemp[i]);
		}
	}
	return termFilteredArr;
};

if (removeOldTerms !== 'No') {
	var csvDataEmpId = removeOldTermsFunc(); // Need to make a clearer data path with all these arrays
	//console.log('%cRemoved terms older than 90 days', 'background: #CCFFCC; color: green');
}
//* END remove >90 day terms

//* DETERMINE EMPLOYEE STATUS AND STATUS DATE
//* Setting keys to pull in values from imported payroll data
var hireDate = employerConfigCsv[24];
var termDate = employerConfigCsv[25];
var rehireDate = employerConfigCsv[26];
var payrollHrs = employerConfigCsv[191];
var taxID = employerConfigCsv[10];
// console.log('payroll ' + payrollHrs)
var statusField = employerConfigCsv[246];
var statusDateField = employerConfigCsv[39];

var fillZero = function(num) {
	// this function ensures single digit numbers are given a leading 0
	return num < 10 ? '0' + num : num;
};

var timestampToStr = function(ts) {
	// converting timestamp back to string in the format MM/DD/YYYY
	let timeStamp = ts;
	let tsObj = new Date(timeStamp);
	let month = tsObj.getMonth() + 1; // months returned using starting index of 0
	let day = tsObj.getDate();
	let year = tsObj.getFullYear();
	let dateString = fillZero(month) + '/' + fillZero(day) + '/' + year;
	return dateString;
};

// > Accepts three dates as input: hire date, term date and rehire date ('MM/DD/YYYY' or 'YYYY/MM/DD')
// > Returns an array of two values: [ <employee status>, <employee status date> ]
var determineEmpStatus = function(hire, term, rehire) {
	let hired = Date.parse(hire);
	let termed = Date.parse(term);
	let rehired = Date.parse(rehire);
	var results = [];
	if (Number.isNaN(hired) && Number.isNaN(termed) && Number.isNaN(rehired)) {
		// Date.parse on non-dates = NaN
		//console.log('No status dates were found');
		results = ['', '']; // returning empty values if no dates are provided
		return results;
	} else if (
		Number.isNaN(hired) == false &&
		Number.isNaN(termed) == true &&
		Number.isNaN(rehired) == true
	) {
		results = ['A', timestampToStr(hired)];
		return results;
	} else if (
		Number.isNaN(hired) == false &&
		Number.isNaN(termed) == false &&
		Number.isNaN(rehired) == true
	) {
		results = ['T', timestampToStr(termed)];
		return results;
	} else if (
		Number.isNaN(hired) == false &&
		Number.isNaN(termed) == false &&
		Number.isNaN(rehired) == false
	) {
		if (termed > rehired) {
			results = ['T', timestampToStr(termed)];
			return results;
		} else {
			results = ['A', timestampToStr(rehired)];
			return results;
		}
	}
};

//* Function to add salary hours to payroll hours field
function checkIfSalary(hired, termed, rehired, payrollHours) {
	if (payrollHours == '' || payrollHours == 0) {
		if (termed == '' || rehired !== '') {
			payPrdHours = $("#ckBox input[type='radio']:checked").val();
			csvDataEmpId[i][payrollHrs] = payPrdHours;
			// console.log(csvDataEmpId[i][payrollHrs]);
		}
	}
}

function iterateRows() {
	for (i = 0; i < csvDataEmpId.length; i++) {
		let hired = csvDataEmpId[i][hireDate];
		let termed = csvDataEmpId[i][termDate];
		let rehired = csvDataEmpId[i][rehireDate];
		var payrollHours = csvDataEmpId[i][payrollHrs];
		var taxIdSsn = csvDataEmpId[i][taxID];
		// console.log('here are the payroll hours ' + payrollHours);
		var resultArr = determineEmpStatus(hired, termed, rehired);
		//console.log(resultArr); // debug

		//* If Salary box is checked get value of radio button
		if ($('.isSalary').is(':checked')) {
			checkIfSalary(hired, termed, rehired, payrollHours);
		}

		//* Check taxId length and if less than 9 put in the correct amount of zeros
		var zero = '0';
		if (taxIdSsn.length <= 7) {
			let newTaxId = `=("${zero}${zero}${taxIdSsn}")`;
			// console.log(newTaxId);
			csvDataEmpId[i][taxID] = newTaxId;
		} else if (taxIdSsn.length < 9) {
			let newTaxId = `=("${zero}${taxIdSsn}")`;
			// console.log(newTaxId);
			csvDataEmpId[i][taxID] = newTaxId;
		}
		//* Set employee status and the date
		if (resultArr !== undefined) {
			csvDataEmpId[i][statusField] = resultArr[0]; // setting the employee status value
			csvDataEmpId[i][statusDateField] = resultArr[1]; // setting status change date
		}
	}
}

iterateRows();

// END Determine Status and Status Date

/* Find and display duplicates based on SSN/Tax ID field */
// Should use csvDataEmpId instead of csvOutputTemp after testing
var taxIdKeyName = employerConfigCsv[10]; // Getting the name of this client's Tax ID/SSN keys to find it in objects
filteredArr = [];
for (var i = 0; i < csvOutputTemp.length; i++) {
	for (var n = i + 1; n < csvOutputTemp.length; n++) {
		if (csvOutputTemp[i][taxIdKeyName] == csvOutputTemp[n][taxIdKeyName]) {
			filteredArr.push(csvOutputTemp[n]);
		}
	}
}
// Although the filteredArr variable should contain at least one row of each of the duplicated entries, it is not all inclusive
// As a result, we need to create a difference array based on those values - then finally find the reverse as our result
function filterByDifference(array1, array2, compareField) {
	var onlyInA = differenceInFirstArray(array1, array2, compareField);
	var onlyInb = differenceInFirstArray(array2, array1, compareField);
	return onlyInA.concat(onlyInb);
}
function differenceInFirstArray(array1, array2, compareField) {
	return array1.filter(function(current) {
		return (
			array2.filter(function(current_b) {
				return current_b[compareField] === current[compareField];
			}).length == 0
		);
	});
}
// Calling the above function
var tempOut1 = filterByDifference(filteredArr, csvOutputTemp, taxIdKeyName);
var tempOut2 = filterByDifference(tempOut1, csvOutputTemp, taxIdKeyName);
finalFilteredVal = tempOut2; // Debug

// To be moved later!
function json2table(json, classes) {
	var cols = Object.keys(json[0]);
	var headerRow = '';
	var bodyRows = '';
	classes = classes || '';
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	cols.map(function(col) {
		headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
	});
	json.map(function(row) {
		bodyRows += '<tr>';
		cols.map(function(colName) {
			bodyRows += '<td>' + row[colName] + '</td>';
		});
		bodyRows += '</tr>';
	});
	return (
		'<table style="font-size:10pt;" class="' + // reduced font-size
		classes +
		'"><thead><tr>' +
		headerRow +
		'</tr></thead><tbody>' +
		bodyRows +
		'</tbody></table>'
	);
}

// Show duplicates output field if any are found
var strFilteredArr = [];
if (tempOut2.length > 0) {
	duplicatesDisplayElem.innerHTML = json2table(tempOut2, 'table');
} else {
	duplicatesDisplayElem.innerText = 'No duplicates were found in this file';
}
/* End of duplicates search and display */

/*
var csvTrimmedOutput = [];
var csvOutputLength = csvDataEmpId.legth;
//console.log(csvOutputLength);
for (var i = 0+trimTop; i < csvOutputLength-trimBottom; i++) {
    csvTrimmedOutput.push(csvDataEmpId[i]);
}
*/

//console.log("::::::::::::::::::::::::::::::::::::::::");
// Unparsing JSON object back to CSV
var csvOut = Papa.unparse({
	fields: employerConfigCsv, //*array of headers
	data: csvDataEmpId,
	config: unparseConfig,
});
//console.log("========================================");
