import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';

import '../styles/components/header.css';

const showMenu = (
  <Menu className="menu">
    <Menu.Item>
      <Link to="/">Empresas</Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/users">Usuários</Link>
    </Menu.Item>
  </Menu>
);

const registerMenu = (
  <Menu className="menu">
    <Menu.Item>
      <Link to="/company_register">Empresa</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/unit_register">Unidade</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/active_register">Ativo</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/user_register">Usuário</Link>
    </Menu.Item>
  </Menu>
);

function Header() {
  return (
    <div className="container">
      <header>
        <Link to="/" className="logo">
          <h1>Tractian</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Dropdown overlay={showMenu} arrow placement="bottomCenter">
                <span>Exibir</span>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={registerMenu} arrow placement="bottomCenter">
                <span>Cadastrar</span>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;