import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GenerateInvoiceService from 'App/Services/GenerateInvoiceService';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import PdfPrinter from 'pdfmake'
import InvoiceGenerator from '../../Services/invoiceService'
import { sampleInvoiceData } from '../../Services/invoiceData'

import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);


export default class InvoiceController {
  public async generate({ request, response }: HttpContextContract) {
    const { recipient, products } = request.only(['recipient', 'products']);

    // Calculez les totaux
    const total_ht = products.reduce((sum, p) => sum + p.price_ht * p.quantity, 0);
    const total_ttc = products.reduce((sum, p) => sum + p.price_ttc * p.quantity, 0);

    // Créez l'objet facture
    const invoice = {
      id: Date.now(),
      recipient,
      total_ht,
      total_ttc,
    };

    // Utilisez le service pour générer le PDF
    const pdfPath = await GenerateInvoiceService.generatePDF(invoice, products);

    // Retourner le PDF généré
    return response.download(pdfPath);
  }


  public async generateInvoice({ response }: HttpContextContract) {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      })
  
      // Définir le chemin où enregistrer le PDF
      const pdfPath = path.join(__dirname, '../../../public/invoices/devis-2.pdf');
      const stream = fs.createWriteStream(pdfPath);

      // Lier le flux de PDF au fichier
      doc.pipe(stream);
  
      
  
      // Add company logo
      doc.image('public/logo.jpg', 50, 45, { width: 50 })
      
      // Add company info
      doc.fontSize(20).text('INVOICE', 50, 50)
      doc.fontSize(10).text('Company Name', 50, 80)
      doc.text('123 Business Street', 50, 95)
      doc.text('City, Country', 50, 110)
      doc.text('Phone: (123) 456-7890', 50, 125)
  
      // Add invoice details
      doc.fontSize(10)
        .text('Invoice Number: INV-001', 400, 80)
        .text('Date: ' + new Date().toLocaleDateString(), 400, 95)
        .text('Due Date: ' + new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString(), 400, 110)
  
      // Add client info
      doc.fontSize(10)
        .text('Bill To:', 50, 170)
        .text('Client Name', 50, 185)
        .text('Client Address', 50, 200)
        .text('City, Country', 50, 215)
  
      // Add table headers
      const tableTop = 270
      doc.fontSize(10)
        .text('Description', 50, tableTop)
        .text('Quantity', 280, tableTop)
        .text('Unit Price', 350, tableTop)
        .text('Amount', 450, tableTop)
  
      // Add line
      doc.moveTo(50, tableTop + 15)
         .lineTo(550, tableTop + 15)
         .stroke()
  
      // Add items
      const items = [
        { description: 'Item 1', quantity: 2, price: 100 },
        { description: 'Item 2', quantity: 1, price: 200 },
      ]
  
      let position = tableTop + 30
      let subtotal = 0
  
      items.forEach(item => {
        const amount = item.quantity * item.price
        subtotal += amount
  
        doc.text(item.description, 50, position)
           .text(item.quantity.toString(), 280, position)
           .text(item.price.toFixed(2), 350, position)
           .text(amount.toFixed(2), 450, position)
  
        position += 20
      })
  
      // Add totals
      const tax = subtotal * 0.1 // 10% tax
      const total = subtotal + tax
  
      position = position + 20
      doc.text('Subtotal:', 350, position)
         .text(subtotal.toFixed(2), 450, position)
      
      position = position + 20
      doc.text('Tax (10%):', 350, position)
         .text(tax.toFixed(2), 450, position)
      
      position = position + 20
      doc.fontSize(12)
         .text('Total:', 350, position)
         .text(total.toFixed(2), 450, position)
  
      // Add footer
      doc.fontSize(10)
         .text('Thank you for your business!', 50, 700)
  
      // Finalize the PDF
      doc.end()
      
      return response.download(pdfPath);
    }
  
  public async invoice({ response }: HttpContextContract) {
    
  }

  public async pdf({ response }: HttpContextContract) {
    /*var docDefinition = {
      content: [
        { text: 'This is a header', style: 'header' },
        'No styling here, this is a standard paragraph',
        { text: 'Another text', style: 'anotherStyle' },
        { text: 'Multiple styles applied', style: [ 'header', 'anotherStyle' ] }
      ],
    
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      }
    };*/
    const fonts = {
      Roboto: {
        normal: 'public/fonts/roboto/Roboto-Regular.ttf',
        bold: 'public/fonts/roboto/Roboto-Medium.ttf',
        italics: 'public/fonts/roboto/Roboto-Italic.ttf',
        bolditalics: 'public/fonts/roboto/Roboto-MediumItalic.ttf'
      }
    }

    //const printer = new PdfPrinter(fonts)
    const generator = new InvoiceGenerator(sampleInvoiceData)
    const docDefinition = generator.generateDefinition()

    try {
      const buffer = await this.generatePdfBuffer(docDefinition);
      //const buffer = printer.createPdfKitDocument(docDefinition)
      console.log(buffer)
      response.header('Content-Type', 'application/pdf');
      response.header('Content-Disposition', 'attachment; filename=file.pdf');
      response.send(buffer);
    } catch (error) {
      console.error('Error during PDF generation:', error);
      response.status(500).send('An error occurred while generating the PDF.');
    }
  }

  private generatePdfBuffer(docDefinition: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBuffer((buffer) => {
        if (buffer) {
          resolve(Buffer.from(buffer));
        } else {
          reject(new Error('Failed to generate PDF buffer'));
        }
      });
    });
  }

  /*public async pdf({ response }: HttpContextContract) {
    const fonts = {
      Roboto: {
        normal: 'public/fonts/roboto/Roboto-Regular.ttf',
        bold: 'public/fonts/roboto/Roboto-Medium.ttf',
        italics: 'public/fonts/roboto/Roboto-Italic.ttf',
        bolditalics: 'public/fonts/roboto/Roboto-MediumItalic.ttf'
      }
    }

    const printer = new PdfPrinter(fonts)
    const generator = new InvoiceGenerator(sampleInvoiceData)
    const docDefinition = generator.generateDefinition()

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const chunks: Buffer[] = [] // Explicitly type the array as Buffer[]

    pdfDoc.on('data', chunk => chunks.push(chunk))
    pdfDoc.on('error', error => console.error('PDF generation error:', error))
    pdfDoc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks)

        console.log('PDF buffer generated, size:', pdfBuffer.length)
        pdfBuffer.write('../../../public/invoices/devis-2.pdf')
        response.header('Content-Type', 'application/pdf')
        response.header('Content-Disposition', 'attachment; filename=devis.pdf')
        response.download('../../../public/invoices/devis-2.pdf');
        response.send(pdfBuffer)
    })

    pdfDoc.end()
}*/


}
