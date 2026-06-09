package pt.bookly.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

/*
Entity representing a service provider
Maps to be the "providers" table in the database
Each provider has their own public booking page and manages their own services
 */
@Entity
@Table(name = "providers")
public class Provider {

    // Unique identifier -> generated automatically as UUID
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name; // Full name of the provider
    private String email; // Email address
    private String phone; //Phone number
    private String password; //Hashed password

    // Base address user to calculate travel distance to client
    @Column(name = "base_address")
    private String baseAddress;

    // Fixed base fee charged to any travel (in case 5 euros)
    @Column(name = "base_travel_fee")
    private Double baseTravelFee = 5.0;

    // Price charged per Km of travel (in case 0.65 euros)
    @Column(name = "price_per_km")
    private Double pricePerKm = 0.65;

    // URL unique
    private String slug;

    // Whether the provider account is active
    private Boolean active = true;

    // Timestamp of when the provider registered
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getBaseAddress() { return baseAddress; }
    public void setBaseAddress(String baseAddress) { this.baseAddress = baseAddress; }

    public Double getBaseTravelFee() { return baseTravelFee; }
    public void setBaseTravelFee(Double baseTravelFee) { this.baseTravelFee = baseTravelFee; }

    public Double getPricePerKm() { return pricePerKm; }
    public void setPricePerKm(Double pricePerKm) { this.pricePerKm = pricePerKm; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}