const URL = 'https://vast-inlet-55922.herokuapp.com';

handleFiles = files => {
	var reader = new FileReader();
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

	//* All configuration options for "unparsing" JSON back to CSV
	//TODO: unparseConfig not currently used will need to use in full production.
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

	//* reads incoming CSV file within the browser and parses the header of the first row
	reader.onload = e => {
		var fileIn = reader.result;
		var fileInParsed = fileIn.replace(/(00\/00\/0000)/g, ''); // Removing 00/00/00 dates
		var csvData = Papa.parse(fileInParsed, parseConfig);

		//* csvData.data is the grouping of Objects
		var dataJson = csvData.data;
		var jsonKeys = Object.keys(dataJson[0]);

		return jsonKeys;
	};
	reader.readAsText(files[0]);
};

window.onload = function() {
	var loadFile = document.getElementById('loadFile');

	loadFile.addEventListener('change', e => {
		var file = loadFile.files[0];
		var reader = new FileReader();
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
		//* reads incoming CSV file within the browser and parses the header of the first row
		reader.onload = e => {
			var fileIn = reader.result;
			var fileInParsed = fileIn.replace(/(00\/00\/0000)/g, ''); // Removing 00/00/00 dates
			var csvData = Papa.parse(fileInParsed, parseConfig);

			//* csvData.data is the grouping of Objects
			var dataJson = csvData.data;
			var jsonKeys = Object.keys(dataJson[0]);
			var fields = jsonKeys;
			// JSON Data for selections
			var myData = [
				{
					FiduciaryOutsourcingField: 'Location',
					YourField: 'Location',
				},
				{
					FiduciaryOutsourcingField: 'TaxId',
					YourField: 'Tax ID',
				},
				{
					FiduciaryOutsourcingField: 'FirstName',
					YourField: 'First Name',
				},
				{
					FiduciaryOutsourcingField: 'MiddleName',
					YourField: 'Middle Name',
				},
				{
					FiduciaryOutsourcingField: 'MiddleInitial',
					YourField: 'MiddleInitial',
				},
				{
					FiduciaryOutsourcingField: 'LastName',
					YourField: 'Last Name',
				},
				{
					FiduciaryOutsourcingField: 'Suffix',
					YourField: 'Suffix',
				},
				{
					FiduciaryOutsourcingField: 'Address1',
					YourField: 'Address 1',
				},
				{
					FiduciaryOutsourcingField: 'Address2',
					YourField: 'Address2',
				},
				{
					FiduciaryOutsourcingField: 'City',
					YourField: 'City',
				},
				{
					FiduciaryOutsourcingField: 'State',
					YourField: 'State',
				},
				{
					FiduciaryOutsourcingField: 'PostalCode',
					YourField: 'Zip/Postal Code',
				},
				{
					FiduciaryOutsourcingField: 'BirthDate',
					YourField: 'Birth Date',
				},
				{
					FiduciaryOutsourcingField: 'HireDate',
					YourField: 'Hire Date',
				},
				{
					FiduciaryOutsourcingField: 'TerminationDate',
					YourField: 'Termination Date',
				},
				{
					FiduciaryOutsourcingField: 'RehireDate',
					YourField: 'Rehire Date',
				},
				{
					FiduciaryOutsourcingField: 'WorkEmail',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'HoursWorkedYTD',
					YourField: 'Hours Worked YTD',
				},
				{
					FiduciaryOutsourcingField: 'CompensationYTD',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'PeriodGrossComp',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Hours',
					YourField: 'Hours',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours1',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours2',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours3',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours4',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours5',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours6',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours7',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours8',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours9',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours10',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours11',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours12',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours13',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours14',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours15',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours16',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours17',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours18',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours19',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_PartialHours20',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: '401k & Roth',
					YourField: '401k & Roth',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k$',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k%',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth$',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth%',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Match',
					YourField: 'Match',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k$Match',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k%Match',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth$Match',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth%Match',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'SafeHarborMatch_2',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'SafeHarborMatch_3',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'SafeHarborMatch_4',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'ErQacaMatch',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'SafeHarbor NonMatch NonElective',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Catch Up',
					YourField: 'Catch Up',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k$CU',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k%CU',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth$CU',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth%CU',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Catch Up Match',
					YourField: 'Catch Up Match',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k$CUMatch',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_401k%CUMatch',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth$CUMatch',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_Roth%CUMatch',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'ERQACACUMatch',
					YourField: '',
				},

				{
					FiduciaryOutsourcingField: 'Loan Payment',
					YourField: 'Loan Payment',
				},
				{
					FiduciaryOutsourcingField: 'Loan Number 1',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt1',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Loan Number 2',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt2',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Loan Number 3',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt3',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt4',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt5',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt6',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt7',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt8',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt9',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt10',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt11',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt12',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt13',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt14',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt15',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt16',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_LoanPmt17',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Extra Fields',
					YourField: 'Extra Fields',
				},
				{
					FiduciaryOutsourcingField: 'EmployeeStatus',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'LoanRepayments',
					YourField: 'Loan Repayments',
				},
				{
					FiduciaryOutsourcingField: 'Company',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'ContractNumber',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'EmployeeId',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'LocationName',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Division',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'DivisionName',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Gender',
					YourField: 'Gender',
				},
				{
					FiduciaryOutsourcingField: 'MaritalStatus',
					YourField: 'Marital Status',
				},
				{
					FiduciaryOutsourcingField: 'PayFrequency',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CorporateOfficer',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'IsUnion',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'IsEligible',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'IsHighlyCompensated',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Title',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'ERPS',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Email',
					YourField: 'Email',
				},
				{
					FiduciaryOutsourcingField: 'HomePhone',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'DavisBacon',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'YTDHrsWkCompDt',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'Voya_DepartmentCode',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp1',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp2',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp3',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp4',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp5',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp6',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp7',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp8',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp9',
					YourField: '',
				},
				{
					FiduciaryOutsourcingField: 'CalcSrc_ExclComp10',
					YourField: '',
				},
			];

			function similarCompare(a, b) {
				// console.log("Input:", a, b);
				// Compare A to B and try to identify if they are similar
				// Example a: firstName b: First Name
				var r = false;
				// Strip " ", ".", _", & "-"
				var regex = /\s|_|-|\./gi;
				a = a.replace(regex, '');
				b = b.replace(regex, '');
				if (
					a.toLowerCase() == b.toLowerCase() ||
					b.toLowerCase().includes(a.toLowerCase())
				) {
					r = true;
				}
				return r;
			}

			function fillSideBox(foData, box) {
				// $.each(foData, function (key, row) {
				$.each(fields, function(j, m) {
					$(`<label class="inputCont">${m}
                        <input id="checkOff" type="checkbox" name="checkData" value='${m}'>
                        <span class="checkmark"></span>
                        </label>`).appendTo(box);
				});

				// })
			}

			function readData(dObj, tObj) {
				$('#uploadBtn').prop('disabled', false);
				$.each(dObj, function(key, row) {
					var newRow;

					if (
						row.FiduciaryOutsourcingField == '401k & Roth' ||
						row.FiduciaryOutsourcingField == 'Match' ||
						row.FiduciaryOutsourcingField == 'Catch Up' ||
						row.FiduciaryOutsourcingField == 'Catch Up Match' ||
						row.FiduciaryOutsourcingField == 'Hours' ||
						row.FiduciaryOutsourcingField == 'Loan Payment' ||
						row.FiduciaryOutsourcingField == 'Extra Fields'
					) {
						newRow = $(
							`<tr class='${row.FiduciaryOutsourcingField}' id='sectionHeader'>
                                                      <th scope="col">${row.FiduciaryOutsourcingField}</th>
                                                    <th scope="col">${row.FiduciaryOutsourcingField}</th>
                                                    </tr>`
						).appendTo(tObj);
						console.log('I am here');
					} else {
						//Create the Table Row
						newRow = $(
							`<tr class='${row.FiduciaryOutsourcingField}'>`
						).appendTo(tObj);
						//Create the Ficudiary Outsourcing Field table data list
						var f1 = $(`<td value='${row.FiduciaryOutsourcingField}'>`)
							.html(row.FiduciaryOutsourcingField)
							.appendTo(newRow);
						//Create the table data field for the new mapping
						var f2 = $('<td>').appendTo(newRow);
						//Create the Select dropdown box
						var s1 = $(
							`<select class='browser-default custom-select' id='${
								row.FiduciaryOutsourcingField
							}'>`
						).appendTo(f2);
						//Create the Select option to show when nothing is selected
						$('<option>')
							.html('-- Select --')
							.appendTo(s1);
						//For each field create an option in Select
						$.each(fields, function(i, v) {
							var yourFieldLowerCase = row.YourField.toLowerCase();
							var csvLowerCase = v.toLowerCase();
							var regex = new RegExp(csvLowerCase);
							$('<option>', {
								//? if the YourField row in iGorMap matches the value from the CSV file then make that option selected.
								selected: similarCompare(row.FiduciaryOutsourcingField, v)
									? true
									: false,
								value: v,
								'data-col-id': i,
							})
								.html(v != undefined ? v : '(Col-' + i + ')')
								.appendTo(s1);
						});
						//Create 'not used' option at the bottom of the drop down
						$('<option>')
							.html('Not Used')
							.appendTo(s1);
					}
				});
			}

			readData(myData, $('.tableBody'));
			fillSideBox(myData, $('#leftBox'));
		};
		reader.readAsText(file);
	});
};
console.log('I got here')
// $(document).ready(function() {
// 	$('.browser-default custom-select').on('change', () => {
// 		$('select #TaxID').attr('selected');
// 	});
// });

function createNewMapping() {
	$('.mapForm').on('submit', e => {
		e.preventDefault();
		console.log('The button click was recognized.')

		const companyName = document.getElementById('coName').value;
		const companyID = document.getElementById('coID').value;

		const EIN = 'EIN';
		const ID = 'ID';
		const CreateDate = 'CreateDate';
		const UpdateDate = 'UpdateDate';
		const RecordStatus = 'RecordStatus';
		const Source = 'Source';
		const SourceId = 'SourceId';
		const BatchNumber = 'BatchNumber';
		const CompletedStages = 'CompletedStages';
		const EligibilityIndicator = 'EligibilityIndicator';
		const CombinationRecordIdentifier = 'CombinationRecordIdentifier';
		const SanityCheckFlag = 'SanityCheckFlag';
		const User_Defined_Float = 'User_Defined_Float';
		const Roth401kEE = 'Roth401kEE';
		const kLoan1 = '401kLoan1';
		const kLoan2 = '401kLoan2';
		const ERMatch = 'ERMatch';
		const StatusChangeDate = 'StatusChangeDate';
		const StatusChangeReason = 'StatusChangeReason';
		const EmployeeEligibilityDate = 'EmployeeEligibilityDate';
		const EmployeeStartDate = 'EmployeeStartDate';
		const AscLocation = 'AscLocation';
		const LastSanityCheckDate = 'LastSanityCheckDate';
		const PlanId = 'PlanId';
		const TransType = 'TransType';
		const DeferralPercentage = 'DeferralPercentage';
		const DeferralAmount = 'DeferralAmount';
		const AfterTaxPercentage = 'AfterTaxPercentage';
		const AfterTaxAmount = 'AfterTaxAmount';
		const DeferralPercentEffectiveDate = 'DeferralPercentEffectiveDate';
		const TransamericaRequestDate = 'TransamericaRequestDate';
		const TransamericaEffectivePayrollChangeDate =
			'TransamericaEffectivePayrollChangeDate';
		const PriorPreTaxContribution = 'PriorPreTaxContribution';
		const PriorRothContribution = 'PriorRothContribution';
		const NewPreTaxContribution = 'NewPreTaxContribution';
		const NewRothContribution = 'NewRothContribution';
		const HardshipSuspension = 'HardshipSuspension';
		const HardshipLiftDate = 'HardshipLiftDate';
		const PreTaxCatchUpPercent = 'PreTaxCatchUpPercent';
		const PreTaxCatchUpAmount = 'PreTaxCatchUpAmount';
		const RothCatchUpPercent = 'RothCatchUpPercent';
		const RothCatchUpAmount = 'RothCatchUpAmount';
		const TransamericaDateChanged = 'TransamericaDateChanged';
		const PeriodHours = 'PeriodHours';
		const Loan1YTD = 'Loan1YTD';
		const Loan2YTD = 'Loan2YTD';
		const EEPreTaxYTD = 'EEPreTaxYTD';
		const Roth401kEEYTD = 'Roth401kEEYTD';
		const ERMatchYTD = 'ERMatchYTD';
		const Roth401kERMatch = 'Roth401kERMatch';
		const Roth401kERMatchYTD = 'Roth401kERMatchYTD';
		const TermCode = 'TermCode';
		const NeedsRepair = 'NeedsRepair';
		const RepairNotes = 'RepairNotes';
		const CheckDate = 'CheckDate';
		const PayrollEndDate = 'PayrollEndDate';
		const EEPreTaxPlan1 = 'EEPreTaxPlan1';
		const EEPreTaxContrib1 = 'EEPreTaxContrib1';
		const EEPreTaxContrib1Desc = 'EEPreTaxContrib1Desc';
		const EEPreTaxContrib1Percent = 'EEPreTaxContrib1Percent';
		const EEPreTaxContrib1Dollars = 'EEPreTaxContrib1Dollars';
		const EEPreTaxPlan2 = 'EEPreTaxPlan2';
		const EEPreTaxContrib2 = 'EEPreTaxContrib2';
		const EEPreTaxContrib2Desc = 'EEPreTaxContrib2Desc';
		const EEPreTaxContrib2Percent = 'EEPreTaxContrib2Percent';
		const EEPreTaxContrib2Dollars = 'EEPreTaxContrib2Dollars';
		const EEPreTaxPlan3 = 'EEPreTaxPlan3';
		const EEPreTaxContrib3 = 'EEPreTaxContrib3';
		const EEPreTaxContrib3Desc = 'EEPreTaxContrib3Desc';
		const EEPreTaxContrib3Percent = 'EEPreTaxContrib3Percent';
		const EEPreTaxContrib3Dollars = 'EEPreTaxContrib3Dollars';
		const PostTaxPlan1 = 'PostTaxPlan1';
		const PostTaxContrib1 = 'PostTaxContrib1';
		const PostTaxContrib1Desc = 'PostTaxContrib1Desc';
		const PostTaxContrib1Percent = 'PostTaxContrib1Percent';
		const PostTaxContrib1Dollars = 'PostTaxContrib1Dollars';
		const PostTaxPlan2 = 'PostTaxPlan2';
		const PostTaxContrib2 = 'PostTaxContrib2';
		const PostTaxContrib2Desc = 'PostTaxContrib2Desc';
		const PostTaxContrib2Percent = 'PostTaxContrib2Percent';
		const PostTaxContrib2Dollars = 'PostTaxContrib2Dollars';
		const PostTaxPlan3 = 'PostTaxPlan3';
		const PostTaxContrib3 = 'PostTaxContrib3';
		const PostTaxContrib3Desc = 'PostTaxContrib3Desc';
		const PostTaxContrib3Percent = 'PostTaxContrib3Percent';
		const PostTaxContrib3Dollars = 'PostTaxContrib3Dollars';
		const CatchUpPlan1 = 'CatchUpPlan1';
		const CatchUpPlan1Contrib = 'CatchUpPlan1Contrib';
		const CatchUpPlan1ContribDesc = 'CatchUpPlan1ContribDesc';
		const CatchUpPlan2 = 'CatchUpPlan2';
		const CatchUpPlan2Contrib = 'CatchUpPlan2Contrib';
		const CatchUpPlan2ContribDesc = 'CatchUpPlan2ContribDesc';
		const CatchUpPlan3 = 'CatchUpPlan3';
		const CatchUpPlan3Contrib = 'CatchUpPlan3Contrib';
		const CatchUpPlan3ContribDesc = 'CatchUpPlan3ContribDesc';
		const ERMatch2 = 'ERMatch2';
		const ERMatch3 = 'ERMatch3';
		const ERCatchUpMatch = 'ERCatchUpMatch';
		const ERCatchUpMatch2 = 'ERCatchUpMatch2';
		const ERCatchUpMatch3 = 'ERCatchUpMatch3';
		const kLoan3 = '401kLoan3';
		const EEPostTax = 'EEPostTax';
		const EEMandatoryAfterTax = 'EEMandatoryAfterTax';
		const ERNonMatch_ProfitSharing = 'ERNonMatch_ProfitSharing';
		// const ERSafeHarborNonMatch_NonElective = 'ERSafeHarborNonMatch_NonElective';
		const ERMoneyPurchase = 'ERMoneyPurchase';
		const ERFullyVestedMoneyPurchase = 'ERFullyVestedMoneyPurchase';
		const ERPrevailingWage = 'ERPrevailingWage';
		const QMAC = 'QMAC';
		const QNEC = 'QNEC';
		const ERQACA_NonElective = 'ERQACA_NonElective';
		const ERQACAMatch = 'ErQacaMatch-Total';
		const ExcludedCompensationYTD = 'ExcludedCompensationYTD';
		const IntlCityProvince = 'IntlCityProvince';
		const IntlCountry = 'IntlCountry';
		const Loan_Payoff = 'Loan_Payoff';
		const IntlZipPostalCode = 'IntlZipPostalCode';
		const JH_TransNum = 'JH_TransNum';
		const JH_PRDate = 'JH_PRDate';
		const JH_Calc_EEDef = 'JH_Calc_EEDef';
		const JH_Calc_SHMac = 'JH_Calc_SHMac';
		const JH_Calc_ERMat = 'JH_Calc_ERMat';
		const JH_Erps = 'JH_Erps';
		const JH_EE403 = 'JH_EE403';
		const JH_EE457 = 'JH_EE457';
		const JH_EEIra = 'JH_EEIra';
		const JH_Calc_EERot = 'JH_Calc_EERot';
		const JH_EERRT = 'JH_EERRT';
		const JH_EESEP = 'JH_EESEP';
		const JH_EESIR = 'JH_EESIR';
		const RKCalcComplete = 'RKCalcComplete';
		const TotalLoans = 'TotalLoans';
		const TotalPeriodHours = 'TotalPeriodHours';
		const TotalExcludedComp = 'TotalExcludedComp';
		const Roth401kERCUMatch = 'Roth401kERCUMatch';
		const TotalEEPreTax = 'TotalEEPreTax';
		const JH_Last_Suffix = 'JH_Last_Suffix';
		const JH_NamePrefix = 'JH_NamePrefix';
		const JH_Country = 'JH_Country';
		const JH_EmployeeStatus = 'JH_EmployeeStatus';
		const JH_EligibilityIndicator = 'JH_EligibilityIndicator';
		const JH_OptOutIndicator = 'JH_OptOutIndicator';
		const JH_BaseSalary = 'JH_BaseSalary';
		const JH_BfTxDefPct = 'JH_BfTxDefPct';
		const JH_DesigRothPct = 'JH_DesigRothPct';
		const JH_BfTxFltDoDef = 'JH_BfTxFltDoDef';
		const JH_DesigRothAmt = 'JH_DesigRothAmt';
		const JH_Static_EmpStatus = 'JH_Static_EmpStatus';
		// const JH_Static_StatusDate = 'JH_Static_StatusDate';
		const JH_Static_IsEligible = 'JH_Static_IsEligible';
		const JH_Static_EligibleDate = 'JH_Static_EligibleDate';
		const StaticSrc_CheckDate = 'StaticSrc_CheckDate';
		const AlwaysBlank = 'AlwaysBlank';
		const EMP_Calc_Amt1 = 'EMP_Calc_Amt1';
		const EMP_Calc_Amt2 = 'EMP_Calc_Amt2';
		const EMP_Calc_Amt3 = 'EMP_Calc_Amt3';
		const EMP_Calc_Amt4 = 'EMP_Calc_Amt4';
		const EMP_Calc_Amt5 = 'EMP_Calc_Amt5';
		const EMP_Calc_Amt6 = 'EMP_Calc_Amt6';
		const EMP_Calc_Amt7 = 'EMP_Calc_Amt7';
		const EMP_Calc_Amt8 = 'EMP_Calc_Amt8';
		const EMP_Calc_Amt9 = 'EMP_Calc_Amt9';
		const EMP_Calc_Amt10 = 'EMP_Calc_Amt10';
		const EMP_SalaryAmountQualifier = 'EMP_SalaryAmountQualifier';
		const SalaryAmount = 'SalaryAmount';
		const EMP_Static_ContractNumber = 'EMP_Static_ContractNumber';
		const TotalNonExcludedComp = 'TotalNonExcludedComp';
		const PayrollStartDate = 'PayrollStartDate';
		const Voya_RecordType = 'Voya_RecordType';
		const Voya_AnniversaryHours = 'Voya_AnniversaryHours';
		const Voya_EligibilityCode = 'Voya_EligibilityCode';
		const Voya_ZipExtension = 'Voya_ZipExtension';
		const notCurrentlyUsed1 = 'notCurrentlyUsed1';
		const Voya_EmployerID = 'Voya_EmployerID';
		const Voya_IRSCode = 'Voya_IRSCode';
		const Voya_LocationCode = 'Voya_LocationCode';
		const EmployerId = 'EmployerId';
		const WasADPRunProcessed = 'WasADPRunProcessed';
		const ASC_Elig_Date1 = 'ASC_Elig_Date1';
		const ASC_Elig_Date2 = 'ASC_Elig_Date2';
		const ASC_Elig_Date3 = 'ASC_Elig_Date3';
		const SafeHarborMatch = 'SafeHarborMatch';
		const EEPreTax = 'EEPreTax';
		const SftpExportComplete = 'SftpExportComplete';

		var Location = document.getElementById('Location').value;
		if (Location === 'Not Used' || Location === '-- Select --') {
			Location = 'Location';
		}
		var TaxId = document.getElementById('TaxId').value;
		if (TaxId === 'Not Used' || TaxId === '-- Select --') {
			TaxId = 'TaxId';
		}
		var FirstName = document.getElementById('FirstName').value;
		if (FirstName === 'Not Used' || FirstName === '-- Select --') {
			FirstName = 'FirstName';
		}
		var MiddleName = document.getElementById('MiddleName').value;
		if (MiddleName === 'Not Used' || MiddleName === '-- Select --') {
			MiddleName = 'MiddleName';
		}
		var MiddleInitial = document.getElementById('MiddleInitial').value;
		if (MiddleInitial === 'Not Used' || MiddleInitial === '-- Select --') {
			MiddleInitial = 'LastName';
		}
		var LastName = document.getElementById('LastName').value;
		if (LastName === 'Not Used' || LastName === '-- Select --') {
			LastName = 'LastName';
		}
		var Suffix = document.getElementById('Suffix').value;
		if (Suffix === 'Not Used' || Suffix === '-- Select --') {
			Suffix = 'Suffix';
		}
		var LoanRepayments = document.getElementById('LoanRepayments').value;
		if (LoanRepayments === 'Not Used' || LoanRepayments === '-- Select --') {
			LoanRepayments = 'LoanRepayments';
		}
		var HoursWorkedYTD = document.getElementById('HoursWorkedYTD').value;
		if (HoursWorkedYTD === 'Not Used' || HoursWorkedYTD === '-- Select --') {
			HoursWorkedYTD = 'HoursWorkedYTD';
		}
		var Address1 = document.getElementById('Address1').value;
		if (Address1 === 'Not Used' || Address1 === '-- Select --') {
			Address1 = 'Address1';
		}
		var Address2 = document.getElementById('Address2').value;
		if (Address2 === 'Not Used' || Address2 === '-- Select --') {
			Address2 = 'Address2';
		}
		var City = document.getElementById('City').value;
		if (City === 'Not Used' || City === '-- Select --') {
			City = 'City';
		}
		var State = document.getElementById('State').value;
		if (State === 'Not Used' || State === '-- Select --') {
			State = 'State';
		}
		var PostalCode = document.getElementById('PostalCode').value;
		if (PostalCode === 'Not Used' || PostalCode === '-- Select --') {
			PostalCode = 'PostalCode';
		}
		var BirthDate = document.getElementById('BirthDate').value;
		if (BirthDate === 'Not Used' || BirthDate === '-- Select --') {
			BirthDate = 'BirthDate';
		}
		var HireDate = document.getElementById('HireDate').value;
		if (HireDate === 'Not Used' || HireDate === '-- Select --') {
			HireDate = 'HireDate';
		}
		var TerminationDate = document.getElementById('TerminationDate').value;
		if (TerminationDate === 'Not Used' || TerminationDate === '-- Select --') {
			TerminationDate = 'TerminationDate';
		}
		var RehireDate = document.getElementById('RehireDate').value;
		if (RehireDate === 'Not Used' || RehireDate === '-- Select --') {
			RehireDate = 'RehireDate';
		}
		var Company = document.getElementById('Company').value;
		if (Company === 'Not Used' || Company === '-- Select --') {
			Company = 'Company';
		}
		var EmployeeStatus = document.getElementById('EmployeeStatus').value;
		if (EmployeeStatus === 'Not Used' || EmployeeStatus === '-- Select --') {
			EmployeeStatus = 'EmployeeStatus';
		}
		var ContractNumber = document.getElementById('ContractNumber').value;
		if (ContractNumber === 'Not Used' || ContractNumber === '-- Select --') {
			ContractNumber = 'ContractNumber';
		}
		var EmployeeId = document.getElementById('EmployeeId').value;
		if (EmployeeId === 'Not Used' || EmployeeId === '-- Select --') {
			EmployeeId = 'EmployeeId';
		}
		var LocationName = document.getElementById('LocationName').value;
		if (LocationName === 'Not Used' || LocationName === '-- Select --') {
			LocationName = 'LocationName';
		}
		var Division = document.getElementById('Division').value;
		if (Division === 'Not Used' || Division === '-- Select --') {
			Division = 'Division';
		}
		var ErQacaMatch = document.getElementById('ErQacaMatch').value;
		if (ErQacaMatch === 'Not Used' || ErQacaMatch === '-- Select --') {
			ErQacaMatch = 'ErQacaMatch';
		}
		var CompensationYTD = document.getElementById('CompensationYTD').value;
		if (CompensationYTD === 'Not Used' || CompensationYTD === '-- Select --') {
			CompensationYTD = 'CompensationYTD';
		}
		var Email = document.getElementById('Email').value;
		if (Email === 'Not Used' || Email === '-- Select --') {
			Email = 'Email';
		}
		var PeriodGrossComp = document.getElementById('PeriodGrossComp').value;
		if (PeriodGrossComp === 'Not Used' || PeriodGrossComp === '-- Select --') {
			PeriodGrossComp = 'PeriodGrossComp';
		}
		var DivisionName = document.getElementById('DivisionName').value;
		if (DivisionName === 'Not Used' || DivisionName === '-- Select --') {
			DivisionName = 'DivisionName';
		}
		var Gender = document.getElementById('Gender').value;
		if (Gender === 'Not Used' || Gender === '-- Select --') {
			Gender = 'Gender';
		}
		var MaritalStatus = document.getElementById('MaritalStatus').value;
		if (MaritalStatus === 'Not Used' || MaritalStatus === '-- Select --') {
			MaritalStatus = 'MaritalStatus';
		}
		var PayFrequency = document.getElementById('PayFrequency').value;
		if (PayFrequency === 'Not Used' || PayFrequency === '-- Select --') {
			PayFrequency = 'PayFrequency';
		}
		var CorporateOfficer = document.getElementById('CorporateOfficer').value;
		if (
			CorporateOfficer === 'Not Used' ||
			CorporateOfficer === '-- Select --'
		) {
			CorporateOfficer = 'CorporateOfficer';
		}
		var IsUnion = document.getElementById('IsUnion').value;
		if (IsUnion === 'Not Used' || IsUnion === '-- Select --') {
			IsUnion = 'IsUnion';
		}
		var IsEligible = document.getElementById('IsEligible').value;
		if (IsEligible === 'Not Used' || IsEligible === '-- Select --') {
			IsEligible = 'IsEligible';
		}
		var IsHighlyCompensated = document.getElementById('IsHighlyCompensated')
			.value;
		if (
			IsHighlyCompensated === 'Not Used' ||
			IsHighlyCompensated === '-- Select --'
		) {
			IsHighlyCompensated = 'IsHighlyCompensated';
		}
		var SafeHarborMatch_2 = document.getElementById('SafeHarborMatch_2').value;
		if (
			SafeHarborMatch_2 === 'Not Used' ||
			SafeHarborMatch_2 === '-- Select --'
		) {
			SafeHarborMatch_2 = 'SafeHarborMatch_2';
		}
		var SafeHarborMatch_3 = document.getElementById('SafeHarborMatch_3').value;
		if (
			SafeHarborMatch_3 === 'Not Used' ||
			SafeHarborMatch_3 === '-- Select --'
		) {
			SafeHarborMatch_3 = 'SafeHarborMatch_3';
		}
		var SafeHarborMatch_4 = document.getElementById('SafeHarborMatch_4')
			.value;
		if (
			SafeHarborMatch_4 === 'Not Used' ||
			SafeHarborMatch_4 === '-- Select --'
		) {
			SafeHarborMatch_4 = 'SafeHarborMatch_4';
		}
		var Title = document.getElementById('Title').value;
		if (Title === 'Not Used' || Title === '-- Select --') {
			Title = 'Title';
		}
		var ERPS = document.getElementById('ERPS').value;
		if (ERPS === 'Not Used' || ERPS === '-- Select --') {
			ERPS = 'ERPS';
		}
		var CalcSrc_401k$ = document.getElementById('CalcSrc_401k$').value;
		if (CalcSrc_401k$ === 'Not Used' || CalcSrc_401k$ === '-- Select --') {
			CalcSrc_401k$ = 'CalcSrc_401k$';
		}
		var CalcSrc_401kPrct = document.getElementById('CalcSrc_401k%').value;
		if (
			CalcSrc_401kPrct === 'Not Used' ||
			CalcSrc_401kPrct === '-- Select --'
		) {
			CalcSrc_401kPrct = 'CalcSrc_401k%';
		}
		var CalcSrc_Roth$ = document.getElementById('CalcSrc_Roth$').value;
		if (CalcSrc_Roth$ === 'Not Used' || CalcSrc_Roth$ === '-- Select --') {
			CalcSrc_Roth$ = 'CalcSrc_Roth$';
		}
		var CalcSrc_RothPrct = document.getElementById('CalcSrc_Roth%').value;
		if (
			CalcSrc_RothPrct === 'Not Used' ||
			CalcSrc_RothPrct === '-- Select --'
		) {
			CalcSrc_RothPrct = 'CalcSrc_Roth%';
		}
		var CalcSrc_401k$Match = document.getElementById('CalcSrc_401k$Match')
			.value;
		if (
			CalcSrc_401k$Match === 'Not Used' ||
			CalcSrc_401k$Match === '-- Select --'
		) {
			CalcSrc_401k$Match = 'CalcSrc_401k$Match';
		}
		var CalcSrc_401kPrctMatch = document.getElementById('CalcSrc_401k%Match')
			.value;
		if (
			CalcSrc_401kPrctMatch === 'Not Used' ||
			CalcSrc_401kPrctMatch === '-- Select --'
		) {
			CalcSrc_401kPrctMatch = 'CalcSrc_401k%Match';
		}
		var CalcSrc_Roth$Match = document.getElementById('CalcSrc_Roth$Match')
			.value;
		if (
			CalcSrc_Roth$Match === 'Not Used' ||
			CalcSrc_Roth$Match === '-- Select --'
		) {
			CalcSrc_Roth$Match = 'CalcSrc_Roth$Match';
		}
		var CalcSrc_RothPrctMatch = document.getElementById('CalcSrc_Roth%Match')
			.value;
		if (
			CalcSrc_RothPrctMatch === 'Not Used' ||
			CalcSrc_RothPrctMatch === '-- Select --'
		) {
			CalcSrc_RothPrctMatch = 'CalcSrc_Roth%Match';
		}
		var CalcSrc_401k$CU = document.getElementById('CalcSrc_401k$CU').value;
		if (CalcSrc_401k$CU === 'Not Used' || CalcSrc_401k$CU === '-- Select --') {
			CalcSrc_401k$CU = 'CalcSrc_401k$CU';
		}
		var CalcSrc_401kPrctCU = document.getElementById('CalcSrc_401k%CU').value;
		if (
			CalcSrc_401kPrctCU === 'Not Used' ||
			CalcSrc_401kPrctCU === '-- Select --'
		) {
			CalcSrc_401kPrctCU = 'CalcSrc_401k%CU';
		}
		var CalcSrc_Roth$CU = document.getElementById('CalcSrc_Roth$CU').value;
		if (CalcSrc_Roth$CU === 'Not Used' || CalcSrc_Roth$CU === '-- Select --') {
			CalcSrc_Roth$CU = 'CalcSrc_Roth$CU';
		}
		var CalcSrc_RothPrctCU = document.getElementById('CalcSrc_Roth%CU').value;
		if (
			CalcSrc_RothPrctCU === 'Not Used' ||
			CalcSrc_RothPrctCU === '-- Select --'
		) {
			CalcSrc_RothPrctCU = 'CalcSrc_Roth%CU';
		}
		var CalcSrc_401k$CUMatch = document.getElementById('CalcSrc_401k$CUMatch')
			.value;
		if (
			CalcSrc_401k$CUMatch === 'Not Used' ||
			CalcSrc_401k$CUMatch === '-- Select --'
		) {
			CalcSrc_401k$CUMatch = 'CalcSrc_401k$CUMatch';
		}
		var CalcSrc_401kPrctCUMatch = document.getElementById(
			'CalcSrc_401k%CUMatch'
		).value;
		if (
			CalcSrc_401kPrctCUMatch === 'Not Used' ||
			CalcSrc_401kPrctCUMatch === '-- Select --'
		) {
			CalcSrc_401kPrctCUMatch = 'CalcSrc_401k%CUMatch';
		}
		var CalcSrc_Roth$CUMatch = document.getElementById('CalcSrc_Roth$CUMatch')
			.value;
		if (
			CalcSrc_Roth$CUMatch === 'Not Used' ||
			CalcSrc_Roth$CUMatch === '-- Select --'
		) {
			CalcSrc_Roth$CUMatch = 'CalcSrc_Roth$CUMatch';
		}
		var CalcSrc_RothPrctCUMatch = document.getElementById(
			'CalcSrc_Roth%CUMatch'
		).value;
		if (
			CalcSrc_RothPrctCUMatch === 'Not Used' ||
			CalcSrc_RothPrctCUMatch === '-- Select --'
		) {
			CalcSrc_RothPrctCUMatch = 'CalcSrc_Roth%CUMatch';
		}
		var CalcSrc_PartialHours1 = document.getElementById('CalcSrc_PartialHours1')
			.value;
		if (
			CalcSrc_PartialHours1 === 'Not Used' ||
			CalcSrc_PartialHours1 === '-- Select --'
		) {
			CalcSrc_PartialHours1 = 'CalcSrc_PartialHours1';
		}
		var CalcSrc_PartialHours2 = document.getElementById('CalcSrc_PartialHours2')
			.value;
		if (
			CalcSrc_PartialHours2 === 'Not Used' ||
			CalcSrc_PartialHours2 === '-- Select --'
		) {
			CalcSrc_PartialHours2 = 'CalcSrc_PartialHours2';
		}
		var CalcSrc_PartialHours3 = document.getElementById('CalcSrc_PartialHours3')
			.value;
		if (
			CalcSrc_PartialHours3 === 'Not Used' ||
			CalcSrc_PartialHours3 === '-- Select --'
		) {
			CalcSrc_PartialHours3 = 'CalcSrc_PartialHours3';
		}
		var CalcSrc_PartialHours4 = document.getElementById('CalcSrc_PartialHours4')
			.value;
		if (
			CalcSrc_PartialHours4 === 'Not Used' ||
			CalcSrc_PartialHours4 === '-- Select --'
		) {
			CalcSrc_PartialHours4 = 'CalcSrc_PartialHours4';
		}
		var CalcSrc_PartialHours5 = document.getElementById('CalcSrc_PartialHours5')
			.value;
		if (
			CalcSrc_PartialHours5 === 'Not Used' ||
			CalcSrc_PartialHours5 === '-- Select --'
		) {
			CalcSrc_PartialHours5 = 'CalcSrc_PartialHours5';
		}
		var CalcSrc_PartialHours6 = document.getElementById('CalcSrc_PartialHours6')
			.value;
		if (
			CalcSrc_PartialHours6 === 'Not Used' ||
			CalcSrc_PartialHours6 === '-- Select --'
		) {
			CalcSrc_PartialHours6 = 'CalcSrc_PartialHours6';
		}
		var CalcSrc_PartialHours7 = document.getElementById('CalcSrc_PartialHours7')
			.value;
		if (
			CalcSrc_PartialHours7 === 'Not Used' ||
			CalcSrc_PartialHours7 === '-- Select --'
		) {
			CalcSrc_PartialHours7 = 'CalcSrc_PartialHours7';
		}
		var CalcSrc_PartialHours8 = document.getElementById('CalcSrc_PartialHours8')
			.value;
		if (
			CalcSrc_PartialHours8 === 'Not Used' ||
			CalcSrc_PartialHours8 === '-- Select --'
		) {
			CalcSrc_PartialHours8 = 'CalcSrc_PartialHours8';
		}
		var CalcSrc_PartialHours9 = document.getElementById('CalcSrc_PartialHours9')
			.value;
		if (
			CalcSrc_PartialHours9 === 'Not Used' ||
			CalcSrc_PartialHours9 === '-- Select --'
		) {
			CalcSrc_PartialHours9 = 'CalcSrc_PartialHours9';
		}
		var CalcSrc_PartialHours10 = document.getElementById(
			'CalcSrc_PartialHours10'
		).value;
		if (
			CalcSrc_PartialHours10 === 'Not Used' ||
			CalcSrc_PartialHours10 === '-- Select --'
		) {
			CalcSrc_PartialHours10 = 'CalcSrc_PartialHours10';
		}
		var CalcSrc_PartialHours11 = document.getElementById(
			'CalcSrc_PartialHours11'
		).value;
		if (
			CalcSrc_PartialHours11 === 'Not Used' ||
			CalcSrc_PartialHours11 === '-- Select --'
		) {
			CalcSrc_PartialHours11 = 'CalcSrc_PartialHours11';
		}
		var CalcSrc_PartialHours12 = document.getElementById(
			'CalcSrc_PartialHours12'
		).value;
		if (
			CalcSrc_PartialHours12 === 'Not Used' ||
			CalcSrc_PartialHours12 === '-- Select --'
		) {
			CalcSrc_PartialHours12 = 'CalcSrc_PartialHours12';
		}
		var CalcSrc_PartialHours13 = document.getElementById(
			'CalcSrc_PartialHours13'
		).value;
		if (
			CalcSrc_PartialHours13 === 'Not Used' ||
			CalcSrc_PartialHours13 === '-- Select --'
		) {
			CalcSrc_PartialHours13 = 'CalcSrc_PartialHours13';
		}
		var CalcSrc_PartialHours14 = document.getElementById(
			'CalcSrc_PartialHours14'
		).value;
		if (
			CalcSrc_PartialHours14 === 'Not Used' ||
			CalcSrc_PartialHours14 === '-- Select --'
		) {
			CalcSrc_PartialHours14 = 'CalcSrc_PartialHours14';
		}
		var CalcSrc_PartialHours15 = document.getElementById(
			'CalcSrc_PartialHours15'
		).value;
		if (
			CalcSrc_PartialHours15 === 'Not Used' ||
			CalcSrc_PartialHours15 === '-- Select --'
		) {
			CalcSrc_PartialHours15 = 'CalcSrc_PartialHours15';
		}
		var CalcSrc_PartialHours16 = document.getElementById(
			'CalcSrc_PartialHours16'
		).value;
		if (
			CalcSrc_PartialHours16 === 'Not Used' ||
			CalcSrc_PartialHours16 === '-- Select --'
		) {
			CalcSrc_PartialHours16 = 'CalcSrc_PartialHours16';
		}
		var CalcSrc_PartialHours17 = document.getElementById(
			'CalcSrc_PartialHours17'
		).value;
		if (
			CalcSrc_PartialHours17 === 'Not Used' ||
			CalcSrc_PartialHours17 === '-- Select --'
		) {
			CalcSrc_PartialHours17 = 'CalcSrc_PartialHours17';
		}
		var CalcSrc_PartialHours18 = document.getElementById(
			'CalcSrc_PartialHours18'
		).value;
		if (
			CalcSrc_PartialHours18 === 'Not Used' ||
			CalcSrc_PartialHours18 === '-- Select --'
		) {
			CalcSrc_PartialHours18 = 'CalcSrc_PartialHours18';
		}
		var CalcSrc_PartialHours19 = document.getElementById(
			'CalcSrc_PartialHours19'
		).value;
		if (
			CalcSrc_PartialHours19 === 'Not Used' ||
			CalcSrc_PartialHours19 === '-- Select --'
		) {
			CalcSrc_PartialHours19 = 'CalcSrc_PartialHours19';
		}
		var CalcSrc_PartialHours20 = document.getElementById(
			'CalcSrc_PartialHours20'
		).value;
		if (
			CalcSrc_PartialHours20 === 'Not Used' ||
			CalcSrc_PartialHours20 === '-- Select --'
		) {
			CalcSrc_PartialHours20 = 'CalcSrc_PartialHours20';
		}
		var stLoan = document.getElementById('Loan Number 1').value;
		if (stLoan === 'Not Used' || stLoan === '-- Select --') {
			stLoan = '1stLoan';
		}
		var CalcSrc_LoanPmt1 = document.getElementById('CalcSrc_LoanPmt1').value;
		if (
			CalcSrc_LoanPmt1 === 'Not Used' ||
			CalcSrc_LoanPmt1 === '-- Select --'
		) {
			CalcSrc_LoanPmt1 = 'CalcSrc_LoanPmt1';
		}
		var ndLoan = document.getElementById('Loan Number 2').value;
		if (ndLoan === 'Not Used' || ndLoan === '-- Select --') {
			ndLoan = '2ndLoan';
		}

		var CalcSrc_LoanPmt2 = document.getElementById('CalcSrc_LoanPmt2').value;
		if (
			CalcSrc_LoanPmt2 === 'Not Used' ||
			CalcSrc_LoanPmt2 === '-- Select --'
		) {
			CalcSrc_LoanPmt2 = 'CalcSrc_LoanPmt2';
		}
		var thrdLoan = document.getElementById('Loan Number 3').value;
		if (thrdLoan === 'Not Used' || thrdLoan === '-- Select --') {
			thrdLoan = '3rdLoan';
		}
		var CalcSrc_LoanPmt3 = document.getElementById('CalcSrc_LoanPmt3').value;
		if (
			CalcSrc_LoanPmt3 === 'Not Used' ||
			CalcSrc_LoanPmt3 === '-- Select --'
		) {
			CalcSrc_LoanPmt3 = 'CalcSrc_LoanPmt3';
		}
		var CalcSrc_LoanPmt4 = document.getElementById('CalcSrc_LoanPmt4').value;
		if (
			CalcSrc_LoanPmt4 === 'Not Used' ||
			CalcSrc_LoanPmt4 === '-- Select --'
		) {
			CalcSrc_LoanPmt4 = 'CalcSrc_LoanPmt4';
		}
		var CalcSrc_LoanPmt5 = document.getElementById('CalcSrc_LoanPmt5').value;
		if (
			CalcSrc_LoanPmt5 === 'Not Used' ||
			CalcSrc_LoanPmt5 === '-- Select --'
		) {
			CalcSrc_LoanPmt5 = 'CalcSrc_LoanPmt5';
		}
		var CalcSrc_LoanPmt6 = document.getElementById('CalcSrc_LoanPmt6').value;
		if (
			CalcSrc_LoanPmt6 === 'Not Used' ||
			CalcSrc_LoanPmt6 === '-- Select --'
		) {
			CalcSrc_LoanPmt6 = 'CalcSrc_LoanPmt6';
		}
		var CalcSrc_LoanPmt7 = document.getElementById('CalcSrc_LoanPmt7').value;
		if (
			CalcSrc_LoanPmt7 === 'Not Used' ||
			CalcSrc_LoanPmt7 === '-- Select --'
		) {
			CalcSrc_LoanPmt7 = 'CalcSrc_LoanPmt7';
		}
		var CalcSrc_LoanPmt8 = document.getElementById('CalcSrc_LoanPmt8').value;
		if (
			CalcSrc_LoanPmt8 === 'Not Used' ||
			CalcSrc_LoanPmt8 === '-- Select --'
		) {
			CalcSrc_LoanPmt8 = 'CalcSrc_LoanPmt8';
		}
		var CalcSrc_LoanPmt9 = document.getElementById('CalcSrc_LoanPmt9').value;
		if (
			CalcSrc_LoanPmt9 === 'Not Used' ||
			CalcSrc_LoanPmt9 === '-- Select --'
		) {
			CalcSrc_LoanPmt9 = 'CalcSrc_LoanPmt9';
		}
		var CalcSrc_LoanPmt10 = document.getElementById('CalcSrc_LoanPmt10').value;
		if (
			CalcSrc_LoanPmt10 === 'Not Used' ||
			CalcSrc_LoanPmt10 === '-- Select --'
		) {
			CalcSrc_LoanPmt10 = 'CalcSrc_LoanPmt10';
		}
		var CalcSrc_LoanPmt11 = document.getElementById('CalcSrc_LoanPmt11').value;
		if (
			CalcSrc_LoanPmt11 === 'Not Used' ||
			CalcSrc_LoanPmt11 === '-- Select --'
		) {
			CalcSrc_LoanPmt11 = 'CalcSrc_LoanPmt11';
		}
		var CalcSrc_LoanPmt12 = document.getElementById('CalcSrc_LoanPmt12').value;
		if (
			CalcSrc_LoanPmt12 === 'Not Used' ||
			CalcSrc_LoanPmt12 === '-- Select --'
		) {
			CalcSrc_LoanPmt12 = 'CalcSrc_LoanPmt12';
		}
		var CalcSrc_LoanPmt13 = document.getElementById('CalcSrc_LoanPmt13').value;
		if (
			CalcSrc_LoanPmt13 === 'Not Used' ||
			CalcSrc_LoanPmt13 === '-- Select --'
		) {
			CalcSrc_LoanPmt13 = 'CalcSrc_LoanPmt13';
		}
		var CalcSrc_LoanPmt14 = document.getElementById('CalcSrc_LoanPmt14').value;
		if (
			CalcSrc_LoanPmt14 === 'Not Used' ||
			CalcSrc_LoanPmt14 === '-- Select --'
		) {
			CalcSrc_LoanPmt14 = 'CalcSrc_LoanPmt14';
		}
		var CalcSrc_LoanPmt15 = document.getElementById('CalcSrc_LoanPmt15').value;
		if (
			CalcSrc_LoanPmt15 === 'Not Used' ||
			CalcSrc_LoanPmt15 === '-- Select --'
		) {
			CalcSrc_LoanPmt15 = 'CalcSrc_LoanPmt15';
		}
		var CalcSrc_LoanPmt16 = document.getElementById('CalcSrc_LoanPmt16').value;
		if (
			CalcSrc_LoanPmt16 === 'Not Used' ||
			CalcSrc_LoanPmt16 === '-- Select --'
		) {
			CalcSrc_LoanPmt16 = 'CalcSrc_LoanPmt16';
		}
		var CalcSrc_LoanPmt17 = document.getElementById('CalcSrc_LoanPmt17').value;
		if (
			CalcSrc_LoanPmt17 === 'Not Used' ||
			CalcSrc_LoanPmt17 === '-- Select --'
		) {
			CalcSrc_LoanPmt17 = 'CalcSrc_LoanPmt17';
		}
		var CalcSrc_ExclComp1 = document.getElementById('CalcSrc_ExclComp1').value;
		if (
			CalcSrc_ExclComp1 === 'Not Used' ||
			CalcSrc_ExclComp1 === '-- Select --'
		) {
			CalcSrc_ExclComp1 = 'CalcSrc_ExclComp1';
		}
		var CalcSrc_ExclComp2 = document.getElementById('CalcSrc_ExclComp2').value;
		if (
			CalcSrc_ExclComp2 === 'Not Used' ||
			CalcSrc_ExclComp2 === '-- Select --'
		) {
			CalcSrc_ExclComp2 = 'CalcSrc_ExclComp2';
		}
		var CalcSrc_ExclComp3 = document.getElementById('CalcSrc_ExclComp3').value;
		if (
			CalcSrc_ExclComp3 === 'Not Used' ||
			CalcSrc_ExclComp3 === '-- Select --'
		) {
			CalcSrc_ExclComp3 = 'CalcSrc_ExclComp3';
		}
		var CalcSrc_ExclComp4 = document.getElementById('CalcSrc_ExclComp4').value;
		if (
			CalcSrc_ExclComp4 === 'Not Used' ||
			CalcSrc_ExclComp4 === '-- Select --'
		) {
			CalcSrc_ExclComp4 = 'CalcSrc_ExclComp4';
		}
		var CalcSrc_ExclComp5 = document.getElementById('CalcSrc_ExclComp5').value;
		if (
			CalcSrc_ExclComp5 === 'Not Used' ||
			CalcSrc_ExclComp5 === '-- Select --'
		) {
			CalcSrc_ExclComp5 = 'CalcSrc_ExclComp5';
		}
		var CalcSrc_ExclComp6 = document.getElementById('CalcSrc_ExclComp6').value;
		if (
			CalcSrc_ExclComp6 === 'Not Used' ||
			CalcSrc_ExclComp6 === '-- Select --'
		) {
			CalcSrc_ExclComp6 = 'CalcSrc_ExclComp6';
		}
		var CalcSrc_ExclComp7 = document.getElementById('CalcSrc_ExclComp7').value;
		if (
			CalcSrc_ExclComp7 === 'Not Used' ||
			CalcSrc_ExclComp7 === '-- Select --'
		) {
			CalcSrc_ExclComp7 = 'CalcSrc_ExclComp7';
		}
		var CalcSrc_ExclComp8 = document.getElementById('CalcSrc_ExclComp8').value;
		if (
			CalcSrc_ExclComp8 === 'Not Used' ||
			CalcSrc_ExclComp8 === '-- Select --'
		) {
			CalcSrc_ExclComp8 = 'CalcSrc_ExclComp8';
		}
		var CalcSrc_ExclComp9 = document.getElementById('CalcSrc_ExclComp9').value;
		if (
			CalcSrc_ExclComp9 === 'Not Used' ||
			CalcSrc_ExclComp9 === '-- Select --'
		) {
			CalcSrc_ExclComp9 = 'CalcSrc_ExclComp9';
		}
		var CalcSrc_ExclComp10 = document.getElementById('CalcSrc_ExclComp10')
			.value;
		if (
			CalcSrc_ExclComp10 === 'Not Used' ||
			CalcSrc_ExclComp10 === '-- Select --'
		) {
			CalcSrc_ExclComp10 = 'CalcSrc_ExclComp10';
		}
		var WorkEmail = document.getElementById('WorkEmail').value;
		if (WorkEmail === 'Not Used' || WorkEmail === '-- Select --') {
			WorkEmail = 'WorkEmail';
		}
		var HomePhone = document.getElementById('HomePhone').value;
		if (HomePhone === 'Not Used' || HomePhone === '-- Select --') {
			HomePhone = 'HomePhone';
		}
		var ERQACACUMatch = document.getElementById('ERQACACUMatch').value;
		if (ERQACACUMatch === 'Not Used' || ERQACACUMatch === '-- Select --') {
			ERQACACUMatch = 'ERQACACUMatch';
		}
		var DavisBacon = document.getElementById('DavisBacon').value;
		if (DavisBacon === 'Not Used' || DavisBacon === '-- Select --') {
			DavisBacon = 'DavisBacon';
		}
		var Voya_DepartmentCode = document.getElementById('Voya_DepartmentCode')
			.value;
		if (
			Voya_DepartmentCode === 'Not Used' ||
			Voya_DepartmentCode === '-- Select --'
		) {
			Voya_DepartmentCode = 'Voya_DepartmentCode';
		}
		var ERSafeHarborNonMatch_NonElective = document.getElementById(
			'SafeHarbor NonMatch NonElective'
		).value;
		if (
			ERSafeHarborNonMatch_NonElective === 'Not Used' ||
			ERSafeHarborNonMatch_NonElective === '-- Select --'
		) {
			ERSafeHarborNonMatch_NonElective = 'ERSafeHarborNonMatch_NonElective';
		}
		var JH_Static_StatusDate = document.getElementById('YTDHrsWkCompDt').value;
		if (
			JH_Static_StatusDate === 'Not Used' ||
			JH_Static_StatusDate === '-- Select --'
		) {
			JH_Static_StatusDate = 'JH_Static_StatusDate';
		}
			// var StatusChangeDate = document.getElementById('StatusChangeDate').value;
			// if (
			// 	StatusChangeDate === 'Not Used' ||
			// 	StatusChangeDate === '-- Select --'
			// ) {
			// 	StatusChangeDate = 'StatusChangeDate';
			// }
			// var StatusChangeReason = document.getElementById('StatusChangeReason')
			// 	.value;
			// if (
			// 	StatusChangeReason === 'Not Used' ||
			// 	StatusChangeReason === '-- Select --'
			// ) {
			// 	StatusChangeReason = 'StatusChangeReason';
			// }

			const newMap = {
				companyName: companyName,
				companyID: companyID,
				ID: ID,
				CreateDate: CreateDate,
				UpdateDate: UpdateDate,
				RecordStatus: RecordStatus,
				Source: Source,
				SourceId: SourceId,
				BatchNumber: BatchNumber,
				CompletedStages: CompletedStages,
				EIN: EIN,
				Location: Location,
				TaxId: TaxId,
				FirstName: FirstName,
				MiddleName: MiddleName,
				LastName: LastName,
				Suffix: Suffix,
				EEPreTax: EEPreTax,
				LoanRepayments: LoanRepayments,
				HoursWorkedYTD: HoursWorkedYTD,
				Address1: Address1,
				Address2: Address2,
				City: City,
				State: State,
				PostalCode: PostalCode,
				BirthDate: BirthDate,
				HireDate: HireDate,
				TerminationDate: TerminationDate,
				RehireDate: RehireDate,
				Company: Company,
				EmployeeStatus: EmployeeStatus,
				EligibilityIndicator: EligibilityIndicator,
				CombinationRecordIdentifier: CombinationRecordIdentifier,
				SanityCheckFlag: SanityCheckFlag,
				User_Defined_Float: User_Defined_Float,
				Roth401kEE: Roth401kEE,
				stLoan: stLoan,
				kLoan1: kLoan1,
				ndLoan: ndLoan,
				kLoan2: kLoan2,
				ERMatch: ERMatch,
				StatusChangeDate: StatusChangeDate,
				StatusChangeReason: StatusChangeReason,
				EmployeeEligibilityDate: EmployeeEligibilityDate,
				EmployeeStartDate: EmployeeStartDate,
				ContractNumber: ContractNumber,
				EmployerId: EmployerId,
				AscLocation: AscLocation,
				LastSanityCheckDate: LastSanityCheckDate,
				PlanId: PlanId,
				EmployeeId: EmployeeId,
				LocationName: LocationName,
				TransType: TransType,
				DeferralPercentage: DeferralPercentage,
				DeferralAmount: DeferralAmount,
				AfterTaxPercentage: AfterTaxPercentage,
				AfterTaxAmount: AfterTaxAmount,
				DeferralPercentEffectiveDate: DeferralPercentEffectiveDate,
				Division: Division,
				TransamericaRequestDate: TransamericaRequestDate,
				TransamericaEffectivePayrollChangeDate: TransamericaEffectivePayrollChangeDate,
				PriorPreTaxContribution: PriorPreTaxContribution,
				PriorRothContribution: PriorRothContribution,
				NewPreTaxContribution: NewPreTaxContribution,
				NewRothContribution: NewRothContribution,
				HardshipSuspension: HardshipSuspension,
				HardshipLiftDate: HardshipLiftDate,
				PreTaxCatchUpPercent: PreTaxCatchUpPercent,
				PreTaxCatchUpAmount: PreTaxCatchUpAmount,
				RothCatchUpPercent: RothCatchUpPercent,
				RothCatchUpAmount: RothCatchUpAmount,
				TransamericaDateChanged: TransamericaDateChanged,
				MiddleInitial: MiddleInitial,
				ErQacaMatch: ErQacaMatch,
				CompensationYTD: CompensationYTD,
				Email: Email,
				PeriodHours: PeriodHours,
				PeriodGrossComp: PeriodGrossComp,
				Loan1YTD: Loan1YTD,
				Loan2YTD: Loan2YTD,
				EEPreTaxYTD: EEPreTaxYTD,
				Roth401kEEYTD: Roth401kEEYTD,
				ERMatchYTD: ERMatchYTD,
				Roth401kERMatch: Roth401kERMatch,
				Roth401kERMatchYTD: Roth401kERMatchYTD,
				DivisionName: DivisionName,
				TermCode: TermCode,
				NeedsRepair: NeedsRepair,
				RepairNotes: RepairNotes,
				Gender: Gender,
				MaritalStatus: MaritalStatus,
				PayFrequency: PayFrequency,
				CorporateOfficer: CorporateOfficer,
				IsUnion: IsUnion,
				IsEligible: IsEligible,
				IsHighlyCompensated: IsHighlyCompensated,
				CheckDate: CheckDate,
				PayrollEndDate: PayrollEndDate,
				EEPreTaxPlan1: EEPreTaxPlan1,
				EEPreTaxContrib1: EEPreTaxContrib1,
				EEPreTaxContrib1Desc: EEPreTaxContrib1Desc,
				EEPreTaxContrib1Percent: EEPreTaxContrib1Percent,
				EEPreTaxContrib1Dollars: EEPreTaxContrib1Dollars,
				EEPreTaxPlan2: EEPreTaxPlan2,
				EEPreTaxContrib2: EEPreTaxContrib2,
				EEPreTaxContrib2Desc: EEPreTaxContrib2Desc,
				EEPreTaxContrib2Percent: EEPreTaxContrib2Percent,
				EEPreTaxContrib2Dollars: EEPreTaxContrib2Dollars,
				EEPreTaxPlan3: EEPreTaxPlan3,
				EEPreTaxContrib3: EEPreTaxContrib3,
				EEPreTaxContrib3Desc: EEPreTaxContrib3Desc,
				EEPreTaxContrib3Percent: EEPreTaxContrib3Percent,
				EEPreTaxContrib3Dollars: EEPreTaxContrib3Dollars,
				PostTaxPlan1: PostTaxPlan1,
				PostTaxContrib1: PostTaxContrib1,
				PostTaxContrib1Desc: PostTaxContrib1Desc,
				PostTaxContrib1Percent: PostTaxContrib1Percent,
				PostTaxContrib1Dollars: PostTaxContrib1Dollars,
				PostTaxPlan2: PostTaxPlan2,
				PostTaxContrib2: PostTaxContrib2,
				PostTaxContrib2Desc: PostTaxContrib2Desc,
				PostTaxContrib2Percent: PostTaxContrib2Percent,
				PostTaxContrib2Dollars: PostTaxContrib2Dollars,
				PostTaxPlan3: PostTaxPlan3,
				PostTaxContrib3: PostTaxContrib3,
				PostTaxContrib3Desc: PostTaxContrib3Desc,
				PostTaxContrib3Percent: PostTaxContrib3Percent,
				PostTaxContrib3Dollars: PostTaxContrib3Dollars,
				CatchUpPlan1: CatchUpPlan1,
				CatchUpPlan1Contrib: CatchUpPlan1Contrib,
				CatchUpPlan1ContribDesc: CatchUpPlan1ContribDesc,
				CatchUpPlan2: CatchUpPlan2,
				CatchUpPlan2Contrib: CatchUpPlan2Contrib,
				CatchUpPlan2ContribDesc: CatchUpPlan2ContribDesc,
				CatchUpPlan3: CatchUpPlan3,
				CatchUpPlan3Contrib: CatchUpPlan3Contrib,
				CatchUpPlan3ContribDesc: CatchUpPlan3ContribDesc,
				ERMatch2: ERMatch2,
				ERMatch3: ERMatch3,
				ERCatchUpMatch: ERCatchUpMatch,
				ERCatchUpMatch2: ERCatchUpMatch2,
				ERCatchUpMatch3: ERCatchUpMatch3,
				thrdLoan: thrdLoan,
				kLoan3: kLoan3,
				SafeHarborMatch: SafeHarborMatch,
				Title: Title,
				EEPostTax: EEPostTax,
				EEMandatoryAfterTax: EEMandatoryAfterTax,
				ERNonMatch_ProfitSharing: ERNonMatch_ProfitSharing,
				ERSafeHarborNonMatch_NonElective: ERSafeHarborNonMatch_NonElective,
				ERMoneyPurchase: ERMoneyPurchase,
				ERFullyVestedMoneyPurchase: ERFullyVestedMoneyPurchase,
				ERPrevailingWage: ERPrevailingWage,
				QMAC: QMAC,
				QNEC: QNEC,
				ERQACA_NonElective: ERQACA_NonElective,
				ERQACAMatch: ERQACAMatch,
				ExcludedCompensationYTD: ExcludedCompensationYTD,
				IntlCityProvince: IntlCityProvince,
				IntlCountry: IntlCountry,
				Loan_Payoff: Loan_Payoff,
				IntlZipPostalCode: IntlZipPostalCode,
				JH_TransNum: JH_TransNum,
				JH_PRDate: JH_PRDate,
				JH_Calc_EEDef: JH_Calc_EEDef,
				JH_Calc_SHMac: JH_Calc_SHMac,
				JH_Calc_ERMat: JH_Calc_ERMat,
				JH_Erps: JH_Erps,
				JH_EE403: JH_EE403,
				JH_EE457: JH_EE457,
				JH_EEIra: JH_EEIra,
				JH_Calc_EERot: JH_Calc_EERot,
				JH_EERRT: JH_EERRT,
				JH_EESEP: JH_EESEP,
				JH_EESIR: JH_EESIR,
				ERPS: ERPS,
				RKCalcComplete: RKCalcComplete,
				CalcSrc_401k$: CalcSrc_401k$,
				CalcSrc_401kPrct: CalcSrc_401kPrct,
				CalcSrc_Roth$: CalcSrc_Roth$,
				CalcSrc_RothPrct: CalcSrc_RothPrct,
				CalcSrc_401k$Match: CalcSrc_401k$Match,
				CalcSrc_401kPrctMatch: CalcSrc_401kPrctMatch,
				CalcSrc_Roth$Match: CalcSrc_Roth$Match,
				CalcSrc_RothPrctMatch: CalcSrc_RothPrctMatch,
				CalcSrc_401k$CU: CalcSrc_401k$CU,
				CalcSrc_401kPrctCU: CalcSrc_401kPrctCU,
				CalcSrc_Roth$CU: CalcSrc_Roth$CU,
				CalcSrc_RothPrctCU: CalcSrc_RothPrctCU,
				CalcSrc_401k$CUMatch: CalcSrc_401k$CUMatch,
				CalcSrc_401kPrctCUMatch: CalcSrc_401kPrctCUMatch,
				CalcSrc_Roth$CUMatch: CalcSrc_Roth$CUMatch,
				CalcSrc_RothPrctCUMatch: CalcSrc_RothPrctCUMatch,
				CalcSrc_PartialHours1: CalcSrc_PartialHours1,
				CalcSrc_PartialHours2: CalcSrc_PartialHours2,
				CalcSrc_PartialHours3: CalcSrc_PartialHours3,
				CalcSrc_PartialHours4: CalcSrc_PartialHours4,
				CalcSrc_PartialHours5: CalcSrc_PartialHours5,
				CalcSrc_PartialHours6: CalcSrc_PartialHours6,
				CalcSrc_PartialHours7: CalcSrc_PartialHours7,
				CalcSrc_PartialHours8: CalcSrc_PartialHours8,
				CalcSrc_PartialHours9: CalcSrc_PartialHours9,
				CalcSrc_PartialHours10: CalcSrc_PartialHours10,
				CalcSrc_PartialHours11: CalcSrc_PartialHours11,
				CalcSrc_PartialHours12: CalcSrc_PartialHours12,
				CalcSrc_PartialHours13: CalcSrc_PartialHours13,
				CalcSrc_PartialHours14: CalcSrc_PartialHours14,
				CalcSrc_PartialHours15: CalcSrc_PartialHours15,
				CalcSrc_PartialHours16: CalcSrc_PartialHours16,
				CalcSrc_PartialHours17: CalcSrc_PartialHours17,
				CalcSrc_PartialHours18: CalcSrc_PartialHours18,
				CalcSrc_PartialHours19: CalcSrc_PartialHours19,
				CalcSrc_PartialHours20: CalcSrc_PartialHours20,
				CalcSrc_LoanPmt1: CalcSrc_LoanPmt1,
				CalcSrc_LoanPmt2: CalcSrc_LoanPmt2,
				CalcSrc_LoanPmt3: CalcSrc_LoanPmt3,
				CalcSrc_LoanPmt4: CalcSrc_LoanPmt4,
				CalcSrc_LoanPmt5: CalcSrc_LoanPmt5,
				CalcSrc_LoanPmt6: CalcSrc_LoanPmt6,
				CalcSrc_LoanPmt7: CalcSrc_LoanPmt7,
				CalcSrc_LoanPmt8: CalcSrc_LoanPmt8,
				CalcSrc_LoanPmt9: CalcSrc_LoanPmt9,
				CalcSrc_LoanPmt10: CalcSrc_LoanPmt10,
				CalcSrc_LoanPmt11: CalcSrc_LoanPmt11,
				CalcSrc_LoanPmt12: CalcSrc_LoanPmt12,
				CalcSrc_LoanPmt13: CalcSrc_LoanPmt13,
				CalcSrc_LoanPmt14: CalcSrc_LoanPmt14,
				CalcSrc_LoanPmt15: CalcSrc_LoanPmt15,
				CalcSrc_LoanPmt16: CalcSrc_LoanPmt16,
				CalcSrc_LoanPmt17: CalcSrc_LoanPmt17,
				CalcSrc_ExclComp1: CalcSrc_ExclComp1,
				CalcSrc_ExclComp2: CalcSrc_ExclComp2,
				CalcSrc_ExclComp3: CalcSrc_ExclComp3,
				CalcSrc_ExclComp4: CalcSrc_ExclComp4,
				CalcSrc_ExclComp5: CalcSrc_ExclComp5,
				CalcSrc_ExclComp6: CalcSrc_ExclComp6,
				CalcSrc_ExclComp7: CalcSrc_ExclComp7,
				CalcSrc_ExclComp8: CalcSrc_ExclComp8,
				CalcSrc_ExclComp9: CalcSrc_ExclComp9,
				CalcSrc_ExclComp10: CalcSrc_ExclComp10,
				TotalLoans: TotalLoans,
				TotalPeriodHours: TotalPeriodHours,
				TotalExcludedComp: TotalExcludedComp,
				Roth401kERCUMatch: Roth401kERCUMatch,
				TotalEEPreTax: TotalEEPreTax,
				JH_Last_Suffix: JH_Last_Suffix,
				JH_NamePrefix: JH_NamePrefix,
				JH_Country: JH_Country,
				JH_EmployeeStatus: JH_EmployeeStatus,
				JH_EligibilityIndicator: JH_EligibilityIndicator,
				JH_OptOutIndicator: JH_OptOutIndicator,
				JH_BaseSalary: JH_BaseSalary,
				JH_BfTxDefPct: JH_BfTxDefPct,
				JH_DesigRothPct: JH_DesigRothPct,
				JH_BfTxFltDoDef: JH_BfTxFltDoDef,
				JH_DesigRothAmt: JH_DesigRothAmt,
				JH_Static_EmpStatus: JH_Static_EmpStatus,
				JH_Static_StatusDate: JH_Static_StatusDate,
				JH_Static_IsEligible: JH_Static_IsEligible,
				JH_Static_EligibleDate: JH_Static_EligibleDate,
				StaticSrc_CheckDate: StaticSrc_CheckDate,
				AlwaysBlank: AlwaysBlank,
				WorkEmail: WorkEmail,
				HomePhone: HomePhone,
				EMP_Calc_Amt1: EMP_Calc_Amt1,
				EMP_Calc_Amt2: EMP_Calc_Amt2,
				EMP_Calc_Amt3: EMP_Calc_Amt3,
				EMP_Calc_Amt4: EMP_Calc_Amt4,
				EMP_Calc_Amt5: EMP_Calc_Amt5,
				EMP_Calc_Amt6: EMP_Calc_Amt6,
				EMP_Calc_Amt7: EMP_Calc_Amt7,
				EMP_Calc_Amt8: EMP_Calc_Amt8,
				EMP_Calc_Amt9: EMP_Calc_Amt9,
				EMP_Calc_Amt10: EMP_Calc_Amt10,
				EMP_SalaryAmountQualifier: EMP_SalaryAmountQualifier,
				SalaryAmount: SalaryAmount,
				EMP_Static_ContractNumber: EMP_Static_ContractNumber,
				ERQACACUMatch: ERQACACUMatch,
				DavisBacon: DavisBacon,
				TotalNonExcludedComp: TotalNonExcludedComp,
				PayrollStartDate: PayrollStartDate,
				Voya_RecordType: Voya_RecordType,
				Voya_AnniversaryHours: Voya_AnniversaryHours,
				Voya_EligibilityCode: Voya_EligibilityCode,
				Voya_ZipExtension: Voya_ZipExtension,
				Voya_LocationCode: Voya_LocationCode,
				Voya_EmployerID: Voya_EmployerID,
				Voya_IRSCode: Voya_IRSCode,
				Voya_DepartmentCode: Voya_DepartmentCode,
				WasADPRunProcessed: WasADPRunProcessed,
				ASC_Elig_Date1: ASC_Elig_Date1,
				ASC_Elig_Date2: ASC_Elig_Date2,
				ASC_Elig_Date3: ASC_Elig_Date3,
				SafeHarborMatch_2: SafeHarborMatch_2,
				SafeHarborMatch_3: SafeHarborMatch_3,
				SafeHarborMatch_4: SafeHarborMatch_4,
				SftpExportComplete: SftpExportComplete,
			};
		console.log('I am about to enter the ajax request.');
		$.ajax({
			type: 'POST',
			url: URL + '/api/createMap',
			data: JSON.stringify(newMap),
			dataType: 'json',
			contentType: 'application/json',
		})
			.done(res => {
				//TODO: need to create ouput (what should it do?)
				console.log(res);
				console.log(res.mapping._id);
				console.log('All Done!');
				alert(`${res.mapping.companyName}'s Mapping Has Been Saved!`);
				location.reload();
				// getMapById(res.mapping.companyID);
			})
			.fail((jqXHR, error, errorThrown) => {
				console.error(jqXHR);
				console.error(error);
				console.error(errorThrown);
			});
	});
}

var employerConfigCsv = []; //*json data by employer

const papaUnparseConfig = {
	quotes: false, //or array of booleans
	quoteChar: '"',
	escapeChar: '"',
	delimiter: ',',
	header: true,
	newline: '\r\n',
	skipEmptyLines: false, //or 'greedy',
	columns: null, //or array of strings
};

function eventHandlers() {
	createNewMapping();
}

$(eventHandlers);
