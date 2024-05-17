import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";

import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroPet from "./formularioCadastroPet";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import FormularioCadastroServico from "./formularioCadastroServico";

import ListaCliente from "./listaClientes"; 
import ListaPet from "./listaPets";
import ListaProdutos from "./listaProdutos";
import ListaServicos from "./listaServicos";
import Home from "./Home";

const Roteador: React.FC = () => {
  return (
    <Router>
      <BarraNavegacao tema="#e3f2fd" botoes={['Home', 'Clientes', 'Pets', 'Produtos', 'Servicos']} seletorView={(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}} />
      <Routes>
        <Route path="/" element={<Home tema={""} />} />
        <Route path="/clientes" element={<ListaCliente tema={""} seletorView={function (novaTela: string, evento: Event): void {
                  throw new Error("Function not implemented.");
              } } />} />
        <Route path="/pets" element={<ListaPet tema={""} seletorView={function (novaTela: string, evento: Event): void {
                  throw new Error("Function not implemented.");
              } } />} />
                
        <Route path="/produtos" element={<ListaProdutos tema={""} />} />
        <Route path="/servicos" element={<ListaServicos tema={""} />} />


        <Route path="/cadastro" element={<FormularioCadastroCliente />} />
        <Route path="/cadastro-pet" element={<FormularioCadastroPet />} />
        <Route path="/cadastro-produtos" element={<FormularioCadastroProduto />} />
        <Route path="/cadastro-servicos" element={<FormularioCadastroServico />} />

      </Routes>
    </Router>
  );
};

export default Roteador;

