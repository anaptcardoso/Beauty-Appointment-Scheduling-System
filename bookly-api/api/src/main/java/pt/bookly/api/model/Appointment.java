package pt.bookly.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity // Representing a booking appointment
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /*
    The provider who will perform the service
    Maps to the "provider_id" foreign key column
     */
    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

    /*
    The client who booked the appointment
    Maps to the "client_id" foreign key column
     */
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    /*
    The service booked
    Maps to the "service_id" foreign key column
     */
    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceOffering service;

    // Date of the appointment
    private LocalDate date;

    // Start time of the appointment
    @Column(name = "start_time")
    private LocalTime startTime;

    // End time of the appointment (start time + service duration)
    @Column(name = "end_time")
    private LocalTime endTime;

    // Client's address where service will be performed
    private String address;

    // Optional notes from the client
    private String notes;

    // Total price including service price + travel cost
    @Column(name = "total_price")
    private Double totalPrice;

    // Pending / Confirmed / Canceled
    private String status = "pending";

    // Pending / paid / refunded
    @Column(name = "payment_status")
    private String paymentStatus = "pending";

    // When the appointment was created
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Provider getProvider() { return provider; }
    public void setProvider(Provider provider) { this.provider = provider; }

    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }

    public ServiceOffering getService() { return service; }
    public void setService(ServiceOffering service) { this.service = service; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
