package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.bookly.api.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByProviderIdOrderByDateDescStartTimeAsc(UUID providerId);
    List<Appointment> findByClientId(UUID clientId);

    boolean existsByProviderIdAndDateAndStartTimeLessThanAndTimeGreaterThanAndStatusNot(UUID providerId, LocalDate date, LocalTime startTimeIsLessThan, String status);
}
