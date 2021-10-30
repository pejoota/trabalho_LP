import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//CSS
import './Feedbacks.css';

//API
import { sendFeedback, getFormById } from '../../Utils/api';

import NavBar from '../../components/NavBar/NavBar';

function Feedbacks(props) {
  const [feedback, setFeedback] = useState('');
  const user_id = localStorage.getItem('id');
  const form_id = props.match.params.id;
  const [form, setForm] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getFormById(form_id)
      .then((res) => {
        setForm(res);
        console.log(res);
        setFeedback('');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const send = (form_id, user_id, feedback) => {
    sendFeedback(form_id, user_id, feedback)
      .then((res) => {
        console.log(res);
        alert('Feedback enviado com sucesso');
        history.push('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Seu feedback não pode ser enviado, tente novamente mais tarde');
      });
  };

  return (
    <>
      <NavBar />
      <div className="all">
        <h1 className="title">Feedback sobre o questionário {form.title}</h1>
        <textarea
          id="outlined-basic"
          variant="outlined"
          className="feedback_input"
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
        />
        <button
          className="button"
          onClick={() => send(form_id, user_id, feedback)}
        >
          <div className="button_text">Enviar Feedback</div>
        </button>
      </div>
    </>
  );
}

export default Feedbacks;
