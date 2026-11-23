package cl.duoc.doggyspa.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.*;
@Entity public class Cliente {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank private String nombre;
 @Email @NotBlank @Column(unique=true) private String email;
 @OneToMany(mappedBy="cliente") @JsonIgnore private List<Mascota> mascotas=new ArrayList<>();
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getNombre(){return nombre;} public void setNombre(String v){nombre=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
}
