package pt.bookly.api.service;


import org.springframework.stereotype.Service;
import pt.bookly.api.dto.service.ServiceRequest;
import pt.bookly.api.dto.service.ServiceResponse;
import pt.bookly.api.model.Provider;
import pt.bookly.api.model.ServiceOffering;
import pt.bookly.api.repository.ProviderRepository;
import pt.bookly.api.repository.ServiceRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final ProviderRepository providerRepository;


    public ServiceService(ServiceRepository serviceRepository, ProviderRepository providerRepository) {
        this.serviceRepository = serviceRepository;
        this.providerRepository = providerRepository;
    }

    public List<ServiceResponse> findActiveByProviderSlug(String slug){
        Provider provider = providerRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        return serviceRepository.findActiveByProviderId(provider.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> findAllByProvider(UUID providerId) {

        return serviceRepository.findAllByProviderId(providerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse create(UUID providerId, ServiceRequest request){
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        ServiceOffering service = new ServiceOffering();
        service.setProvider(provider);
        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setDurationMin(request.getDurationMin());
        service.setBasePrice(request.getBasePrice());
        service.setActive(request.getActive());

        ServiceOffering saved = serviceRepository.save(service);
        return mapToResponse(saved);
    }

    public ServiceResponse update(UUID providerId, UUID serviceId, ServiceRequest request) {
        ServiceOffering service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (!service.getProvider().getId().equals(providerId)) {
            throw new RuntimeException("You do not have permission to edit this service");
        }

        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setDurationMin(request.getDurationMin());
        service.setBasePrice(request.getBasePrice());
        service.setActive(request.getActive());

        ServiceOffering saved = serviceRepository.save(service);
        return mapToResponse(saved);
    }


    public void delete(UUID providerId, UUID serviceId) {
        ServiceOffering service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (!service.getProvider().getId().equals(providerId)) {
            throw new RuntimeException("You do not have permission to delete this service");
        }

        serviceRepository.delete(service);
    }


    private ServiceResponse mapToResponse(ServiceOffering service) {
        ServiceResponse response = new ServiceResponse();
        response.setId(service.getId());
        response.setName(service.getName());
        response.setDescription(service.getDescription());
        response.setDurationMin(service.getDurationMin());
        response.setBasePrice(service.getBasePrice());
        response.setActive(service.getActive());
        return response;
    }
}
