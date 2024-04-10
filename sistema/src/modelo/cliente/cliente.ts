import CPF from "./cpf";
import RG from "./rg";
import Telefone from "./telefone";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rgs: Array<RG>;
    public genero: string;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;

    constructor(nome: string, nomeSocial: string, cpf: CPF, rg: RG, telefones: Array<Telefone>) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rgs = [];
        this.rgs.push(rg); 
        this.genero = '';
        this.dataCadastro = new Date();
        this.telefones = telefones;
    }


    public get getCpf(): CPF {
        return this.cpf;
    }
  
    public get getRgs(): Array<RG> {
        return this.rgs;
    }

    public get getGenero(): string {
        return this.genero;
    }

    public set atualizarGenero(genero: string) {
        this.genero = genero;
    }

    public get getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones;
    }

    public adicionarTelefones(telefones: Array<Telefone>): void {
        this.telefones.push(...telefones);
    }
}
