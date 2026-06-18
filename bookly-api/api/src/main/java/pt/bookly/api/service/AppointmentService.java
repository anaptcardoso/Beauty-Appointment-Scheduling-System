package pt.bookly.api.service;

import org.springframework.stereotype.Service;
import pt.bookly.api.dto.appointment.AppointmentRequest;
import pt.bookly.api.dto.appointment.AppointmentResponse;
import pt.bookly.api.model.Appointment;
import pt.bookly.api.model.Client;
import pt.bookly.api.model.Provider;
import pt.bookly.api.model.ServiceOffering;
import pt.bookly.api.repository.*;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final ClientRepository clientRepository;
    private final ProviderRepository providerRepository;
    private final ServiceRepository serviceRepository;
    private final BlockoutRepository blockoutRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, ClientRepository clientRepository, ProviderRepository providerRepository, ServiceRepository serviceRepository, BlockoutRepository blockoutRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clientRepository = clientRepository;
        this.providerRepository = providerRepository;
        this.serviceRepository = serviceRepository;
        this.blockoutRepository = blockoutRepository;
    }

    public List<AppointmentResponse> findByProvider(UUID providerId){
        return appointmentRepository.findByProviderId(providerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse create(AppointmentRequest request){
        Provider provider = providerRepository.findById(request.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        ServiceOffering service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (!service.getProvider().getId().equals(provider.getId())) {
            throw new RuntimeException("Service does not belong to this provider");
        }

        LocalTime endTime = request.getStartTime().plusMinutes(service.getDurationMin());

        boolean hasConflict = appointmentRepository.existsConflict(
                provider.getId(),
                request.getDate(),
                request.getStartTime(),
                endTime,
                "cancelled"
        );

        if (hasConflict) {
            throw new RuntimeException("Time slot is already booked");
        }

        boolean hasBlockout = !blockoutRepository.findByProviderIdAndDateRange(
                provider.getId(),
                request.getDate(),
                request.getDate()
        ).isEmpty();

        if (hasBlockout) {
            throw new RuntimeException("This date is not available");
        }

        Client client = clientRepository.findByEmail(request.getClientEmail())
                .orElseGet(() -> {
                    Client newClient = new Client();
                    newClient.setName(request.getClientName());
                    newClient.setEmail(request.getClientEmail());
                    newClient.setPhone(request.getClientPhone());
                    return clientRepository.save(newClient);
                });


        Appointment appointment = new Appointment();
        appointment.setProvider(provider);
        appointment.setClient(client);
        appointment.setService(service);
        appointment.setDate(request.getDate());
        appointment.setStartTime(request.getStartTime());
        appointment.setEndTime(endTime);
        appointment.setAddress(request.getAddress());
        appointment.setNotes(request.getNotes());
        appointment.setTotalPrice(request.getTotalPrice());
        appointment.setStatus("pending");
        appointment.setPaymentStatus("pending");

        Appointment saved = appointmentRepository.save(appointment);
        return mapToResponse(saved);

    }

    public AppointmentResponse updateStatus(UUID providerId, UUID appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getProvider().getId().equals(providerId)) {
            throw new RuntimeException("You do not have permission to update this appointment");
        }

        appointment.setStatus(status);
        Appointment saved = appointmentRepository.save(appointment);
        return mapToResponse(saved);
    }

    public void delete(UUID providerId, UUID appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getProvider().getId().equals(providerId)) {
            throw new RuntimeException("You do not have permission to delete this appointment");
        }

        appointmentRepository.delete(appointment);
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        AppointmentResponse response = new AppointmentResponse();
        response.setId(appointment.getId());
        response.setClientName(appointment.getClient().getName());
        response.setClientEmail(appointment.getClient().getEmail());
        response.setClientPhone(appointment.getClient().getPhone());
        response.setServiceName(appointment.getService().getName());
        response.setDate(appointment.getDate());
        response.setStartTime(appointment.getStartTime());
        response.setEndTime(appointment.getEndTime());
        response.setAddress(appointment.getAddress());
        response.setNotes(appointment.getNotes());
        response.setTotalPrice(appointment.getTotalPrice());
        response.setStatus(appointment.getStatus());
        response.setPaymentStatus(appointment.getPaymentStatus());
        return response;
    }
}
