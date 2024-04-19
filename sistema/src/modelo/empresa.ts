import Cliente from "./cliente/cliente"
import Produto from "./produto/produto"
import Servico from "./servico/servico"
import Pet from "./pet/pet"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private pet: Array<Pet>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.pet = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public get getPets(){
        return this.pet
    }
}