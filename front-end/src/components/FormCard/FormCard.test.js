import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import FormCard from './FormCard';

configure({ adapter: new Adapter() });
describe('FormCard', () => {

  const exemplo = {
    id: 23,
    title: 'Questionário de interesse em Node JS',
    description: 'Esse questionario tem como objetivo saber quantas pessoas tem interesse em participar da aula de Node Js',
    link: 'http://localhost:3001/form/23',
    created_at: '2021 - 05 - 17T02: 53: 45.521Z',
    updated_at: '2021 - 05 - 17T02: 53: 45.539Z',
    user_id: 1,
    questions: [
      {
        id: 14,
        description: 'Se você tem interesse em java script, cite duas coisas uqe já fez',
        form_id: 23,
        created_at: '2021-05-17T02:53:54.802Z',
        updated_at: '2021-05-17T02:53:54.802Z',
        ques_type: 'respostaCurta'
      },
      {
        id: 15,
        description: 'Se você tem interesse em java script, cite duas coisas uqe já fez',
        form_id: 23,
        created_at: '2021-05-17T03:26:43.182Z',
        updated_at: '2021-05-17T03:26:43.182Z',
        ques_type: 'respostaCurta'
      }
    ],
    answers: [
      {
        id: 31,
        respostas: 'Resp1',
        created_at: '2021-05-17T03:27:01.352Z',
        updated_at: '2021-05-17T03:27:01.352Z',
        user_id: 1,
        question_id: 15,
        form_id: 23
      }
    ]
  }


  it('render component with no errors', () => {
    shallow(<FormCard form={exemplo} />);
  });

});
