package pt.bookly.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data // Lombok - auto generate getters, setters, toString, equals, hashcode
@Entity // Table to Spring
@Table(name = "providers") //Connect table by supabase
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // Universally Unique Identifier

    private String name;
    private String email;
    private String phone;
    private String password;

    @Column(name = "base_address")
    private String baseAddress;

    @Column(name = "base_travel_fee")
    private Double baseTravelFee = 5.0;

    @Column(name = "price_per_km")
    private Double pricePerKm = 0.65;

    private String slug; //slug is the public unique identifier
    private Boolean active = true; //ex. ana-cardoso. active defines whether the provider is active

    @Column(name = "created_at")
    private LocalDateTime createAt;

    @PrePersist // this method is automatically called by Spring before saving the record to the database. It populates createdAt with the current date and time.
    public void prePersist() {
        createAt = LocalDateTime.now();
    }
}
