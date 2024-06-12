import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormularioAtualizarCliente: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const estadosBrasileiros = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
        "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
        "SP", "SE", "TO"
    ];

    const [cliente, setCliente] = useState({
        nome: '',
        nomeSocial: '',
        cpf: '',
        rg: '',
        telefoneDDD: '',
        telefoneNumero: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: ''
        }
    });

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get(`http://localhost:32831/cliente/${id}`, {
                    maxRedirects: 5,
                    validateStatus: function (status) {
                        return status >= 200 && status <= 302; 
                    }
                });
                const clienteData = response.data;
                setCliente(clienteData);
            } catch (error) {
                console.error('Erro ao obter dados do cliente:', error);
            }
        };
        fetchCliente();
    }, [id]);
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('endereco')) {
            setCliente({
                ...cliente,
                endereco: {
                    ...cliente.endereco,
                    [name.split('.')[1]]: value
                }
            });
        } else {
            setCliente({ ...cliente, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:32831/cliente/${id}`, cliente);
            alert('Cliente atualizado com sucesso!');
        } catch (error) {
            alert('Ocorreu um erro ao atualizar o cliente. Por favor, tente novamente mais tarde.');
            console.error('Erro ao atualizar cliente:', error);
        }
    };

    return (
        <div className="container">
            <h1>Atualizar Cliente</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome *</label>
                    <input type="text" className="form-control" id="nome" name="nome" value={cliente.nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
                    <input type="text" className="form-control" id="nomeSocial" name="nomeSocial" value={cliente.nomeSocial} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefoneDDD" className="form-label">Telefone (DDD) *</label>
                    <input type="text" className="form-control" id="telefoneDDD" name="telefoneDDD" value={cliente.telefoneDDD} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefoneNumero" className="form-label">Telefone (Número) *</label>
                    <input type="text" className="form-control" id="telefoneNumero" name="telefoneNumero" value={cliente.telefoneNumero} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={cliente.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado *</label>
                    <select className="form-select" id="estado" name="endereco.estado" value={cliente.endereco.estado} onChange={handleChange} required>
                        <option value="">Selecione o estado *</option>
                        {estadosBrasileiros.map((estado, index) => (
                            <option key={index} value={estado}>{estado}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="cidade" className="form-label">Cidade *</label>
                    <input type="text" className="form-control" id="cidade" name="endereco.cidade" value={cliente.endereco.cidade} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="bairro" className="form-label">Bairro *</label>
                    <input type="text" className="form-control" id="bairro" name="endereco.bairro" value={cliente.endereco.bairro} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="rua" className="form-label">Rua *</label>
                    <input type="text" className="form-control" id="rua" name="endereco.rua" value={cliente.endereco.rua} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="numero" className="form-label">Número *</label>
                    <input type="text" className="form-control" id="numero" name="endereco.numero" value={cliente.endereco.numero} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="codigoPostal" className="form-label">CEP *</label>
                    <input type="text" className="form-control" id="codigoPostal" name="endereco.codigoPostal" value={cliente.endereco.codigoPostal} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="informacoesAdicionais" className="form-label">Informações Adicionais</label>
                    <input type="text" className="form-control" id="informacoesAdicionais" name="endereco.informacoesAdicionais" value={cliente.endereco.informacoesAdicionais} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Atualizar Cliente</button>
            </form>
        </div>
    );
};

export default FormularioAtualizarCliente;

