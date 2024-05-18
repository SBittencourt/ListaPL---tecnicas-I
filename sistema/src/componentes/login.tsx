import React, { Component } from "react";

class Login extends Component {
    render() {
        return (
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#eaf6ff' }}>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <img src="../imagens/petlovers_logo2.png" alt="Logo" className="img-fluid" style={{ maxWidth: '300px' }} />
                            </div>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Digite seu email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha</label>
                                    <input type="password" className="form-control" id="password" placeholder="Digite sua senha" />
                                </div>
                                <div className="d-grid">
                                    <a href="/home" className="btn btn-primary">Entrar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

