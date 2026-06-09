package pt.bookly.api.dto.provider;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProviderRegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String phone;

    @NotBlank(message = "Base address is required")
    private String baseAddress;

    private Double baseTravelFee = 5.0;
    private Double pricePerKm = 0.65;

    @NotBlank(message = "Slug is required")
    private String slug;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

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
}
