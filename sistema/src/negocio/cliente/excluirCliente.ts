import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente/cliente";
import Excluir from "../excluir"

export default class ExcluirCliente extends Excluir {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public excluir(): void {
        var cpf = this.entrada.receberTexto('Insira o CPF de quem quer excluir: ')

        var ExcluirCliente = (cpf: string) => {
            for (let index = 0; index < this.clientes.length; index++){
                if (this.clientes[index].getCpf.getValor == cpf){
                    this.clientes.splice(index, 1)
                }
            }
        }
        ExcluirCliente(cpf)
        console.log(`--------------------------------------`);
    }
}