import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DatosUsuario {
  nombre: string;
  apellido: string;
  imc: number;
  clasificacion: string;
  riesgo: string;
  tmb: number;
  calorias: number;
  objetivo: string;
  menuSemanal: string[]; // <- cambio clave: era `menu`, ahora debe coincidir
  recomendaciones: string[];
  actividadFisica: string[];
}

export function generarPDF(datos: DatosUsuario) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setTextColor(34, 139, 34); // Verde ecológico
  doc.text("Salud a tu Alcance", 105, 15, { align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Nombre: ${datos.nombre} ${datos.apellido}`, 20, 30);
  doc.text(`IMC: ${datos.imc.toFixed(2)} (${datos.clasificacion})`, 20, 40);
  doc.text(`Riesgo de salud: ${datos.riesgo}`, 20, 50);
  doc.text(`Tasa Metabólica Basal (TMB): ${datos.tmb.toFixed(2)} kcal`, 20, 60);
  doc.text(`Requerimiento calórico diario: ${datos.calorias.toFixed(0)} kcal`, 20, 70);
  doc.text(`Objetivo: ${datos.objetivo}`, 20, 80);

  // Menú semanal
  doc.setFontSize(14);
  doc.setTextColor(0, 100, 0);
  doc.text("Menú semanal personalizado", 105, 95, { align: "center" });

  doc.setFontSize(10);
  autoTable(doc, {
    startY: 100,
    head: [["Día", "Comidas"]],
    body: datos.menuSemanal.map((item, index) => {
      const dia = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"][index];
      return [dia, item.replace(`${dia}: `, "")];
    }),
    styles: { cellWidth: "wrap" },
    columnStyles: { 1: { cellWidth: 140 } },
  });

  // Recomendaciones
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(0, 100, 0);
  doc.text("Recomendaciones de salud", 105, 20, { align: "center" });

  doc.setFontSize(11);
  datos.recomendaciones.forEach((reco, index) => {
    doc.text(`• ${reco}`, 20, 35 + index * 10);
  });

  // Actividad física
  doc.setFontSize(14);
  doc.setTextColor(0, 100, 0);
  doc.text("Actividad física sugerida", 105, 90, { align: "center" });

  doc.setFontSize(11);
  datos.actividadFisica.forEach((act, index) => {
    doc.text(`• ${act}`, 20, 105 + index * 10);
  });

  doc.save(`PlanSalud_${datos.nombre}_${datos.apellido}.pdf`);
}
