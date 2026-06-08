package pt.bookly.api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component // Marks this class as a Spring-managed componet
public class JwcService {
    /*
    Secret key used to sign the token
    Value is read from application.properties (jwt.secret)
     */
    @Value("${jwc.secret}")
    private String secret;

    /*
    Token expiration time in milliseconds
    Value is read from application.properties (jwt.expiration)
    Default 24h = 86400000
     */
    @Value("${jwc.expiration}")
    private long expiration;

    /*
    Converts the secret string into a cryptographic key
    Used to sign and verify tokens
     */
    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());

    }

    /*
    Generates a JWT token for the given email
    The token contains: subject-> provider email; isseudAt-> current date/time; expiration-> current time + expiration period
     */
    public String generateToken(String email){
        return Jwts.builder()
                .subject(email) //who the token belongs to
                .issuedAt(new Date()) //when it was created
                .expiration(new Date(System.currentTimeMillis() + expiration)) //when it expires
                .signWith(getKey()) //sign with secret key
                .compact(); //build the token string
    }

    //Extracts the email(subject) from a JWT token
    public String extractEmail(String token){
        return getClaims(token).getSubject();
    }

    public boolean isTokenValid(String token){
        try{
            getClaims(token); //throws exception if invalid
            return true;
        } catch (Exception e){
            return false;
        }
    }

    private Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(getKey()) //verify signature with secret key
                .build()
                .parseSignedClaims(token)
                .getPayload(); //return the token body
    }
}
