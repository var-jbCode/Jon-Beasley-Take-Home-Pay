import TAMaths from '../../Maths/TaxApp.maths';

describe('untaxable calculator function', () => {
	const salary = 14000;

	it('untaxable Tax calculates correctly', () => {
		expect(TAMaths.functions.untaxableTax(salary)).toEqual(0);
	});

	it('untaxable NI calculates correctly', () => {
		expect(TAMaths.functions.untaxableNI(salary)).toEqual(0);
	});

	it('untaxable take home calculates correctly', () => {
		expect(TAMaths.functions.untaxableTakeHomePay(salary)).toEqual(salary);
	});
});

describe('Mid calculator functions', () => {
	const salary = 20000;

	it('Mid Tax calculates correcty', () => {
		expect(TAMaths.functions.midTax(salary)).toEqual(1000);
	});

	it('Mid NI calculates correcty', () => {
		expect(TAMaths.functions.midNI(salary)).toEqual(600);
	});

	it('Mid take home calculates correcty', () => {
		expect(
			salary -
				TAMaths.functions.midTax(salary) -
				TAMaths.functions.midNI(salary)
		).toEqual(18400);
	});
});

describe('Top calculator functions', () => {
	const salary = 55000;

	it('Top Tax calculates correcty', () => {
		expect(TAMaths.functions.topTax(salary)).toEqual(9000);
	});

	it('Top NI calculates correcty', () => {
		expect(TAMaths.functions.topNI(salary)).toEqual(4300);
	});

	it('Top take home calculates correcty', () => {
		expect(
			salary -
				TAMaths.functions.topNI(salary) -
				TAMaths.functions.topTax(salary)
		).toEqual(41700);
	});
});
