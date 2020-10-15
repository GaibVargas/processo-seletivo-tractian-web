import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function UnitEdit() {
  const [companies, setCompanies] = useState([]);
  const [unit, setUnit] = useState();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    async function getUnitData() {
      const { data } = await api.get(`/units/${id}`);

      setUnit(data);
      setLoadingPage(false);
    }

    getUnitData();
  }, [id]);

  useEffect(() => {
    async function getAllCompanies() {
      const { data } = await api.get('/companies');

      setCompanies(data);
    }

    getAllCompanies();
  }, []);

  async function handleUpdate(value) {
    setLoading(true);

    try {
      await api.put(`/units/${id}`, value);

      setLoading(false);
      history.push('/');
    } catch {
      setMessage('Erro ao salvar alterações');
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await api.delete(`/units/${id}`);
    history.push(`/`);
  }
  
  return(
    <Layout>
    <div className="register">
      {loadingPage ? (
        <span>Carregando dados...</span>
      ) : (
        <>
        <div className="title">
          <h1>Cadastrar Unidade</h1>
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
              name: unit.name,
              company_id: unit.company._id
            }}
          >
            <Form.Item label="Nome" name={["name"]} rules={[{ required: true }]}>
              <Input placeholder="Informe um nome para a unidade" className="input" />
            </Form.Item>
            <Form.Item label="Empresa" name={["company_id"]} rules={[{ required: true }]}>
              <Select placeholder="Seleciona uma empresa no sistema">
                {companies.map(company => (
                  <Select.Option key={company._id} value={company._id}>{company.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item className="button-container-edit">
              <Button type="primary" danger className="button-edit" onClick={() => handleDelete(unit._id)}>
                <span>Deletar unidade</span>
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

export default UnitEdit;