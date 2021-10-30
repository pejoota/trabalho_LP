import React, { useState, useEffect } from 'react';
import AnswererCard from '../../components/AnswererCard/AnswererCard';
import NavBar from '../../components/NavBar/NavBar';
import 'normalize.css';
import './AnswersList.css';
import useConstructor from '../../Utils/useConstructor';

//import axios from 'axios';
//API
import { getFormById } from '../../Utils/api';
import { useParams } from 'react-router';

function PagesAnswersList() {
  const initialValue = {
    id: '',
    title: '',
    description: '',
    link: null,
    created_at: '',
    updated_at: '',
    user_id: null,
    questions: [
      {
        id: '',
        description: '',
        form_id: '',
        created_at: '',
        updated_at: '',
        forms_id: null,
      },
    ],
    answers: [
      {
        id: '',
        respostas: '',
        created_at: '',
        updated_at: '',
        user_id: '',
        question_id: '',
        form_id: '',
      },
    ],
  };
  const { id } = useParams();
  const [form, setForm] = useState(initialValue);

  //useConstructor(() => {
  //  axios.get(`http://localhost:3000/forms/${id}`)
  //    .then((res) => {
  //      setForm(res.data[0]);
  //      console.log(res.data[0]);
  //    })
  //    .catch((err) => {
  //      console.log(err);
  //    });
  //});

  useConstructor(() => {
    getFormById(id)
      .then((res) => {
        setForm(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const turnUnic = () => {
    var vetorUnico = [];
    form.answers.map((ques) => {
      const vetorDeIds = vetorUnico.map((q) => {
        return q.user_id;
      });
      if (!vetorDeIds.includes(ques.user_id, 0)) {
        vetorUnico = [...vetorUnico, ques];
      }
    });
    return vetorUnico;
  };

  return (
    <div className="myFormsList">
      <NavBar />
      <div className="caixaDeRespondentes">
        {turnUnic().map(function (answer) {
          return (
            <>
              <AnswererCard
                key={answer.id}
                answer={answer}
                className="caixaDeRespondentes-item"
              />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default PagesAnswersList;
