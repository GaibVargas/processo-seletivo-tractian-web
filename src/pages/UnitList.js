import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../services/api';

import Layout from '../components/Layout';
import Unit from '../components/Unit';

function UnitList() {
  const [units, setUnits] = useState([]);
  const [companyName, setCompanyName] = useState();
  const [loading, setLoading] = useState(true);

  const {company_id} = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getAllUnitsOfOneCompany() {
      const {data} = await api.get('/units', { params: { company_id } });
      // console.log(data);

      setCompanyName(data[0]?.company.name);
      setUnits(data);
      setLoading(false);
    }

    getAllUnitsOfOneCompany();
  }, []);

  function handleEdit(id) {
    history.push(`/unit_edit/${id}`);
  }

  return(
    <Layout>
    <div className="unit-list">
      {loading && (
        <span>Carregando dados...</span>
      )}

      {units.length === 0 && !loading && (
        <>
        <span>Nehuma unidade cadastrada nessa empresa</span> <br/>
        <span>Use o menu acima para cadastrar uma unidade</span>
        </>
      )}

      <div className="units">
        <h1>{companyName}</h1>
        <h2>Unidades: </h2>
        <div className="units-container">
          {units?.map(unit => (
            <Unit key={unit._id} unit={unit} actionOnEdit={() => handleEdit(unit._id)} />
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default UnitList;