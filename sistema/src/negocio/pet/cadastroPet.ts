import Entrada from "../../io/entrada";
import Pet from "../../modelo/pet/pet";
import Cadastro from "../cadastro";

export default class CadastroPets extends Cadastro {
    private pets: Array<Pet>;
    private entrada: Entrada;

    constructor(pets: Array<Pet>) {
        super();
        this.pets = pets;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do pet`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do pet: `);
        let raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `);

        let genero = "";
        while (genero !== "Masculino" && genero !== "Feminino") {
            let generoOpcao = this.entrada.receberNumero(`Por favor informe o gênero do pet:\n1. Masculino\n2. Feminino\n`);
            switch (generoOpcao) {
                case 1:
                    genero = 'Masculino';
                    break;
                case 2:
                    genero = 'Feminino';
                    break;
                default:
                    console.log("Opção inválida. Por favor, insira novamente.");
                    break;
            }
        }

        let tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);

        let pet = new Pet(nome, raca, genero, tipo);
        this.pets.push(pet);

        console.log(`\nO cadastro do pet foi concluído :)\n`);
        console.log(`--------------------------------------`);
    }
}
