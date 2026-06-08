package pt.bookly.api.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pt.bookly.api.security.JwcAuthFilter;
import pt.bookly.api.security.JwcService;

@Configuration //Marks this as a configuration class
@EnableWebSecurity //Enables Spring Security
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwcAuthFilter jwcAuthFilter;
    private final JwcService jwcService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(csrf -> csrf.disable())//Disable  Cross-Site Request Forgery
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/providers/*/services").permitAll()
                        .requestMatchers("/api/providers/*/profile").permitAll()
                        .requestMatchers("/api/appointments").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwcAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}
