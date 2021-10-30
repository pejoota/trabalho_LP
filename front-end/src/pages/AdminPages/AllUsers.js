import React, { useState, useEffect } from 'react';
import FormCard from '../../components/FormCard/FormCard';
import NavBar from '../../components/NavBar/NavBar';
import 'normalize.css';

//API
import { getAllUsers } from '../../Utils/api';

//Components
import UserCard from '../../components/AdminComponents/UserCard';

//ICONS
import SearchIcon from '@material-ui/icons/Search';

function PagesAllUsersList() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState('');

  const params = {};
  if (search) {
    params.title_like = search;
  }

  const user_id = localStorage.getItem('id');

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setForms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="myFormsList">
      <NavBar />
      <div className="myFormsList__input">
        <input
          type="search"
          placeholder="Buscar questionários feitos por você"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <SearchIcon />
      </div>
      {!(forms.length == 0) ? (
        <div className="caixaDeRespondentes">
          {forms
            .filter((val) => {
              if (search == '') {
                return val;
              } else if (
                val.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map(function (form) {
              return <UserCard key={form.id} user={form} />;
            })}
        </div>
      ) : (
        <div>
          <h1>A plataforma não possui questionáios ainda</h1>
        </div>
      )}
    </div>
  );
}

export default PagesAllUsersList;
