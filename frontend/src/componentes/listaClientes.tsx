import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Pet = {
    nome: string;
    raca: string;
    tipo: string;
};

type Cliente = {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    pets: Pet[];
};

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento: Event) => void;
};

const ListaCliente: React.FC<Props> = ({ tema, seletorView }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/cliente/clientes");
                setClientes(response.data);
            } catch (error) {
                console.error("Erro ao obter clientes:", error);
            }
        }
        fetchData();
    }, []);

    const handleCadastroCliente = () => {
       
        seletorView('Cadastro', new Event('click'));
    };

    const handleClick = (index: number) => {
        
        console.log("Detalhes do cliente:", clientes[index]);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-start mb-3">
                <Link to="/cadastro" className="btn btn-primary" onClick={handleCadastroCliente}>Cadastrar novo cliente</Link>
            </div>
            <div className="list-group">
                {clientes.map((cliente, index) => (
                    <div key={index}>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleClick(index)}
                        >
                            {cliente.nome}
                        </a>
                        {/* Detalhes do cliente */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaCliente;
