package pt.bookly.api.dto.provider;

import java.util.UUID;

public class ProviderResponse {

    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String baseAddress;
    private Double baseTravelFee;
    private Double pricePerKm;
    private String slug;
    private Boolean active;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

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
}