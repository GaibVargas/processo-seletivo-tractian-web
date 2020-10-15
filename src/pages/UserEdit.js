import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import Layout from '../components/Layout';
import api from '../services/api';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function UserEdit() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [user, setUser] = useState();

  const { id } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    async function getUserData() {
      const { data } = await api.get(`/users/${id}`);

      setUser(data);
      setLoadingPage(false);
    }

    getUserData();
  }, [id]);

  async function handleUpdate(value) {
    setLoading(true);

    try {
      await api.put(`/users/${id}`, value);
      setLoading(false);
      history.push('/users');
    } catch {
      setMessage('Erro ao salvar alterações');
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await api.delete(`/users/${id}`);
    history.push('/users');
  }

  return(
    <Layout>
    <div className="register">
      {loadingPage ? (
        <span>Carregando dados...</span>
      ) : (
        <>
        <div className="title">
          <h1>Editar Usuário: {user.name}</h1>
        </div>
        <div className="form">
          <Form
            layout="vertical"
            form={form}
            size="large"
            className="form"
            onFinish={handleUpdate}
            validateMessages={validateMessages}
            initialValues={{
              name: user.name
            }}
          >
            <Form.Item label="Nome" name={["name"]} rules={[{ required: true }]}>
              <Input className="input" />
            </Form.Item>
            <Form.Item className="button-container-edit">
              <Button type="primary" danger className="button-edit" onClick={() => handleDelete(user._id)}>
                <span>Deletar usuário</span>
              </Button>
              <Button htmlType="submit" type="primary" className="button-edit">
                {loading ? 'Carregando...' : 'Salvar'}
              </Button>
            </Form.Item>
          </Form>
        </div>
        {message && (
          <span>{message}</span>
        )}
        </>
      )}
    </div>
    </Layout>
  );
}

export default UserEdit;