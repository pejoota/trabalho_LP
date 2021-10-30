import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';

//api
import { getUserById, deleteUser } from '../../Utils/api';

//ICONS
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const UserCard = ({ user }) => {
  const [name, setName] = useState('');
  const user_id = user.id;

  const history = useHistory();

  const profileLink = () => {
    history.push(`/profile/${user_id}`);
  };

  useEffect(() => {
    getUserById(user_id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletaUser = () => {
    deleteUser(user_id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert('Erro ao deletar o user');
        console.log('ERRO:', err);
      });
  };

  return (
    <div className="card-box">
      {name == undefined ? history.go() : null}
      <Avatar className="card-box__title">{name[0]}</Avatar>
      <div className="card-box__info">
        <h1 className="card-box__info">{name}</h1>
      </div>
      <footer className="card-box__footer">
        <button onClick={profileLink} target="blank" className="card-box__link">
          <AccountBoxIcon style={{ fontSize: 20 }} />
        </button>
        <button onClick={deletaUser} className="card-box__delete">
          <DeleteOutlineIcon style={{ fontSize: 20 }} />
        </button>
      </footer>
    </div>
  );
};

export default UserCard;
