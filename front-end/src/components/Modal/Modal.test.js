import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Modal from './Modal';

configure({ adapter: new Adapter() });
describe('Modal', () => {

  it('render component with no errors', () => {
    shallow(<Modal />);
  });

});