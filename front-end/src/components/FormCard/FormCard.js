import React from 'react';
import './FormCard.css';

//Components
import AssignForms from '../AssignForms/AssignForms';

//ICONS
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { Badge } from '@material-ui/core';
import { deleteForm } from '../../Utils/api';
import SendIcon from '@material-ui/icons/Send';

import { useHistory } from 'react-router-dom';

const FormCard = ({ form }) => {
  const deletaForm = () => {
    deleteForm(form.id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert('Erro ao deletar o questionário');
        console.log('ERRO:', err);
      });
  };

  const history = useHistory();

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

  const qtdeRespostas = turnUnic().length;

  const listaRespostas = () => {
    if (form.answers.length == 0) {
      alert('O form ainda não possui respostas');
      return;
    }
    history.push(`/answers/${form.id}`);
  };

  const notReady = () => {
    alert('Funcao em implementação');
  };

  return (
    <div className="card-box" key={form.id}>
      <h1 className="card-box__title">{form.title}</h1>
      <span className="card-box__info">{form.description}</span>
      <footer className="card-box__footer">
        <div>
          <a href={form.link} target="blank" className="card-box__link">
            <AssignmentOutlinedIcon style={{ fontSize: 20 }} />
          </a>
          <button onClick={listaRespostas} className="card-box__answers">
            <Badge
              badgeContent={qtdeRespostas}
              color="primary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MoveToInboxIcon style={{ fontSize: 20 }} />
            </Badge>
          </button>
          <button onClick={notReady} target="blank" className="card-box__edit">
            <EditIcon style={{ fontSize: 20 }} />
          </button>
        </div>
        <div className="card-box__footer2">
          <button onClick={notReady} target="blank" className="card-box__copy">
            <FileCopyIcon style={{ fontSize: 20 }} />
          </button>
          <AssignForms formId={form.id} />
          <button onClick={deletaForm} className="card-box__delete">
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default FormCard;
