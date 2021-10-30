import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//CSS
import './Create.css';

//Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { createMuiTheme } from '@material-ui/core/styles';

//Utils
import { createForm, getFormById } from '../../Utils/api';

//Components
import Question from '../../components/Question/Question';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f4f4f',
      main: '#242424',
      dark: '#191919',
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const options = [
  'Múltipla escolha',
  'Caixa de seleções',
  'Resposta curta',
  'Paragrafo',
];

function CreateMyForms() {
  const history = useHistory();
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user_id = localStorage.getItem('id');
  const [form, setForm] = useState({});

  const sendForm = () => {
    createForm(title, description, user_id)
      .then((res) => {
        setForm(res.data);
        alert(
          'Questionário iniciado com sucesso, adicione sua perguntas a ele'
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveForm = () => {
    history.push('/myforms');
  };

  const [numQues, setNumQues] = useState([]);

  const addQuestion = () => {
    setNumQues(numQues.push('1'));
  };

  return (
    <div className="body">
      <div className="Principal">
        <div className="Title_box">
          <div className="Title">
            <input
              type="text"
              placeholder="Questionário sem titulo"
              className="Title_design"
              required
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição do questionario"
              className="Description"
              required
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
        </div>
        <button className="create_form" onClick={sendForm}>
          Inicie o questionario
        </button>
      </div>
      {form.id && <Question form_id={form.id} />}
      <button className="save_form" onClick={saveForm}>
        Salvar questionário
      </button>
    </div>
  );
}

export default CreateMyForms;
