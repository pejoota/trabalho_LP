import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import UserCard from './UserCard';

configure({ adapter: new Adapter() });
describe('UserCard', () => {

  const exemplo = {
    id: 1,
    name: 'Hyago',
    email: 'hyago@gmail.com',
    password_digest: '$2a$12$TPKa3/7SfTdOjJwVRybp7e5KPSHiH8yianRsge2eBwV621eLjMaHG',
    created_at: '2021-05-11T18:49:39.998Z',
    updated_at: '2021-05-16T17:17:27.618Z',
    admin: false,
    creator: true,
    answerer: true
  }

  it('render component with no errors', () => {
    shallow(<UserCard user={exemplo} />);
  });

});
