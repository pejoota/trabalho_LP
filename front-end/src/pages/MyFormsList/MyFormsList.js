import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormCard from '../../components/FormCard/FormCard';
import NavBar from '../../components/NavBar/NavBar';
import 'normalize.css';
import './MyFormsList.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';
//API
import { getFormPerUser } from '../../Utils/api';

//ICONS
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '../../components/Button/Button';

function PagesMyFormsList() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  const params = {};
  if (search) {
    params.title_like = search;
  }

  const user_id = localStorage.getItem('id');

  useEffect(() => {
    getFormPerUser(user_id)
      .then((res) => {
        setForms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fazForm = () => {
    history.push('/create');
  };

  return (
    <div className="myFormsList">
      <NavBar />
      <button onClick={fazForm} className="myFormsList__add">
        <AddCircleIcon /> Criar Forms
      </button>
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
          <h1>Você não possui questionáios ainda</h1>
          <Button
            className="caixaDeForms-btn"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={fazForm}
          >
            <Link to="/create" className="link">
              Clique aqui para criar
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default PagesMyFormsList;
