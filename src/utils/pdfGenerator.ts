import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePdfOptions {
  fileName?: string;
  onProgress?: (progressText: string) => void;
}

/**
 * Generates an executive A4 PDF from a DOM element, paginating cleanly
 * and preserving all Unicode/CJK/French characters and images.
 */
export async function exportDocumentToPdf(
  elementId: string,
  options?: GeneratePdfOptions
): Promise<void> {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  options?.onProgress?.('Preparation du rendu...');

  // Target A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  // Find all page sheets in container
  const pageElements = container.querySelectorAll<HTMLElement>('.pdf-printable-page');

  if (pageElements.length > 0) {
    // Multi-page discrete pages
    for (let i = 0; i < pageElements.length; i++) {
      options?.onProgress?.(`Rendu de la page ${i + 1}/${pageElements.length}...`);
      const pageEl = pageElements[i];

      const canvas = await html2canvas(pageEl, {
        scale: 2, // High resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
  } else {
    // Single continuous element pagination
    options?.onProgress?.('Capture du document haute resolution...');
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage('a4', 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
  }

  const sanitizedFileName = (options?.fileName || 'DocuPulse_Rapport')
    .replace(/[^a-zA-Z0-9_\u4e00-\u9fa5-]/g, '_')
    .slice(0, 60);

  pdf.save(`${sanitizedFileName}.pdf`);
}
