package com.fatec.pl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.fatec.pl.modelo.Cliente;
import com.fatec.pl.modelo.Endereco;
import com.fatec.pl.modelo.Telefone;
import com.fatec.pl.repositorio.RepositorioCliente;

@SpringBootApplication
public class PlApplication implements CommandLineRunner {

    @Autowired
    private RepositorioCliente repositorio;

    public static void main(String[] args) {
        SpringApplication.run(PlApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        criarClientesIniciais();
    }

    private void criarClientesIniciais() {
        Cliente cliente1 = new Cliente();
        cliente1.setNome("Pedro Alcântara de Bragança e Bourbon");
        cliente1.setNomeSocial("Dom Pedro");
        cliente1.setEndereco(criarEndereco());
        cliente1.getTelefones().add(criarTelefone("21", "22152622"));
        repositorio.save(cliente1);

        Cliente cliente2 = new Cliente();
        cliente2.setNome("Teresa Cristina de Bourbon-Duas Sicílias");
        cliente2.setNomeSocial("Mãe dos Brasileiros");
        cliente2.setEndereco(criarEndereco());
        cliente2.getTelefones().add(criarTelefone("21", "22152622"));
        repositorio.save(cliente2);

        Cliente cliente3 = new Cliente();
        cliente3.setNome("Isabel Cristina Leopoldina Augusta Gonzaga de Bourbon e Bragança");
        cliente3.setNomeSocial("Princesa Isabel");
        cliente3.setEndereco(criarEndereco());
        cliente3.getTelefones().add(criarTelefone("21", "22152622"));
        repositorio.save(cliente3);

        Cliente cliente4 = new Cliente();
        cliente4.setNome("Leopoldina Teresa Gonzaga de Bragança e Bourbon-Duas Sicílias");
        cliente4.setNomeSocial("Princesa Leopoldina");
        cliente4.setEndereco(criarEndereco());
        cliente4.getTelefones().add(criarTelefone("21", "22152622"));
        repositorio.save(cliente4);
    }

    private Endereco criarEndereco() {
        Endereco endereco = new Endereco();
        endereco.setCidade("Rio de Janeiro");
        endereco.setEstado("Rio de Janeiro");
        endereco.setBairro("Centro");
        endereco.setRua("Praça Quinze de Novembro");
        endereco.setNumero("48");
        endereco.setCodigoPostal("20010-010");
        endereco.setInformacoesAdicionais("O Paço Imperial é um edifício histórico localizado na atual Praça XV de Novembro, no centro da cidade do Rio de Janeiro, Brasil.");
        return endereco;
    }

    private Telefone criarTelefone(String ddd, String numero) {
        Telefone telefone = new Telefone();
        telefone.setDdd(ddd);
        telefone.setNumero(numero);
        return telefone;
    }
}
