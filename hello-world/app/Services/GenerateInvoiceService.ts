import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export default class GenerateInvoiceService {
  public static generatePDF(invoice, products) {
    const doc = new PDFDocument({ margin: 50 });

    // Définir le chemin où enregistrer le PDF
    const pdfPath = path.join(__dirname, '../../public/invoices/devis-' + invoice.id + '.pdf');
    const stream = fs.createWriteStream(pdfPath);

    // Lier le flux de PDF au fichier
    doc.pipe(stream);

    // En-tête de l'expéditeur
    doc
      .fontSize(12)
      .text('SMARTCONGO SARLU', 50, 50)
      .text('129 Bis Avenue de l’école, Quartier Brikin, Ngaliema', 50, 65)
      .text('012 Kinshasa - République Démocratique du Congo', 50, 80)
      .text('+243893795899 ; +243840850257', 50, 95)
      .text('services@smartcongo.com', 50, 110)
      .text('www.smartcongo.com', 50, 125);

    // Date et numéro de devis
    doc
      .fontSize(12)
      .text(`Devis N°: Proforma`, 350, 50)
      .text(`Date du devis: ${new Date().toLocaleDateString()}`, 350, 65);

    // Ligne de séparation
    doc.moveTo(50, 140).lineTo(550, 140).stroke();

    // Informations sur le destinataire
    doc
      .fontSize(12)
      .text('Destinataire', 50, 160)
      .text(invoice.recipient, 50, 175);

    // Table des produits
    let tableTop = 210;

    // Colonnes
    const tableColumns = {
      code: 50,
      quantity: 150,
      priceHT: 250,
      priceTTC: 350,
      totalHT: 450,
    };

    doc
      .fontSize(12)
      .text('Code Produit / Service', tableColumns.code, tableTop)
      .text('Quantité', tableColumns.quantity, tableTop)
      .text('Prix unit. HT', tableColumns.priceHT, tableTop)
      .text('Prix unit. TTC', tableColumns.priceTTC, tableTop)
      .text('Total HT', tableColumns.totalHT, tableTop);

    tableTop += 20;

    products.forEach((product) => {
      doc
        .fontSize(10)
        .text(product.code, tableColumns.code, tableTop)
        .text(product.quantity, tableColumns.quantity, tableTop)
        .text(product.price_ht.toFixed(2), tableColumns.priceHT, tableTop)
        .text(product.price_ttc.toFixed(2), tableColumns.priceTTC, tableTop)
        .text((product.quantity * product.price_ht).toFixed(2), tableColumns.totalHT, tableTop);

      tableTop += 20;
    });

    // Totaux
    tableTop += 20;
    doc
      .fontSize(12)
      .text(`Total HT : ${invoice.total_ht.toFixed(2)} USD`, 350, tableTop)
      .text(`Total TTC : ${invoice.total_ttc.toFixed(2)} USD`, 350, tableTop + 20);

    // Coordonnées bancaires
    doc
      .fontSize(10)
      .text('Coordonnées bancaires', 50, tableTop + 60)
      .text('SMARTCONGO SARLU', 50, tableTop + 75)
      .text('Banque : EquityBCDC', 50, tableTop + 90)
      .text('Compte N° : 00011050377200024765485', 50, tableTop + 105);

    // Finalisation du document PDF
    doc.end();

    // Retourner le chemin du PDF généré
    return pdfPath;
  }
}