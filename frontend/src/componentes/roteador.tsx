import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";

import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaClientes"; 
import Home from "./Home";
import Login from "./login";
import Atualizar from "./atualizarCliente";
import FormularioAtualizarCliente from "./atualizarCliente";

const Roteador: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <BarraNavegacao 
          tema="#e3f2fd" 
          botoes={['Home', 'Clientes', 'Cadastro']} 
          seletorView={(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}} 
        />
      )}
      <Routes>
        <Route path="/" element={<Login tema={""} />} />
        <Route path="/home" element={<Home tema={""} />} />
        <Route path="/clientes" element={<ListaCliente />} />
        <Route path="/cadastro" element={<FormularioCadastroCliente />} />
        <Route path="/atualizar/:id" element={<FormularioAtualizarCliente />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <Roteador />
  </Router>
);

export default App;
