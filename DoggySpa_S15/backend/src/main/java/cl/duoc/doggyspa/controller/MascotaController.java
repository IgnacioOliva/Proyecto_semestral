package cl.duoc.doggyspa.controller;
import cl.duoc.doggyspa.model.Mascota;
import cl.duoc.doggyspa.dto.MascotaRequest;
import cl.duoc.doggyspa.service.MascotaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/mascotas") public class MascotaController {
 private final MascotaService service; public MascotaController(MascotaService s){service=s;}
 @GetMapping public List<Mascota> listar(){return service.listar();}
 @GetMapping("/{id}") public Mascota obtener(@PathVariable Long id){return service.obtener(id);}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Mascota crear(@Valid @RequestBody MascotaRequest req){return service.crear(req);}
 @PutMapping("/{id}") public Mascota actualizar(@PathVariable Long id,@Valid @RequestBody MascotaRequest req){return service.actualizar(id,req);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void borrar(@PathVariable Long id){service.eliminar(id);}
}
