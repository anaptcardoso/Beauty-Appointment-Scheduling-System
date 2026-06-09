package pt.bookly.api.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.auth.LoginRequest;
import pt.bookly.api.dto.auth.LoginResponse;
import pt.bookly.api.dto.provider.ProviderRegisterRequest;
import pt.bookly.api.dto.provider.ProviderResponse;
import pt.bookly.api.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ProviderResponse> register(
            @Valid @RequestBody ProviderRegisterRequest request) {
        ProviderResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
