package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El número es obligatorio")
    private String numero;
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El correo es obligatorio") 
    private String correo;
    
    @NotBlank(message = "El teléfono es obligatorio")
    private String telefono;

    private String tipoEntrega;

    @NotNull(message = "El costo de envío es obligatorio")
    @Min(value = 0, message = "El costo de envío no puede ser negativo")
    private Integer costoEnvio;

    @NotNull(message = "El total es obligatorio")
    @Min(value = 0, message = "El total no puede ser negativo")
    private Integer total;

    @NotBlank(message = "El estado es obligatorio")
    private String estado;

    @NotNull(message = "La fecha es obligatoria")   
    private String fecha;

    public Pedido() { }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getTipoEntrega() { return tipoEntrega; }
    public void setTipoEntrega(String tipoEntrega) { this.tipoEntrega = tipoEntrega; }
    public Integer getCostoEnvio() { return costoEnvio; }
    public void setCostoEnvio(Integer costoEnvio) { this.costoEnvio = costoEnvio; }
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

}
