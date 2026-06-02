package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.bookly.api.model.Blockout;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface BlockoutRepository extends JpaRepository<Blockout, UUID> {
    List<Blockout> findByProviderId(UUID providerId);
    List<Blockout> findByProviderIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            UUID providerId,
            LocalDate endDate,
            LocalDate startDate
    );

}
