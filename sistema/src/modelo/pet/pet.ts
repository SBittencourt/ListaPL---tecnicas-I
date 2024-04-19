export default class Pet {
    private nome: string
    private tipo: string
    private raca: string
    private genero: string
    private data: string

    constructor(nome: string, raca: string, genero: string, tipo: string, data: string ) {
        this.nome = nome
        this.raca = raca
        this.data = data
        this.genero = genero
        this.tipo = tipo

    }

    public get getNome(){return this.nome}
    public get getRaca(){return this.raca}
    public get getData(){return this.data}
    public get getGenero(){return this.genero}
    public get getTipo(){return this.tipo}
}