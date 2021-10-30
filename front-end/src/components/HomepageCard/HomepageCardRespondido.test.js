import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import HomepageCardRespondido from './HomepageCardRespondido.js';

configure({ adapter: new Adapter() });
describe('HomepageCardRespondido', () => {

  //este form deve existir
  const form_id = 23;

  it('render component with no errors', () => {
    shallow(<HomepageCardRespondido form_id={form_id} />);
  });

});
