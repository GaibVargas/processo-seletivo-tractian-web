import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

function ActiveRegister() {
  const [fileList, setFileList] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [units, setUnits] = useState([]);

  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    async function getAllUsers() {
      const { data } = await api.get('/users');

      setUsers(data);
    }

    getAllUsers();
  }, []);

  useEffect(() => {
    async function getAllUnits() {
      const { data } = await api.get('/units');

      setUnits(data);
    }

    getAllUnits();
  }, []);

  async function handleRegister(value) {
    setLoading(true);

    const data = new FormData();

    for(let prop in value) {
      if(prop === "image") {
        data.append('image', value.image.file);
      } else {
        data.append(prop, value[prop]);
      }
    }

    try {
      await api.post('/actives', data);
      setMessage('Ativo cadastrado com sucesso');
      setLoading(false);
      history.push('/');

    } catch {
      setMessage('Erro no cadastro');
      setLoading(false);
    }
  }

  return(
    <Layout>
    <div className="register">
      <div className="title">
        <h1>Cadastrar Ativo</h1>
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
            <Input placeholder="Informe um nome para o ativo" className="input" />
          </Form.Item>
          <Form.Item label="Descrição" name={["description"]}>
            <Input placeholder="Informe uma descrição para o ativo" className="input" />
          </Form.Item>
          <Form.Item label="Modelo" name={["model"]}>
            <Input placeholder="Informe o modelo do ativo" className="input" />
          </Form.Item>

          <div className="grid">
            <Form.Item label="Status" name={["status"]} rules={[{ required: true }]}>
              <Select placeholder="Seleciona o status do ativo">
                <Select.Option value="0">Disponível</Select.Option>
                <Select.Option value="1">Em manutenção</Select.Option>
                <Select.Option value="2">Desativado</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Nível de saúde" name={["health_score"]} rules={[{ required: true }]}>
              <InputNumber min={0} max={100} placeholder="Informe o nível de saúde do ativo" className="input" />
            </Form.Item>
            <Form.Item label="Unidade" name={["unit_id"]} rules={[{ required: true }]}>
              <Select placeholder="Seleciona uma unidade no sistema">
                {units.map(unit => (
                  <Select.Option key={unit._id} value={unit._id}>{unit.name} - {unit.company.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Responsável" name={["user_id"]} rules={[{ required: true }]}>
              <Select placeholder="Seleciona um responsável no sistema">
                {users.map(user => (
                  <Select.Option key={user._id} value={user._id}>{user.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Imagem" name={["image"]} rules={[{ required: true }]}>
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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

export default ActiveRegister;