import React from "react";
import { Link } from "react-router-dom";

type Props = {
    tema: string;
};

const Home: React.FC<Props> = ({ tema }) => {
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="mb-4">Bem-vindo à PetLovers!</h1>
                <p className="mb-4">
                    Aqui você encontra tudo o que precisa para o cuidado e bem-estar do seu pet!
                </p>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4 d-flex mb-4">
                    <div className="card h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Registro dos clientes</h5>
                            <p className="card-text flex-grow-1">
                                Visualize os clientes já cadastrados em nosso sistema. Lembre-se de manter as informações sempre atualizadas!
                            </p>
                            <Link to="/clientes" className="btn btn-primary mt-auto">Registro dos clientes</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex mb-4">
                    <div className="card h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Cadastrar Cliente</h5>
                            <p className="card-text flex-grow-1">
                                Cadastre novos clientes para oferecer um atendimento personalizado.
                            </p>
                            <Link to="/cadastro" className="btn btn-primary mt-auto">Cadastrar Cliente</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
