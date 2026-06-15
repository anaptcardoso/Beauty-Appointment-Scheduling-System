package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.bookly.api.model.ServiceOffering;
import java.util.List;
import java.util.UUID;

public interface ServiceRepository extends JpaRepository<ServiceOffering, UUID> {

   @Query(Queries.FIND_ACTIVE_SERVICES_BY_PROVIDER)
   List<ServiceOffering> findActiveByProviderId(@Param("providerId") UUID providerId);

   @Query(Queries.FIND_ALL_SERVICES_BY_PROVIDER)
   List<ServiceOffering> findAllByProviderId(@Param("providerId") UUID providerId);
}