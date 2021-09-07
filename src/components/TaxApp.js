// @ts-nocheck
import React, { useState } from 'react';
import Results from './Results';
import TAMaths from '../Maths/TaxApp.maths';

const TaxApp = () => {
	const [salary, setSalary] = useState();
	const [annualTaxDue, setAnnualTaxDue] = useState();
	const [annualNIDue, setAnnualNIDue] = useState();
	const [takeHome, setTakeHome] = useState();
	const [resultsVisible, setResultsVisisble] = useState();
	const [inputError, setInputError] = useState(false);

	const calculateTakeHomePay = () => {
		const isSalaryLessThanUntaxable =
			salary < TAMaths.constants.untaxableIncome;

		const isSalaryGreaterThanUntaxable =
			salary >= TAMaths.constants.untaxableIncome;

		const isSalaryLessThanTopTaxBraket =
			salary <= TAMaths.constants.topTaxBraket;

		const isSalaryGreaterThanTopTaxBraket =
			salary >= TAMaths.constants.topTaxBraket;

		const renderUntaxableValues = (income) => {
			setTakeHome(TAMaths.functions.untaxableTakeHomePay(income));
			setAnnualNIDue(0);
			setAnnualTaxDue(0);
		};

		const renderMidValues = (income) => {
			setTakeHome(
				income -
					TAMaths.functions.midTax(income) -
					TAMaths.functions.midNI(income)
			);
			setAnnualNIDue(TAMaths.functions.midNI(income));
			setAnnualTaxDue(TAMaths.functions.midTax(income));
		};

		const renderTopValues = (income) => {
			setTakeHome(
				income -
					TAMaths.functions.topTax(income) -
					TAMaths.functions.topNI(income)
			);
			setAnnualNIDue(TAMaths.functions.topNI(income));
			setAnnualTaxDue(TAMaths.functions.topTax(income));
		};

		if (!salary) {
			setInputError(true);
			setResultsVisisble(false);
		} else {
			setInputError(false);
			if (isSalaryLessThanUntaxable) {
				renderUntaxableValues(salary);
			} else if (isSalaryGreaterThanUntaxable && isSalaryLessThanTopTaxBraket) {
				renderMidValues(salary);
			} else if (isSalaryGreaterThanTopTaxBraket) {
				renderTopValues(salary);
			}
			setResultsVisisble(true);
		}
	};

	return (
		<div className="container">
			<div>
				<h1>Your "Take Home" Pay Calculator</h1>
				{inputError && (
					<p>Please only enter a integer salary without comma seperation :)</p>
				)}
				Salary: £
				<input
					className="text-input"
					type="number"
					name="salaryInput"
					id="salaryInput"
					placeholder="Put your Salary in here!"
					onChange={(e) => setSalary(e.target.value)}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							calculateTakeHomePay();
						}
					}}
				/>
				<button className="button" onClick={calculateTakeHomePay}>
					Calculate Take Home Pay
				</button>
			</div>
			{resultsVisible && (
				<Results
					takeHome={takeHome}
					annualTaxDue={annualTaxDue}
					annualNIDue={annualNIDue}
				/>
			)}
		</div>
	);
};

export default TaxApp;
