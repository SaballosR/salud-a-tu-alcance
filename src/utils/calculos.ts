export function calcularIMC(peso: number, estatura: number): number {
  const estaturaMetros = estatura / 100;
  return peso / (estaturaMetros * estaturaMetros);
}

export function clasificarIMC(imc: number): string {
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidad grado 1";
  if (imc < 40) return "Obesidad grado 2";
  return "Obesidad grado 3";
}

export function riesgoSalud(imc: number): string {
  if (imc < 18.5) return "Riesgo nutricional: bajo peso";
  if (imc < 25) return "Saludable";
  if (imc < 30) return "Riesgo moderado: sobrepeso";
  if (imc < 35) return "Riesgo alto: obesidad grado 1";
  if (imc < 40) return "Riesgo muy alto: obesidad grado 2";
  return "Riesgo extremo: obesidad grado 3";
}

export function calcularTMB(peso: number, estatura: number, edad: number): number {
  return 10 * peso + 6.25 * estatura - 5 * edad + 5;
}

export function calcularCalorias(tmb: number, actividad: string): number {
  const factores: { [key: string]: number } = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    activo: 1.725,
    muy_activo: 1.9,
  };
  return tmb * (factores[actividad] || 1.2);
}

export function obtenerObjetivo(estado: string, calorias: number): { calorias: number, descripcion: string } {
  if (estado === "bajar") return { calorias: calorias - 500, descripcion: "Bajar de peso de forma saludable" };
  if (estado === "subir") return { calorias: calorias + 500, descripcion: "Aumentar masa muscular o peso" };
  return { calorias, descripcion: "Mantener el peso actual" };
}

export function generarMenuSemanal(): string[] {
  return [
    "Lunes: Desayuno: 1 palma de huevo con vegetales, 1 puño de avena cocida. Almuerzo: 1 palma de pollo, 1 puño de arroz, 1 taza de ensalada. Cena: 1 palma de pescado, ½ taza de puré de papa, verduras.",
    "Martes: Desayuno: 1 puño de frijoles, 1 tortilla, 1 huevo. Almuerzo: 1 palma de cerdo magro, ½ taza de arroz, ensalada. Cena: 1 palma de tortilla con queso, vegetales cocidos.",
    "Miércoles: Desayuno: 1 puño de avena, 1 banano. Almuerzo: 1 palma de carne de res, ½ taza de arroz, ensalada verde. Cena: 2 huevos duros, 1 puño de yuca cocida, pepino.",
    "Jueves: Desayuno: 1 palma de queso fresco, 1 tortilla, 1 naranja. Almuerzo: 1 palma de pollo, 1 puño de arroz, ½ taza de chayote. Cena: 1 taza de sopa de vegetales con huevo.",
    "Viernes: Desayuno: 1 puño de avena, 1 manzana. Almuerzo: 1 palma de pescado empapelado, ½ taza de arroz integral, ensalada. Cena: 1 huevo con chayote, 1 tortilla.",
    "Sábado: Desayuno: 1 palma de tortilla con huevo, 1 banano. Almuerzo: 1 palma de carne, ½ taza de puré, verduras. Cena: Ensalada con atún (1 palma), galletas integrales (2).",
    "Domingo: Desayuno: 1 puño de gallo pinto, 1 huevo. Almuerzo: 1 palma de pollo, ½ taza de arroz con verduras, ensalada. Cena: Sopa de vegetales, 1 huevo cocido.",
  ];
}

export function obtenerRecomendaciones(imc: number): string[] {
  const recomendaciones = [
    "Beber al menos 8 vasos de agua al día",
    "Incluir vegetales en cada comida",
    "Evitar bebidas azucaradas y comida rápida",
  ];

  if (imc >= 25) {
    recomendaciones.push("Reducir el consumo de harinas y azúcares refinados");
  }

  if (imc < 18.5) {
    recomendaciones.push("Aumentar la frecuencia de comidas saludables");
  }

  return recomendaciones;
}

export function obtenerActividadFisica(estado: string): string[] {
  if (estado === "bajar") {
    return [
      "Caminar 30 minutos diarios",
      "Ejercicios de bajo impacto 3x por semana",
    ];
  }

  if (estado === "subir") {
    return [
      "Entrenamiento de fuerza 3-4x por semana",
      "Snacks ricos en proteína entre comidas",
    ];
  }

  return [
    "Mantener una rutina activa 3-5 días por semana",
    "Evitar el sedentarismo prolongado",
  ];
}
