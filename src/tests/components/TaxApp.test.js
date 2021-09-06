import React from 'react';
import Enzyme, { mount, ReactWrapper, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import TaxApp from '../../components/TaxApp';

let salary = 0;
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
	return { takeHome: income, tax: 0, NI: 0 };
};

const midTax = (income) => {
	return (income - untaxableIncome) * midTaxRate;
};

const midNI = (income) => {
	return (income - untaxableIncome) * midNIRate;
};

const renderMidValues = (income) => {
	return {
		takeHome: income - midTax(income) - midNI(income),
		tax: midTax(income),
		NI: midNI(income),
	};
};

const topTax = () => {
	return precalculatedTax + aboveTopTaxBraket * topTaxRate;
};

const topNI = () => {
	return precalculatedNI + aboveTopTaxBraket * topNIRate;
};

const renderTopValues = (income) => {
	return { takeHome: income - topTax() - topNI(), tax: topTax, NI: topNI };
};

const logic = () => {
	if (!salary) {
		return 'no salary input';
	} else {
		if (isSalaryLessThanUntaxable) {
			renderUntaxableValues(salary);
		} else if (isSalaryGreaterThanUntaxable && isSalaryLessThanTopTaxBraket) {
			renderMidValues(salary);
		} else if (isSalaryGreaterThanTopTaxBraket) {
			renderTopValues(salary);
		}
	}
};

describe('TaxApp', () => {
	it('control test format', () => {
		expect(2 + 2).toEqual(4);
	});

	it('renders correctly', () => {
		shallow(<TaxApp />);
	});
});

describe('calculator fucntions', () => {
	it('calculate values for untaxable income', () => {
		const salary = 18000;
		expect(renderUntaxableValues(18000)).toEqual({
			takeHome: 18001,
			tax: 0,
			NI: 0,
		});
	});
});

// https://www.youtube.com/watch?v=9lkZ77m-39I
