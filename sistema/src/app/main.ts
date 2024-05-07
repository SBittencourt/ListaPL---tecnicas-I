import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";

import CrudCliente from "../negocio/cliente/crudCliente";
import CrudPet from "../negocio/pet/crudPet";
import crudProduto from "../negocio/produto/crudProduto";
import CrudServico from "../negocio/serviço/crudServico";



console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias, a PetLovers!`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Acessar:`);
    console.log(`1 - Cliente`);
    console.log(`2 - Pet`);
    console.log(`3 - Produtos`);
    console.log(`4 - Serviços`);
    console.log(`5 - Listagens`);
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Para começar, por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            OpcoesCliente()
            break;

        case 2:
            OpcoesPet()
            break;

        case 3:
            OpcoesProdutos()
            break;

        case 4:
            OpcoesServicos()
            break;

        
        case 5:
            OpcoesListagem()
            break;

        case 0:
            execucao = false
            console.log(`Até mais! :D`)
            break;
    }
}

function OpcoesCliente() {
    let funcionando = true;

    while (funcionando) {
        console.log(`Selecione:`);
        console.log(`1 - Cadastrar cliente`);
        console.log(`2 - Listar clientes`);
        console.log(`3 - Atualizar cliente`);
        console.log(`4 - Deletar cliente`);
        console.log(`5 - Consumo por cliente`);
        console.log(`0 - Sair`);
    
        let entrada = new Entrada()
        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch (opcao) {
            case 1:
                let cadastroCliente = new CrudCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
                cadastroCliente.cadastrar();
                break

            case 2:
                let listarClientes = new CrudCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
                listarClientes.listarClientes();
                break;
                
                



            case 3:


            case 4:

   

            case 0:
                funcionando = false; 
                break;

            default:
                console.log(`Operação não entendida :(`)
        }
    }
}



function OpcoesPet() {
    let funcionando = true;

    while (funcionando) {
        console.log(`Selecione:`);
        console.log(`1 - Cadastrar pet`);
        console.log(`2 - Listar pets`);
        console.log(`3 - Atualizar pet`);
        console.log(`4 - Deletar pet`);
        console.log(`0 - Sair`);
    
        let entrada = new Entrada()
        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch(opcao) { 
            case 1:
                let cadastroPet = new CrudPet(empresa.getPets);
                cadastroPet.cadastrar();
                break

            case 2:
                let listarPet = new CrudPet(empresa.getPets);
                listarPet.listarPets();
                break

            case 3:
                let atualizarPet = new CrudPet(empresa.getPets);
                atualizarPet.editarPet();
                break

            case 4:
                let excluirPet = new CrudPet(empresa.getPets);
                excluirPet.excluirPet();
                break  

            case 0:
                funcionando = false; 
                break;

            default:
                console.log(`Operação não entendida :(`)
        }
    }
}


function OpcoesProdutos() {
    let funcionando = true;

    while (funcionando) {
        console.log(`Selecione:`);
        console.log(`1 - Cadastrar produto`);
        console.log(`2 - Listar produtos`);
        console.log(`3 - Atualizar produtos`);
        console.log(`4 - Deletar produto`);
        console.log(`0 - Sair`);
    
        let entrada = new Entrada()
        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch(opcao) { 
            case 1:
                let cadastroProduto = new crudProduto(empresa.getProdutos);
                cadastroProduto.cadastrar();
                break;

            case 2:
                let listarProdutos = new crudProduto(empresa.getProdutos);
                listarProdutos.listarProdutos();
                break;

            case 3:
                let editarProduto = new crudProduto(empresa.getProdutos);
                editarProduto.editarProduto();
                break;

            case 4:
                let excluirProduto = new crudProduto(empresa.getProdutos);
                excluirProduto.excluirProduto();
                break;
                
            case 0:
                funcionando = false; 
                break;

            default:
                console.log(`Operação não entendida :(`)
        }
    }
}


function OpcoesServicos() {
    let funcionando = true;

    while (funcionando) {
        console.log(`Selecione:`);
        console.log(`1 - Cadastrar serviço`);
        console.log(`2 - Listar serviços`);
        console.log(`3 - Atualizar serviços`);
        console.log(`4 - Deletar serviço`);
        console.log(`0 - Sair`);
    
        let entrada = new Entrada()
        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch(opcao) { 
            case 1:
                let cadastroServico = new CrudServico(empresa.getServicos);
                cadastroServico.cadastrar();
                break;

            case 2:
                let listarServicos = new CrudServico(empresa.getServicos);
                listarServicos.listarServicos();
                break;

            case 3:
                let editarServico = new CrudServico(empresa.getServicos);
                editarServico.editarServico();
                break;

            case 4:
                let excluirServico = new CrudServico(empresa.getServicos);
                excluirServico.excluirServico();
                break;
                
            case 0:
                funcionando = false; 
                break;

            default:
                console.log(`Operação não entendida :(`)
        }
    }
}

function OpcoesListagem() {
    let funcionando = true;

    while (funcionando) {
        console.log(`Selecione:`);
        console.log(`1 - Top 10 clientes que mais consumiram`);
        console.log(`2 - Produtos e serviços mais vendidos`);
        console.log(`3 - Mais vendidos por raça e tipo de pet`);
        console.log(`0 - Sair`);
    
        let entrada = new Entrada()
        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch (opcao) {
            case 1:


            case 2:


            case 3:

   

            case 0:
                funcionando = false; 
                break;

            default:
                console.log(`Operação não entendida :(`)
        }
    }
}
