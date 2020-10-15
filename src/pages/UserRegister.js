import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function UserRegister() {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleRegister(value) {
    setLoading(true);

    try {
      await api.post('/users', value);
      setMessage('Usuário cadastrado com sucesso');
      setLoading(false);
      history.push('/users');

    } catch {
      setMessage('Erro no cadastro');
      setLoading(false);
    }
  }

  return(
    <Layout>
    <div className="register">
      <div className="title">
        <h1>Cadastrar Usuário</h1>
      </div>
      <div className="form">
        <Form
          layout="vertical"
          form={form}
          size="large"
          className="form"
          onFinish={handleRegister}
          validateMessages={validateMessages}
        >
          <Form.Item label="Nome" name={["name"]} rules={[{ required: true }]}>
            <Input placeholder="Informe um nome de usuário" className="input" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="button">
              <span>
                {loading ? 'Carregando...' : 'Cadastrar'}
              </span>
            </Button>
          </Form.Item>
        </Form>
      </div>
      {message && (
        <span>{message}</span>
      )}
    </div>
    </Layout>
  );
}

export default UserRegister;