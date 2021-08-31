// @ts-nocheck
import React, { useState } from 'react';
import Results from './Results';

const TaxApp = () => {
	const [salary, setSalary] = useState();
	const [annualTaxDue, setAnnualTaxDue] = useState();
	const [annualNIDue, setAnnualNIDue] = useState();
	const [takeHome, setTakeHome] = useState();
	const [resultsVisible, setResultsVisisble] = useState();
	const [isInputError, setIsInputError] = useState(false);

	const calculateLogic = () => {
		const untaxableIncome = 15000;
		const topTaxBraket = 50000;
		const precalculatedTax = 7000;
		const precalculatedNI = 4200;

		const isSalaryGreaterThanUntaxable = () => {
			return salary >= untaxableIncome;
		};

		const isSalaryLessThanTopTaxBraket = () => {
			return salary >= untaxableIncome;
		};

		const isSalaryGreaterThanTopTaxBraket = () => {
			return salary >= topTaxBraket;
		};

		if (salary) {
			if (salary.match(/\d+/)) {
				setIsInputError(false);
				if (salary < untaxableIncome) {
					setTakeHome(salary);
					setAnnualNIDue(0);
					setAnnualTaxDue(0);
					setResultsVisisble(true);
				} else if (
					isSalaryGreaterThanUntaxable &&
					isSalaryLessThanTopTaxBraket
				) {
					let taxFree = untaxableIncome;
					let midTax = (salary - taxFree) * 0.2;
					let midNI = (salary - taxFree) * 0.12;
					setTakeHome(salary - midTax - midNI);
					setAnnualNIDue(midNI);
					setAnnualTaxDue(midTax);
					setResultsVisisble(true);
				} else if (isSalaryGreaterThanTopTaxBraket) {
					let aboveTopTaxBraket = salary - topTaxBraket;
					let topTax = precalculatedTax + aboveTopTaxBraket * 0.4;
					let topNI = precalculatedNI + aboveTopTaxBraket * 0.02;
					setTakeHome(salary - topTax - topNI);
					setAnnualNIDue(topNI);
					setAnnualTaxDue(topTax);
					setResultsVisisble(true);
				}
			} else {
				setIsInputError(true);
				setResultsVisisble(false);
			}
		} else {
			setIsInputError(true);
			setResultsVisisble(false);
		}
	};

	return (
		<div className="container">
			<div>
				<h1>Your "Take Home" Pay Calculator</h1>
				{isInputError && (
					<p>Please only enter a integer salary without comma seperation :)</p>
				)}
				£{' '}
				<input
					className="text-input"
					type="text"
					name="salaryInput"
					id="salaryInput"
					placeholder="Put your Salary in here!"
					onChange={(e) => setSalary(e.target.value)}
				/>
				<button className="button" onClick={calculateLogic}>
					Calculate Take Home Pay
				</button>
			</div>{' '}
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
