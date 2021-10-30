import React, { useState } from 'react';

//CSS
import './AssignForms.css';

//Utils
import { getAllUsers, userToForm } from '../../Utils/api';

//Material UI
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Dialog, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function AssignForms({ formId }) {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState('900');
  const [open, setOpen] = useState(false);
  const form_id = formId;

  const handleClickOpen = () => () => {
    setOpen(true);
    atri();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const atri = () => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('Usuários não puderam ser carregados', err);
      });
  };

  const handleChange = (event) => {
    setUserID(event.target.value);
    console.log('ID AQUI', userID);
  };

  const assignUser = (form_id, userID) => {
    userToForm(form_id, userID)
      .then((res) => {
        alert('Questionario atribuido a usuário com sucesso');
      })
      .catch((err) => {
        console.log(err);
        alert(
          'Não foi possivel atribuir este questionario a este usuário, tente novamente mais tarde'
        );
      });
  };

  return (
    <div className="body">
      <button className="card-box__edit" onClick={handleClickOpen('paper')}>
        <PersonAddIcon style={{ fontSize: 20 }} />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent dividers={false}>
          <div className="userList">
            <div className="dialogTitle">Escolha um usuário</div>
            <button className="closeIcon" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="select_and_button">
            <FormControl>
              <Select value={userID} onChange={handleChange}>
                {users.map(function (user) {
                  return (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <button
              onClick={() => assignUser(form_id, userID)}
              className="sendButton"
            >
              Atribuir
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AssignForms;
