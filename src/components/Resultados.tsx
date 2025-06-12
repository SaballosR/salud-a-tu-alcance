import React from 'react';
import '../index.css';

interface DatosUsuario {
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  estatura: number;
  actividad: string;
  objetivo: string;
  imc: number;
  clasificacion: string;
  riesgo: string;
  tmb: number;
  calorias: number;
  menuSemanal: string[];
  recomendaciones: string[];
  actividadFisica: string[];
  objetivoDescripcion: string;
}

const Resultados: React.FC<{ datos: DatosUsuario }> = ({ datos }) => {
  return (
    <div className="resultados">
      <h2 className="subtitulo">Resultados para {datos.nombre} {datos.apellido}</h2>

      <p><strong>IMC:</strong> {datos.imc.toFixed(2)}</p>
      <p><strong>Clasificación del peso:</strong> {datos.clasificacion}</p>
      <p><strong>Riesgo de salud:</strong> {datos.riesgo}</p>
      <p><strong>Tasa Metabólica Basal (TMB):</strong> {datos.tmb.toFixed(2)} kcal</p>
      <p><strong>Requerimiento calórico diario:</strong> {datos.calorias.toFixed(0)} kcal</p>
      <p><strong>Objetivo:</strong> {datos.objetivoDescripcion}</p>

      <h3 className="subtitulo">Menú semanal (con medidas intuitivas)</h3>
      <ul>
        {datos.menuSemanal.map((item, index) => (
          <li key={index}>🍽️ {item}</li>
        ))}
      </ul>

      <h3 className="subtitulo">Recomendaciones de salud</h3>
      <ul>
        {datos.recomendaciones.map((rec, index) => (
          <li key={index}>✅ {rec}</li>
        ))}
      </ul>

      <h3 className="subtitulo">Actividad física sugerida</h3>
      <ul>
        {datos.actividadFisica.map((act, index) => (
          <li key={index}>🏃 {act}</li>
        ))}
      </ul>
    </div>
  );
};

export default Resultados;
