import React from 'react';
import Enzyme, { mount, ReactWrapper, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import TaxApp from '../../components/TaxApp';

describe('TaxApp', () => {
	beforeEach(() => {
		wrapper = shallow(<TaxApp />);
	});

	it('control test format', () => {
		expect(2 + 2).toEqual(4);
	});

	it('renders correctly', () => {
		shallow(<TaxApp />);
	});

	it('has one input', () => {
		expect(wrapper.find('input').length).toEqual(1);
	});
});

// https://www.youtube.com/watch?v=9lkZ77m-39I
