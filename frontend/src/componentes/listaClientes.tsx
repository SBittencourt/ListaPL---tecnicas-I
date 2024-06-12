import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Telefone {
  ddd: string;
  numero: string;
}

interface Endereco {
  id: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: Endereco;
  cpf?: string; 
  rg?: string; 
  telefones?: Telefone[]; 
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
        console.log('Response:', response);
        console.log('Data:', response.data);
        if (response.status === 200 || response.status === 302) {
          setClientes(response.data);
        } 
      } catch (error) {
        console.error('Erro ao obter clientes:', error);
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

  const handleExcluirCliente = async (id: number) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (!confirmacao) {
      return; 
    }
  
    try {
      const clienteExclusao = clientes.find(cliente => cliente.id === id);
      if (!clienteExclusao) {
        console.error('Cliente não encontrado');
        return;
      }
  
      await axios.delete('http://localhost:32831/cliente/excluir', {
        data: clienteExclusao,
      });
  
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setError('Erro ao excluir cliente. Por favor, tente novamente mais tarde.');
    }
  };
  
  
  

  const handleAtualizarCliente = (id: number) => {
    window.location.href = `http://localhost:3000/cliente/${id}`;
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
                  <p className="card-text">Nome Social: {cliente.nomeSocial}</p>
                  <p className="card-text">Email: {cliente.email || 'Não disponível'}</p>
                  <p className="card-text">Endereço:</p>
                  <ul>
                    <li>Estado: {cliente.endereco.estado}</li>
                    <li>Cidade: {cliente.endereco.cidade}</li>
                    <li>Bairro: {cliente.endereco.bairro}</li>
                    <li>Rua: {cliente.endereco.rua}, {cliente.endereco.numero}</li>
                    <li>CEP: {cliente.endereco.codigoPostal}</li>
                    <li>Informações Adicionais: {cliente.endereco.informacoesAdicionais || 'Não disponível'}</li>
                  </ul>
                  <p className="card-text">Telefones:</p>
                  <ul>
                    {cliente.telefones && cliente.telefones.length > 0 ? (
                      cliente.telefones.map((tel, telIndex) => (
                        <li key={telIndex}>{`(${tel.ddd}) ${tel.numero}`}</li>
                      ))
                    ) : (
                      <li>Não disponível</li>
                    )}
                  </ul>
                  <div className="mt-3">
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleExcluirCliente(cliente.id)}>Excluir</button>
                    <button className="btn btn-primary btn-sm ml-2" onClick={() => handleAtualizarCliente(cliente.id)}>Atualizar</button>
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
