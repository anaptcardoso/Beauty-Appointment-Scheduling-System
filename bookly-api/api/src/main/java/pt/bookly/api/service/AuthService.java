package pt.bookly.api.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pt.bookly.api.dto.auth.LoginRequest;
import pt.bookly.api.dto.auth.LoginResponse;
import pt.bookly.api.dto.provider.ProviderRegisterRequest;
import pt.bookly.api.dto.provider.ProviderResponse;
import pt.bookly.api.model.Provider;
import pt.bookly.api.repository.ProviderRepository;
import pt.bookly.api.security.JwtService;
import pt.bookly.api.dto.client.ClientRegisterRequest;
import pt.bookly.api.model.Client;
import pt.bookly.api.repository.ClientRepository;


@Service
public class AuthService {

    private final ProviderRepository providerRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Constructor injection - Spring automatically provides these dependencies
    public AuthService(
            ProviderRepository providerRepository,
            ClientRepository clientRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.providerRepository = providerRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;

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

        Provider provider = providerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), provider.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(provider.getEmail(), "PROVIDER");

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

    public LoginResponse registerClient(ClientRegisterRequest request) {

        if (clientRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        Client client = new Client();
        client.setName(request.getName());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        client.setPassword(passwordEncoder.encode(request.getPassword()));

        Client saved = clientRepository.save(client);

        String token = jwtService.generateToken(saved.getEmail(), "CLIENT");

        return new LoginResponse(token, saved.getName(), saved.getEmail(), null);
    }

    public LoginResponse loginClient(LoginRequest request) {

        Client client = clientRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), client.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(client.getEmail(), "CLIENT");

        return new LoginResponse(token, client.getName(), client.getEmail(), null);
    }
}
