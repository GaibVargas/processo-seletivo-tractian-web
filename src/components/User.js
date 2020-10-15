import React from 'react';
import { Card,Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import '../styles/components/user.css';

function User({ name, actionOnEdit }) {
  return (
    <Card>
      <div className="card-content">
        <div className="user">
          <h3>{name}</h3>
        </div>

        <div className="buttons-container">
          <Button type="primary" className="button-user" onClick={actionOnEdit}>
            <EditOutlined/>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default User;