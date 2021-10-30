import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import AssignForms from './AssignForms';

configure({ adapter: new Adapter() });
describe('AssignForms', () => {
  //estes valores devem existir no BD
  const form_id = 23;
  const user_id = 1;

  it('render component with no errors', () => {
    shallow(<AssignForms form_id={form_id} user_id={user_id} />);
  });
});
