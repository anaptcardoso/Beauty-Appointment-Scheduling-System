package pt.bookly.api.dto.auth;

public class LoginResponse {

    private String token;
    private String name;
    private String email;
    private String slug;

    public LoginResponse(String token, String name, String email, String slug) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.slug = slug;
    }

    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getSlug() { return slug; }
}