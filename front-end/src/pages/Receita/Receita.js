import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import Pergunta from '../../components/Pergunta/Pergunta';
import useConstructor from '../../Utils/useConstructor';
import { getReceitaById, getFormPerUser, sendAnswers } from '../../Utils/api';

const PagesReceita = (props) => {
  const { id } = useParams();

  const initalValue = {
    id: 0,
    nome: '',
    descricao:'',
    datacriacao: ''
  };

  const [modo, setModo] = useState(initalValue);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getReceitaById(id)
      .then((res) => {
        setModo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getFormPerUser(id)
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeResposta=() =>{
    return;
  }

  const [titulo, setTitulo] = useState({
    id: 54,
    title: 'RECEITA DO THIERRY',
    description: 'ISSO AI',
    link: '',
    created_at: '',
    updated_at: '',
    user_id: null,
    ingredients: [
      {
        id: 1,
        name:'1KG CELOBA'
      },
      {
        id: 2,
        name:'1KG PEITO DE FRANGO'
      },
      {
        id: 3,
        name:'1KG BOTADA DOCE'

      }],
    preparo: [
      {
        id: 1,
        passo:'CANECA BONITA'
      },
      {
        id: 2,
        passo:'MINSTURA'
      },
      {
        id: 3,
        passo:'TA PTONTO SABOSTA'

      }],
  })
  const history = useHistory();

  return (
    <div className="containerQuestionario">
      <div className="questionario">
        <Typography className="tituloQuestionario" variant="h4">
          {titulo.title}
        </Typography>
        <Typography variant="inherit">Criador: {titulo.title}</Typography>
        <br />
        <div className="containerPerguntas">
          <div>INGREDIENTES</div>
          {titulo.ingredients.map((ingrediente) => (
            <>
              <div>{ingrediente.name}</div>
            </>
            
          ))}
          <div className=''>MODO DE PREPARO</div>
            <div>{modo.descricao}</div>
          </div>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            history.push('/home');
          }}
        >
          Voltar para home
        </Button>
      </div>
    </div>
  );
};

export default PagesReceita;
