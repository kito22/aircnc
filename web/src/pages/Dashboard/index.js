import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/axios';

import { Container, RequestList, ContainerContent } from './styles';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: { user_id },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/dashboard', {
        headers: {
          user_id,
        },
      });

      setSpots(response.data);
    }
    loadSpots();
  }, [user_id]);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <Container>
      <RequestList>
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data
              <strong> {request.date}</strong>
            </p>
            <button
              className="buttonAccept"
              type="button"
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </button>
            <button
              className="buttonReject"
              type="button"
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </RequestList>
      <ContainerContent>
        <ul>
          {spots.map(spot => (
            <li key={spot._id}>
              <header
                style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
              />
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$ ${spot.price}` : 'Gratuito'}</span>
            </li>
          ))}
        </ul>
        <Link to="/new">
          <button type="button">Cadastrar novo spot</button>
        </Link>
      </ContainerContent>
    </Container>
  );
}
