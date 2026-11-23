package cl.duoc.doggyspa.security;
import cl.duoc.doggyspa.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
@Service public class UsuarioDetailsService implements UserDetailsService {
 private final UsuarioRepository users;public UsuarioDetailsService(UsuarioRepository u){users=u;}
 @Override public UserDetails loadUserByUsername(String username){var u=users.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("No existe usuario"));return User.withUsername(u.getUsername()).password(u.getPassword()).roles(u.getRol().name()).build();}
}
