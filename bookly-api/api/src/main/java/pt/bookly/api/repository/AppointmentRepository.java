package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.bookly.api.model.Appointment;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    @Query(Queries.FIND_APPOINTMENTS_BY_PROVIDER)
    List<Appointment> findByProviderId(@Param("providerId") UUID providerId);

    List<Appointment> findByClientId(UUID clientId);

    @Query(Queries.CHECK_APPOINTMENT_CONFLICT)
    boolean existsConflict(
            @Param("providerId") UUID providerId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("status") String status
    );
}
