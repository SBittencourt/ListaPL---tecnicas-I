package com.fatec.pl.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000") // Permitir solicitações apenas de http://localhost:3000
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Permitir os métodos GET, POST, PUT, DELETE
            .allowCredentials(true); // Permitir credenciais (por exemplo, cookies)
    }
}
