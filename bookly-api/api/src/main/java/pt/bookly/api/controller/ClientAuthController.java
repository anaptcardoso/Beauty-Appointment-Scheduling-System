package pt.bookly.api.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.auth.LoginRequest;
import pt.bookly.api.dto.auth.LoginResponse;
import pt.bookly.api.dto.client.ClientRegisterRequest;
import pt.bookly.api.service.AuthService;


@RestController
@RequestMapping("/api/auth/client")
public class ClientAuthController {

    private final AuthService authService;

    public ClientAuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(
            @Valid @RequestBody ClientRegisterRequest request) {
        LoginResponse response = authService.registerClient(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.loginClient(request);
        return ResponseEntity.ok(response);
    }
}
