import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import api from '../services/api';

import Layout from '../components/Layout';
import Company from '../components/Company';

import '../styles/pages/company_list.css';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function getAllCompanies() {
      const {data} = await api.get('/companies');

      setCompanies(data);
      setLoading(false);
    }

    getAllCompanies();
  }, []);

  function handleEdit(id) {
    history.push(`/company_edit/${id}`);
  }

  return(
    <Layout>
    <div className="company-list">
      <h1>Lista de empresas</h1>
      <div className="companies-container">
        {companies?.map(company => (
          <Company
            key={company._id}
            company={company}
            actionOnEdit={() => handleEdit(company._id)}
          />
        ))}

        {loading && (
          <span>Carregando dados...</span>
        )}

        {companies.length === 0 && !loading && (
          <>
          <span>Nehuma empresa cadastrada</span>
          <Button className="button_register" onClick={() => { history.push('/company_register') }}>
            <span>Cadastrar empresa</span>
          </Button>
          </>
        )}
      </div>
    </div>
    </Layout>
  );
}

export default CompanyList;