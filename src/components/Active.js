import React from 'react';
import { Card, Image, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import '../styles/components/active.css';

const status = ["Disponível", "Em manutenção", "Desativado"];

function Active({ active }) {
  const history = useHistory();

  return(
    <Card style={{marginBottom: 5}}>
      <div className="active-card">
        <div className="active-info">
          <div className="image">
            <Image width={200} src={active.image} />
          </div>
          <div className="text">
            <h4>{active.name}</h4>
            <p>Nível de saúde: {active.health_score}</p>
            <p>{status[active.status]}</p>
          </div>
        </div>

        <div className="container-buttons">
          <Button className="button" onClick={() => { history.push(`/active/${active._id}`) }}>
            <span>Saber mais</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default Active;