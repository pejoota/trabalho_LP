import React, { useState, useEffect } from 'react';

//CSS
import './Question.css';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { createMuiTheme } from '@material-ui/core/styles';

//Utils
import { createQuestion } from '../../Utils/api';

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

function Question(form_id) {
  const [value, setValue] = useState('');
  const formId = form_id;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [question, setQuestion] = useState({});
  const [quesType, setQuesType] = useState('');
  const [quesDescription, setQuesDescription] = useState('');

  // const muit = [];
  // const caiS = [];

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    switch (index) {
      case 0:
        setValue(0);
        setQuesType('multiplaEscolha');
        break;
      case 1:
        setValue(1);
        setQuesType('caixaDeSelecao');
        break;
      case 2:
        setValue(2);
        setQuesType('respostaCurta');
        break;
      case 3:
        setValue(3);
        setQuesType('paragrafo');
        break;
    }
    setSelectedIndex(index);
    console.log(value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendQuestion = () => {
    createQuestion(quesDescription, formId, quesType)
      .then((res) => {
        setQuestion(res.data);
        alert(
          'Questão adicionada com sucesso, salve esse questionário ou continue adicionando questões'
        );
      })
      .catch((err) => {
        alert('Não foi possivel adicionar uma questão');
        console.log(err);
      });
  };

  return (
    <div className="body">
      <div className="Second">
        <div className="Question_box">
          <button className="save_question" onClick={sendQuestion}>
            Salvar questão
          </button>
          <div className="Question">
            <input
              type="text"
              placeholder="Pergunta sem titulo"
              className="Question_design"
              required
              value={quesDescription}
              onChange={(ev) => setQuesDescription(ev.target.value)}
            />
          </div>

          <div className={classes.root}>
            <List component="nav" aria-label="Device settings">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="tipos de resposta"
                onClick={handleClickListItem}
              >
                <ListItemText
                  primary="Tipos de resposta"
                  secondary={options[selectedIndex]}
                />
              </ListItem>
            </List>

            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          {value == 0 && (
            <div id="op_selected">
              <input type="radio" id="opçao_1" name="marcar" value="opcao_1" />
              <label for="opcao_1">
                <input type="text" className="opcao" placeholder="Opção 1" />
              </label>
              <br />
              <br />
              <input type="radio" id="opçao_2" name="marcar" value="opcao_2" />
              <label for="opcao_2">
                <input type="text" className="opcao" placeholder="Opção 2" />
              </label>
              <br />
              <br />
              <input type="radio" id="opçao_3" name="marcar" value="opcao_3" />
              <label for="opcao_3">
                <input type="text" className="opcao" placeholder="Opção 3" />
              </label>
              <br />
              <br />
              <input type="radio" id="opçao_4" name="marcar" value="opcao_4" />
              <label for="opcao_4">
                <input type="text" className="opcao" placeholder="Opção 4" />
              </label>
              <br />
              <br />
            </div>
          )}

          {value == 1 && (
            <div id="op_multiple">
              <input
                type="checkbox"
                id="opçao_1"
                name="marcar"
                value="opcao_1"
              />
              <label for="opcao_1">
                <input type="text" className="opcao" placeholder="Opção 1" />
              </label>
              <br />
              <br />
              <input
                type="checkbox"
                id="opçao_2"
                name="marcar"
                value="opcao_2"
              />
              <label for="opcao_2">
                <input type="text" className="opcao" placeholder="Opção 2" />
              </label>
              <br />
              <br />
              <input
                type="checkbox"
                id="opçao_3"
                name="marcar"
                value="opcao_3"
              />
              <label for="opcao_3">
                <input type="text" className="opcao" placeholder="Opção 3" />
              </label>
              <br />
              <br />
              <input
                type="checkbox"
                id="opçao_4"
                name="marcar"
                value="opcao_4"
              />
              <label for="opcao_4">
                <input type="text" className="opcao" placeholder="Opção 4" />
              </label>
              <br />
              <br />
            </div>
          )}

          {value == 2 && (
            <div id="op_short">
              <input
                type="text"
                className="Resposta_curta"
                placeholder="Resposta curta"
              />
              <br />
              <br />
            </div>
          )}

          {value == 3 && (
            <div id="op_long">
              <input
                type="text"
                className="Resposta_longa"
                placeholder="Paragrafo"
              />
              <br />
              <br />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Question;
