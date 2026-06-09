package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.bookly.api.model.Service;
import java.util.List;
import java.util.UUID;

public interface ServiceRepository extends JpaRepository<Service, UUID> {

   @Query(Queries.FIND_ACTIVE_SERVICES_BY_PROVIDER)
   List<Service> findActiveByProviderId(@Param("providerId") UUID providerId);

   @Query(Queries.FIND_ALL_SERVICES_BY_PROVIDER)
   List<Service> findAllByProviderId(@Param("providerId") UUID providerId);
}