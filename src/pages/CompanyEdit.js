import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import Layout from '../components/Layout';
import api from '../services/api';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function CompanyEdit() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [company, setCompany] = useState([]);

  const { id } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    async function getCompanyData() {
      const { data } = await api.get(`/companies/${id}`);

      setCompany(data);
      setLoadingPage(false);
    }

    getCompanyData();
  }, [id]);

  async function handleUpdate(value) {
    setLoading(true);

    try {
      const response = await api.put(`/companies/${id}`, value);
      if(response.data.message) {
        setMessage('CNPJ já cadastrado no sistema');
        setLoading(false);
      } else {
        setLoading(false);
        history.push('/');
      }
    } catch {
      setMessage('Erro ao salvar alterações');
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await api.delete(`/companies/${id}`);
    history.push('/');
  }

  return(
    <Layout>
    <div className="register">
      {loadingPage ? (
        <span>Carregando dados...</span>
      ) : (
        <>
        <div className="title">
          <h1>Editar Empresa: {company.name}</h1>
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
              name: company.name,
              cnpj: company.cnpj
            }}
          >
            <Form.Item label="Nome da empresa" name={["name"]} rules={[{ required: true }]}>
              <Input placeholder="Informe o nome da empresa" className="input" />
            </Form.Item>
            <Form.Item label="CNPJ" name={["cnpj"]} rules={[{ required: true }]}>
              <Input placeholder="Informe o CNPJ da empresa" className="input" />
            </Form.Item>
            <Form.Item className="button-container-edit">
              <Button type="primary" danger className="button-edit" onClick={() => handleDelete(company._id)}>
                <span>Deletar empresa</span>
              </Button>
              <Button htmlType="submit" type="primary" className="button-edit">
                <span>
                  {loading ? 'Carregando...' : 'Salvar'}
                </span>
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

export default CompanyEdit;