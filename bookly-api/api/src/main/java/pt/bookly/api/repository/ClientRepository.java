package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.bookly.api.model.Client;

import java.util.Optional;
import java.util.UUID;

public interface ClientRepository  extends JpaRepository<Client, UUID> {
    Optional<Client> findByEmail(String email);
    boolean existsEmail(String email);
}
