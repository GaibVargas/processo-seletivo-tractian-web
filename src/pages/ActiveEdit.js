import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/form_register.css';

const validateMessages = {
  required: '${label} é obrigatório!',
};

const status = ["Disponível", "Em manutenção", "Desativado"];

function ActiveEdit() {
  const [fileList, setFileList] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [active, setActive] = useState();
  const [users, setUsers] = useState([]);
  const [units, setUnits] = useState([]);

  const [form] = Form.useForm();

  const { id } = useParams();
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
  
  useEffect(() => {
    async function getActiveData() {
      const { data } = await api.get(`/actives/${id}`);

      setActive(data);
      setLoadingPage(false);
    }

    getActiveData();
  }, []);

  async function handleRegister(value) {
    setLoading(true);

    const data = new FormData();

    for(let prop in value) {
      if(prop === "image") {
        if(value[prop] !== undefined) {
          data.append('image', value.image.file);
        }
      } else {
        data.append(prop, value[prop]);
      }
    }

    setLoading(false);

    try {
      await api.put(`/actives/${active._id}`, data);
      setMessage('Ativo editado com sucesso');
      setLoading(false);
      history.push('/');

    } catch {
      setMessage('Erro na edição');
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await api.delete(`/actives/${id}`);
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
          <h1>Editar Ativo: {active.name}</h1>
          
          <Button type="primary" danger className="button-edit" onClick={() => handleDelete(active._id)}>
            <span>Deletar ativo</span>
          </Button>
        </div>
        <div className="form">
          <Form
            layout="vertical"
            form={form}
            size="large"
            className="form"
            onFinish={handleRegister}
            validateMessages={validateMessages}
            initialValues={{
              name: active.name,
              description: active.description === "undefined" ? "" : active.description,
              model: active.model === "undefined" ? "" : active.model,
              status: active.status,
              health_score: active.health_score,
              unit_id: active.unit_id._id,
              user_id: active.user_id._id,
            }}
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
                  <Select.Option value={0}>Disponível</Select.Option>
                  <Select.Option value={1}>Em manutenção</Select.Option>
                  <Select.Option value={2}>Desativado</Select.Option>
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

            <Form.Item label="Imagem" name={["image"]}>
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <p>Somente selecione uma imagem se quiser substituir a imagem atual do ativo</p>
            
            <Form.Item>
              <Button htmlType="submit" type="primary" className="button">
                <span>
                  {loading ? 'Carregando...' : 'Salvar'}
                </span>
              </Button>
            </Form.Item>
          </Form>
        </div>
        </>
      )}
      {message && (
        <span>{message}</span>
      )}
    </div>
    </Layout>
  );
}

export default ActiveEdit;