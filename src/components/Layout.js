import React from 'react';

import Header from './Header';

import '../styles/global.css';

function Layout({ children }) {
  return(
    <div>
      <Header />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;