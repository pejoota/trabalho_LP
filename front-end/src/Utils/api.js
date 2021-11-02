import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

//api.interceptors.request.use(
//  (config) => {
//    if (!config.url.endsWith('/auth')) {
//      config.headers['Authorization'] = localStorage.getItem('token');
//    }
//    return config;
//  },
//  function (error) {
//    return Promise.reject(error);
//  }
//);

export const login = (email, password) => {
  return api.post(`/usuarios/`, { email, password });
};

export const register = (email, senha, firstName, altura, idade, peso, percgordura, percmassamagra,id_cardapio) => {
  return api.post(`/usuarios`, {
    email: email,
    senha: senha,
    nome: firstName,
    altura: altura,
    idade: idade,
    peso:peso,
    percgordura:percgordura,
    percmassamagra:percmassamagra,
    id_cardapio:id_cardapio,
  });
};

export const updateProfile = (email, password, firstName, creator, id) => {
  return api.put(`/users/${id}`, {
    email: email,
    password: password,
    name: firstName,
    answerer: true,
    creator: creator,
  });
};

export const getFormPerUser = (user_id) => {
  return api.get(`/ingredients/${user_id}`);
};

export const deleteForm = (id) => {
  return api.delete(`/forms/${id}`);
};

export const getFormById = (id) => {
  return api.get(`/receitas/${id}`);
};

export const getReceitaById = (id) => {
  return api.get(`/receitas/${id}`);
};

export const getUserById = (id) => {
  return api.get(`/receitas/${id}`);
};

export const sendFeedback = (form_id, user_id, description) => {
  return api.post('/feedbacks', { form_id, user_id, description });
};

export const getFeedbacksById = (form_id, user_id) => {
  return api.get(`/feedback-per-user-and-form/${user_id}/${form_id}`);
};

export const getAllForms = () => {
  return api.get('/ingredients');
};

export const getAllUsers = () => {
  return api.get('/users/');
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const userToForm = (form_id, user_id) => {
  return api.post(`/assignments`, { form_id, user_id });
};

export const getAssignPerUser = () => {
  return api.get(`/receitas`);
};

export const sendAnswers = (form_id, user_id, question_id, respostas) => {
  return api.post('/answers/', {
    form_id: form_id,
    user_id: user_id,
    question_id: question_id,
    respostas: respostas,
  });
};

export const createForm = (title, description, user_id) => {
  return api.post(`/forms`, { title, description, user_id });
};

export const createQuestion = (quesDescription, formId, quesType) => {
  return api.post(`/questions`, {
    description: quesDescription,
    form_id: formId.form_id,
    ques_type: quesType,
  });
};

export const getAnswersPerUser = () => {
  return api.get(`/ingredients`);
};
