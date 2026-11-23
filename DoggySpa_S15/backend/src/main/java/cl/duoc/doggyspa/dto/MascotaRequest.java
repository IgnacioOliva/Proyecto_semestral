package cl.duoc.doggyspa.dto;
import jakarta.validation.constraints.*;
public record MascotaRequest(@NotBlank String nombre,@NotBlank String especie,@Min(0) @Max(35) int edad,@NotNull Long clienteId) {}
