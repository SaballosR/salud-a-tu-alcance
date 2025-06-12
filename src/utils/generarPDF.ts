import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '/logo.png'; // Asegúrate de tener este archivo en /public o /src/assets y referenciarlo correctamente

interface DatosUsuario {
  nombre: string;
  imc: number;
  clasificacion: string;
  riesgo: string;
  tmb: number;
  calorias: number;
  objetivo: string;
  menu: string[];
  recomendaciones: string[];
  actividad: string[];
}

export function generarPDF(datos: DatosUsuario) {
  const doc = new jsPDF();
  const anchoPagina = doc.internal.pageSize.getWidth();

  // Título y Logo
  doc.setFontSize(18);
  doc.setTextColor(0, 128, 0); // Verde ecológico
  doc.text("Salud a tu Alcance", anchoPagina / 2, 20, { align: 'center' });

  const img = new Image();
  img.src = logo;
  doc.addImage(img, 'PNG', anchoPagina / 2 - 20, 25, 40, 40);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Nombre: ${datos.nombre}`, 15, 75);
  doc.text(`IMC: ${datos.imc.toFixed(2)} - ${datos.clasificacion}`, 15, 85);
  doc.text(`Riesgo de salud: ${datos.riesgo}`, 15, 95);
  doc.text(`TMB: ${datos.tmb.toFixed(2)} kcal`, 15, 105);
  doc.text(`Requerimiento calórico diario: ${datos.calorias.toFixed(2)} kcal`, 15, 115);
  doc.text(`Objetivo: ${datos.objetivo}`, 15, 125);

  // Menú semanal
  autoTable(doc, {
    startY: 135,
    head: [['Menú Semanal']],
    body: datos.menu.map((dia) => [dia]),
    styles: { cellWidth: 'wrap', halign: 'left' },
    theme: 'grid',
    headStyles: { fillColor: [0, 128, 0] },
  });

  // Recomendaciones
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Recomendaciones']],
    body: datos.recomendaciones.map((rec) => [rec]),
    styles: { cellWidth: 'wrap', halign: 'left' },
    theme: 'striped',
    headStyles: { fillColor: [0, 128, 0] },
  });

  // Actividad física
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Actividad Física Sugerida']],
    body: datos.actividad.map((act) => [act]),
    styles: { cellWidth: 'wrap', halign: 'left' },
    theme: 'striped',
    headStyles: { fillColor: [0, 128, 0] },
  });

  doc.save('Plan-Salud-a-tu-Alcance.pdf');
}
