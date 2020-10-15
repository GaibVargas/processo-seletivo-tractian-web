import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function UnitRegister() {
  const [companies, setCompanies] = useState([]);

  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    async function getAllCompanies() {
      const { data } = await api.get('/companies');

      setCompanies(data);
    }

    getAllCompanies();
  }, []);

  async function handleRegister(value) {
    await api.post('/units', value);
    history.push(`/units/${value.company_id}`)
  }

  return(
    <Layout>
    <div className="register">
      <div className="title">
        <h1>Cadastrar Unidade</h1>
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
            <Input placeholder="Informe um nome para a unidade" className="input" />
          </Form.Item>
          <Form.Item label="Empresa" name={["company_id"]} rules={[{ required: true }]}>
            <Select placeholder="Seleciona uma empresa no sistema">
              {companies.map(company => (
                <Select.Option key={company._id} value={company._id}>{company.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="button">Cadastrar</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </Layout>
  );
}

export default UnitRegister;