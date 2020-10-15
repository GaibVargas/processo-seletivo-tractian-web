import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Image, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import api from '../services/api';

import Layout from '../components/Layout';

import '../styles/pages/active.css';

const status = ["Disponível", "Em manutenção", "Desativado"];

function Active() {
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    api.get(`/actives/${id}`).then(({data}) => {
      setActive(data);
      setLoading(false);
    });
  }, []);

  return(
    <Layout>
    <div className="active">
      {loading ? (
        <span>Carregando dados...</span>
      ) : (
        <Card>
          <header>
            <h1>{active.name}</h1>

            <div className="buttons-container">
              <Button type="primary" onClick={() => { history.push(`/active_edit/${active._id}`) }}>
                <EditOutlined/>
              </Button>
            </div>
          </header>

          <main>
            <div className="extra">
              <Image 
                width={300}
                src={active.image}
              />
              <div className="status">
                <p>Nome: {active.name}</p>
                {active.model !== "undefined" && active.model !== "" && (<p>Modelo: {active.model}</p>)}
              </div>
            </div>
            <div className="detail">
              {active.description !== "undefined" && active.model!== "" && (<p>Descrição: {active.description}</p>)}
              <p>Status: {status[active.status]}</p>
              <p>Nível de saúde: {active.health_score}</p>
              <p>Unidade: {active.unit_id.name}</p>
              <p>Responsável: {active.user_id.name}</p>
            </div>
          </main>
        </Card>
      )}
    </div>
    </Layout>
  );
}

export default Active;