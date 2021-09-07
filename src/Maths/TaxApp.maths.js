const TAMaths = {
	constants: {
		untaxableIncome: 15000,
		topTaxBraket: 50000,
		precalculatedTax: 7000,
		precalculatedNI: 4200,
		midTaxRate: 0.2,
		midNIRate: 0.12,
		topTaxRate: 0.4,
		topNIRate: 0.02,
	},

	functions: {
		untaxableTakeHomePay: (income) => {
			return income;
		},

		untaxableTax: (income) => {
			return 0;
		},

		untaxableNI: (income) => {
			return 0;
		},

		aboveTopTaxBraket: (income) => {
			return income - TAMaths.constants.topTaxBraket;
		},

		midTax: (income) => {
			return (
				(income - TAMaths.constants.untaxableIncome) *
				TAMaths.constants.midTaxRate
			);
		},

		midNI: (income) => {
			return (
				(income - TAMaths.constants.untaxableIncome) *
				TAMaths.constants.midNIRate
			);
		},

		topTax: (income) => {
			return (
				TAMaths.constants.precalculatedTax +
				TAMaths.functions.aboveTopTaxBraket(income) *
					TAMaths.constants.topTaxRate
			);
		},

		topNI: (income) => {
			return (
				TAMaths.constants.precalculatedNI +
				TAMaths.functions.aboveTopTaxBraket(income) *
					TAMaths.constants.topNIRate
			);
		},
	},
};

export { TAMaths as default };
