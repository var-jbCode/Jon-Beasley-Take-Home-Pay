import React from 'react';
import Enzyme, { mount, ReactWrapper, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import TaxApp from '../../components/TaxApp';

describe('TaxApp', () => {
	it('renders correctly', () => {
		shallow(<TaxApp />);
	});
});

// https://www.youtube.com/watch?v=9lkZ77m-39I
