package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.bookly.api.model.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServiceRepository extends JpaRepository<Service, UUID> {
   List<Service> findByProviderAndActive(UUID providerId);
   List<Service> findByProviderId(UUID providerId);
}
