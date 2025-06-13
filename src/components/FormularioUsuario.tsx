import React, { useState } from 'react';

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

interface FormularioProps {
  onEnviar: (datos: DatosUsuario) => void;
}

const FormularioUsuario: React.FC<FormularioProps> = ({ onEnviar }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [peso, setPeso] = useState<number | ''>('');
  const [estatura, setEstatura] = useState<number | ''>('');
  const [genero, setGenero] = useState<Genero>('hombre');
  const [nivelActividad, setNivelActividad] = useState<NivelActividad>('ligera');
  const [objetivo, setObjetivo] = useState<Objetivo>('mantener');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nombre ||
      !apellido ||
      edad === '' ||
      peso === '' ||
      estatura === ''
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const datos: DatosUsuario = {
      nombre,
      apellido,
      edad: Number(edad),
      peso: Number(peso),
      estatura: Number(estatura),
      genero,
      nivelActividad,
      objetivo,
    };

    onEnviar(datos);
  };

  return (
    <div className="formulario-caja">
      <form onSubmit={handleSubmit} className="formulario-grid">

        <div>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Apellido:
            <input
              type="text"
              value={apellido}
              onChange={e => setApellido(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Edad:
            <input
              type="number"
              value={edad}
              onChange={e => setEdad(e.target.value === '' ? '' : Number(e.target.value))}
              min={1}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Peso (kg):
            <input
              type="number"
              value={peso}
              onChange={e => setPeso(e.target.value === '' ? '' : Number(e.target.value))}
              min={1}
              step="0.1"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Estatura (cm):
            <input
              type="number"
              value={estatura}
              onChange={e => setEstatura(e.target.value === '' ? '' : Number(e.target.value))}
              min={50}
              step="0.1"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Género:
            <select value={genero} onChange={e => setGenero(e.target.value as Genero)}>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Nivel de actividad física:
            <select
              value={nivelActividad}
              onChange={e => setNivelActividad(e.target.value as NivelActividad)}
            >
              <option value="ligera">Ligera</option>
              <option value="moderada">Moderada</option>
              <option value="intensa">Intensa</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Objetivo:
            <select value={objetivo} onChange={e => setObjetivo(e.target.value as Objetivo)}>
              <option value="bajar">Bajar de peso</option>
              <option value="mantener">Mantener peso</option>
              <option value="subir">Subir de peso</option>
            </select>
          </label>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit">Calcular</button>
        </div>

      </form>
    </div>
  );
};

export default FormularioUsuario;

