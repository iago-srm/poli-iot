// https://react-bootstrap.github.io/components/cards/#title-text-and-links

// https://react-bootstrap.github.io/components/cards/#card-deck

// https://github.com/react-grid-layout/react-grid-layout#usage
import React from 'react';
import pageStyles from '../styles/page.module.css';

const HomePage = () => {
  return (
    <div className={pageStyles.container}>
      <h1 style={{ color: "red" }}>PCS3734 - Laboratório de Redes</h1>
      <h2>Projeto de IoT - Monitoramento de jardim</h2>
      <div>
        <h2>Bruno Macedo Sanches</h2>
        <h2>Iago Soriano Roque Monteiro</h2>
      </div>

    </div>
  )
};

export default HomePage;
