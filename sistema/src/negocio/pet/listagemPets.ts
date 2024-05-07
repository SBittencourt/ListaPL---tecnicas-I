import Pet from "../../modelo/pet";
import Listagem from "../geral/listagem";

export default class ListagemPets extends Listagem {
    private pets: Array<Pet>
    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets
    }
    public listar(): void {
        console.log(`\nLista de todos os pets:`);
        this.pets.forEach(Pet => {
            console.log(`Nome: ` + Pet.getNome);
            console.log(`Raça: ` + Pet.getRaca);
            console.log(`Gênero	: ` + Pet.getGenero);  
            console.log(`Tipo	: ` + Pet.getTipo);        
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}