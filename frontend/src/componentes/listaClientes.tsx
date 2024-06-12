import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  telefone: []; 
}

const ListaCliente = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clienteSelecionadoIndex, setClienteSelecionadoIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Cliente[]>('http://localhost:32831/cliente/clientes', {
          validateStatus: (status) => status >= 200 && status < 303, 
        });
        if (response.status === 302) {
          setClientes(response.data);
        } 
      } catch (error) {
        setError('Erro ao obter clientes. Por favor, tente novamente mais tarde.');
      }
    };
  
    fetchData();
  }, []);

  const handleClick = (index: number) => {
    setClienteSelecionadoIndex(clienteSelecionadoIndex === index ? null : index);
  };

  const handleCadastroCliente = () => {
  };

  const handleExcluirCliente = (index: number) => {

  };

  const handleAtualizarCliente = (index: number) => {

    
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-start mb-3">
        <Link to="/cadastro" className="btn btn-primary" onClick={handleCadastroCliente}>Cadastrar novo cliente</Link>
      </div>
      <div className="list-group">
        {clientes.map((cliente, index) => (
          <div key={index}>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => handleClick(index)}
            >
              {cliente.nome}
            </button>
            {clienteSelecionadoIndex === index && (
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">{cliente.nome}</h5>
                  <p className="card-text">CPF: {cliente.cpf}</p>
                  <p className="card-text">RG: {cliente.rg}</p>
                  <p className="card-text">Telefone: {cliente.telefone}</p>
                  <div className="mt-3">
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleExcluirCliente(index)}>Excluir</button>
                    <button className="btn btn-primary btn-sm ml-2" onClick={() => handleAtualizarCliente(index)}>Atualizar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCliente;
