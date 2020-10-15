import React from 'react';
import { Card, Button, Collapse } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Active from './Active';

import '../styles/components/unit.css';

function Unit({ unit, actionOnEdit }) {
  let infographic = {
    estavel: [],
    alerta: [],
    critico: []
  };
  
  unit.actives.map(active => {
    if(active.health_score >= 80) {
      return infographic["estavel"].push(active.health_score);
    } else if (active.health_score > 60) {
      return infographic["alerta"].push(active.health_score);
    } else {
      return infographic["critico"].push(active.health_score);
    }
  });

  const options = {
    title: {
      text: 'Visão geral do Nível de Saúde dos ativos'
    },
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: ["Estável", "Em alerta", "Crítico"],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
          text: 'Número de ativos'
      }
    },
    plotOptions: {
      bar: {
          dataLabels: {
              enabled: true
          }
      }
    },
    series: [
      {
        name: "Nº de ativos",
        data: [
          infographic["estavel"].length,
          infographic["alerta"].length,
          infographic["critico"].length,
        ]
      },
    ],
  }

  console.log(infographic);

  return(
    <Card style={{marginBottom: 5}}>
      <div className="unit-card">
        <div className="unit-header">
          <div className="unit-info">
            <h3>{unit.name}</h3>
            {unit.actives.length !== 0 ? (
              <p>Média do Nível de Saúde: {
                ((unit.actives.map(active => active.health_score).reduce((acc, index) => acc + index)) / unit.actives.length).toFixed(2)
              }</p>
            ) : (
              <p className="no-actives">Essa unidade ainda não possui ativos cadastrados</p>
            )}
          </div>

          <div className="buttons-container">
            <Button type="primary" className="button-company" onClick={actionOnEdit}>
              <EditOutlined/>
            </Button>
          </div>
        </div>

        {unit.actives.length !== 0 && (
          <div className="graphic">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </div>
        )}

        {unit.actives.length !== 0 && (
          <div className="unit-actives">
            <Collapse bordered={true}>
              <Collapse.Panel header={<span className="panel-header"><strong>Ativos: </strong>{unit.actives.length}</span>}>
                {unit.actives.map(active => (
                  <Active key={active._id} active={active} />
                ))}
              </Collapse.Panel>
            </Collapse>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Unit;