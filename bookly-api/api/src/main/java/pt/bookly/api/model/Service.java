package pt.bookly.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

    private String name;
    private String description;

    @Column(name = "duration_min")
    private Integer durationMin;

    @Column(name = "base_price")
    private Double basePrice;

    private Boolean active = true;
}
