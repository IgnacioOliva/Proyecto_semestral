package cl.duoc.doggyspa.repository;
import cl.duoc.doggyspa.model.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {Optional<Usuario> findByUsername(String username);}
