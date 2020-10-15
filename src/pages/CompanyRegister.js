import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function CompanyRegister() {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleRegister(value) {
    setLoading(true);

    try {
      const {data} = await api.post('/companies', value);

      if(data.message) {
        setMessage('CNPJ já cadastrado no sistema');
      } else {
        setMessage('Empresa cadastrada com sucesso');
        history.push('/');
      }
      setLoading(false);
    } catch {
      setMessage('Erro no cadastro');
      setLoading(false);
    }
  }

  return (
    <Layout>
    <div className="register">
      <div className="title">
        <h1>Cadastrar Empresa</h1>
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
          <Form.Item label="Nome da empresa" name={["name"]} rules={[{ required: true }]}>
            <Input placeholder="Informe o nome da empresa" className="input" />
          </Form.Item>
          <Form.Item label="CNPJ" name={["cnpj"]} rules={[{ required: true }]}>
            <Input placeholder="Informe o CNPJ da empresa" className="input" />
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

export default CompanyRegister;