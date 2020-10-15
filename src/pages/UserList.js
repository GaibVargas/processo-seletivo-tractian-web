import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import api from '../services/api';

import Layout from '../components/Layout';
import User from '../components/User';

import '../styles/pages/company_list.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function getAllUsers() {
      const {data} = await api.get('/users');

      setUsers(data);
      setLoading(false);
    }

    getAllUsers();
  }, []);

  function handleEdit(id) {
    history.push(`/user_edit/${id}`);
  }

  return(
    <Layout>
    <div className="user-list">
      <h1>Lista de usuários</h1>
      <div className="users-container">
        {users?.map(user => (
          <User 
            key={user._id}
            name={user.name} 
            actionOnEdit={() => handleEdit(user._id)}
          />
        ))}

        {!users && (
          <span>Carregando...</span>
        )}

        {users.length === 0 && !loading && (
          <>
          <span>Nenhum usuário cadastrado</span>
          <Button className="button_register" onClick={() => { history.push('/user_register') }}>
            <span>Cadastrar usuário</span>
          </Button>
          </>
        )}
      </div>
    </div>
    </Layout>
  );
}

export default UserList;