const express = require('express');
const bodyParser = require('body-parser');


const {} = require('../Models/employeeModel');

const router = express.Router();

const jsonParser = bodyParser.json();


router.post('/', (req, res) => {
    const localVariables = req.body;
    var csvDataEmpId = localVariables.csvDataEmpId;

    var payBegin = localVariables.payBegin;
    var payEnd = localVariables.payEnd;
    var payDate = localVariables.payDate;
    var empIdNum = localVariables.empIdNum;
    var employerConfigCsv = localVariables.employerConfigCsv;
    var empName = localVariables.empName;
    var batchNum = localVariables.batchNum;
    var contractNum = localVariables.contractNum;
    var dateToday = localVariables.dateToday;
    var timeNow = localVariables.timeNow;
    var dateTimeStamp = localVariables.dateTimeStamp;
    var empLocation = localVariables.empLocation;
    var trimTop = localVariables.trimTop;
    var trimBottom = localVariables.trimBottom;
    var ff1 = localVariables.ff1;
    var fv1 = localVariables.fv1;
    var ff2 = localVariables.ff2;
    var fv2 = localVariables.fv2;
    var ff3 = localVariables.ff3;
    var fv3 = localVariables.fv3;
    var isMultiDivision = localVariables.isMultiDivision;
    var removeDuplicates = localVariables.removeDuplicates;
    var customHeader = localVariables.customHeader;
    var removeOldTerms = localVariables.removeOldTerms;
    var uploadUrlString = localVariables.uploadUrlString;
    var recordKeeper = localVariables.recordKeeper;
    var ascLocation = localVariables.ascLocation;
    var thisBatchNum = localVariables.thisBatchNum;
    var createDate = localVariables.createDate;
    var recordStatus = localVariables.recordStatus;
    var source = localVariables.source;
    var sourceId = localVariables.sourceId;
    var completedStages = localVariables.completedStages;
    var csvOutTemp = localVariables.csvOutTemp;

    var location = employerConfigCsv[9];
    var taxIdKeyName = employerConfigCsv[10]; // Getting the name of this client's Tax ID/SSN keys to find it in objects
    var taxID = employerConfigCsv[10];
    var middle_name = employerConfigCsv[12];
    var last_name = employerConfigCsv[13];
    var name_suffix = employerConfigCsv[14];
    var eePreTax = employerConfigCsv[15];
    var state = employerConfigCsv[21];
    var zipCode = employerConfigCsv[22];
    var birthDate = employerConfigCsv[23];
    var hireDate = employerConfigCsv[24];
    var termDate = employerConfigCsv[25];
    var rehireDate = employerConfigCsv[26];
    var employeeStatus = employerConfigCsv[28];
    var combRecordIdentifier = employerConfigCsv[30];
    var roth401kEE = employerConfigCsv[33];
    var loanK1 = employerConfigCsv[35];
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
    var erCatchUpMatch = employerConfigCsv[137];
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
    var alwaysBlank = employerConfigCsv[259];
    var emp_calc_amt9 = employerConfigCsv[270];
    var emp_calc_amt10 = employerConfigCsv[271];
    var emp_salaryAmtQualifier = employerConfigCsv[272];
    var qacaCUMatch = employerConfigCsv[275];
    var payStartDate = employerConfigCsv[278];
    var voya_RecordType = employerConfigCsv[279];
    var voyaEmpId = employerConfigCsv[284];
    var voya_IrsCode = employerConfigCsv[285];
    var safeHarbor_2 = employerConfigCsv[291];
    var safeHarbor_3 = employerConfigCsv[292];
    var safeHarbor_4 = employerConfigCsv[293];

    csvOutputTemp = csvDataEmpId; // Debug

    if (removeOldTerms !== 'No') {
        var csvDataEmpId = removeOldTermsFunc(employerConfigCsv, csvOutputTemp); // Need to make a clearer data path with all these arrays
        //console.log('%cRemoved terms older than 90 days', 'background: #CCFFCC; color: green');
    }

    function iterateRows() {
        for (i = 0; i < csvDataEmpId.length; i++) {
            // console.log(`csvDataEmpId[i]: ${csvDataEmpId[i].data}`);
            // console.log(`csvDataEmpId[i]: ${csvDataEmpId[i][i]}`);

            let lastName = csvDataEmpId[i][last_name];
            let suffix = csvDataEmpId[i][name_suffix];
            suffix == undefined ? suffix = '' : suffix;
            let preTaxEE = csvDataEmpId[i][eePreTax];
            preTaxEE == undefined ? preTaxEE = 0 : preTaxEE;
            let birth = csvDataEmpId[i][birthDate];
            let hired = csvDataEmpId[i][hireDate];
            let termed = csvDataEmpId[i][termDate];
            let rehired = csvDataEmpId[i][rehireDate];
            let payrollHours = csvDataEmpId[i][partialHours1];
            let taxIdSsn = csvDataEmpId[i][taxID];
            let stateRow = csvDataEmpId[i][state];
            let postalCode = csvDataEmpId[i][zipCode];
            let rothKEE = csvDataEmpId[i][roth401kEE];
            rothKEE == undefined ? rothKEE = 0 : rothKEE;
            let static_date = csvDataEmpId[i][status_date];
            let statDateField = csvDataEmpId[i][statusDateField];
            let status_Reason = csvDataEmpId[i][statusChangeReason];
            let divisionName = csvDataEmpId[i][division];
            let payFrequency = csvDataEmpId[i][payFreq];
            let ascLocale = csvDataEmpId[i][ascLocal];
            let defAmount = csvDataEmpId[i][deferralAmount];
            defAmount == undefined ? defAmount = 0 : defAmount;
            let middleNme = csvDataEmpId[i][middle_name];
            let middleIn = csvDataEmpId[i][middleInt];
            let dateChange = csvDataEmpId[i][transDateChanged];
            let qacaMatch = csvDataEmpId[i][erQacaMatch];
            qacaMatch == undefined ? qacaMatch = 0 : qacaMatch;
            let erMatchTotal = csvDataEmpId[i][erMatchYTD];
            erMatchTotal == undefined ? erMatchTotal = 0 : erMatchTotal;
            let jhEligIndc = csvDataEmpId[i][eligInd];
            let empStatus = csvDataEmpId[i][eeStatus];
            let payrollDate = csvDataEmpId[i][checkDate];
            let payEnd = csvDataEmpId[i][payEndDate];
            let erSHNonMatch = csvDataEmpId[i][erSafeHarborNonMatch];
            erSHNonMatch == undefined ? erSHNonMatch = 0 : erSHNonMatch;
            let erQacNonElective = csvDataEmpId[i][erQacaNonElect];
            erQacNonElective == undefined ? erQacNonElective = 0 : erQacNonElective;
            let cuPlan1Contrib = csvDataEmpId[i][catchUpPlan1Cont];
            cuPlan1Contrib == undefined ? cuPlan1Contrib = 0 : cuPlan1Contrib;
            let pRDate = csvDataEmpId[i][jh_PRDate];
            let ERPS = csvDataEmpId[i][erps];
            ERPS == undefined ? ERPS = 0 : ERPS;
            let dollar401k = csvDataEmpId[i][calcSrc401kDollar];
            dollar401k == undefined ? dollar401k = 0 : dollar401k;
            let perct401k = csvDataEmpId[i][calcSrc401kPerct];
            perct401k == undefined ? perct401k = 0 : perct401k;
            let dollarRoth = csvDataEmpId[i][calcSrcRothDollar];
            dollarRoth == undefined ? dollarRoth = 0 : dollarRoth;
            let perctRoth = csvDataEmpId[i][calsSrcRothPerct];
            perctRoth == undefined ? perctRoth = 0 : perctRoth;
            let dollar401kMatch = csvDataEmpId[i][calcSrc401k$Match];
            dollar401kMatch == undefined ? dollar401kMatch = 0 : dollar401kMatch;
            let perct401kMatch = csvDataEmpId[i][calcSrc401kPerctMatch];
            perct401kMatch == undefined ? perct401kMatch = 0 : perct401kMatch;
            let dollarRothMatch = csvDataEmpId[i][calcSrcRoth$Match];
            dollarRothMatch == undefined ? dollarRothMatch = 0 : dollarRothMatch;
            let perctRothMatch = csvDataEmpId[i][calcSrcRothPerctMatch];
            perctRothMatch == undefined ? perctRothMatch = 0 : perctRothMatch;
            let dollar401kCU = csvDataEmpId[i][calcSrc401k$CU];
            dollar401kCU == undefined ? dollar401kCU = 0 : dollar401kCU;
            let perct401kCU = csvDataEmpId[i][calcSrc401kPerctCU];
            perct401kCU == undefined ? perct401kCU = 0 : perct401kCU;
            let dollarRothCU = csvDataEmpId[i][calcSrcRoth$CU];
            dollarRothCU == undefined ? dollarRothCU = 0 : dollarRothCU;
            let perctRothCU = csvDataEmpId[i][calcSrcRothPerctCU];
            perctRothCU == undefined ? perctRothCU = 0 : perctRothCU;
            let dollar401kCUMatch = csvDataEmpId[i][calcSrc401k$CUMatch];
            dollar401kCUMatch == undefined ? dollar401kCUMatch = 0 : dollar401kCUMatch;
            let perct401kCUMatch = csvDataEmpId[i][calcSrc401kPerctCUMatch];
            perct401kCUMatch == undefined ? perct401kCUMatch = 0 : perct401kCUMatch;
            let dollarRothCUMatch = csvDataEmpId[i][calcSrcRoth$CUMatch];
            dollarRothCUMatch == undefined ? dollarRothCUMatch = 0 : dollarRothCUMatch;
            let perctRothCUMatch = csvDataEmpId[i][calcSrcRothPerctCUMatch];
            perctRothCUMatch == undefined ? perctRothCUMatch = 0 : perctRothCUMatch;
            let hours1 = csvDataEmpId[i][partialHours1];
            hours1 == undefined ? hours1 = 0 : hours1;
            let hours2 = csvDataEmpId[i][partialHours2];
            hours2 == undefined ? hours2 = 0 : hours2;
            let hours3 = csvDataEmpId[i][partialHours3];
            hours3 == undefined ? hours3 = 0 : hours3;
            let hours4 = csvDataEmpId[i][partialHours4];
            hours4 == undefined ? hours4 = 0 : hours4;
            let hours5 = csvDataEmpId[i][partialHours5];
            hours5 == undefined ? hours5 = 0 : hours5;
            let hours6 = csvDataEmpId[i][partialHours6];
            hours6 == undefined ? hours6 = 0 : hours6;
            let hours7 = csvDataEmpId[i][partialHours7];
            hours7 == undefined ? hours7 = 0 : hours7;
            let hours8 = csvDataEmpId[i][partialHours8];
            hours8 == undefined ? hours8 = 0 : hours8;
            let hours9 = csvDataEmpId[i][partialHours9];
            hours9 == undefined ? hours9 = 0 : hours9;
            let hours10 = csvDataEmpId[i][partialHours10];
            hours10 == undefined ? hours10 = 0 : hours10;
            let hours11 = csvDataEmpId[i][partialHours11];
            hours11 == undefined ? hours11 = 0 : hours11;
            let hours12 = csvDataEmpId[i][partialHours12];
            hours12 == undefined ? hours12 = 0 : hours12;
            let hours13 = csvDataEmpId[i][partialHours13];
            hours13 == undefined ? hours13 = 0 : hours13;
            let hours14 = csvDataEmpId[i][partialHours14];
            hours14 == undefined ? hours14 = 0 : hours14;
            let hours15 = csvDataEmpId[i][partialHours15];
            hours15 == undefined ? hours15 = 0 : hours15;
            let hours16 = csvDataEmpId[i][partialHours16];
            hours16 == undefined ? hours16 = 0 : hours16;
            let hours17 = csvDataEmpId[i][partialHours17];
            hours17 == undefined ? hours17 = 0 : hours17;
            let hours18 = csvDataEmpId[i][partialHours18];
            hours18 == undefined ? hours18 = 0 : hours18;
            let hours19 = csvDataEmpId[i][partialHours19];
            hours19 == undefined ? hours19 = 0 : hours19;
            let hours20 = csvDataEmpId[i][partialHours20];
            hours20 == undefined ? hours20 = 0 : hours20;
            let loan1 = csvDataEmpId[i][loanPmt1];
            loan1 == undefined ? loan1 = 0 : loan1;
            let loan2 = csvDataEmpId[i][loanPmt2];
            loan2 == undefined ? loan2 = 0 : loan2;
            let loan3 = csvDataEmpId[i][loanPmt3];
            loan3 == undefined ? loan3 = 0 : loan3;
            let loan4 = csvDataEmpId[i][loanPmt4];
            loan4 == undefined ? loan4 = 0 : loan4;
            let loan5 = csvDataEmpId[i][loanPmt5];
            loan5 == undefined ? loan5 = 0 : loan5;
            let loan6 = csvDataEmpId[i][loanPmt6];
            loan6 == undefined ? loan6 = 0 : loan6;
            let loan7 = csvDataEmpId[i][loanPmt7];
            loan7 == undefined ? loan7 = 0 : loan7;
            let loan8 = csvDataEmpId[i][loanPmt8];
            loan8 == undefined ? loan8 = 0 : loan8;
            let loan9 = csvDataEmpId[i][loanPmt9];
            loan9 == undefined ? loan9 = 0 : loan9;
            let loan10 = csvDataEmpId[i][loanPmt10];
            loan10 == undefined ? loan10 = 0 : loan10;
            let loan11 = csvDataEmpId[i][loanPmt11];
            loan11 == undefined ? loan11 = 0 : loan11;
            let loan12 = csvDataEmpId[i][loanPmt12];
            loan12 == undefined ? loan12 = 0 : loan12;
            let loan13 = csvDataEmpId[i][loanPmt13];
            loan13 == undefined ? loan13 = 0 : loan13;
            let loan14 = csvDataEmpId[i][loanPmt14];
            loan14 == undefined ? loan14 = 0 : loan14;
            let loan15 = csvDataEmpId[i][loanPmt15];
            loan15 == undefined ? loan15 = 0 : loan15;
            let loan16 = csvDataEmpId[i][loanPmt16];
            loan16 == undefined ? loan16 = 0 : loan16;
            let loan17 = csvDataEmpId[i][loanPmt17];
            loan17 == undefined ? loan17 = 0 : loan17;
            let excl1 = csvDataEmpId[i][exclComp1];
            excl1 == undefined ? excl1 = 0 : excl1;
            let excl2 = csvDataEmpId[i][exclComp2];
            excl2 == undefined ? excl2 = 0 : excl2;
            let excl3 = csvDataEmpId[i][exclComp3];
            excl3 == undefined ? excl3 = 0 : excl3;
            let excl4 = csvDataEmpId[i][exclComp4];
            excl4 == undefined ? excl4 = 0 : excl4;
            let excl5 = csvDataEmpId[i][exclComp5];
            excl5 == undefined ? excl5 = 0 : excl5;
            let excl6 = csvDataEmpId[i][exclComp6];
            excl6 == undefined ? excl6 = 0 : excl6;
            let excl7 = csvDataEmpId[i][exclComp7];
            excl7 == undefined ? excl7 = 0 : excl7;
            let excl8 = csvDataEmpId[i][exclComp8];
            excl8 == undefined ? excl8 = 0 : excl8;
            let excl9 = csvDataEmpId[i][exclComp9];
            excl9 == undefined ? excl9 = 0 : excl9;
            let excl10 = csvDataEmpId[i][exclComp10];
            excl10 == undefined ? excl10 = 0 : excl10;
            let jhIsEligible = csvDataEmpId[i][jhStaticEligible]
            let blank = csvDataEmpId[i][alwaysBlank];
            blank == undefined ? blank = 0 : blank;
            let erQacaCUMatch = csvDataEmpId[i][qacaCUMatch];
            erQacaCUMatch == undefined ? erQacaCUMatch = 0 : erQacaCUMatch;
            let payStart = csvDataEmpId[i][payStartDate];
            let employeeStat = csvDataEmpId[i][employeeStatus]
            let voyaEmplrId = csvDataEmpId[i][voyaEmpId];
            let jhStatusField = csvDataEmpId[i][statusField];
            let safeHarborMatch_2 = csvDataEmpId[i][safeHarbor_2];
            safeHarborMatch_2 == undefined ? safeHarborMatch_2 = 0 : safeHarborMatch_2;
            let safeHarborMatch_3 = csvDataEmpId[i][safeHarbor_3];
            safeHarborMatch_3 == undefined ? safeHarborMatch_3 = 0 : safeHarborMatch_3;
            let safeHarborMatch_4 = csvDataEmpId[i][safeHarbor_4];
            safeHarborMatch_4 == undefined ? safeHarborMatch_4 = 0 : safeHarborMatch_4;
            let anotherDivision = csvDataEmpId[i][firstDivision];
            let resultArr;


            // * For employers if the date format is YYYYMMDD
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

            //* Global Calculations
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
            csvDataEmpId[i][totalPeriodHours] = hours1 + hours2 + hours3 + hours4 + hours5 + hours6 + hours7 + hours8 + hours9 + hours10 + hours11 + hours12 + hours13 + hours14 + hours15 + hours16 + hours17 + hours18 + hours19 + hours20;
            //? Add all Loan Payments
            csvDataEmpId[i][totalLoans] = loan1 + loan2 + loan3 + loan4 + loan5 + loan6 + loan7 + loan8 + loan9 + loan10 + loan11 + loan12 + loan13 + loan14 + loan15 + loan16 + loan17;
            //? Add all Excluded Comp
            csvDataEmpId[i][totalExcludedComp] = excl1 + excl2 + excl3 + excl4 + excl5 + excl6 + excl7 + excl8 + excl9 + excl10;
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
            if (taxIdSsn !== undefined || taxIdSsn !== '') {
                csvDataEmpId[i][taxID] = taxIdLength(taxIdSsn);
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
            //* Set employee status and the date 
            // console.log(`birth date before: ${birth}`);
            if (empStatus == undefined || empStatus == '') {
                // console.log(`birth inside if: ${birth}`);
                if (resultArr !== undefined) {
                    csvDataEmpId[i][statusField] = resultArr[0]; // setting the employee status value
                    csvDataEmpId[i][statusDateField] = resultArr[1]; // setting status change date
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
            }
            if (stateRow !== undefined && stateRow.length > 2) {
                csvDataEmpId[i][state] = convert_state(stateRow, 'abbrev');
            }
            //* JOHN HANCOCK CALCULATIONS
            if (recordKeeper == 'John Hancock') {
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
                csvDataEmpId[i][loanK1] = loan1;
                //? Copy Loan 2 Payment
                csvDataEmpId[i][kLoan2] = loan2;
                //? Copy Loan 3 Payment
                csvDataEmpId[i][kLoan3] = loan3;
                //? Fill Combination Record Identifier
                csvDataEmpId[i][combRecordIdentifier] = 'comb.d';
                //? Eligibility Indicator and Eligibility Date
                switch (jhIsEligible) {
                    case '':
                        csvDataEmpId[i][eligInd] = 'Y';
                        break;
                    case ' ':
                        csvDataEmpId[i][eligInd] = 'Y';
                        break;
                    default:
                        csvDataEmpId[i][eligInd] = '';
                        break;
                }
                //? If state is PR make inelligible
                if (stateRow == 'PR') {
                    csvDataEmpId[i][eligInd] = 'N';
                }
            }
            //* VANGUARD-ASCENSUS CALCULATIONS
            if (recordKeeper == 'Vanguard-Ascensus') {
                let newEligDate = checkEligibility(birth, hired, termed);
                let stringDate = JSON.stringify(newEligDate)
                let regExEligDate = stringDate.replace(/(T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '');
                let dateToJson = JSON.parse(regExEligDate);
                csvDataEmpId[i][eeEligibilityDate] = dateToJson;
            }
            //* VOYA CALCULATIONS
            if (recordKeeper == 'Voya') {
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
                if (empIdNum == 15 || empIdNum == 225) {
                    csvDataEmpId[i][location] = '1';
                }
                //? Contract Number
                // console.log('the record keeper is Voya so I am in the recordKeeper check');
                csvDataEmpId[i][voyaEmpId] = contractNum;

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
                        csvDataEmpId[i][payFreq] = 7;
                        break;
                }
                switch (employeeStat) {
                    case 'Active':
                        csvDataEmpId[i][employeeStatus] = 'A';
                        break;
                    case 'Terminated':
                        csvDataEmpId[i][employeeStatus] = 'T';
                        break;
                    case 'Resigned':
                        csvDataEmpId[i][employeeStatus] = 'T';
                        break;
                    case 'Disability':
                        csvDataEmpId[i][employeeStatus] = 'D';
                        break;
                    case 'LOA':
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
            }

            //* EMPOWER
            if (recordKeeper == 'Empower') {
                //? Copy Loan Values
                csvDataEmpId[i][emp_calc_amt9] = loan1;
                //? Copy Loan 2 Values
                csvDataEmpId[i][emp_calc_amt10] = loan2;
                //? Ending Payroll Date Fill
                csvDataEmpId[i][payEndDate] = payrollDate;
                //? Salary Amount Qualifier (Bi-Weekly)
                csvDataEmpId[i][emp_salaryAmtQualifier] = 'B';
                //? Assign Division Name
                switch (divisionName) {
                    case '0Q286':
                        csvDataEmpId[i][division] = 1;
                        break;
                    case '0Q287':
                        csvDataEmpId[i][division] = 2;
                        break;
                    case '0Q288':
                        csvDataEmpId[i][division] = 3;
                        break;
                    case '0T329':
                        csvDataEmpId[i][division] = 4;
                        break;
                    default:
                        csvDataEmpId[i][division] = 1;
                        break;
                }
            }

            if (empIdNum === '30') {
                // console.log('The empIdNum is 30')
                csvDataEmpId[i][statusChangeReason] = getStatusChange(hired, termed, rehired)
            }
            // console.log(isMultiDivision.toUpperCase());
            if (isMultiDivision.toUpperCase() == 'YES' && divisionName !== undefined) {
                // console.log('I am in the multi division')
                // console.log(`divisionName: ${divisionName}`);
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

            let newPostal = postalCode.toString();
            if (newPostal.length < 5) {
                // console.log(`postalCode: ${newPostal}`);
                let newZip = newPostal.pad('0', 5);
                csvDataEmpId[i][zipCode] = newZip;
                // console.log(`zipCode: ${newZip}`);
            }
        }
    }
    iterateRows();

    //──── FUNCTION TO ABBREVIATE STATE NAMES ────────────────────────────────────────────────
    function convert_state(name, to) {
        var name = name.toUpperCase();
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

        states.forEach(function (index, value) {
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
        })
        // $.each(states, function (index, value) {
        //     if (to == 'name') {
        //         if (value.abbrev == name) {
        //             returnthis = value.name;
        //             return false;
        //         }
        //     } else if (to == 'abbrev') {
        //         if (value.name.toUpperCase() == name) {
        //             returnthis = value.abbrev;
        //             return false;
        //         }
        //     }
        // });
        return returnthis;
    }
    //──── Function to add salary hours to payroll hours field ───────────────────────────────
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

    //──── GETTING MIDDLE INITIAL VALUE ──────────────────────────────────────────────────────
    // Taking only the first character of the middle name to populate the M.I. field
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


    //──── Check taxId length and if less than 9 put in the correct amount of zeros ──────────
    taxIdLength = function (taxIdSsn) {
        var zero = '0';
        let newTaxId;
        if (taxIdSsn === undefined) {
            newTaxId = taxIdSsn;
            // console.log(`undefined Tax ID: ${newTaxId}`);
            return newTaxId;

        } else {
            // console.log('I am in the else of the tax id func');
            if (taxIdSsn.length <= 7) {
                newTaxId = `=("${zero}${zero}${taxIdSsn}")`
                // console.log(newTaxId);
                // return newTaxId;
            } else if (taxIdSsn.length < 9) {
                newTaxId = `=("${zero}${taxIdSsn}")`
                // console.log(newTaxId);
                // return newTaxId;
            } else {
                newTaxId = taxIdSsn;
                // console.log(`I am in the other else taxId: ${newTaxId}`);
                return newTaxId;
            }

        }
    }
    //──── Check if a term date is older than 90 days - expects a date in the format 'MM/DD/YYYY' or 'YYYY/MM/DD' and will handle empty strings 
    checkTermDate = function (testDate, reDate) {
        if (testDate == '') {
            return true;
        } else if (reDate !== undefined) {
            return true;
        } else {
            let inputDate = Date.parse(testDate); // Parsing the date from the payroll file
            let todayMinus90 = Date.parse(new Date(new Date().setDate(new Date().getDate() - 90))); // Getting the date from 90 days ago and converting to same format
            return (inputDate < todayMinus90 ? false : true);
        }
    }

    removeOldTermsFunc = function (employerArr, csvArr) { // This function removes the dates
        let termFilteredArr = [];
        let termDateFieldName = employerArr[25]; // Getting the name of this client's termination date field
        let rehireDate = employerConfigCsv[26];
        for (i = 0; i < csvArr.length; i++) {
            if (checkTermDate(csvArr[i][termDateFieldName], csvArr[i][rehireDate]) == true) {
                termFilteredArr.push(csvArr[i]);
            }
        }
        return termFilteredArr;
    }

    //──── this function ensures single digit numbers are given a leading 0 ──────────────────
    fillZero = function (num) {
        return num < 10 ? '0' + num : num;
    }

    //──── converting timestamp back to string in the format MM/DD/YYYY ──────────────────────
    timestampToStr = function (ts) {
        let timeStamp = ts;
        let tsObj = new Date(timeStamp);
        let month = tsObj.getMonth() + 1; // months returned using starting index of 0
        let day = tsObj.getDate() + 1;
        let year = tsObj.getFullYear();
        let dateString = fillZero(month) + '/' + fillZero(day) + '/' + year;
        return dateString;
    }

    //──── DETERMINE EMPLOYEE STATUS ─────────────────────────────────────────────────────────
    // > Accepts three dates as input: hire date, term date and rehire date ('MM/DD/YYYY' or 'YYYY/MM/DD')
    // > Returns an array of two values: [ <employee status>, <employee status date> ]
    determineEmpStatus = function (hire, term, rehire, checkdate) {
        let hired = Date.parse(hire);
        // console.log(`Hired Date: ${hired}`);
        let termed = Date.parse(term);
        // console.log(`Term Date: ${termed}`);
        let rehired = Date.parse(rehire);
        // console.log(`Rehire Date: ${rehired}`);
        let check = Date.parse(checkdate);
        let results = [];
        if (
            Number.isNaN(hired) &&
            Number.isNaN(termed) &&
            Number.isNaN(rehired)
        ) {
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
            Number.isNaN(termed) == true &&
            Number.isNaN(rehired) == false
        ) {
            results = ['A', timestampToStr(rehired)];
            return results;
        } else if (
            Number.isNaN(hired) == false &&
            Number.isNaN(termed) == false &&
            Number.isNaN(rehired) == false
        ) {
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
    };

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

    //──── CHECK IF THERE ARE DIFFERENCES ────────────────────────────────────────────────────
    // Although the filteredArr variable should contain at least one row of each of the duplicated entries, it is not all inclusive
    // As a result, we need to create a difference array based on those values - then finally find the reverse as our result
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
    //──── CHECK THE ELIGIBILITY FOR VANGUARD ────────────────────────────────────────────────

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
    checkEligibility = function (birth, hired, termed) {
        let today = new Date();
        let eligDate;
        let dayPlus60 = new Date(addDays(hired, 60));
        let bDay = getAge(birth);
        let firstDayOfMonth = new Date(getFirstDateOfMonth(dayPlus60));
        let lastDayOfMonth = new Date(getLastDateOfMonth(dayPlus60));
        let firstOfNewMonth = new Date(addDays(lastDayOfMonth, 1));
        if (bDay >= 21 && dayPlus60.getTime() <= today.getTime()) {

            if (dayPlus60.getTime() !== firstDayOfMonth.getTime()) {
                eligDate = firstOfNewMonth;
            } else {
                eligDate = dayPlus60;
            }
        } else if (dayPlus60.getTime() >= today.getTime() || bDay < 21) {
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
})



module.exports = {
    router
};