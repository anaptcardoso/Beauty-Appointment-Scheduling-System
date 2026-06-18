package pt.bookly.api.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.service.ServiceRequest;
import pt.bookly.api.dto.service.ServiceResponse;
import pt.bookly.api.repository.ProviderRepository;
import pt.bookly.api.service.ServiceService;

import java.util.List;
import java.util.UUID;


@RestController
public class ServiceController {

    private final ServiceService serviceService;
    private final ProviderRepository providerRepository;


    public ServiceController(ServiceService serviceService, ProviderRepository providerRepository) {
        this.serviceService = serviceService;
        this.providerRepository = providerRepository;
    }

    @GetMapping("/api/providers/{slug}/services")
    public ResponseEntity<List<ServiceResponse>> getPublicServices(@PathVariable String slug) {
        return ResponseEntity.ok(serviceService.findActiveByProviderSlug(slug));
    }

    @GetMapping("/api/services")
    public ResponseEntity<List<ServiceResponse>> getMyServices(@AuthenticationPrincipal UserDetails userDetails) {
        UUID providerId = getProviderId(userDetails);
        return ResponseEntity.ok(serviceService.findAllByProvider(providerId));
    }

    @PostMapping("/api/services")
    public ResponseEntity<ServiceResponse> create(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ServiceRequest request){
        UUID providerId = getProviderId(userDetails);
        ServiceResponse response = serviceService.create(providerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/api/services/{id}")
    public ResponseEntity<ServiceResponse> update(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id,
            @Valid @RequestBody ServiceRequest request) {
        UUID providerId = getProviderId(userDetails);
        ServiceResponse response = serviceService.update(providerId, id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/services/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        UUID providerId = getProviderId(userDetails);
        serviceService.delete(providerId, id);
        return ResponseEntity.noContent().build();
    }

    private UUID getProviderId(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return providerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"))
                .getId();
    }
}
