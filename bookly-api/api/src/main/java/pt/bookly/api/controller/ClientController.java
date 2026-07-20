package pt.bookly.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pt.bookly.api.dto.appointment.AppointmentResponse;
import pt.bookly.api.dto.client.ClientResponse;
import pt.bookly.api.model.Client;
import pt.bookly.api.repository.ClientRepository;
import pt.bookly.api.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientRepository clientRepository;
    private final AppointmentService appointmentService;

    public ClientController(ClientRepository clientRepository, AppointmentService appointmentService) {
        this.clientRepository = clientRepository;
        this.appointmentService = appointmentService;
    }

    @GetMapping("/me")
    public ResponseEntity<ClientResponse> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        Client client = getClient(userDetails);
        return ResponseEntity.ok(mapToResponse(client));
    }

    @GetMapping("/me/appointments")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments(
            @AuthenticationPrincipal UserDetails userDetails) {
        Client client = getClient(userDetails);
        return ResponseEntity.ok(appointmentService.findByClient(client.getId()));
    }

    private Client getClient(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return clientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    private ClientResponse mapToResponse(Client client) {
        ClientResponse response = new ClientResponse();
        response.setId(client.getId());
        response.setName(client.getName());
        response.setEmail(client.getEmail());
        response.setPhone(client.getPhone());
        return response;
    }
}