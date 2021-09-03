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
		const midTaxRate = 0.2;
		const midNIRate = 0.12;
		const topTaxRate = 0.4;
		const topNIRate = 0.02;

		const isSalaryLessThanUntaxable = salary < untaxableIncome;

		const isSalaryGreaterThanUntaxable = salary >= untaxableIncome;

		const isSalaryLessThanTopTaxBraket = salary <= topTaxBraket;

		const isSalaryGreaterThanTopTaxBraket = salary >= topTaxBraket;

		const aboveTopTaxBraket = salary - topTaxBraket;

		const renderUntaxableValues = (income) => {
			setTakeHome(income);
			setAnnualNIDue(0);
			setAnnualTaxDue(0);
		};

		const midTax = (income) => {
			return (income - untaxableIncome) * midTaxRate;
		};

		const midNI = (income) => {
			return (income - untaxableIncome) * midNIRate;
		};

		const renderMidValues = (income) => {
			setTakeHome(income - midTax(income) - midNI(income));
			setAnnualNIDue(midNI(income));
			setAnnualTaxDue(midTax(income));
		};

		const topTax = () => {
			return precalculatedTax + aboveTopTaxBraket * topTaxRate;
		};

		const topNI = () => {
			return precalculatedNI + aboveTopTaxBraket * topNIRate;
		};

		const renderTopValues = (income) => {
			setTakeHome(income - topTax() - topNI());
			setAnnualNIDue(topNI);
			setAnnualTaxDue(topTax);
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
