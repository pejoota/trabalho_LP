import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import HomepageCard from '../../components/HomepageCard/HomepageCard';
import HomepageCardRespondido from '../../components/HomepageCard/HomepageCardRespondido';
import CircularStatic from '../../components/Progress/Progress'

import './Home.css';

import { getAssignPerUser, getAnswersPerUser } from '../../Utils/api';

//icones
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';

function PagesHome() {
  const admin = localStorage.getItem('admin');
  const name = localStorage.getItem('usrName');
  const user_id = localStorage.getItem('id');
  const [forms, setForms] = useState([]);
  const [assigns, setAssigns] = useState([]);

  useEffect(() => {
    getAssignPerUser(user_id)
      .then((res) => {
        setAssigns(res.data);
        console.log('ASSIGNS AQUI', assigns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAnswersPerUser(user_id)
      .then((res) => {
        setForms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const turnUnic = () => {
    var vetorUnico = [];
    assigns.map((ques) => {
      const vetorDeIds = vetorUnico.map((q) => {
        return q.id;
      });
      if (!vetorDeIds.includes(ques.id, 0)) {
        vetorUnico = [...vetorUnico, ques];
      }
    });
    return vetorUnico;
  };

  return (
    <>
      <NavBar />
      {admin == 'true' ? (
        <>
          <div className="pagesHome">
            <h1>Você está logado como admin</h1>
            <p>Utilize o menu superior</p>
          </div>
        </>
      ) : (
        <div className="boxGeral">
        <div className="myFormsList">
          <div className="pagesHome">
            <h1>Receitas que você segue:</h1>
            {!(assigns.length == 0) ? (
              <div className="homeForms">
                {assigns.map(function (assign) {
                  return (
                    <HomepageCard
                      className="item"
                      key={assign.form_id}
                      form_id={assign.id}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                <p>Você não possui receitas atribuídas ainda</p>
              </div>
            )}
            <h1>Todas as Receitas:</h1>
            {!(forms.length == 0) ? (
              <div className="homeForms">
                {turnUnic().map(function (form) {
                  return (
                    <HomepageCard
                      className="item"
                      key={form.id}
                      form_id={form.id}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                <p>Não há Receitas na plataforma a serem mostradas aqui :(</p>
              </div>
            )}
          </div>
        </div>
        <div className="caixa-graficos">
          <div className= "home-graficos">
            <div className="home-right-text">
              <p>Altura</p>
              <EmojiPeopleOutlinedIcon style={{ fontSize: 50 }} />;
              <p>180 cm</p>
            </div>
            <div className="home-right-text">
              <p>Idade</p>
              <CakeTwoToneIcon style={{ fontSize: 50 }} />;
              <p>18 anos</p>
            </div>
            <div className="home-right-text">
              <p>Peso</p>
              <AccessibilityRoundedIcon style={{ fontSize: 50 }} />;
              <p>1 tol</p>
            </div>
          </div>
          <div className= "home-graficos">
            <div className="home-right">
              <CircularStatic value={50} />;
              <p>Peso Corporal</p>
            </div>
            <div className="home-right">
              <CircularStatic value={30} />;
              <p>Gordura Corporal</p>
            </div>
            <div className="home-right">
              <CircularStatic value={20} />;
              <p>Massa magra</p>
            </div>
            <div className="home-right">
              <CircularStatic value={80} />;
              <p>Peso Corporal</p>
            </div>
          </div>
          <div className= "home-graficos">
            <div className="home-right">
              <CircularStatic value={100} />;
              <p>Peso Corporal</p>
            </div>
            <div className="home-right">
              <CircularStatic value={100} />;
              <p>Peso Corporal</p>
            </div>
            <div className="home-right">
              <CircularStatic value={100} />;
              <p>Peso Corporal</p>
            </div>
            <div className="home-right">
              <CircularStatic value={100} />;
              <p>Peso Corporal</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default PagesHome;
