import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Cliente = {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
};

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento: Event) => void;
};

const ListaCliente: React.FC<Props> = ({ tema, seletorView }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

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
        setClienteSelecionado(clientes[index]);
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
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleClick(index)}
                        >
                            {cliente.nome}
                        </button>
                    </div>
                ))}
            </div>
            {clienteSelecionado && (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{clienteSelecionado.nome}</h5>
                        <p className="card-text">CPF: {clienteSelecionado.cpf}</p>
                        <p className="card-text">RG: {clienteSelecionado.rg}</p>
                        <p className="card-text">Telefone: {clienteSelecionado.telefone}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaCliente;
