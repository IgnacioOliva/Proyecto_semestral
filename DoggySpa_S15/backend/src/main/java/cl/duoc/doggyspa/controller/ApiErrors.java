package cl.duoc.doggyspa.controller;
import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;
@RestControllerAdvice public class ApiErrors {
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<Map<String,String>> validation(MethodArgumentNotValidException ex){return ResponseEntity.badRequest().body(Map.of("error","Datos inválidos","detalle",ex.getBindingResult().getFieldErrors().stream().findFirst().map(e->e.getField()+": "+e.getDefaultMessage()).orElse("Revise solicitud")));}
 @ExceptionHandler(DataIntegrityViolationException.class) ResponseEntity<Map<String,String>> conflict(DataIntegrityViolationException ex){return ResponseEntity.status(409).body(Map.of("error","Datos duplicados o relación no válida"));}
}
