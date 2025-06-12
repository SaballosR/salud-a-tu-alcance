import { useState } from 'react';
import FormularioUsuario from './components/FormularioUsuario';
import Resultados from './components/Resultados';
import './App.css';
import logo from '/logo.png';

function App() {
  const [datos, setDatos] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo Salud a tu Alcance" className="App-logo" />
        <h1 className="App-title">Salud a tu Alcance</h1>
      </header>
      <main>
        <FormularioUsuario onCalcular={setDatos} />
        {datos && <Resultados datos={datos} />}
      </main>
    </div>
  );
}

export default App;

