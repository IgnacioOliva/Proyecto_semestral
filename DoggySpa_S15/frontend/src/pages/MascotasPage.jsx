import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { request } from '../services/api.js';

const EMPTY = { nombre: '', especie: 'Perro', edad: 1, clienteId: '' };

export default function MascotasPage() {
  const { session, logout } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const admin = session?.role === 'ADMIN';

  const api = useCallback((path, opts={}) => request(path, {
    ...opts, token: session.token,
    onUnauthorized: () => logout('El servidor rechazó el JWT (401). Inicia sesión nuevamente.')
  }), [session?.token, logout]);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [animals, customers] = await Promise.all([api('/api/mascotas'), api('/api/clientes')]);
      setMascotas(animals || []); setClientes(customers || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  function edit(mascota) {
    setEditingId(mascota.id);
    setForm({ nombre: mascota.nombre, especie: mascota.especie,
      edad: mascota.edad, clienteId: String(mascota.cliente?.id ?? '') });
    setMessage('');
  }

  async function save(event) {
    event.preventDefault(); setError(''); setMessage('');
    if (!admin) { setError('Solo ADMIN puede realizar cambios.'); return; }
    try {
      await api(editingId ? `/api/mascotas/${editingId}` : '/api/mascotas', {
        method: editingId ? 'PUT' : 'POST',
        body: JSON.stringify({ ...form, edad: Number(form.edad), clienteId: Number(form.clienteId) })
      });
      setForm(EMPTY); setEditingId(null);
      setMessage('Datos guardados correctamente.');
      await load();
    } catch (e) { setError(e.message); }
  }

  async function remove(id) {
    if (!admin || !window.confirm('¿Eliminar esta mascota?')) return;
    setError(''); setMessage('');
    try { await api(`/api/mascotas/${id}`, { method:'DELETE' }); await load(); setMessage('Mascota eliminada.'); }
    catch (e) { setError(e.message); }
  }

  return <section className="panel">
    <h2>Mascotas</h2>
    <p>Rol activo: <strong>{session.role}</strong>. {admin ? 'Puedes consultar y modificar.' : 'Solo puedes consultar.'}</p>
    <button type="button" onClick={load}>Actualizar listado</button>
    {loading && <p>Consultando...</p>}
    {error && <p role="alert" className="error">{error}</p>}
    {message && <p role="status" className="ok">{message}</p>}
    <div className="table-wrap"><table><thead><tr>
      <th>ID</th><th>Nombre</th><th>Especie</th><th>Edad</th><th>Cliente</th><th>Acciones</th>
    </tr></thead><tbody>{mascotas.map(m=><tr key={m.id}>
      <td>{m.id}</td><td>{m.nombre}</td><td>{m.especie}</td><td>{m.edad}</td><td>{m.cliente?.nombre ?? '-'}</td>
      <td>{admin ? <><button type="button" onClick={()=>edit(m)}>Editar</button> <button type="button" className="secondary" onClick={()=>remove(m.id)}>Eliminar</button></> : 'Solo lectura'}</td>
    </tr>)}</tbody></table></div>
    {admin && <form onSubmit={save} className="stack">
      <h3>{editingId ? 'Editar mascota' : 'Nueva mascota'}</h3>
      <label>Nombre<input required maxLength={80} value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/></label>
      <label>Especie<input required maxLength={80} value={form.especie} onChange={e=>setForm({...form,especie:e.target.value})}/></label>
      <label>Edad<input type="number" min="0" max="35" required value={form.edad} onChange={e=>setForm({...form,edad:e.target.value})}/></label>
      <label>Cliente<select required value={form.clienteId} onChange={e=>setForm({...form,clienteId:e.target.value})}>
        <option value="">Seleccionar cliente</option>{clientes.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select></label>
      <div><button>{editingId?'Actualizar':'Crear'}</button> {editingId && <button type="button" className="secondary" onClick={()=>{setEditingId(null);setForm(EMPTY);}}>Cancelar</button>}</div>
    </form>}
  </section>;
}
