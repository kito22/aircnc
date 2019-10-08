import React, { useState } from 'react';

import PropTypes from 'proptypes';
import api from '../../services/axios';

import { Container } from './styles';

export default function Login({ history }) {
  const [email, setEmail] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/session', { email });

    const { _id } = response.data;
    localStorage.setItem('user', _id);
    if (email) {
      history.push('/dashboard');
    }
  }

  return (
    <Container>
      <span>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong> talentos</strong> para sua empresa.
      </span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-MAIL *
          <input
            id="email"
            type="email"
            placeholder="Seu melhor e-mail"
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
