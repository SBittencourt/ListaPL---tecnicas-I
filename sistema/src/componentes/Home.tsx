import React from "react";

type Props = {
    tema: string;
}

const Home: React.FC<Props> = ({ tema }) => {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Bem-vindo à PetLovers!</h1>
            <p className="mb-4">
                Aqui você encontra tudo o que precisa para o cuidado e bem-estar do seu pet.
            </p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Banho e Tosa</h5>
                            <p className="card-text">
                                Oferecemos serviços de banho e tosa para deixar seu pet limpo e bonito.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Consultas Veterinárias</h5>
                            <p className="card-text">
                                Nossos veterinários estão prontos para cuidar da saúde do seu pet.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Produtos</h5>
                            <p className="card-text">
                                Encontre uma variedade de produtos para alimentação, higiene e diversão do seu pet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5"></div>
        </div>
    );
};

export default Home;
