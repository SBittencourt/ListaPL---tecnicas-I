import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import Cadastro from "../geral/cadastro";
import Pet from "../../modelo/pet";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";


export default class CrudCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private produtosDisponiveis: Array<Produto>;
    private servicosDisponiveis: Array<Servico>;
    private petsCadastrados: Array<Pet>;
    rgs: any;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>, pets: Array<Pet>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.produtosDisponiveis = produtos;
        this.servicosDisponiveis = servicos;
        this.petsCadastrados = pets;
    }


    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente:`);
        
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
    
        let valorCPF = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
    
        let partesDataCPF = dataCPF.split('/');
        let anoCPF = parseInt(partesDataCPF[2]);
        let mesCPF = parseInt(partesDataCPF[1]);
        let diaCPF = parseInt(partesDataCPF[0]);
        let dataEmissaoCPF = new Date(anoCPF, mesCPF - 1, diaCPF);
        let cpf = new CPF(valorCPF, dataEmissaoCPF);
    
        let valorRG = this.entrada.receberTexto(`Por favor, informe o RG: `);
        let dataRG = this.entrada.receberTexto(`Por favor, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
    
        let partesDataRG = dataRG.split('/');
        let anoRG = parseInt(partesDataRG[2]);
        let mesRG = parseInt(partesDataRG[1]);
        let diaRG = parseInt(partesDataRG[0]);
        let dataEmissaoRG = new Date(anoRG, mesRG - 1, diaRG);
        let rg = new RG(valorRG, dataEmissaoRG);
    
        let qtdTelefones = this.entrada.receberNumero(`Por favor, a quantidade de números telefônicos: `);
        let telefonesList: Array<Telefone> = [];
    
        for (let i = 1; i <= qtdTelefones; i++) {
            let ddd = this.entrada.receberTexto(`Por favor, informe o DDD do telefone ${i}: `);
            let numero = this.entrada.receberTexto(`Por favor, insira o número do telefone ${i}: `);
    
            let telefone = new Telefone(ddd, numero);
            telefonesList.push(telefone);
        }
    
        let cliente = new Cliente(nome, nomeSocial, cpf, rg, telefonesList);  
    
        this.clientes.push(cliente);
    
        console.log(`\nO cliente foi cadastrado com sucesso! :D\n`);
        console.log(`--------------------------------------------------`);


    
        this.associarProdutosConsumidos(cliente); 
        this.associarServicosConsumidos(cliente); 

        
        let cadastrarMais = this.entrada.receberTexto(`Deseja cadastrar mais um cliente? (S/N): `);
        if (cadastrarMais.toUpperCase() === 'S') {
            this.cadastrar(); 
        }
    }
    

    private associarProdutosConsumidos(cliente: Cliente): void {
        let adicionarProdutos = this.entrada.receberTexto(`Deseja adicionar produtos consumidos para o cliente? (S/N): `);
        while (adicionarProdutos.toUpperCase() === 'S') {
            this.listarProdutosDisponiveis(); 
            let indiceProduto = this.entrada.receberNumero(`Informe o número do produto consumido: `);
            if (indiceProduto < 1 || indiceProduto > this.produtosDisponiveis.length) {
                console.log(`Índice de produto inválido.`);
            } else {
                let produtoConsumido = this.produtosDisponiveis[indiceProduto - 1];
                cliente.addProdutoConsumido(produtoConsumido);
            }

            adicionarProdutos = this.entrada.receberTexto(`Deseja adicionar mais produtos consumidos? (S/N): `);
        }
    }

    private associarServicosConsumidos(cliente: Cliente): void {
        let adicionarServicos = this.entrada.receberTexto(`Deseja adicionar serviços consumidos para o cliente? (S/N): `);
        while (adicionarServicos.toUpperCase() === 'S') {
            this.listarServicosDisponiveis(); 
            let indiceServico = this.entrada.receberNumero(`Informe o número do serviço consumido: `);
            if (indiceServico < 1 || indiceServico > this.servicosDisponiveis.length) {
                console.log(`Índice de serviço inválido.`);
            } else {
                let servicoConsumido = this.servicosDisponiveis[indiceServico - 1];
                cliente.addServicoConsumido(servicoConsumido);
            }

            adicionarServicos = this.entrada.receberTexto(`Deseja adicionar mais serviços consumidos? (S/N): `);
        }
    }


    private associarPetExistente(cliente: Cliente): void {
        console.log(`\nEscolha um pet existente para associar ao cliente:`);
        this.listarPetsCadastrados(); 
        let indicePet = this.entrada.receberNumero(`Informe o número do pet existente: `);
        if (indicePet < 1 || indicePet > this.petsCadastrados.length) {
            console.log(`Índice de pet inválido.`);
        } else {
            let petExistente = this.petsCadastrados[indicePet - 1];
            cliente.addPet(petExistente);
            console.log(`Pet associado ao cliente com sucesso!`);
        }
    }
      

    private listarProdutosDisponiveis(): void {
        console.log(`\nProdutos disponíveis:`);
        console.log(`---------------------------------`);
    
        if (this.produtosDisponiveis.length === 0) {
            console.log(`Ainda não existem produtos disponíveis.\n`);
            return; 
        }
    
        this.produtosDisponiveis.forEach((produto, index) => {
            console.log(`${index + 1}- Nome: ${produto.nome}, Preço: ${produto.preco}, Descrição: ${produto.descricao}`);
        });

        console.log(`---------------------------------`);
    }

    private listarServicosDisponiveis(): void {
        console.log(`\nServiços disponíveis:`);
        console.log(`---------------------------------`);
    
        if (this.servicosDisponiveis.length === 0) {
            console.log(`Ainda não existem serviços disponíveis.\n`);
            return; 
        }
    
        this.servicosDisponiveis.forEach((servico, index) => {
            console.log(`${index + 1}- Nome: ${servico.nome}, Preço: ${servico.preco}, Descrição: ${servico.descricao}`);
        });

        console.log(`---------------------------------`);
    }

    private listarPetsCadastrados(): void {
        console.log(`\nPets cadastrados:`);
        console.log(`---------------------------------`);

        if (this.petsCadastrados.length === 0) {
            console.log(`Ainda não existem pets cadastrados.\n`);
            return;
        }

        this.petsCadastrados.forEach((pet, index) => {
            console.log(`${index + 1}- Nome: ${pet.getNome()}, Raça: ${pet.getRaca()}, Tipo: ${pet.getTipo()}, Gênero: ${pet.getGenero()}`);
        });

        console.log(`---------------------------------`);
    }


    public listarClientes(): void {
        console.log("\nLista de Clientes:");
        console.log("---------------------------------");
    
        if (this.clientes.length === 0) {
            console.log("Não existem clientes cadastrados.");
            let cadastrarNovo = this.entrada.receberTexto("Deseja cadastrar um novo cliente? (S/N): ");
            if (cadastrarNovo.toUpperCase() === 'S') {
                this.cadastrar();
                return;
            } else {
                return;
            }
        }
    
        this.clientes.forEach((cliente, index) => {
            console.log(`Cliente ${index + 1}:`);
            if (cliente.nomeSocial) {
                console.log(`Nome: ${cliente.nomeSocial}`);
            } else {
                console.log(`Nome: ${cliente.nome}`);
            }
            console.log(`CPF: ${cliente.getCpf().getValor}`);
            console.log(`Telefones:`);
            cliente.getTelefones().forEach((telefone, i) => {
                console.log(`   ${i + 1}: ${telefone.getNumero()}`);
            });
    
            if (cliente.getPets().length > 0) {
                console.log(`Pets:`);
                cliente.getPets().forEach((pet, j) => {
                    console.log(`   Pet ${j + 1}:`);
                    console.log(`      Nome: ${pet.getNome()}`);
                    console.log(`      Raça: ${pet.getRaca()}`);
                    console.log(`      Tipo: ${pet.getTipo()}`);
                    console.log(`      Gênero: ${pet.getGenero()}`);
                });
            } else {
                console.log(`O cliente não possui pets cadastrados.`);
            }
    
            console.log(`Total Gasto: R$ ${cliente.calcularTotalGasto().toFixed(2)}`);
    
            console.log("---------------------------------");
        });
    }
    
    
    
    
    public atualizarCliente(): void {
        console.log(`\nEdição de Cliente:`);
        console.log(`---------------------------------`);
    
        if (this.clientes.length === 0) {
            console.log(`Ainda não existem clientes cadastrados para editar.\n`);
            return;
        }
    
        this.listarClientes();
    
        let indiceCliente = this.entrada.receberNumero(`Informe o número do cliente que deseja editar: `);
        if (indiceCliente < 1 || indiceCliente > this.clientes.length) {
            console.log(`Índice de cliente inválido.\n`);
            return;
        }
    
        let clienteSelecionado = this.clientes[indiceCliente - 1];
    
        console.log(`\nEdição do Cliente "${clienteSelecionado.nome}":`);
        console.log(`1- Editar nome`);
        console.log(`2- Editar nome social`);
        console.log(`3- Editar telefones`);
        console.log(`4- Editar pets`);
    
        let opcao = this.entrada.receberNumero(`Escolha a opção desejada: `);
    
        switch (opcao) {
            case 1:
                let novoNome = this.entrada.receberTexto(`Informe o novo nome do cliente (atual: ${clienteSelecionado.nome}): `);
                clienteSelecionado.nome = novoNome;
                console.log(`Nome do cliente atualizado com sucesso!\n`);
                break;
            case 2:
                let novoNomeSocial = this.entrada.receberTexto(`Informe o novo nome social do cliente (atual: ${clienteSelecionado.nomeSocial}): `);
                clienteSelecionado.nomeSocial = novoNomeSocial;
                console.log(`Nome social do cliente atualizado com sucesso!\n`);
                break;
            case 3:
                this.atualizarTelefones(clienteSelecionado);
                break;
            case 4:
                this.atualizarPets(clienteSelecionado);
                break;
            default:
                console.log(`Opção inválida.\n`);
                break;
        }
    }
    
    private atualizarTelefones(cliente: Cliente): void {
        console.log("\nAtualização de Telefones:");
        console.log("---------------------------------");
    
        let qtdTelefones = this.entrada.receberNumero(`Por favor, a quantidade de números telefônicos: `);
        let telefonesList: Array<Telefone> = [];
        for (let i = 1; i <= qtdTelefones; i++) {
            let ddd = this.entrada.receberTexto(`Por favor, informe o DDD do telefone ${i}: `);
            let numero = this.entrada.receberTexto(`Por favor, insira o número do telefone ${i}: `);
            let telefone = new Telefone(ddd, numero);
            telefonesList.push(telefone);
        }
        cliente.setTelefones(telefonesList);
        console.log("Telefones atualizados com sucesso!");
    }
    
    private atualizarPets(cliente: Cliente): void {
        console.log("\nAtualização de Pets:");
        console.log("---------------------------------");
    
        this.associarPetExistente(cliente);
    
        console.log("Pets atualizados com sucesso!");
    }
    
    
    
    public excluirCliente(): void {
        console.log("\nExclusão de Cliente:");
        console.log("---------------------------------");
    
        this.listarClientes();
        
        let indiceCliente = this.entrada.receberNumero("Escolha o número do cliente que deseja excluir:");
        if (indiceCliente < 1 || indiceCliente > this.clientes.length) {
            console.log("Índice de cliente inválido.");
            return;
        }
    
        let clienteExcluido = this.clientes.splice(indiceCliente - 1, 1);
        console.log(`Cliente ${clienteExcluido[0].nome} excluído com sucesso!`);
    }
    
    public associarItensClienteExistente(): void {
        this.listarClientes();
        let indiceCliente = this.entrada.receberNumero(`Informe o número do cliente que deseja associar itens (produtos ou serviços): `);
        if (indiceCliente < 1 || indiceCliente > this.clientes.length) {
            console.log(`Índice de cliente inválido.`);
            return;
        }
    
        let clienteSelecionado = this.clientes[indiceCliente - 1];
    
        console.log(`Escolha o tipo de item a ser associado:`);
        console.log(`1- Produto`);
        console.log(`2- Serviço`);
        
        let opcao = this.entrada.receberNumero(`Opção: `);
        
        switch (opcao) {
            case 1:
                this.associarProdutosConsumidos(clienteSelecionado);
                break;
            case 2:
                this.associarServicosConsumidos(clienteSelecionado);
                break;
            default:
                console.log(`Opção inválida.`);
                break;
        }
    }

    
    
    public ConsumoClientes(): void {
        console.log("\nRelatório de Consumo dos Clientes:");
        console.log("---------------------------------");
    
        if (this.clientes.length === 0) {
            console.log("Não existem clientes cadastrados.");
            return;
        }
    
        this.clientes.forEach((cliente, index) => {
            console.log(`Cliente ${index + 1}:`);
            if (cliente.nomeSocial) {
                console.log(`Nome: ${cliente.nomeSocial}`);
            } else {
                console.log(`Nome: ${cliente.nome}`);
            }
            console.log(`Total Gasto: R$ ${cliente.calcularTotalGasto().toFixed(2)}`);
            console.log(`Produtos Consumidos:`);
            cliente.getProdutosConsumidos().forEach((produto, i) => {
                console.log(`   ${i + 1}: ${produto.nome} - R$ ${produto.preco.toFixed(2)}`);
            });
            console.log(`Serviços Consumidos:`);
            cliente.getServicosConsumidos().forEach((servico, i) => {
                console.log(`   ${i + 1}: ${servico.nome} - R$ ${servico.preco.toFixed(2)}`);
            });
            console.log("---------------------------------");
        });
    }

    
    /*Listagens pedidas -- colocando aqui para não confundir com outras abas*/


    public listarTop10ClientesPorQuantidade(): void {
        console.log("\nTop 10 Clientes que mais consumiram produtos ou serviços (em quantidade):");
        console.log("---------------------------------");
    

        const clientesOrdenados = this.clientes.sort((a, b) => {
            const totalA = a.getProdutosConsumidos().length + a.getServicosConsumidos().length;
            const totalB = b.getProdutosConsumidos().length + b.getServicosConsumidos().length;
            return totalB - totalA;
        });
    
        for (let i = 0; i < 10 && i < clientesOrdenados.length; i++) {
            const cliente = clientesOrdenados[i];
            console.log(`${i + 1}. ${cliente.nome} - Total de Consumo: ${cliente.getProdutosConsumidos().length + cliente.getServicosConsumidos().length}`);
        }
    }
    
    public listarTop5ClientesPorValor(): void {
        console.log("\nTop 5 Clientes que mais consumiram em valor:");
        console.log("---------------------------------");
    
        const clientesOrdenados = this.clientes.sort((a, b) => {
            const totalA = a.calcularTotalGasto();
            const totalB = b.calcularTotalGasto();
            return totalB - totalA;
        });
    
        for (let i = 0; i < 5 && i < clientesOrdenados.length; i++) {
            const cliente = clientesOrdenados[i];
            console.log(`${i + 1}. ${cliente.nome} - Total Gasto: R$ ${cliente.calcularTotalGasto().toFixed(2)}`);
        }
    }
    
    public listarServicosEProdutosMaisConsumidos(): void {
        console.log("\nServiços e Produtos Mais Consumidos:");
        console.log("---------------------------------");
    
        const produtosConsumidos: { [nome: string]: number } = {};
        const servicosConsumidos: { [nome: string]: number } = {};

        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos().forEach(produto => {
                produtosConsumidos[produto.nome] = (produtosConsumidos[produto.nome] || 0) + 1;
            });
    
            cliente.getServicosConsumidos().forEach(servico => {
                servicosConsumidos[servico.nome] = (servicosConsumidos[servico.nome] || 0) + 1;
            });
        });
    

        const produtosOrdenados = Object.entries(produtosConsumidos).sort((a, b) => b[1] - a[1]);
    
        console.log("\nProdutos mais consumidos:");
        produtosOrdenados.slice(0, 5).forEach(([nome, quantidade], index) => {
            console.log(`${index + 1}. ${nome} - Quantidade: ${quantidade}`);
        });
    
        const servicosOrdenados = Object.entries(servicosConsumidos).sort((a, b) => b[1] - a[1]);
    
        console.log("\nServiços mais consumidos:");
        servicosOrdenados.slice(0, 5).forEach(([nome, quantidade], index) => {
            console.log(`${index + 1}. ${nome} - Quantidade: ${quantidade}`);
        });
    }

    public listarServicosEProdutosPorTipoERacaDePets(): void {
        console.log("\nServiços e Produtos Mais Consumidos por Tipo e Raça de Pets:");
        console.log("---------------------------------");
    
        const consumoPorTipoERaca: { [tipoRaca: string]: { servicos: { [nome: string]: number }, produtos: { [nome: string]: number } } } = {};
    
        this.clientes.forEach(cliente => {
            cliente.getPets().forEach(pet => {
                const tipoRaca = `${pet.getTipo()} - ${pet.getRaca()}`;
                if (!consumoPorTipoERaca[tipoRaca]) {
                    consumoPorTipoERaca[tipoRaca] = { servicos: {}, produtos: {} };
                }
    
                cliente.getServicosConsumidos().forEach(servico => {
                    consumoPorTipoERaca[tipoRaca].servicos[servico.nome] = (consumoPorTipoERaca[tipoRaca].servicos[servico.nome] || 0) + 1;
                });
    
                cliente.getProdutosConsumidos().forEach(produto => {
                    consumoPorTipoERaca[tipoRaca].produtos[produto.nome] = (consumoPorTipoERaca[tipoRaca].produtos[produto.nome] || 0) + 1;
                });
            });
        });
    
        Object.entries(consumoPorTipoERaca).forEach(([tipoRaca, consumo]) => {
            console.log(`\nTipo e Raça de Pet: ${tipoRaca}`);
            console.log("Serviços mais consumidos:");
            Object.entries(consumo.servicos).slice(0, 3).forEach(([nome, quantidade], index) => {
                console.log(`${index + 1}. ${nome} - Quantidade: ${quantidade}`);
            });
            console.log("\nProdutos mais consumidos:");
            Object.entries(consumo.produtos).slice(0, 3).forEach(([nome, quantidade], index) => {
                console.log(`${index + 1}. ${nome} - Quantidade: ${quantidade}`);
            });
            console.log("---------------------------------");
        });
    }
    
    
}
