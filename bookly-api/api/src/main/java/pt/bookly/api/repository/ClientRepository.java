package pt.bookly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.bookly.api.model.Client;
import java.util.Optional;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

    @Query(Queries.FIND_CLIENT_BY_EMAIL)
    Optional<Client> findByEmail(@Param("email") String email);

    @Query(Queries.EXISTS_CLIENT_BY_EMAIL)
    boolean existsByEmail(@Param("email") String email);
}