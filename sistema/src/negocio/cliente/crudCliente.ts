import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import Cadastro from "../geral/cadastro";
import Pet from "../../modelo/pet";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";

export default class CrudCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private produtosDisponiveis: Array<Produto>;
    private servicosDisponiveis: Array<Servico>;
    private petsCadastrados: Array<Pet>;
    rgs: any;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>, pets: Array<Pet>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.produtosDisponiveis = produtos;
        this.servicosDisponiveis = servicos;
        this.petsCadastrados = pets;
    }


    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente:`);
        
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
    
        let valorCPF = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
    
        let partesDataCPF = dataCPF.split('/');
        let anoCPF = parseInt(partesDataCPF[2]);
        let mesCPF = parseInt(partesDataCPF[1]);
        let diaCPF = parseInt(partesDataCPF[0]);
        let dataEmissaoCPF = new Date(anoCPF, mesCPF - 1, diaCPF);
        let cpf = new CPF(valorCPF, dataEmissaoCPF);
    
        let valorRG = this.entrada.receberTexto(`Por favor, informe o RG: `);
        let dataRG = this.entrada.receberTexto(`Por favor, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
    
        let partesDataRG = dataRG.split('/');
        let anoRG = parseInt(partesDataRG[2]);
        let mesRG = parseInt(partesDataRG[1]);
        let diaRG = parseInt(partesDataRG[0]);
        let dataEmissaoRG = new Date(anoRG, mesRG - 1, diaRG);
        let rg = new RG(valorRG, dataEmissaoRG);
    
        let qtdTelefones = this.entrada.receberNumero(`Por favor, a quantidade de números telefônicos: `);
        let telefonesList: Array<Telefone> = [];
    
        for (let i = 1; i <= qtdTelefones; i++) {
            let ddd = this.entrada.receberTexto(`Por favor, informe o DDD do telefone ${i}: `);
            let numero = this.entrada.receberTexto(`Por favor, insira o número do telefone ${i}: `);
    
            let telefone = new Telefone(ddd, numero);
            telefonesList.push(telefone);
        }
    
        let cliente = new Cliente(nome, nomeSocial, cpf, rg, telefonesList);  
    
        this.clientes.push(cliente);
    
        console.log(`\nO cliente foi cadastrado com sucesso! :D\n`);
        console.log(`--------------------------------------------------`);
    
        this.associarProdutosConsumidos(cliente); 
        this.associarServicosConsumidos(cliente); 
    
        let cadastrarMaisPet = this.entrada.receberTexto(`Deseja cadastrar um novo pet para o cliente? (S/N): `);
        while (cadastrarMaisPet.toUpperCase() === 'S') {
            this.cadastrarPet(cliente);
            cadastrarMaisPet = this.entrada.receberTexto(`Deseja cadastrar mais um pet para o cliente? (S/N): `);
        }
    
        let escolherPet = this.entrada.receberTexto(`O cliente já possui um pet registrado no sistema? (S/N): `);
        if (escolherPet.toUpperCase() === 'S') {
            this.associarPetExistente(cliente);
        }
    
        let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar mais um cliente? (S/N): `);
        if (cadastrarMais.toUpperCase() === 'S') {
            this.cadastrar(); 
        }
    }
    

    private associarProdutosConsumidos(cliente: Cliente): void {
        let adicionarProdutos = this.entrada.receberTexto(`Deseja adicionar produtos consumidos para o cliente? (S/N): `);
        while (adicionarProdutos.toUpperCase() === 'S') {
            this.listarProdutosDisponiveis(); 
            let indiceProduto = this.entrada.receberNumero(`Informe o número do produto consumido: `);
            if (indiceProduto < 1 || indiceProduto > this.produtosDisponiveis.length) {
                console.log(`Índice de produto inválido.`);
            } else {
                let produtoConsumido = this.produtosDisponiveis[indiceProduto - 1];
                cliente.addProdutoConsumido(produtoConsumido);
            }

            adicionarProdutos = this.entrada.receberTexto(`Deseja adicionar mais produtos consumidos? (S/N): `);
        }
    }

    private associarServicosConsumidos(cliente: Cliente): void {
        let adicionarServicos = this.entrada.receberTexto(`Deseja adicionar serviços consumidos para o cliente? (S/N): `);
        while (adicionarServicos.toUpperCase() === 'S') {
            this.listarServicosDisponiveis(); 
            let indiceServico = this.entrada.receberNumero(`Informe o número do serviço consumido: `);
            if (indiceServico < 1 || indiceServico > this.servicosDisponiveis.length) {
                console.log(`Índice de serviço inválido.`);
            } else {
                let servicoConsumido = this.servicosDisponiveis[indiceServico - 1];
                cliente.addServicoConsumido(servicoConsumido);
            }

            adicionarServicos = this.entrada.receberTexto(`Deseja adicionar mais serviços consumidos? (S/N): `);
        }
    }

    private cadastrarPet(cliente: Cliente): void {
        console.log(`\nInício do cadastro de pet:`);
        let nome = this.entrada.receberTexto(`Informe o nome do pet: `);
        let raca = this.entrada.receberTexto(`Informe a raça: `);
        let tipo = this.entrada.receberTexto('Informe o tipo de animal: ');
        let genero = this.selecionarGenero();
        let pet = new Pet(nome, raca, genero, tipo);

        cliente.addPet(pet);

        console.log(`\nO pet foi cadastrado com sucesso! :D\n`);
        console.log(`---------------------------------`);
    }

    private associarPetExistente(cliente: Cliente): void {
        console.log(`\nEscolha um pet existente para associar ao cliente:`);
        this.listarPetsCadastrados(); 
        let indicePet = this.entrada.receberNumero(`Informe o número do pet existente: `);
        if (indicePet < 1 || indicePet > this.petsCadastrados.length) {
            console.log(`Índice de pet inválido.`);
        } else {
            let petExistente = this.petsCadastrados[indicePet - 1];
            cliente.addPet(petExistente);
            console.log(`Pet associado ao cliente com sucesso!`);
        }
    }

    private listarProdutosDisponiveis(): void {
        console.log(`\nProdutos disponíveis:`);
        console.log(`---------------------------------`);
    
        if (this.produtosDisponiveis.length === 0) {
            console.log(`Ainda não existem produtos disponíveis.\n`);
            return; 
        }
    
        this.produtosDisponiveis.forEach((produto, index) => {
            console.log(`${index + 1}- Nome: ${produto.nome}, Preço: ${produto.preco}, Descrição: ${produto.descricao}`);
        });

        console.log(`---------------------------------`);
    }

    private listarServicosDisponiveis(): void {
        console.log(`\nServiços disponíveis:`);
        console.log(`---------------------------------`);
    
        if (this.servicosDisponiveis.length === 0) {
            console.log(`Ainda não existem serviços disponíveis.\n`);
            return; 
        }
    
        this.servicosDisponiveis.forEach((servico, index) => {
            console.log(`${index + 1}- Nome: ${servico.nome}, Preço: ${servico.preco}, Descrição: ${servico.descricao}`);
        });

        console.log(`---------------------------------`);
    }

    private listarPetsCadastrados(): void {
        console.log(`\nPets cadastrados:`);
        console.log(`---------------------------------`);

        if (this.petsCadastrados.length === 0) {
            console.log(`Ainda não existem pets cadastrados.\n`);
            return;
        }

        this.petsCadastrados.forEach((pet, index) => {
            console.log(`${index + 1}- Nome: ${pet.getNome()}, Raça: ${pet.getRaca()}, Tipo: ${pet.getTipo()}, Gênero: ${pet.getGenero()}`);
        });

        console.log(`---------------------------------`);
    }

    private selecionarGenero(): string {
        console.log(`Selecione o gênero do pet:`);
        console.log(`1 - Feminino`);
        console.log(`2 - Masculino`);
        let opcao = this.entrada.receberNumero(`Escolha a opção: `);

        switch (opcao) {
            case 1:
                return 'Feminino';
            case 2:
                return 'Masculino';
            default:
                console.log(`Opção inválida. Usando gênero não especificado.`);
                return 'Não especificado';
        }
    }


    
    
    

}
