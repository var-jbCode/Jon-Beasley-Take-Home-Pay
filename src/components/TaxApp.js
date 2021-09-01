// @ts-nocheck
import React, { useState } from 'react';
import Results from './Results';

const TaxApp = () => {
	const [salary, setSalary] = useState();
	const [annualTaxDue, setAnnualTaxDue] = useState();
	const [annualNIDue, setAnnualNIDue] = useState();
	const [takeHome, setTakeHome] = useState();
	const [resultsVisible, setResultsVisisble] = useState();
	const [inputError, setInputError] = useState(false);

	const calculateTakeHomePay = () => {
		const untaxableIncome = 15000;
		const topTaxBraket = 50000;
		const precalculatedTax = 7000;
		const precalculatedNI = 4200;

		const isSalaryGreaterThanUntaxable = () => {
			return salary >= untaxableIncome;
		};

		const isSalaryLessThanTopTaxBraket = () => {
			return salary <= topTaxBraket;
		};

		const isSalaryGreaterThanTopTaxBraket = () => {
			return salary >= topTaxBraket;
		};

		const renderUntaxableValues = (income) => {
			setTakeHome(income);
			setAnnualNIDue(0);
			setAnnualTaxDue(0);
			setResultsVisisble(true);
		};

		const renderMidValues = (income) => {
			let midTax = (income - untaxableIncome) * 0.2;
			let midNI = (income - untaxableIncome) * 0.12;
			setTakeHome(income - midTax - midNI);
			setAnnualNIDue(midNI);
			setAnnualTaxDue(midTax);
			setResultsVisisble(true);
		};

		const renderTopValues = (income) => {
			let aboveTopTaxBraket = income - topTaxBraket;
			let topTax = precalculatedTax + aboveTopTaxBraket * 0.4;
			let topNI = precalculatedNI + aboveTopTaxBraket * 0.02;
			setTakeHome(income - topTax - topNI);
			setAnnualNIDue(topNI);
			setAnnualTaxDue(topTax);
			setResultsVisisble(true);
		};

		if (!salary) {
			setInputError(true);
			setResultsVisisble(false);
		} else {
			setInputError(false);
			if (salary < untaxableIncome) {
				renderUntaxableValues(salary);
			} else if (isSalaryGreaterThanUntaxable && isSalaryLessThanTopTaxBraket) {
				renderMidValues(salary);
			} else if (isSalaryGreaterThanTopTaxBraket) {
				renderTopValues(salary);
			}
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
