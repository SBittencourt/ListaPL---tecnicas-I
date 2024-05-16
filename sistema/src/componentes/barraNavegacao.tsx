import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string,
    botoes: string[],
    seletorView: Function
}

type State = {
    menuAberto: boolean
}

export default class BarraNavegacao extends Component<Props, State> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.state = {
            menuAberto: false
        };
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuAberto: !this.state.menuAberto });
    }

    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>;
        } else {
            let lista = this.props.botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a
                        className="nav-link"
                        href="#"
                        onClick={(e) => {
                            this.props.seletorView(valor, e);
                            this.toggleMenu(); // Fechar o menu após clicar
                        }}
                    >
                        {valor}
                    </a>
                </li>
            ));
            return lista;
        }
    }

    render() {
        const { tema } = this.props;
        return (
            <>
                <nav
                    className="navbar navbar-expand-lg"
                    data-bs-theme="light"
                    style={{ backgroundColor: tema, marginBottom: 10 }}
                >
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">PetLovers</span>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={this.toggleMenu} // Toggle do menu ao clicar no botão de toggle
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`collapse navbar-collapse ${this.state.menuAberto ? "show" : ""}`}
                            id="navbarNav"
                        >
                            <ul className="navbar-nav" onClick={this.toggleMenu}>
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
