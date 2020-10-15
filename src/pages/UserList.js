import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';
import User from '../components/User';

function UserList() {
  const [users, setUsers] = useState();

  const history = useHistory();

  useEffect(() => {
    async function getAllUsers() {
      const {data} = await api.get('/users');

      setUsers(data);
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
      </div>
    </div>
    </Layout>
  );
}

export default UserList;