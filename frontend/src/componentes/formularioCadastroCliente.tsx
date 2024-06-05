import React, { useState } from "react";
import axios from "axios";

const FormularioCadastroCliente: React.FC = () => {
    const [cliente, setCliente] = useState({
        nome: "",
        nomeSocial: "",
        cpf: "",
        rg: "",
        telefone: "",
        email: "", 
        endereco: {
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            codigoPostal: "",
            informacoesAdicionais: ""
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            endereco: {
                ...cliente.endereco,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!cliente.nome || !cliente.cpf || !cliente.telefone || !cliente.email || !cliente.endereco.estado || !cliente.endereco.cidade || !cliente.endereco.bairro || !cliente.endereco.rua || !cliente.endereco.numero || !cliente.endereco.codigoPostal) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        try {
            await axios.post("http://localhost:8080/cliente/cadastrar", cliente);
            alert("Cliente cadastrado com sucesso!");
            setCliente({
                nome: "",
                nomeSocial: "",
                cpf: "",
                rg: "",
                telefone: "",
                email: " ",
                endereco: {
                    estado: "",
                    cidade: "",
                    bairro: "",
                    rua: "",
                    numero: "",
                    codigoPostal: "",
                    informacoesAdicionais: ""
                }
            });
        } catch (error) {
            alert("Ocorreu um erro ao cadastrar o cliente.");
            console.error(error);
        }
    };

    return (
        <div className="container-fluid">
            <h1>Cadastrar cliente</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome *"
                        name="nome"
                        value={cliente.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome social"
                        name="nomeSocial"
                        value={cliente.nomeSocial}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CPF *"
                        name="cpf"
                        value={cliente.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="RG"
                        name="rg"
                        value={cliente.rg}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Telefone *"
                        name="telefone"
                        value={cliente.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email *"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br></br>
                <h5>Endereço:</h5>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Estado *"
                                name="estado"
                                value={cliente.endereco.estado}
                                onChange={handleEnderecoChange}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cidade *"
                                name="cidade"
                                value={cliente.endereco.cidade}
                                onChange={handleEnderecoChange}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Bairro *"
                                name="bairro"
                                value={cliente.endereco.bairro}
                                onChange={handleEnderecoChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Rua *"
                                name="rua"
                                value={cliente.endereco.rua}
                                onChange={handleEnderecoChange}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número *"
                                name="numero"
                                value={cliente.endereco.numero}
                                onChange={handleEnderecoChange}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CEP *"
                                name="codigoPostal"
                                value={cliente.endereco.codigoPostal}
                                onChange={handleEnderecoChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Informações adicionais (bloco, apartamento, etc)"
                        name="informacoesAdicionais"
                        value={cliente.endereco.informacoesAdicionais}
                        onChange={handleEnderecoChange}
                    />
                </div>

                <br></br>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroCliente;
