import ReactShallowRenderer from 'react-test-renderer/shallow'

import React from 'react'
import Results from '../../components/Results'

test('Should Render Results Correctly without Props', () => {
    const renderer = new ReactShallowRenderer()
    renderer.render(<Results />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})
