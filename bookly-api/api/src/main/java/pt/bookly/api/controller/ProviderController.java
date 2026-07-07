package pt.bookly.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.provider.ProviderResponse;
import pt.bookly.api.model.Provider;
import pt.bookly.api.repository.ProviderRepository;


@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    private final ProviderRepository providerRepository;

    public ProviderController(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }


    @GetMapping("/me")
    public ResponseEntity<ProviderResponse> getMe(
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();

        Provider provider = providerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        return ResponseEntity.ok(mapToResponse(provider));
    }

    @PutMapping("/me")
    public ResponseEntity<ProviderResponse> updateMe(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProviderResponse request) {

        String email = userDetails.getUsername();

        Provider provider = providerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        provider.setName(request.getName());
        provider.setPhone(request.getPhone());
        provider.setBaseAddress(request.getBaseAddress());
        provider.setBaseTravelFee(request.getBaseTravelFee());
        provider.setPricePerKm(request.getPricePerKm());
        provider.setSlug(request.getSlug());

        providerRepository.save(provider);

        return ResponseEntity.ok(mapToResponse(provider));
    }

    @GetMapping("/{slug}/profile")
    public ResponseEntity<ProviderResponse> getBySlug(@PathVariable String slug) {

        Provider provider = providerRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        return ResponseEntity.ok(mapToResponse(provider));
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