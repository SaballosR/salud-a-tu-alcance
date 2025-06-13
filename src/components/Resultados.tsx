import React from 'react';
import { generarPDF } from '../utils/generarPDF';
import '../index.css'; // Asegúrate de tener tus estilos aplicados aquí

interface ResultadosProps {
  datos: {
    nombre: string;
    apellido: string;
    imc: number;
    clasificacion: string;
    riesgo: string;
    tmb: number;
    calorias: number;
    objetivo: string;
    menuSemanal: string[];
    recomendaciones: string[];
    actividadFisica: string[];
  };
}

const Resultados: React.FC<{ datos: ResultadosProps['datos'] }> = ({ datos }) => {
  const {
    nombre,
    apellido,
    imc,
    clasificacion,
    riesgo,
    tmb,
    calorias,
    objetivo,
    menuSemanal,
    recomendaciones,
    actividadFisica,
  } = datos;

  return (
    <div className="resultados-container">
      <h1 className="titulo-app">Salud a tu Alcance</h1>

      <div className="resultado-card">
        <h2>Resumen personalizado para <span className="resaltar">{nombre} {apellido}</span></h2>

        <p><strong>IMC:</strong> {imc.toFixed(2)}</p>
        <p><strong>Clasificación:</strong> {clasificacion}</p>
        <p><strong>Riesgo de salud:</strong> {riesgo}</p>
        <p><strong>Tasa Metabólica Basal (TMB):</strong> {tmb.toFixed(2)} kcal</p>
        <p><strong>Requerimiento calórico diario:</strong> {calorias.toFixed(0)} kcal</p>
        <p><strong>Objetivo:</strong> {objetivo.charAt(0).toUpperCase() + objetivo.slice(1)}</p>

        <h3>Menú semanal personalizado:</h3>
        <ul>
          {menuSemanal.map((dia, index) => (
            <li key={index}>{dia}</li>
          ))}
        </ul>

        <h3>Recomendaciones generales:</h3>
        <ul>
          {recomendaciones.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>

        <h3>Actividad física sugerida:</h3>
        <ul>
          {actividadFisica.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>

        <button className="btn-pdf" onClick={() => generarPDF(datos)}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default Resultados;
