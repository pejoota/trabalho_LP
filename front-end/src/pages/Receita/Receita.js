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
    preparo:'',
    ingredients:'',
    imagem:'',
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
    title: 'RECEITA DO DOUGLAS',
    description: 'ISSO AI',
    link: 'DOUGLAS',
    created_at: '',
    updated_at: '',
    user_id: null,
    ingredients: [
      {
        id: 1,
        name:'1KG CEBOLA'
      },
      {
        id: 2,
        name:'1KG PEITO DE FRANGO'
      },
      {
        id: 3,
        name:'1KG BATATA DOCE'

      }],
    preparo: [
      {
        id: 1,
        passo:'PASSO 1: CANECA BONITA'
      },
      {
        id: 2,
        passo:'PASSO 2: MINSTURA'
      },
      {
        id: 3,
        passo:'PASSO 3: TA PRONTO O SORVETINHO'

      }],
  })
  const history = useHistory();

  return (
    <div className="containerQuestionario">
      <div className="questionario">
        <img src= {modo.imagem}/>
        <Typography className="tituloQuestionario" variant="h4">
          {modo.nome}
        </Typography>
        <Typography variant="inherit">Descrição: {modo.descricao}</Typography>
        <br />
        <div className="containerPerguntas">
          <div><br/>INGREDIENTES<br/></div>
          <div>{modo.ingredients}</div>
          <div className=''><br/>MODO DE PREPARO<br/></div>
          <div> {modo.preparo}</div>
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
