export type ActividadNivel = "ligera" | "moderada" | "intensa" | "sedentaria";
export type ObjetivoTipo = "bajar" | "mantener" | "subir";

export interface DatosUsuario {
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  estatura: number; // en cm
  actividad: ActividadNivel;
  objetivo: ObjetivoTipo;
}

// Calcula IMC
export function calcularIMC(peso: number, estatura: number): number {
  const estaturaMetros = estatura / 100;
  return peso / (estaturaMetros * estaturaMetros);
}

// Clasifica IMC
export function clasificarIMC(imc: number): string {
  if (imc < 18.5) return "Bajo peso";
  if (imc < 24.9) return "Peso normal";
  if (imc < 29.9) return "Sobrepeso";
  return "Obesidad";
}

// Riesgo de salud según IMC
export function riesgoSalud(imc: number): string {
  if (imc < 18.5) return "Posible desnutrición, consulta médica recomendada.";
  if (imc < 24.9) return "Riesgo bajo, ¡sigue cuidándote!";
  if (imc < 29.9) return "Riesgo moderado: considera mejorar tu alimentación y ejercicio.";
  return "Riesgo alto: es importante consultar a un profesional de salud.";
}

// TMB usando fórmula Harris-Benedict para hombre (puedes adaptar si agregas género)
export function calcularTMB(peso: number, estatura: number, edad: number): number {
  return 10 * peso + 6.25 * estatura - 5 * edad + 5;
}

// Calcula calorías diarias ajustadas por actividad y objetivo
export function calcularCalorias(tmb: number, actividad: ActividadNivel, objetivo: ObjetivoTipo): number {
  let factor = 1.2; // sedentario
  switch (actividad) {
    case "ligera": factor = 1.375; break;
    case "moderada": factor = 1.55; break;
    case "intensa": factor = 1.725; break;
  }

  let calorias = tmb * factor;

  if (objetivo === "bajar") calorias -= 500;
  else if (objetivo === "subir") calorias += 500;

  return Math.max(calorias, 1200);
}

// Genera menú semanal con porciones visuales según objetivo
export function generarMenu(objetivo: ObjetivoTipo): string[] {
  const medida = objetivo === "bajar" ? "1 palma" : objetivo === "subir" ? "2 palmas" : "1.5 palmas";
  return [
    `Lunes: Desayuno: ${medida} de huevo + 1 puño de avena con fruta. Almuerzo: ${medida} de pollo + 1 puño de arroz + vegetales. Cena: ${medida} de pescado + ensalada.`,
    `Martes: Desayuno: ${medida} de queso + 1 puño de tortilla. Almuerzo: ${medida} de cerdo + 1 puño de frijoles + ensalada. Cena: ${medida} de carne molida + vegetales cocidos.`,
    `Miércoles: Desayuno: ${medida} de huevo revuelto + fruta. Almuerzo: ${medida} de pollo + 1 puño de puré de papa + vegetales. Cena: ${medida} de pescado al vapor + arroz integral.`,
    `Jueves: Desayuno: ${medida} de avena + fruta. Almuerzo: ${medida} de carne en salsa + arroz + vegetales. Cena: ${medida} de tortilla con queso + ensalada.`,
    `Viernes: Desayuno: ${medida} de huevo + 1 puño de pan integral. Almuerzo: ${medida} de pescado + 1 puño de arroz + vegetales. Cena: ${medida} de sopa de pollo + 1 puño de pan.`,
    `Sábado: Desayuno: ${medida} de yogurt natural + fruta. Almuerzo: ${medida} de carne asada + ensalada + arroz. Cena: ${medida} de pollo + 1 puño de tortilla + vegetales cocidos.`,
    `Domingo: Desayuno: ${medida} de huevo + fruta. Almuerzo: ${medida} de cerdo en salsa + arroz + ensalada. Cena: ${medida} de carne molida + vegetales cocidos.`,
  ];
}

// Recomendaciones generales según objetivo
export function generarRecomendaciones(objetivo: ObjetivoTipo): string[] {
  if (objetivo === "bajar") {
    return [
      "Tomar al menos 8 vasos de agua al día.",
      "Evitar bebidas azucaradas y frituras.",
      "Incluir frutas y vegetales en todas las comidas.",
      "Mantén un déficit calórico saludable y evita dietas extremas."
    ];
  }
  if (objetivo === "subir") {
    return [
      "Tomar al menos 8 vasos de agua al día.",
      "Evitar bebidas azucaradas y frituras.",
      "Incluir frutas y vegetales en todas las comidas.",
      "Aumenta tu ingesta calórica de forma balanceada."
    ];
  }
  // objetivo mantener
  return [
    "Tomar al menos 8 vasos de agua al día.",
    "Evitar bebidas azucaradas y frituras.",
    "Incluir frutas y vegetales en todas las comidas.",
    "Mantén un equilibrio entre calorías ingeridas y gastadas."
  ];
}

// Sugerencias de actividad física según nivel
export function generarActividad(actividad: ActividadNivel): string[] {
  switch (actividad) {
    case "ligera":
      return ["Caminar 30 minutos al día.", "Evitar pasar mucho tiempo sentado."];
    case "moderada":
      return ["Realizar cardio 3 veces por semana.", "Incluir ejercicios de fuerza leves."];
    case "intensa":
      return ["Entrena al menos 4 veces por semana.", "Incluye ejercicios de fuerza y resistencia."];
    default:
      return ["Realizar actividad física regularmente."];
  }
}

// Para mostrar texto legible del objetivo
export function obtenerObjetivo(objetivo: ObjetivoTipo): string {
  switch (objetivo) {
    case "bajar": return "Bajar de peso";
    case "mantener": return "Mantener el peso";
    case "subir": return "Subir de peso";
    default: return "Objetivo desconocido";
  }
}
