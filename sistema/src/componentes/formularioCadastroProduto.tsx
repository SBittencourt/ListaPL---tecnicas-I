import React from "react";

const FormularioCadastroProduto: React.FC = () => {
    return (
        <div className="container-fluid">
            <h1>Cadastrar produto</h1>
            <br />
            <form>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="number" step="0.01" className="form-control" placeholder="Preço" aria-label="Preço" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <textarea className="form-control" placeholder="Descrição" aria-label="Descrição" aria-describedby="basic-addon1" rows={5}></textarea>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button">Cadastrar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroProduto;
