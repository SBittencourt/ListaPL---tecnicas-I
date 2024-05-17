import React, { Component } from "react";
import { Link } from "react-router-dom";

type Pet = {
    nome: string;
    raca: string;
    tipo: string;
    genero: string;
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
    petSelecionadoIndex: number | null;
}

export default class ListaPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            petSelecionadoIndex: null
        };
    }

    handleClick(clienteIndex: number, petIndex: number) {
        const { petSelecionadoIndex } = this.state;
        if (petSelecionadoIndex === null || petSelecionadoIndex !== clienteIndex) {
            this.setState({ petSelecionadoIndex: clienteIndex });
        } else {
            this.setState({ petSelecionadoIndex: null });
        }
    }

    render() {
        const { tema } = this.props;
        const { petSelecionadoIndex } = this.state;
        const clientes: Cliente[] = [
            { 
                nome: "João Silva", 
                cpf: "123.456.789-00", 
                rg: "1234567-8", 
                telefone: "(00) 1234-5678", 
                pets: [
                    { nome: "Rex", raca: "Pinscher", tipo: "Cachorro", genero: "Masculino" },
                    { nome: "Mia", raca: "Siamês", tipo: "Gato", genero: "Feminino" }
                ] 
            },
            { 
                nome: "Maria Oliveira", 
                cpf: "987.654.321-00", 
                rg: "9876543-2", 
                telefone: "(00) 8765-4321", 
                pets: [
                    { nome: "Fido", raca: "Golden Retriever", tipo: "Cachorro", genero: "Masculino" }
                ] 
            },
            { 
                nome: "Carlos Santos", 
                cpf: "111.222.333-44", 
                rg: "5556667-8", 
                telefone: "(00) 2345-6789", 
                pets: [
                    { nome: "Bolinha", raca: "Vira-lata", tipo: "Cachorro", genero: "Masculino" },
                    { nome: "Garfield", raca: "Persa", tipo: "Gato", genero: "Masculino" }
                ] 
            },
            { 
                nome: "Ana Souza", 
                cpf: "222.333.444-55", 
                rg: "7778889-0", 
                telefone: "(00) 3456-7890", 
                pets: [
                    { nome: "Nina", raca: "Labrador", tipo: "Cachorro", genero: "Feminino" },
                    { nome: "Luna", raca: "Siamesa", tipo: "Gato", genero: "Feminino" }
                ] 
            },
            { 
                nome: "Fernanda Lima", 
                cpf: "555.666.777-88", 
                rg: "4445556-7", 
                telefone: "(00) 4567-8901", 
                pets: [
                    { nome: "Thor", raca: "Dálmata", tipo: "Cachorro", genero: "Masculino" }
                ] 
            },
            { 
                nome: "Pedro Costa", 
                cpf: "777.888.999-00", 
                rg: "3334445-6", 
                telefone: "(00) 5678-9012", 
                pets: [
                    { nome: "Mel", raca: "Poodle", tipo: "Cachorro", genero: "Feminino" },
                    { nome: "Tom", raca: "Persa", tipo: "Gato", genero: "Masculino" }
                ] 
            },
            { 
                nome: "Lúcia Pereira", 
                cpf: "999.888.777-66", 
                rg: "2223334-5", 
                telefone: "(00) 6789-0123", 
                pets: [
                    { nome: "Bela", raca: "Golden Retriever", tipo: "Cachorro", genero: "Feminino" }
                ] 
            },
            { 
                nome: "Ricardo Mendes", 
                cpf: "444.333.222-11", 
                rg: "8889990-1", 
                telefone: "(00) 7890-1234", 
                pets: [
                    { nome: "Simba", raca: "Vira-lata", tipo: "Cachorro", genero: "Masculino" }
                ] 
            },
            { 
                nome: "Sandra Carvalho", 
                cpf: "666.555.444-33", 
                rg: "1112223-4", 
                telefone: "(00) 8901-2345", 
                pets: [
                    { nome: "Lucky", raca: "Labrador", tipo: "Cachorro", genero: "Masculino" }
                ] 
            },
            { 
                nome: "Roberto Almeida", 
                cpf: "888.777.666-55", 
                rg: "9990001-2", 
                telefone: "(00) 9012-3456", 
                pets: [
                    { nome: "Molly", raca: "Bulldog Francês", tipo: "Cachorro", genero: "Feminino" }
                ] 
            }
        ];
        
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-start mb-3">
                    <Link to="/cadastro-pet" className="btn btn-primary">Cadastrar novo pet</Link>
                </div>
                <div className="list-group">
                    {clientes.map((cliente, clienteIndex) => (
                        cliente.pets.map((pet, petIndex) => (
                            <div key={`${clienteIndex}-${petIndex}`}>
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleClick(clienteIndex, petIndex)}
                                    style={{ cursor: "pointer", background: tema }}
                                >
                                    {pet.nome}
                                </a>
                                {petSelecionadoIndex === clienteIndex && (
                                    <div className="card mt-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{pet.nome}</h5>
                                            <p className="card-text">Raça: {pet.raca}</p>
                                            <p className="card-text">Tipo: {pet.tipo}</p>
                                            <p className="card-text">Gênero: {pet.genero}</p>
                                            <p className="card-text">Dono: {cliente.nome}</p>
                                            <p className="card-text">Telefone: {cliente.telefone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ))}
                </div>
            </div>
        );
    }
}
