import React, { useState } from "react";
import axios from "axios";

const FormularioCadastroCliente: React.FC = () => {
    const estadosBrasileiros = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
        "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
        "SP", "SE", "TO"
    ];

    const [cliente, setCliente] = useState({
        nome: "",
        nomeSocial: "",
        cpf: "",
        rg: "",
        email: "",
        endereco: {
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            codigoPostal: "",
            informacoesAdicionais: ""
        },
        telefones: [{ ddd: "", numero: "" }]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            endereco: {
                ...cliente.endereco,
                [name]: value
            }
        });
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

    const handleTelefoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const novosTelefones = cliente.telefones.map((telefone, i) =>
            i === index ? { ...telefone, [name]: value } : telefone
        );
        setCliente({ ...cliente, telefones: novosTelefones });
    };

    const adicionarTelefone = () => {
        setCliente({ ...cliente, telefones: [...cliente.telefones, { ddd: "", numero: "" }] });
    };

    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatRG = (value: string) => {
        return value
            .replace(/\D/g, '')
            .slice(0, 9)
            .replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
    };

    const formatTelefone = (value: string) => {
        return value
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const formatCEP = (value: string) => {
        return value
            .replace(/\D/g, '')
            .slice(0, 9)
            .replace(/^(\d{5})(\d{3})/, '$1-$2');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!cliente.nome || !cliente.cpf || cliente.telefones.some(t => !t.ddd || !t.numero) || !cliente.email || !cliente.endereco.estado || !cliente.endereco.cidade || !cliente.endereco.bairro || !cliente.endereco.rua || !cliente.endereco.numero || !cliente.endereco.codigoPostal) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        try {
            await axios.post("http://localhost:32831/cliente/cadastrar", cliente);
            alert("Cliente cadastrado com sucesso!");
            setCliente({
                nome: "",
                nomeSocial: "",
                cpf: "",
                rg: "",
                email: "",
                endereco: {
                    estado: "",
                    cidade: "",
                    bairro: "",
                    rua: "",
                    numero: "",
                    codigoPostal: "",
                    informacoesAdicionais: ""
                },
                telefones: [{ ddd: "", numero: "" }]
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
                        value={formatCPF(cliente.cpf)}
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
                        value={formatRG(cliente.rg)}
                        onChange={handleChange}
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
                <h5>Telefones:</h5>
                <br></br>
                {cliente.telefones.map((telefone, index) => (
                    <div key={index} className="row">
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="DDD *"
                                    name="ddd"
                                    value={telefone.ddd}
                                    onChange={(e) => handleTelefoneChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número *"
                                    name="numero"
                                    value={formatTelefone(telefone.numero)}
                                    onChange={(e) => handleTelefoneChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="input-group mb-3">
                    <button type="button" className="btn btn-outline-secondary" onClick={adicionarTelefone}>Adicionar Telefone</button>
                </div>
                <br></br>
                <h5>Endereço:</h5>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <select
                                className="form-select"
                                aria-label="Estado"
                                name="estado"
                                value={cliente.endereco.estado}
                                onChange={handleSelectChange}
                                required
                            >
                                <option value="">Selecione o estado *</option>
                                {estadosBrasileiros.map((estado, index) => (
                                    <option key={index} value={estado}>{estado}</option>
                                ))}
                            </select>
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
                                value={formatCEP(cliente.endereco.codigoPostal)}
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
