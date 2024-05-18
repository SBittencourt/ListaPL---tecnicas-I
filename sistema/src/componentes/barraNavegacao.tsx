import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string,
    botoes: string[],
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

type State = {
    menuAberto: boolean
}

export default class BarraNavegacao extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            menuAberto: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuAberto: !this.state.menuAberto });
    }

    render() {
        const { tema, botoes, seletorView } = this.props;
        return (
            <>
                <nav
                    className="navbar navbar-expand-lg"
                    data-bs-theme="light"
                    style={{ backgroundColor: tema, marginBottom: 10 }}
                >
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">
                            <img src="../imagens/petlovers_logo.png" alt="PetLovers Logo" style={{ height: '60px' }} />
                        </span>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={this.toggleMenu}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`collapse navbar-collapse ${this.state.menuAberto ? "show" : ""}`}
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                {botoes.map((valor) => (
                                    <li key={valor} className="nav-item">
                                        <Link
                                            to={valor === 'Home' ? '/home' : `/${valor.toLowerCase()}`}
                                            className="nav-link"
                                            onClick={(e) => {
                                                seletorView(valor, e);
                                                this.toggleMenu();
                                            }}
                                        >
                                            {valor}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="ml-auto">
                            <Link to="/" className="navbar-brand">
                                <img src="../imagens/logout.png" alt="Logout Icon" style={{ height: '30px' }} />
                            </Link>
                        </div> 
                    </div>
                </nav>
            </>
        );
    }
}

