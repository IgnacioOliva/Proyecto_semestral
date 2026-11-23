import test from 'node:test';
import assert from 'node:assert/strict';
import { readSession, saveSession, clearSession, isExpired, decodePayload } from '../src/auth/session.js';

function token(sub='usuario', exp=Math.floor(Date.now()/1000)+600) {
  // Token SOLO para probar lectura de claims; no posee firma real.
  const payload = Buffer.from(JSON.stringify({sub, rol:'USER', exp})).toString('base64url');
  return `ejemplo.${payload}.firma-no-valida`;
}
function storage() {
  const data=new Map();
  return {getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
}

test('guarda y recupera una sesión al recargar',()=>{
 const s=storage(); const t=token();
 assert.equal(saveSession({token:t,role:'USER',username:'usuario'},s),true);
 assert.equal(readSession(s).username,'usuario');
});
test('expiración invalida y borra la sesión',()=>{
 const s=storage(); const t=token('usuario',Math.floor(Date.now()/1000)+1);
 saveSession({token:t,role:'USER'},s);
 assert.equal(readSession(s,Date.now()+5000),null);
});
test('no acepta JWT con estructura o fecha inválidas',()=>{
 assert.equal(isExpired('sin.jwt.valido'),true);
 assert.equal(decodePayload('incorrecto'),null);
});
test('cierre de sesión limpia almacenamiento',()=>{
 const s=storage();saveSession({token:token(),role:'USER'},s);clearSession(s);
 assert.equal(readSession(s),null);
});
