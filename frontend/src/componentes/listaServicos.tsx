import React, { useState } from "react";
import { Link } from "react-router-dom";

type Servico = {
    nome: string;
    preco: number;
    descricao: string;
};

type Props = {
    tema: string;
};

const ListaServicos: React.FC<Props> = ({ tema }) => {
    const [servicoSelecionadoIndex, setServicoSelecionadoIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        if (servicoSelecionadoIndex === index) {
            setServicoSelecionadoIndex(null);
        } else {
            setServicoSelecionadoIndex(index);
        }
    };

    const handleExcluirServico = (index: number) => {
        console.log(`Excluir serviço ${index}`);
    };

    const handleAtualizarServico = (index: number) => {
        console.log(`Atualizar serviço ${index}`);
    };

    const servicos: Servico[] = [
        { 
            nome: "Banho e Tosa",
            preco: 50.00,
            descricao: "Banho e tosa para cães de todos os portes, inclui banho com shampoo especial, secagem, tosa higiênica e finalização."
        },
        { 
            nome: "Hidratação de Pelagem",
            preco: 30.00,
            descricao: "Hidratação profunda para cães com pelagem ressecada, nutre os fios, proporcionando brilho e maciez."
        },
        { 
            nome: "Consulta Veterinária",
            preco: 80.00,
            descricao: "Consulta veterinária para cães e gatos, inclui avaliação clínica completa e orientações sobre saúde e bem-estar do seu pet."
        },
        { 
            nome: "Corte de Unhas",
            preco: 20.00,
            descricao: "Corte de unhas para cães e gatos, feito com cuidado para evitar ferimentos e desconforto."
        },
        { 
            nome: "Vacinação",
            preco: 60.00,
            descricao: "Vacinação para cães e gatos, proteja seu pet contra doenças comuns e mantenha suas vacinas em dia."
        },
    ];

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-start mb-3">
                <Link to="/cadastro-servicos" className="btn btn-primary">Cadastrar novo serviço</Link>
            </div>
            <div className="list-group">
                {servicos.map((servico, index) => (
                    <div key={index}>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleClick(index)}
                            style={{ cursor: "pointer", background: tema }}
                        >
                            {servico.nome}
                        </a>
                        {servicoSelecionadoIndex === index && (
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">{servico.nome}</h5>
                                    <p className="card-text">Preço: R$ {servico.preco.toFixed(2)}</p>
                                    <p className="card-text">Descrição: {servico.descricao}</p>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <button className="btn btn-danger mr-2" onClick={() => handleExcluirServico(index)}>Excluir</button>
                                            <button className="btn btn-primary" onClick={() => handleAtualizarServico(index)}>Atualizar</button>
                                        </div>
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

export default ListaServicos;
