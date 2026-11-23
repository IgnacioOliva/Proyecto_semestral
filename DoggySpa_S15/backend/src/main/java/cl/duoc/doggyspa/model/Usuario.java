package cl.duoc.doggyspa.model;
import jakarta.persistence.*;
@Entity @Table(name="usuarios") public class Usuario {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(unique=true,nullable=false) private String username;
 @Column(nullable=false) private String password;
 @Enumerated(EnumType.STRING) private Rol rol;
 public enum Rol {ADMIN,USER}
 public Long getId(){return id;} public String getUsername(){return username;} public void setUsername(String v){username=v;}
 public String getPassword(){return password;} public void setPassword(String v){password=v;}
 public Rol getRol(){return rol;} public void setRol(Rol v){rol=v;}
}
