import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente/cliente";
import Atualiza from "../atualizar";

export default class AtualizarCliente extends Atualiza {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nInício da atualização do cliente`);

        let indice = this.entrada.receberNumero(`Por favor informe o índice do cliente a ser atualizado: `);
        indice -= 1;

        if (indice >= 0 && indice < this.clientes.length) {
            let cliente = this.clientes[indice];
            let novoNome = this.entrada.receberTexto(`Por favor informe o novo nome do cliente: `);
            let novoNomeSocial = this.entrada.receberTexto(`Por favor informe o novo nome social do cliente: `);
            let novoValorCPF = this.entrada.receberTexto(`Por favor informe o novo número do CPF: `);
            let novaDataEmissaoCPF = this.entrada.receberTexto(`Por favor informe a nova data de emissão do CPF, no padrão dd/mm/yyyy: `);
            let partesNovaData = novaDataEmissaoCPF.split('/');
            let novoAno = new Number(partesNovaData[2].valueOf()).valueOf();
            let novoMes = new Number(partesNovaData[1].valueOf()).valueOf();
            let novoDia = new Number(partesNovaData[0].valueOf()).valueOf();
            let novaDataEmissao = new Date(novoAno, novoMes, novoDia);
            cliente.nome = novoNome;
            cliente.nomeSocial = novoNomeSocial;
            console.log(`\nCliente atualizado com sucesso! :)\n`);
            console.log(`--------------------------------------`);
        } else {
            console.log(`\nÍndice inválido. Cliente não encontrado. :(\n`);
        }
    }
}
