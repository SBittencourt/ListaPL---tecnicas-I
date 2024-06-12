package com.fatec.pl.verificador;

import org.springframework.stereotype.Component;
import com.fatec.pl.modelo.Endereco;

@Component
public class VerificadorEnderecoNulo implements Verificador<Endereco> {
    @Override
    public boolean verificar(Endereco objeto) {
        return objeto == null;
    }
}
