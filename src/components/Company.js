import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import '../styles/components/company.css';

function Company({ company, actionOnEdit }) {
  return(
    <Card>
      <div className="company-card">
        <div className="company-info">
          <h2>{company.name}</h2>
          <p>CNPJ: {company.cnpj}</p>
          <p>Nº de Unidades: {company.units.length}</p>
        </div>
        <div className="buttons-container">
          <Link to={`/units/${company._id}`}>
            <Button>
              <span>Saber mais</span>
            </Button>
          </Link>
          <Button type="primary" className="button-company" onClick={actionOnEdit}>
            <EditOutlined/>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default Company;