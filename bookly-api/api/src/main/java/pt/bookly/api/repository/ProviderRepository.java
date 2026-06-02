package pt.bookly.api.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import pt.bookly.api.model.Provider;

import java.util.Optional;
import java.util.UUID;

public interface ProviderRepository extends JpaRepository<Provider, UUID> {
    Optional<Provider> findByEmail(String email);
    Optional<Provider>findBySlug(String slug);
    boolean existsByEmail(String email);
    boolean existsBySlug(String slug);

}
