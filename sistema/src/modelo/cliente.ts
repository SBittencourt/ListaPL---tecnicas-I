import CPF from "./cpf";
import Pet from "./pet";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
    setTelefones(telefonesList: Telefone[]) {
        throw new Error("Method not implemented.");
    }
    setNome(novoNome: string) {
        throw new Error("Method not implemented.");
    }
    limparPets() {
        throw new Error("Method not implemented.");
    }
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rg: RG;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;
    private produtosConsumidos: Array<Produto>;
    private servicosConsumidos: Array<Servico>;
    private pets: Array<Pet>;

    constructor(nome: string, nomeSocial: string, cpf: CPF, rg: RG, telefones: Array<Telefone>) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rg = rg;
        this.dataCadastro = new Date();
        this.telefones = telefones;
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
        this.pets = [];
    }

    public getNome(): string {
        return this.nome;
    }

    public getCpf(): CPF {
        return this.cpf;
    }

    public getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public getTelefones(): Array<Telefone> {
        return this.telefones;
    }

    public getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos;
    }

    public getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos;
    }

    public getPets(): Array<Pet> {
        return this.pets;
    }

    public addProdutoConsumido(produto: Produto): void {
        this.produtosConsumidos.push(produto);
    }

    public addServicoConsumido(servico: Servico): void {
        this.servicosConsumidos.push(servico);
    }

    public addPet(pet: Pet): void {
        this.pets.push(pet);
    }

    public setNomeSocial(novoNomeSocial: string): void {
        this.nomeSocial = novoNomeSocial;
    }
}
