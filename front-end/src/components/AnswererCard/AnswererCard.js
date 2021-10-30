import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

import './AnswererCard.css';

//api
import { getUserById, getFeedbacksById } from '../../Utils/api';

//ICONS
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FeedbackIcon from '@material-ui/icons/Feedback';

//MODAL
import TransitionsModal from '../Modal/Modal';

const AnswererCard = ({ answer }) => {
  const [name, setName] = useState('');
  const user_id = answer.user_id;
  const form_id = answer.form_id;
  const [aux, setAux] = useState(false);
  const [feedback, setFeedback] = useState({});
  const data = new Date(answer.created_at);

  const history = useHistory();

  useEffect(() => {
    getUserById(user_id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const listaFeedback = () => {
    getFeedbacksById(form_id, user_id)
      .then((resp) => {
        setAux(!aux);
        setFeedback(resp.data[0]);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  };

  const mostraResposta = () => {
    history.push(`/formRespondido/${form_id}/${user_id}`);
  };

  return (
    <div className="answer-box">
      {name == undefined ? (
        <CircularProgress />
      ) : (
        <>
          <Avatar className="card-box__title">{name[0]}</Avatar>
          <div className="card-box__name__date">
            <h1 className="card-box__info">{name}</h1>
            <span>{data.toLocaleString('pt-br')}</span>
          </div>
          <footer className="answer-box__footer">
            <button
              onClick={mostraResposta}
              target="blank"
              className="card-box__link"
            >
              <AssignmentOutlinedIcon style={{ fontSize: 20 }} />
            </button>
            <button onClick={listaFeedback} className="card-box__link">
              <FeedbackIcon style={{ fontSize: 20 }} />
            </button>
          </footer>
          {aux && <TransitionsModal text={feedback.description} />}
        </>
      )}
    </div>
  );
};

export default AnswererCard;
