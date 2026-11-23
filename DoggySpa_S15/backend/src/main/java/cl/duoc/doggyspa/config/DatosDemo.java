package cl.duoc.doggyspa.config;
import cl.duoc.doggyspa.model.*;
import cl.duoc.doggyspa.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration public class DatosDemo {
 @Bean CommandLineRunner cargar(UsuarioRepository usuarios,ClienteRepository clientes,MascotaRepository mascotas,PasswordEncoder encoder){return args->{
  if(usuarios.findByUsername("admin").isEmpty()){var u=new Usuario();u.setUsername("admin");u.setPassword(encoder.encode("Admin123!"));u.setRol(Usuario.Rol.ADMIN);usuarios.save(u);}
  if(usuarios.findByUsername("usuario").isEmpty()){var u=new Usuario();u.setUsername("usuario");u.setPassword(encoder.encode("Usuario123!"));u.setRol(Usuario.Rol.USER);usuarios.save(u);}
  if(clientes.count()==0){var c=new Cliente();c.setNombre("Ana Torres");c.setEmail("ana@example.test");clientes.save(c);var m=new Mascota();m.setNombre("Rocky");m.setEspecie("Perro");m.setEdad(4);m.setCliente(c);mascotas.save(m);}
 };}
}
