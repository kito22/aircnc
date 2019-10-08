import React, { useState, useMemo } from 'react';

import PropTypes from 'proptypes';
import api from '../../services/axios';

import camera from '../../assets/camera.svg';

import { Container, InputThumbnail } from './styles';

export default function Spot({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [techs, setTechs] = useState([]);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('price', price);
    data.append('techs', techs);

    await api.post('/spots', data, {
      headers: { user_id },
    });

    history.push('/dashboard');
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputThumbnail
          htmlFor="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          thumbnail={thumbnail}
        >
          <input
            type="file"
            id="thumbnail"
            onChange={e => setThumbnail(e.target.files[0])}
          />
          <img src={camera} alt="Select img" />
        </InputThumbnail>
        <label htmlFor="company">
          EMPRESA *
          <input
            id="company"
            placeholder="Sua empresa incrível"
            onChange={event => setCompany(event.target.value)}
          />
        </label>
        <label htmlFor="techs">
          TECNOLOGIAS * <span>(separadas por virgula)</span>
          <input
            id="techs"
            placeholder="Quais Tecnologias usam?"
            onChange={event => setTechs(event.target.value)}
          />
        </label>
        <label htmlFor="price">
          VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
          <input
            id="price"
            placeholder="Valor cobrado por dia"
            onChange={event => setPrice(event.target.value)}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}

Spot.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
