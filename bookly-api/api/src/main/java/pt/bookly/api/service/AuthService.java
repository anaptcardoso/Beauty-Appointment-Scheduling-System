package pt.bookly.api.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pt.bookly.api.dto.auth.LoginRequest;
import pt.bookly.api.dto.auth.LoginResponse;
import pt.bookly.api.dto.provider.ProviderRegisterRequest;
import pt.bookly.api.dto.provider.ProviderResponse;
import pt.bookly.api.model.Provider;
import pt.bookly.api.repository.ProviderRepository;
import pt.bookly.api.security.JwtService;


@Service
public class AuthService {

    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Constructor injection - Spring automatically provides these dependencies
    public AuthService(
            ProviderRepository providerRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.providerRepository = providerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public ProviderResponse register(ProviderRegisterRequest request) {

        if (providerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        if (providerRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Slug already in use");
        }

        Provider provider = new Provider();
        provider.setName(request.getName());
        provider.setEmail(request.getEmail());
        provider.setPhone(request.getPhone());
        provider.setBaseAddress(request.getBaseAddress());
        provider.setBaseTravelFee(request.getBaseTravelFee());
        provider.setPricePerKm(request.getPricePerKm());
        provider.setSlug(request.getSlug());
        provider.setPassword(passwordEncoder.encode(request.getPassword()));

        Provider saved = providerRepository.save(provider);

        return mapToResponse(saved);
    }

    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Provider provider = providerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        String token = jwtService.generateToken(provider.getEmail());

        return new LoginResponse(
                token,
                provider.getName(),
                provider.getEmail(),
                provider.getSlug()
        );
    }

    private ProviderResponse mapToResponse(Provider provider) {
        ProviderResponse response = new ProviderResponse();
        response.setId(provider.getId());
        response.setName(provider.getName());
        response.setEmail(provider.getEmail());
        response.setPhone(provider.getPhone());
        response.setBaseAddress(provider.getBaseAddress());
        response.setBaseTravelFee(provider.getBaseTravelFee());
        response.setPricePerKm(provider.getPricePerKm());
        response.setSlug(provider.getSlug());
        response.setActive(provider.getActive());
        return response;
    }
}
