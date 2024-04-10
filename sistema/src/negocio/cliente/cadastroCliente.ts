import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente/cliente";
import CPF from "../../modelo/cliente/cpf";
import Cadastro from "../cadastro";
import Telefone from "../../modelo/cliente/telefone";
import RG from "../../modelo/cliente/rg";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);

        let valorCPF = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);

        let partesDataCPF = dataCPF.split('/');
        let anoCPF = parseInt(partesDataCPF[2]);
        let mesCPF = parseInt(partesDataCPF[1]);
        let diaCPF = parseInt(partesDataCPF[0]);
        let dataEmissaoCPF = new Date(anoCPF, mesCPF, diaCPF);
        let cpf = new CPF(valorCPF, dataEmissaoCPF);

        let valorRG = this.entrada.receberTexto(`Por favor, informe o RG: `);
        let dataRG = this.entrada.receberTexto(`Por favor, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);

        let partesDataRG = dataRG.split('/');
        let anoRG = parseInt(partesDataRG[2]);
        let mesRG = parseInt(partesDataRG[1]);
        let diaRG = parseInt(partesDataRG[0]);
        let dataEmissaoRG = new Date(anoRG, mesRG, diaRG);

        let rg = new RG(valorRG, dataEmissaoRG);

        let telefonesList: Array<Telefone> = [];
        let qtdTelefones = this.entrada.receberNumero(`Por favor, a quantidade de números telefônicos: `);

        for (let i = 1; i <= qtdTelefones; i++) {
            let ddd = this.entrada.receberTexto(`Por favor, informe o DDD do telefone ${i}: `);
            let numero = this.entrada.receberTexto(`Por favor, insira o número do telefone ${i}: `);

            let telefone = new Telefone(ddd, numero);
            telefonesList.push(telefone);
        }

        let cliente = new Cliente(nome, nomeSocial, cpf, rg, telefonesList);
        this.clientes.push(cliente);

        console.log(`\nCadastro concluído :)\n`);
        console.log(`--------------------------------------`);
    }
}
