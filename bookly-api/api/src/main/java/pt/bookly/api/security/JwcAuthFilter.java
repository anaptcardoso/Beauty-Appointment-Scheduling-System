package pt.bookly.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor //Lombok: generates constructor with required(final) fields
public class JwcAuthFilter extends OncePerRequestFilter {

    //Injected automatically by Spring via constructor
    private final JwcService jwcService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //Get the authorization header from the request
        String authHeader = request.getHeader("Authorization");

        //If no authorization header or not a bearer token, skip this filter
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        //Extract the token
        String token = authHeader.substring(7);

        //If the token is invalid or expired, skip authentication
        if (!jwcService.isTokenValid(token)){
            filterChain.doFilter(request, response);
            return;
        }

        //Extract the email from the token
        String email = jwcService.extractEmail(token);

        //If email exists and user is not already authenticated
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null){

            //var - local variable type inference
            //Load details from the database
            var userDetails = userDetailsService.loadUserByUsername(email);

            //Create an authentication token with user details and authorities
            var authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );

            //Add request details to the authentication token
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            //Set the authentication in Spring Security context
            //From this point, the user is considered authenticated
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        //Continue processing the request
        filterChain.doFilter(request, response);
    }
}
