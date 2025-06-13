import { useState } from 'react';
import FormularioUsuario from './components/FormularioUsuario';
import Resultados from './components/Resultados';
import {
  calcularIMC,
  clasificarIMC,
  riesgoSalud,
  calcularTMB,
  calcularCalorias,
  generarMenu,
  generarRecomendaciones,
  generarActividad,
} from './utils/calculos';
import './index.css';

type Genero = 'hombre' | 'mujer';
type NivelActividad = 'ligera' | 'moderada' | 'intensa';
type Objetivo = 'bajar' | 'mantener' | 'subir';

interface DatosUsuario {
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  estatura: number;
  genero: Genero;
  nivelActividad: NivelActividad;
  objetivo: Objetivo;
}

interface DatosUsuarioGenerico {
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  estatura: number;
  genero: string;
  nivelActividad: string;
  objetivo: string;
}

interface DatosProcesados extends DatosUsuario {
  imc: number;
  clasificacion: string;
  riesgo: string;
  tmb: number;
  calorias: number;
  menuSemanal: string[];
  recomendaciones: string[];
  actividadFisica: string[];
}

function App() {
  const [datosProcesados, setDatosProcesados] = useState<DatosProcesados | null>(null);

  const manejarEnvio = (datos: DatosUsuarioGenerico) => {
    // Conversiones explícitas a tipos literales
    const genero = datos.genero as Genero;
    const nivelActividad = datos.nivelActividad as NivelActividad;
    const objetivo = datos.objetivo as Objetivo;

    const imc = calcularIMC(datos.peso, datos.estatura);
    const clasificacion = clasificarIMC(imc);
    const riesgo = riesgoSalud(imc);

    // Cambiar llamada a calcularTMB según definición con 3 args
    const tmb = calcularTMB(datos.peso, datos.estatura, datos.edad);

    const calorias = calcularCalorias(tmb, nivelActividad, objetivo);
    const menuSemanal = generarMenu(objetivo);
    const recomendaciones = generarRecomendaciones(objetivo);
    const actividadFisica = generarActividad(nivelActividad);

    setDatosProcesados({
      nombre: datos.nombre,
      apellido: datos.apellido,
      edad: datos.edad,
      peso: datos.peso,
      estatura: datos.estatura,
      genero,
      nivelActividad,
      objetivo,
      imc,
      clasificacion,
      riesgo,
      tmb,
      calorias,
      menuSemanal,
      recomendaciones,
      actividadFisica,
    });
  };

  return (
     <div className="app-container">
      {/* Imagen de portada grande */}
      <header className='app-header'>
        {/* Título principal */}
        <img
           src="/img/saludable.jpg"
           alt="Imagen de portada"
           className="app-banner"
        />
        <h1>Salud a tu Alcance</h1>
      </header>
      {/* Contenedor de formulario + resultados */}
      <main className="main-content">
        <section className="form-section">
          <FormularioUsuario onEnviar={manejarEnvio} />
        </section>
        <section className="resultados-section">
          {datosProcesados && <Resultados datos={datosProcesados} />}
        </section>
      </main>
    </div>
  );
}
export default App;

