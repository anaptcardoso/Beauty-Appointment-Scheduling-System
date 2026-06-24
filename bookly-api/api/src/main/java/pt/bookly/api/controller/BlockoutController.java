package pt.bookly.api.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.blockout.BlockoutRequest;
import pt.bookly.api.dto.blockout.BlockoutResponse;
import pt.bookly.api.repository.ProviderRepository;
import pt.bookly.api.service.BlockoutService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blockouts")
public class BlockoutController {

    private final BlockoutService blockoutService;
    private final ProviderRepository providerRepository;

    public BlockoutController(
            BlockoutService blockoutService,
            ProviderRepository providerRepository) {
        this.blockoutService = blockoutService;
        this.providerRepository = providerRepository;
    }


    @GetMapping
    public ResponseEntity<List<BlockoutResponse>> getMyBlockouts(
            @AuthenticationPrincipal UserDetails userDetails) {
        UUID providerId = getProviderId(userDetails);
        return ResponseEntity.ok(blockoutService.findByProvider(providerId));
    }


    @PostMapping
    public ResponseEntity<BlockoutResponse> create(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody BlockoutRequest request) {
        UUID providerId = getProviderId(userDetails);
        BlockoutResponse response = blockoutService.create(providerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        UUID providerId = getProviderId(userDetails);
        blockoutService.delete(providerId, id);
        return ResponseEntity.noContent().build();
    }


    private UUID getProviderId(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return providerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"))
                .getId();
    }
}
