import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);


export default class GenerateInvoiceService {
  public static generatePDF1(invoice, products) {
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
  
  public static generatePDF(invoice, products2) {
    // Créer un nouveau document PDF
    const doc = new PDFDocument({ size: 'A4', margin: 30 })

    // Définir le chemin où enregistrer le PDF
    const pdfPath = path.join(__dirname, '../../public/invoices/devis-' + invoice.id + '.pdf');
    const stream = fs.createWriteStream(pdfPath);

    // Lier le flux de PDF au fichier
    doc.pipe(stream);


    // --- En-tête ---
    doc.fontSize(16).text('SMARTCONGO SARLU', { align: 'center', underline: true })
    doc.fontSize(10).text('129 Bis Avenue de l’école, Quartier Brikin, Ngaliema', { align: 'center' })
    doc.text('Kinshasa - République Démocratique du Congo', { align: 'center' })
    doc.text('N° TVA : A1918495A | services@smartcongo.com | www.smartcongo.com', { align: 'center' })
    doc.moveDown()

    doc.fontSize(12).text(`Devis N° : Proforma`, 50, 150)
    doc.text(`Date du devis : 14/08/2024`, 50, 170)

    doc.moveDown()

    // --- Tableau des produits ---
    doc.fontSize(10)
    doc.text('Produits/Services', 50, 220)
    const tableStartY = 250

    // En-tête de la table
    doc.font('Helvetica-Bold')
    const tableHeaders = ['Code Produit', 'Désignation', 'Quantité', 'Prix Unit. HT', 'Total HT']
    const columnWidths = [100, 150, 70, 80, 80]
    let x = 50

    tableHeaders.forEach((header, i) => {
      doc.text(header, x, tableStartY)
      x += columnWidths[i]
    })

    // Contenu de la table
    doc.font('Helvetica')
    const products = [
      { code: '000599', description: 'Batterie Lithium BYD Flex 5.0 kWh/48V', qty: 3, unitPrice: 2090, total: 6270 },
      { code: '000600', description: 'Panneau solaire GoSolar 450V', qty: 7, unitPrice: 240, total: 1680 },
      { code: '000601', description: 'Regulateur de charge BlueSolar MPPT 150/70', qty: 1, unitPrice: 699, total: 699 },
      // Ajoutez le reste des produits...
    ]

    let y = tableStartY + 20
    products.forEach((product) => {
      x = 50
      doc.text(product.code, x, y, { width: columnWidths[0], ellipsis: true })
      x += columnWidths[0]
      doc.text(product.description, x, y, { width: columnWidths[1], ellipsis: true })
      x += columnWidths[1]
      doc.text(product.qty.toString(), x, y, { width: columnWidths[2], ellipsis: true })
      x += columnWidths[2]
      doc.text(product.unitPrice.toFixed(2), x, y, { width: columnWidths[3], ellipsis: true })
      x += columnWidths[3]
      doc.text(product.total.toFixed(2), x, y, { width: columnWidths[4], ellipsis: true })
      y += 20
    })

    // Total général
    doc.text('Total : 13 587.44 USD', 400, y + 30, { align: 'right' })

    // --- Pied de page ---
    doc.fontSize(10)
    doc.text('Coordonnées bancaires :', 50, y + 70)
    doc.text('SMARTCONGO SARLU | Banque : EquityBCDC | Compte N° : 00011050377200024765485', 50, y + 90)

    doc.text('Signature expéditeur :', 50, y + 120)

    // Fin et sauvegarde du document
    doc.end()

    // Retourner le chemin du PDF généré
    return pdfPath;
  }
}
