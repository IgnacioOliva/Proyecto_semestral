package cl.duoc.doggyspa.controller;
import cl.duoc.doggyspa.model.Cliente;
import cl.duoc.doggyspa.repository.ClienteRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
@RestController @RequestMapping("/api/clientes") public class ClienteController {
 private final ClienteRepository repo; public ClienteController(ClienteRepository repo){this.repo=repo;}
 @GetMapping public List<Cliente> listar(){return repo.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Cliente crear(@Valid @RequestBody Cliente c){c.setId(null);return repo.save(c);}
}
