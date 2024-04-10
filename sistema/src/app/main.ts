import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastroCliente";
import ListagemClientes from "../negocio/listagemClientes";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Acessar:`);
    console.log(`1 - Cliente`);
    console.log(`2 - Pet`);
    console.log(`3 - Produtos`);
    console.log(`4 - Serviços`);
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

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
    


        case 0:
            execucao = false
            console.log(`Até mais`)
            break;

        default:
            console.log(`Operação não entendida :(`)
    }
}

function OpcoesCliente() {
    let funcionando = true;

    while (funcionando) {
        console.log(`Selecione:`);
        console.log(`1 - Criar cliente`);
        console.log(`2 - Listar clientes`);
        console.log(`3 - Atualizar cliente`);
        console.log(`4 - Deletar cliente`);
        console.log(`0 - Sair`);
    
        let entrada = new Entrada()
        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch(opcao) { 
            case 1:

                break;

            case 2:
                let listagem = new ListagemClientes(empresa.getClientes)
                listagem.listar()
                break;

            case 3:
                let atualizar = new AtualizarClientes(empresa.getClientes)
                atualizar.listar()
                break;

            case 3:
                let esxcluir = new excluirClientes(empresa.getClientes)
                listagem.listar()
                break;

            case 0:
                funcionando = false; // Atualize a variável funcionando
                console.log(`Até mais`)
                break;

            default:
                console.log(`Operação não entendida :(`)
        }
    }
}
