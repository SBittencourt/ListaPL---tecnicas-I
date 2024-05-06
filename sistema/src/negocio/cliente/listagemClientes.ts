import Cliente from "../../modelo/cliente/cliente";

export default class Pet {
    private nome: string;
    private raca: string;
    private dataNascimento: string;
    private genero: string;
    private tipo: string;
    private dono: Cliente; 

    constructor(nome: string, raca: string, dataNascimento: string, genero: string, tipo: string, dono: Cliente) {
        this.nome = nome;
        this.raca = raca;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.tipo = tipo;
        this.dono = dono; 
    }

    public getNome(): string {
        return this.nome;
    }

    public getRaca(): string {
        return this.raca;
    }

    public getDataNascimento(): string {
        return this.dataNascimento;
    }

    public getGenero(): string {
        return this.genero;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getDono(): Cliente {
        return this.dono;
    }
}
