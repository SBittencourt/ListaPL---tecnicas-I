import React, { useState } from "react";
import { Link } from "react-router-dom";

type Produto = {
    nome: string;
    valor: number;
    descricao: string;
};

type Props = {
    tema: string;
};

const ListaProdutos: React.FC<Props> = ({ tema }) => {
    const [produtoSelecionadoIndex, setProdutoSelecionadoIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        if (produtoSelecionadoIndex === index) {
            setProdutoSelecionadoIndex(null);
        } else {
            setProdutoSelecionadoIndex(index);
        }
    };

    const handleExcluirProduto = (index: number) => {
        console.log(`Excluir produto ${index}`);
    };

    const handleAtualizarProduto = (index: number) => {
        console.log(`Atualizar produto ${index}`);
    };

    const produtos: Produto[] = [
        { 
            nome: "Ração Premium para Cães",
            valor: 89.99,
            descricao: "Ração premium para cães de todas as idades, sabor frango e arroz, rico em nutrientes essenciais para a saúde do seu pet."
        },
        { 
            nome: "Brinquedo Interativo para Gatos",
            valor: 29.99,
            descricao: "Brinquedo interativo para gatos com bola giratória e varinha com penas, mantém seu gato entretido e estimula o exercício físico."
        },
        { 
            nome: "Coleira Anti-pulgas e Carrapatos",
            valor: 45.99,
            descricao: "Coleira anti-pulgas e carrapatos para cães de todos os portes, proporciona proteção eficaz contra insetos parasitas por até 8 meses."
        },
        { 
            nome: "Comedouro Automático para Pets",
            valor: 79.99,
            descricao: "Comedouro automático para cães e gatos, programável e fácil de usar, mantém a alimentação do seu pet organizada e regular."
        },
        { 
            nome: "Shampoo Hidratante para Cães",
            valor: 19.99,
            descricao: "Shampoo hidratante para cães de pelagem longa, nutre e hidrata profundamente o pelo do seu pet, deixando-o macio e sedoso."
        },
    ];

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-start mb-3">
                <Link to="/cadastro-produtos" className="btn btn-primary">Cadastrar novo produto</Link>
            </div>
            <div className="list-group">
                {produtos.map((produto, index) => (
                    <div key={index}>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleClick(index)}
                            style={{ cursor: "pointer", background: tema }}
                        >
                            {produto.nome}
                        </a>
                        {produtoSelecionadoIndex === index && (
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text">Valor: R$ {produto.valor.toFixed(2)}</p>
                                    <p className="card-text">Descrição: {produto.descricao}</p>
                                    <div className="d-flex justify-content-start">
                                        <button className="btn btn-danger mr-2" onClick={() => handleExcluirProduto(index)}>Excluir</button>
                                        <button className="btn btn-primary" onClick={() => handleAtualizarProduto(index)}>Atualizar</button>
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

export default ListaProdutos;
