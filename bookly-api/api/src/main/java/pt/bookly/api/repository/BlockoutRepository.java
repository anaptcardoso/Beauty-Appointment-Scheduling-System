package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.bookly.api.model.Blockout;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface BlockoutRepository extends JpaRepository<Blockout, UUID> {

    List<Blockout> findByProviderId(UUID providerId);

    @Query(Queries.FIND_BLOCKOUTS_BY_PROVIDER_AND_DATE)
    List<Blockout> findByProviderIdAndDateRange(
            @Param("providerId") UUID providerId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
