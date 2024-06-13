import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Telefone {
    ddd: string;
    numero: string;
}

interface Endereco {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

interface Cliente {
    id: string;
    nome: string;
    nomeSocial: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
}

const FormularioAtualizarCliente: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const estadosBrasileiros = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
        "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
        "SP", "SE", "TO"
    ];

    const [cliente, setCliente] = useState<Cliente>({
        id: '',
        nome: '',
        nomeSocial: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: ''
        },
        telefones: [{ ddd: '', numero: '' }]
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
                setCliente({
                    ...clienteData,
                    telefones: clienteData.telefones.length > 0 ? clienteData.telefones : [{ ddd: '', numero: '' }]
                });
            } catch (error) {
                console.error('Erro ao obter dados do cliente:', error);
            }
        };
        fetchCliente();
    }, [id]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const key = name.split('.')[1] as keyof Endereco;
            setCliente({
                ...cliente,
                endereco: {
                    ...cliente.endereco,
                    [key]: value
                }
            });
        } else if (name.startsWith('telefones.')) {
            const [_, index, field] = name.split('.');
            const idx = parseInt(index, 10);
            const key = field as keyof Telefone;
            const newTelefones = [...cliente.telefones];
            newTelefones[idx][key] = value;
            setCliente({
                ...cliente,
                telefones: newTelefones
            });
        } else {
            const key = name as keyof Cliente;
            setCliente({ ...cliente, [key]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:32831/cliente/atualizar`, cliente);
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

                {cliente.telefones.map((telefone, index) => (
                    <div key={index} className="mb-3">
                        <label htmlFor={`telefones.${index}.ddd`} className="form-label">Telefone (DDD) *</label>
                        <input type="text" className="form-control" id={`telefones.${index}.ddd`} name={`telefones.${index}.ddd`} value={telefone.ddd} onChange={handleChange} required />
                        <label htmlFor={`telefones.${index}.numero`} className="form-label">Telefone (Número) *</label>
                        <input type="text" className="form-control" id={`telefones.${index}.numero`} name={`telefones.${index}.numero`} value={telefone.numero} onChange={handleChange} required />
                    </div>
                ))}

                <button type="submit" className="btn btn-primary">Atualizar Cliente</button>
            </form>
        </div>
    );
};

export default FormularioAtualizarCliente;
