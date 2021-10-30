import React, { useState, useEffect } from 'react';
import FormCard from '../../components/FormCard/FormCard';
import NavBar from '../../components/NavBar/NavBar';
import 'normalize.css';

//API
import { getAllForms } from '../../Utils/api';

//ICONS
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '../../components/Button/Button';

function PagesAllFormsList() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState('');

  const params = {};
  if (search) {
    params.title_like = search;
  }

  const user_id = localStorage.getItem('id');

  useEffect(() => {
    getAllForms()
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
        <div className="caixaDeForms">
          {forms
            .filter((val) => {
              if (search == '') {
                return val;
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map(function (form) {
              return <FormCard key={form.id} form={form} />;
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

export default PagesAllFormsList;
