import React, { Component } from "react";
import { Link } from "react-router-dom";

type Servico = {
    nome: string;
    preco: number;
    descricao: string;
}

type Props = {
    tema: string;
}

type State = {
    servicoSelecionadoIndex: number | null;
}

export default class ListaServicos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicoSelecionadoIndex: null
        };
    }

    handleClick(index: number) {
        if (this.state.servicoSelecionadoIndex === index) {
            this.setState({ servicoSelecionadoIndex: null });
        } else {
            this.setState({ servicoSelecionadoIndex: index });
        }
    }

    render() {
        const { tema } = this.props;
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
                                onClick={() => this.handleClick(index)}
                                style={{ cursor: "pointer", background: tema }}
                            >
                                {servico.nome}
                            </a>
                            {this.state.servicoSelecionadoIndex === index && (
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{servico.nome}</h5>
                                        <p className="card-text">Preço: R$ {servico.preco.toFixed(2)}</p>
                                        <p className="card-text">Descrição: {servico.descricao}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
