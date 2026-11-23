package cl.duoc.doggyspa.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity public class Mascota {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank private String nombre;
 @NotBlank private String especie;
 @Min(0) @Max(35) private int edad;
 @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="cliente_id") private Cliente cliente;
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getNombre(){return nombre;} public void setNombre(String v){nombre=v;}
 public String getEspecie(){return especie;} public void setEspecie(String v){especie=v;}
 public int getEdad(){return edad;} public void setEdad(int v){edad=v;}
 public Cliente getCliente(){return cliente;} public void setCliente(Cliente v){cliente=v;}
}
