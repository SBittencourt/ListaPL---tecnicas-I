import Servico from "../../modelo/servico";
import Entrada from "../../io/entrada";
import Cadastro from "../geral/cadastro";

export default class CrudServico extends Cadastro {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do serviço:`);
        console.log(`---------------------------------`);
        let nome = this.entrada.receberTexto(`Informe o nome do serviço: `);
        let preco = this.entrada.receberNumero(`Informe o preço do serviço: `);
        let descricao = this.entrada.receberTexto(`Informe a descrição do serviço: `);

        let servico = new Servico();
        servico.nome = nome;
        servico.preco = preco;
        servico.descricao = descricao;

        this.servicos.push(servico);

        console.log(`\nO serviço foi cadastrado com sucesso! :D\n`);
        console.log(`---------------------------------`);

        let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar mais um serviço? (S/N): `);
        if (cadastrarMais.toUpperCase() === 'S') {
            this.cadastrar(); 
        }
    }

    public listarServicos(): void {
        console.log(`\nServiços cadastrados:`);
        console.log(`---------------------------------`);
    
        if (this.servicos.length === 0) {
            console.log(`Ainda não existem serviços cadastrados.\n`);
            let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar um serviço? (S/N): `);
            if (cadastrarMais.toUpperCase() === 'S') {
                this.cadastrar(); 
            }
            return; 
        }
    
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1}- Nome: ${servico.nome}, Preço: ${servico.preco}, Descrição: ${servico.descricao}`);
        });

        console.log(`---------------------------------`);
    }

    public editarServico(): void {
        console.log(`\nEdição de Serviço:`);
        console.log(`---------------------------------`);
    
        if (this.servicos.length === 0) {
            console.log(`Ainda não existem serviços cadastrados para editar.\n`);
            return;
        }
    
        this.listarServicos();
    
        let indiceServico = this.entrada.receberNumero(`Informe o número do serviço que deseja editar: `);
        if (indiceServico < 1 || indiceServico > this.servicos.length) {
            console.log(`Opção inválida.\n`);
            return;
        }
    
        let servicoSelecionado = this.servicos[indiceServico - 1];
    
        console.log(`\nEdição do Serviço "${servicoSelecionado.nome}":`);
        console.log(`1- Editar nome`);
        console.log(`2- Editar preço`);
        console.log(`3- Editar descrição`);
    
        let opcao = this.entrada.receberNumero(`Escolha a opção desejada: `);
    
        switch (opcao) {
            case 1:
                let novoNome = this.entrada.receberTexto(`Informe o novo nome do serviço (atual: ${servicoSelecionado.nome}): `);
                servicoSelecionado.nome = novoNome;
                console.log(`Nome do serviço atualizado com sucesso!\n`);
                break;
            case 2:
                let novoPreco = this.entrada.receberNumero(`Informe o novo preço do serviço (atual: ${servicoSelecionado.preco}): `);
                servicoSelecionado.preco = novoPreco;
                console.log(`Preço do serviço atualizado com sucesso!\n`);
                break;
            case 3:
                let novaDescricao = this.entrada.receberTexto(`Informe a nova descrição do serviço (atual: ${servicoSelecionado.descricao}): `);
                servicoSelecionado.descricao = novaDescricao;
                console.log(`Descrição do serviço atualizada com sucesso!\n`);
                break;
            default:
                console.log(`Opção inválida.\n`);
                break;
        }
        console.log(`---------------------------------`);
    }

    public excluirServico(): void {
        console.log(`\nLista de serviços para exclusão:`);
        console.log(`---------------------------------`);
    
        if (this.servicos.length === 0) {
            console.log(`Não há serviços para excluir.\n`);
            return;
        }
    
        this.listarServicos();
    
        let indice = this.entrada.receberNumero(`Informe o número do serviço que deseja excluir: `);
        if (indice < 1 || indice > this.servicos.length) {
            console.log(`Índice inválido para exclusão de serviço.\n`);
            return;
        }
    
        this.servicos.splice(indice - 1, 1);
        console.log(`Serviço excluído com sucesso!\n`); 
        console.log(`---------------------------------`);
    }
}

