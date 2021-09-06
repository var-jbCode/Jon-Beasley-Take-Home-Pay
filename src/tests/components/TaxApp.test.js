import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import TaxApp from '../../components/TaxApp';

describe(TaxApp, () => {
	it('works :D', () => {
		expect(2 + 2).toEqual(4);
	});
});
