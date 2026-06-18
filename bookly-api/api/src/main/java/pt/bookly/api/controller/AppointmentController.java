package pt.bookly.api.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.appointment.AppointmentRequest;
import pt.bookly.api.dto.appointment.AppointmentResponse;
import pt.bookly.api.repository.ProviderRepository;
import pt.bookly.api.service.AppointmentService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final ProviderRepository providerRepository;


    public AppointmentController(AppointmentService appointmentService, ProviderRepository providerRepository) {
        this.appointmentService = appointmentService;
        this.providerRepository = providerRepository;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments(
            @AuthenticationPrincipal UserDetails userDetails) {
        UUID providerId = getProviderId(userDetails);
        return ResponseEntity.ok(appointmentService.findByProvider(providerId));
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(
            @Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateStatus(
            @AuthenticationPrincipal UserDetails userDetails, @PathVariable UUID id,
            @RequestParam String status) {
        UUID providerId = getProviderId(userDetails);
        AppointmentResponse response = appointmentService.updateStatus(providerId, id, status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        UUID providerId = getProviderId(userDetails);
        appointmentService.delete(providerId, id);
        return ResponseEntity.noContent().build();
    }

    private UUID getProviderId(UserDetails userDetails){
        String email = userDetails.getUsername();
        return providerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"))
                .getId();
    }
}