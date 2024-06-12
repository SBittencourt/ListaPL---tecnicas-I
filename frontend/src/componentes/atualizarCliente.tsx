import React, { useState, useEffect } from "react";
import axios from "axios";

const FormularioCadastroCliente: React.FC = () => {
    const estadosBrasileiros = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
        "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
        "SP", "SE", "TO"
    ];

    const [cliente, setCliente] = useState({
        _id: "",
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

    const [modoEdicao, setModoEdicao] = useState(false);

    useEffect(() => {
        if (modoEdicao) {
            // Se estiver em modo de edição, busca os dados do cliente
            const fetchClienteParaEdicao = async () => {
                try {
                    const response = await axios.get(`http://localhost:32831/cliente/${cliente._id}`);
                    const clienteParaEdicao = response.data;
                    setCliente(clienteParaEdicao);
                } catch (error) {
                    alert("Ocorreu um erro ao buscar os dados do cliente para edição.");
                    console.error(error);
                }
            };
            fetchClienteParaEdicao();
        }
    }, [modoEdicao, cliente._id]);

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
        try {
            if (modoEdicao) {
                // Atualiza o cliente
                await axios.put(`http://localhost:32831/cliente/atualizar/${cliente._id}`, cliente);
                alert("Cliente atualizado com sucesso!");
                setModoEdicao(false);
            } else {
                // Cadastra o cliente
                await axios.post("http://localhost:32831/cliente/cadastrar", cliente);
                alert("Cliente cadastrado com sucesso!");
            }
            // Limpar o formulário
            setCliente({
                _id: "",
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
        } catch (error) {
            alert("Ocorreu um erro ao salvar os dados do cliente.");
            console.error(error);
        }
    };

    return (
        <div className="container-fluid">
            <h1>{modoEdicao ? 'Editar cliente' : 'Cadastrar cliente'}</h1>
            <br />
            <form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
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
                        type="text"
                        className="form-control"
                        placeholder="Telefone *"
                        name="telefone"
                        value={formatTelefone(cliente.telefone)}
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
                <br />
                <h5>Endereço:</h5>
                <br />
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
    
                <br />
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit">
                        {modoEdicao ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
    
};

export default FormularioCadastroCliente;
