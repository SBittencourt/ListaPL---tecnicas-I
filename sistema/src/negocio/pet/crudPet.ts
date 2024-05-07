import Entrada from "../../io/entrada";
import Cadastro from "../geral/cadastro";
import Pet from "../../modelo/pet";

export default class CrudPet extends Cadastro {
    private pets: Array<Pet>;
    private entrada: Entrada;

    constructor(pets: Array<Pet>) {
        super();
        this.pets = pets;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de pet`);
        let nome = this.entrada.receberTexto(`Informe o nome do pet: `);
        let raca = this.entrada.receberTexto(`Informe a raça: `);
        let tipo = this.entrada.receberTexto('Informe o tipo de animal: ');
        let genero = this.selecionarGenero();
        let pet = new Pet(nome, raca, genero, tipo);

        this.pets.push(pet);
        console.log(`\nO pet foi cadastrado com sucesso! :D\n`);
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

    public listarPets(): void {
        console.log(`\nPets cadastrados:`);
        console.log(`---------------------------------`);

        if (this.pets.length === 0) {
            console.log(`Ainda não existem pets cadastrados.\n`);
            let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar um pet? (S/N): `);
            if (cadastrarMais.toUpperCase() === 'S') {
                this.cadastrar();
            }
            return;
        }

        this.pets.forEach((pet, index) => {
            console.log(`${index + 1}- Nome: ${pet.getNome()}, Raça: ${pet.getRaca()}, Tipo: ${pet.getTipo()}, Gênero: ${pet.getGenero()}`);
        });

        console.log(`---------------------------------`);
    }

    public editarPet(): void {
        console.log(`\nEdição de Pet:`);
        console.log(`---------------------------------`);

        if (this.pets.length === 0) {
            console.log(`Ainda não existem pets cadastrados para editar.\n`);
            return;
        }

        this.listarPets();

        let indicePet = this.entrada.receberNumero(`Informe o número do pet que deseja editar: `);
        if (indicePet < 1 || indicePet > this.pets.length) {
            console.log(`Opção inválida.\n`);
            return;
        }

        let petSelecionado = this.pets[indicePet - 1];

        console.log(`\nEdição do Pet "${petSelecionado.getNome()}":`);
        console.log(`1- Editar nome`);
        console.log(`2- Editar raça`);
        console.log(`3- Editar tipo`);
        console.log(`4- Editar gênero`);

        let opcao = this.entrada.receberNumero(`Escolha a opção desejada: `);

        switch (opcao) {
            case 1:
                let novoNome = this.entrada.receberTexto(`Informe o novo nome do pet (atual: ${petSelecionado.getNome()}): `);
                petSelecionado.setNome(novoNome);
                console.log(`Nome do pet atualizado com sucesso!\n`);
                break;
            case 2:
                let novaRaca = this.entrada.receberTexto(`Informe a nova raça do pet (atual: ${petSelecionado.getRaca()}): `);
                petSelecionado.setRaca(novaRaca);
                console.log(`Raça do pet atualizada com sucesso!\n`);
                break;
            case 3:
                let novoTipo = this.entrada.receberTexto(`Informe o novo tipo do pet (atual: ${petSelecionado.getTipo()}): `);
                petSelecionado.setTipo(novoTipo);
                console.log(`Tipo do pet atualizado com sucesso!\n`);
                break;
            case 4:
                let novoGenero = this.selecionarGenero();
                petSelecionado.setGenero(novoGenero);
                console.log(`Gênero do pet atualizado com sucesso!\n`);
                break;
            default:
                console.log(`Opção inválida.\n`);
                break;
        }
        console.log(`---------------------------------`);
    }

    public excluirPet(): void {
        console.log(`\nLista de pets para exclusão:`);
        console.log(`---------------------------------`);

        if (this.pets.length === 0) {
            console.log(`Não há pets para excluir.\n`);
            return;
        }

        this.listarPets();

        let indice = this.entrada.receberNumero(`Informe o número do pet que deseja excluir: `);
        if (indice < 1 || indice > this.pets.length) {
            console.log(`Opção inválida.\n`);
            return;
        }

        let petExcluido = this.pets.splice(indice - 1, 1)[0];
        console.log(`\nO pet "${petExcluido.getNome()}" foi excluído com sucesso!.\n`);
        console.log(`---------------------------------`);
    }
}

