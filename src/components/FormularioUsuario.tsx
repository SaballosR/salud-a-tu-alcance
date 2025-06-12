import React, { useState } from 'react';
import '../index.css';
import { calcularIMC, clasificarIMC, calcularTMB, calcularCalorias, generarMenuSemanal, obtenerRecomendaciones, obtenerActividadFisica, obtenerObjetivo } from '../utils/calculos';
import { generarPDF } from '../utils/generarPDF';
import Resultados from './Resultados';

const FormularioUsuario: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [peso, setPeso] = useState<number | ''>('');
  const [estatura, setEstatura] = useState<number | ''>('');
  const [actividad, setActividad] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState<any>(null);

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nombre && apellido && edad && peso && estatura && actividad && objetivo) {
      const imc = calcularIMC(Number(peso), Number(estatura));
      const clasificacion = clasificarIMC(imc);
      const riesgo = clasificacion.riesgo;
      const tmb = calcularTMB(Number(peso), Number(estatura), Number(edad));
      const calorias = calcularCalorias(tmb, actividad, objetivo);
      const menuSemanal = generarMenuSemanal(calorias);
      const recomendaciones = obtenerRecomendaciones(imc, objetivo);
      const actividadFisica = obtenerActividadFisica(actividad, objetivo);
      const objetivoDescripcion = obtenerObjetivo(objetivo);

      const datos = {
        nombre,
        apellido,
        edad,
        peso,
        estatura,
        actividad,
        objetivo,
        imc,
        clasificacion: clasificacion.descripcion,
        riesgo,
        tmb,
        calorias,
        menuSemanal,
        recomendaciones,
        actividadFisica,
        objetivoDescripcion
      };

      setDatosUsuario(datos);
      setMostrarResultados(true);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const descargarPDF = () => {
    if (datosUsuario) {
      generarPDF(datosUsuario);
    }
  };

  return (
    <div className="formulario-container">
      <h1 className="titulo-app">Salud a tu Alcance</h1>
      <img src="/salud-logo.png" alt="Salud Logo" className="logo" />

      <form className="formulario" onSubmit={manejarSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
        <input type="number" placeholder="Edad (años)" value={edad} onChange={e => setEdad(Number(e.target.value))} required min={1} />
        <input type="number" placeholder="Peso (kg)" value={peso} onChange={e => setPeso(Number(e.target.value))} required min={1} />
        <input type="number" placeholder="Estatura (cm)" value={estatura} onChange={e => setEstatura(Number(e.target.value))} required min={1} />

        <select value={actividad} onChange={e => setActividad(e.target.value)} required>
          <option value="">Nivel de actividad física</option>
          <option value="sedentario">Sedentario</option>
          <option value="ligero">Ligero</option>
          <option value="moderado">Moderado</option>
          <option value="intenso">Intenso</option>
        </select>

        <select value={objetivo} onChange={e => setObjetivo(e.target.value)} required>
          <option value="">Objetivo</option>
          <option value="bajar">Bajar de peso</option>
          <option value="mantener">Mantener peso</option>
          <option value="subir">Subir de peso</option>
        </select>

        <button type="submit">Calcular y generar plan</button>
      </form>

      {mostrarResultados && datosUsuario && (
        <div className="resultados-container">
          <Resultados datos={datosUsuario} />
          <button className="boton-pdf" onClick={descargarPDF}>Descargar PDF</button>
        </div>
      )}
    </div>
  );
};

export default FormularioUsuario;
