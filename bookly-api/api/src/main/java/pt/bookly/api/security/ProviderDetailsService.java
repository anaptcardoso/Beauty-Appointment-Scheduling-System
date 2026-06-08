package pt.bookly.api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pt.bookly.api.repository.ProviderRepository;

@Service
@RequiredArgsConstructor
public class ProviderDetailsService implements UserDetailsService {

    private final ProviderRepository providerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        var provider = providerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Provider not found with email: " + email));

        return User.builder()
                .username(provider.getEmail())
                .password(provider.getPassword())
                .roles("PROVIDER")
                .build();
    }
}
