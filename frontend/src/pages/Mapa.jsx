import React from 'react';
import MapaTienda from '../components/MapaTienda';

export default function MapaPage() {
  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-1">Encuéntranos en Viña del Mar</h2>
      <p className="text-muted small mb-4">
        Conoce la ubicación física de Sonido Vivo, horarios de atención y puntos de despacho.
      </p>

      <MapaTienda />
    </div>
  );
}
