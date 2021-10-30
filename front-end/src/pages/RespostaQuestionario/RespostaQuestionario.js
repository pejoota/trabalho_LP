import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import Pergunta from '../../components/Pergunta/Pergunta';
import useConstructor from '../../Utils/useConstructor';
import { getFormById, getUserById, sendAnswers } from '../../Utils/api';

import './RespostaQuestionario.css';

const RespostaQuestionario = (props) => {
  const initalValue = {
    id: null,
    title: '',
    description: '',
    link: '',
    created_at: '',
    updated_at: '',
    user_id: null,
    questions: [],
    answers: [],
  };

  const [respostas, setRespostas] = useState([]);
  const [currentQuestionario, setCurrentQuestionario] = useState(initalValue);
  const [userName, setUserName] = useState('');
  const user_id = localStorage.getItem('id');

  const history = useHistory();
  const { id } = useParams();

  useConstructor(() => {
    getFormById(id)
      .then((res) => {
        setCurrentQuestionario(res.data[0]);
        getUserById(res.data[0].user_id)
          .then((res1) => {
            setUserName(res1.data.name);
          })
          .catch((err) => {
            console.log('ERRO NO GETuSER', err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    const respostasIniciais = currentQuestionario.questions.map((pergunta) => {
      return {
        id: pergunta.id,
        resposta: null,
      };
    });
    setRespostas(respostasIniciais);
  }, [currentQuestionario]);

  const handleChangeResposta = (perguntaId, resposta) => {
    const newRespostas = respostas.map((respostaItem) => {
      if (respostaItem.id == perguntaId) {
        return { id: perguntaId, resposta };
      } else {
        return respostaItem;
      }
    });
    setRespostas(newRespostas);
  };

  const handleSubmit = () => {
    respostas.map(function (resposta) {
      if (!resposta.resposta) {
        alert('Preencha os campos');
        return;
      }
      sendAnswers(
        currentQuestionario.id,
        user_id,
        resposta.id,
        resposta.resposta
      )
        .then((res1) => {
          console.log('Resposta enviada', resposta.resposta);
          alert('Resposta enviada');
        })
        .catch((err) => {
          console.log('ERRO pra mandar resposta', err);
        });
    });
    history.push(`/feedbacks/${id}`);
  };

  const perguntas = currentQuestionario.questions || [];
  const descricao = currentQuestionario.description || 'Descrição++';
  const titulo = currentQuestionario.title || 'Título++';

  return (
    <div className="containerQuestionario">
      <div className="questionario">
        <Typography className="tituloQuestionario" variant="h4">
          {titulo}
        </Typography>
        <Typography variant="inherit"> Criador: {userName} </Typography>
        <br />
        <Typography variant="inherit"> {descricao} </Typography>
        <div className="containerPerguntas">
          {perguntas.map((pergunta) => (
            <Pergunta
              mostrarResposta={false}
              resposta={pergunta.resposta}
              id={pergunta.id}
              tipo={pergunta.ques_type}
              dadosPergunta={pergunta.dados}
              descricao={pergunta.description}
              handleChangeResposta={handleChangeResposta}
              key={pergunta.id}
            />
          ))}
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
        <Button
          style={{
            float: 'right',
          }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default RespostaQuestionario;
