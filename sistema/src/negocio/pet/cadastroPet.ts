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
        console.log(`\n-------------------------`);

        let nome = this.entrada.receberTexto(`Por favor informe o nome do pet: `);
        let tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);
        let raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `);
        
        let data: string | undefined = undefined; 
        while (!data) {
            let inputData = this.entrada.receberTexto(`Por favor informe a data de nascimento do pet (DD/MM/AAAA): `);
            let regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (regexData.test(inputData)) {
                data = inputData;
            } else {
                console.log("Formato de data inválido. Por favor, insira novamente.");
            }
        }
        
        let genero: string = "";
        let generoOpcao: number;
        do {
            generoOpcao = this.entrada.receberNumero(`Por favor informe o gênero do pet:\n1. Masculino\n2. Feminino\n\nPrecione enter após escolher: `);
            if (generoOpcao === 1) {
                genero = 'Masculino';
            } else if (generoOpcao === 2) {
                genero = 'Feminino';
            } else {
                console.log("Opção inválida. Por favor, insira novamente.");
            }
        } while (generoOpcao !== 1 && generoOpcao !== 2);
    
    
        let pet = new Pet(nome, raca, data, genero, tipo);
        this.pets.push(pet);
    
        console.log(`\nSeu pet foi cadastrado com sucesso! :)\n`);
        console.log(`--------------------------------------`);
    }
}
