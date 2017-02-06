import React from 'react'
import { shallow } from 'enzyme'

function setup() {
    const props = {
        weatherPanel: {errorMessage: true}
    };
    const enzymeWrapper = shallow(<errorMessage {...props} />);
    return {props, enzymeWrapper}
}

describe('components', () => {
  describe('errorMessage', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('h3')).toBeTruthy();
    })
 })
});

