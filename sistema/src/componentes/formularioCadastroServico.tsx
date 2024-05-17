import React, { Component } from "react";

export default class FormularioCadastroServico extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Cadastrar serviço</h1>
                <br></br>
                <form>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Preço" aria-label="Nome social" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Descrição" aria-label="CPF" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="button">Cadastrar</button>
                    </div>
                </form>
            </div>
        );
    }
}