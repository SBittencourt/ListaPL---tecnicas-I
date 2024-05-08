import CPF from "./cpf";
import Pet from "./pet";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rg: RG;
    private dataCadastro: Date;
    private telefones: Telefone[];
    private produtosConsumidos: Produto[];
    private servicosConsumidos: Servico[];
    private pets: Pet[];

    constructor(nome: string, nomeSocial: string, cpf: CPF, rg: RG, telefones: Telefone[]) {
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

    public getTelefones(): Telefone[] {
        return this.telefones;
    }

    public getProdutosConsumidos(): Produto[] {
        return this.produtosConsumidos;
    }

    public getServicosConsumidos(): Servico[] {
        return this.servicosConsumidos;
    }

    public getPets(): Pet[] {
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

    public setNome(novoNome: string): void {
        this.nome = novoNome;
    }

    public setTelefones(telefonesList: Telefone[]): void {
        this.telefones = telefonesList;
    }

    public calcularTotalGasto(): number {
        const totalProdutos = this.produtosConsumidos.reduce((acc, produto) => acc + produto.preco, 0);
        const totalServicos = this.servicosConsumidos.reduce((acc, servico) => acc + servico.preco, 0);
        return totalProdutos + totalServicos;
    }
}
