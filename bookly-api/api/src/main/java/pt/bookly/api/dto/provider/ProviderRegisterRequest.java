package pt.bookly.api.dto.provider;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProviderRegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private String phone;

    @NotBlank(message = "Base address is required")
    private String baseAddress;

    private Double baseTravelFee = 5.0;
    private Double pricePerKm = 0.65;

    @NotBlank(message = "Slug is required")
    private String slug;

}
