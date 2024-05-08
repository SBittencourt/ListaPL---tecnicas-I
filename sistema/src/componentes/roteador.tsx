import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroPet from "./formularioCadastroPet";
import ListaPet from "./listaPets";
import ListaProdutos from "./listaProdutos";
import ListaServicos from "./listaServicos";

type State = {
    tela: string
}

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'Clientes'
        };
        this.selecionarView = this.selecionarView.bind(this);
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault();
        console.log(novaTela);
        this.setState({
            tela: novaTela
        });
    }

    render() {
        let barraNavegacao = (
            <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={['Cadastro', 'Cadastro Pet', 'Clientes', 'Pets', 'Produtos', 'Serviços']} />
        );
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="#e3f2fd" />
                </>
            );
        
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <ListaPet tema="#e3f2fd" />
                </>
            );

        } else if (this.state.tela === 'Cadastro') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="#e3f2fd" />
                </>
            );
        } else if (this.state.tela === 'Cadastro Pet') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroPet tema="#e3f2fd" />
                </>
            );

        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutos tema="#e3f2fd" />
                </>
            );

        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaServicos tema="#e3f2fd" />
                </>
            );



        } else {
            return null; 
        }
    }
}
