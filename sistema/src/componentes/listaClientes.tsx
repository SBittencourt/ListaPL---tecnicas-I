import React, { Component } from "react";

type Pet = {
    nome: string;
    raca: string;
    tipo: string;
}

type Cliente = {
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    pets: Pet[];
}

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento: Event) => void; 
}

type State = {
    clienteSelecionadoIndex: number | null;
}

export default class ListaCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clienteSelecionadoIndex: null
        };
    }

    handleClick(index: number) {
        if (this.state.clienteSelecionadoIndex === index) {
            this.setState({ clienteSelecionadoIndex: null });
        } else {
            this.setState({ clienteSelecionadoIndex: index });
        }
    }

    handleCadastroCliente() {
        this.props.seletorView('Cadastro', new Event('click'));
    }

    render() {
        const { tema } = this.props;
        const clientes: Cliente[] = [
            { 
                nome: "João Silva", 
                cpf: "123.456.789-00", 
                rg: "1234567-8", 
                telefone: "(00) 1234-5678", 
                pets: [
                    { nome: "Rex", raca: "Pinscher", tipo: "Cachorro" },
                    { nome: "Mia", raca: "Siamês", tipo: "Gato" }
                ] 
            },
            { 
                nome: "Maria Oliveira", 
                cpf: "987.654.321-00", 
                rg: "9876543-2", 
                telefone: "(00) 8765-4321", 
                pets: [
                    { nome: "Fido", raca: "Golden Retriever", tipo: "Cachorro" }
                ] 
            },
            { 
                nome: "Carlos Santos", 
                cpf: "111.222.333-44", 
                rg: "5556667-8", 
                telefone: "(00) 2345-6789", 
                pets: [
                    { nome: "Bolinha", raca: "Vira-lata", tipo: "Cachorro" },
                    { nome: "Garfield", raca: "Persa", tipo: "Gato" }
                ] 
            },
            { 
                nome: "Ana Souza", 
                cpf: "222.333.444-55", 
                rg: "7778889-0", 
                telefone: "(00) 3456-7890", 
                pets: [
                    { nome: "Nina", raca: "Labrador", tipo: "Cachorro" },
                    { nome: "Luna", raca: "Siamesa", tipo: "Gato" }
                ] 
            },
            { 
                nome: "Fernanda Lima", 
                cpf: "555.666.777-88", 
                rg: "4445556-7", 
                telefone: "(00) 4567-8901", 
                pets: [
                    { nome: "Thor", raca: "Dálmata", tipo: "Cachorro" }
                ] 
            },
            { 
                nome: "Pedro Costa", 
                cpf: "777.888.999-00", 
                rg: "3334445-6", 
                telefone: "(00) 5678-9012", 
                pets: [
                    { nome: "Mel", raca: "Poodle", tipo: "Cachorro" },
                    { nome: "Tom", raca: "Persa", tipo: "Gato" }
                ] 
            },
            { 
                nome: "Lúcia Pereira", 
                cpf: "999.888.777-66", 
                rg: "2223334-5", 
                telefone: "(00) 6789-0123", 
                pets: [
                    { nome: "Bela", raca: "Golden Retriever", tipo: "Cachorro" }
                ] 
            },
            { 
                nome: "Ricardo Mendes", 
                cpf: "444.333.222-11", 
                rg: "8889990-1", 
                telefone: "(00) 7890-1234", 
                pets: [
                    { nome: "Simba", raca: "Vira-lata", tipo: "Cachorro" }
                ] 
            },
            { 
                nome: "Sandra Carvalho", 
                cpf: "666.555.444-33", 
                rg: "1112223-4", 
                telefone: "(00) 8901-2345", 
                pets: [
                    { nome: "Lucky", raca: "Labrador", tipo: "Cachorro" }
                ] 
            },
            { 
                nome: "Roberto Almeida", 
                cpf: "888.777.666-55", 
                rg: "9990001-2", 
                telefone: "(00) 9012-3456", 
                pets: [
                    { nome: "Molly", raca: "Bulldog Francês", tipo: "Cachorro" }
                ] 
            },
        ];

        return (
            <div className="container-fluid">
                <button className="btn btn-primary mt-3" onClick={() => this.handleCadastroCliente()}>
                    Cadastrar Novo Cliente
                </button>
                
                <div className="list-group">
                    {clientes.map((cliente, index) => (
                        <div key={index}>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action"
                                onClick={() => this.handleClick(index)}
                                style={{ cursor: "pointer", background: tema }}
                            >
                                {cliente.nome}
                            </a>
                            {this.state.clienteSelecionadoIndex === index && (
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{cliente.nome}</h5>
                                        <p className="card-text">CPF: {cliente.cpf}</p>
                                        <p className="card-text">RG: {cliente.rg}</p>
                                        <p className="card-text">Telefone: {cliente.telefone}</p>
                                        <p className="card-text">Pets:</p>
                                        <ul className="list-group">
                                            {cliente.pets.map((pet, petIndex) => (
                                                <li key={petIndex} className="list-group-item">{pet.nome} - Raça: {pet.raca}, Tipo: {pet.tipo}</li>
                                            ))}
                                        </ul>
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
