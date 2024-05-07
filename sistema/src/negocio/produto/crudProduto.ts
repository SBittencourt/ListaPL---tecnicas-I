import Produto from "../../modelo/produto";
import Entrada from "../../io/entrada";
import Cadastro from "../geral/cadastro";

export default class CrudProduto extends Cadastro {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do produto:`);
        console.log(`---------------------------------`);
        let nome = this.entrada.receberTexto(`Informe o nome do produto: `);
        let preco = this.entrada.receberNumero(`Informe o preço do produto: `);
        let descricao = this.entrada.receberTexto(`Informe a descrição do produto: `);

        let produto = new Produto();
        produto.nome = nome;
        produto.preco = preco;
        produto.descricao = descricao;

        this.produtos.push(produto);

        console.log(`\nO produto foi cadastrado com sucesso! :D\n`);
        console.log(`---------------------------------`);

        let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar mais um produto? (S/N): `);
        if (cadastrarMais.toUpperCase() === 'S') {
            this.cadastrar(); 
        }
    }

    public listarProdutos(): void {
        console.log(`\nProdutos cadastrados:`);
        console.log(`---------------------------------`);
    
        if (this.produtos.length === 0) {
            console.log(`Ainda não existem produtos cadastrados.\n`);
            let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar um produto? (S/N): `);
            if (cadastrarMais.toUpperCase() === 'S') {
                this.cadastrar(); 
            }
            return; 
        }
    
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}- Nome: ${produto.nome}, Preço: ${produto.preco}, Descrição: ${produto.descricao}`);
        });

        console.log(`---------------------------------`);
    }

    public editarProduto(): void {
        console.log(`\nEdição de Produto:`);
        console.log(`---------------------------------`);
    
        if (this.produtos.length === 0) {
            console.log(`Ainda não existem produtos cadastrados para editar.\n`);
            return;
        }
    
        this.listarProdutos();
    
        let indiceProduto = this.entrada.receberNumero(`Informe o número do produto que deseja editar: `);
        if (indiceProduto < 1 || indiceProduto > this.produtos.length) {
            console.log(`Opção inválida.\n`);
            return;
        }
    
        let produtoSelecionado = this.produtos[indiceProduto - 1];
    
        console.log(`\nEdição do Produto "${produtoSelecionado.nome}":`);
        console.log(`1- Editar nome`);
        console.log(`2- Editar preço`);
        console.log(`3- Editar descrição`);
    
        let opcao = this.entrada.receberNumero(`Escolha a opção desejada: `);
    
        switch (opcao) {
            case 1:
                let novoNome = this.entrada.receberTexto(`Informe o novo nome do produto (atual: ${produtoSelecionado.nome}): `);
                produtoSelecionado.nome = novoNome;
                console.log(`Nome do produto atualizado com sucesso!\n`);
                break;
            case 2:
                let novoPreco = this.entrada.receberNumero(`Informe o novo preço do produto (atual: ${produtoSelecionado.preco}): `);
                produtoSelecionado.preco = novoPreco;
                console.log(`Preço do produto atualizado com sucesso!\n`);
                break;
            case 3:
                let novaDescricao = this.entrada.receberTexto(`Informe a nova descrição do produto (atual: ${produtoSelecionado.descricao}): `);
                produtoSelecionado.descricao = novaDescricao;
                console.log(`Descrição do produto atualizada com sucesso!\n`);
                break;
            default:
                console.log(`Opção inválida.\n`);
                break;
        }
        console.log(`---------------------------------`);
    }

        public excluirProduto(): void {
            console.log(`\nLista de produtos para exclusão:`);
            console.log(`---------------------------------`);
        
            if (this.produtos.length === 0) {
                console.log(`Não há produtos para excluir.\n`);
                return;
            }
        
            this.listarProdutos();
        
            let indice = this.entrada.receberNumero(`Informe o número do produto que deseja excluir: `);
            if (indice < 1 || indice > this.produtos.length) {
                console.log(`Índice inválido para exclusão de produto.\n`);
                return;
            }
        
            this.produtos.splice(indice - 1, 1);
            console.log(`Produto excluído com sucesso!\n`); 
            console.log(`---------------------------------`);
        }
        
}
