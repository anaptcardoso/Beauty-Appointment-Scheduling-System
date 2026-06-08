package pt.bookly.api.dto.provider;

import lombok.Data;

import java.util.UUID;

@Data
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

}
