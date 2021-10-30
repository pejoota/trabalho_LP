import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Pergunta from './Pergunta';

configure({ adapter: new Adapter() });
describe('Pergunta', () => {

    it('renderiza componente sem erros', () => {
        shallow(<Pergunta />);
    });

});