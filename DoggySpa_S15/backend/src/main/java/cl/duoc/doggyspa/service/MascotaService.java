package cl.duoc.doggyspa.service;
import cl.duoc.doggyspa.model.*;
import cl.duoc.doggyspa.dto.MascotaRequest;
import cl.duoc.doggyspa.repository.*;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
@Service public class MascotaService {
 private final MascotaRepository mascotas; private final ClienteRepository clientes;
 public MascotaService(MascotaRepository m,ClienteRepository c){mascotas=m;clientes=c;}
 public List<Mascota> listar(){return mascotas.findAll();}
 public Mascota obtener(Long id){return mascotas.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Mascota no encontrada"));}
 @Transactional public Mascota crear(MascotaRequest r){Mascota m=new Mascota();asignar(m,r);return mascotas.save(m);}
 @Transactional public Mascota actualizar(Long id,MascotaRequest r){Mascota m=obtener(id);asignar(m,r);return mascotas.save(m);}
 @Transactional public void eliminar(Long id){Mascota m=obtener(id);mascotas.delete(m);}
 private void asignar(Mascota m,MascotaRequest r){Cliente c=clientes.findById(r.clienteId()).orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST,"El cliente indicado no existe"));m.setNombre(r.nombre());m.setEspecie(r.especie());m.setEdad(r.edad());m.setCliente(c);}
}
