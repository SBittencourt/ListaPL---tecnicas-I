import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Cliente {
  id: number;
  nome: string;
}

const ListaCliente = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  
  

  return (
    <div>
      <h1>Lista de Clientes</h1>
      {error && <p>{error}</p>}
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCliente;
