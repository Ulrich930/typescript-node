import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GenerateInvoiceService from 'App/Services/GenerateInvoiceService';

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
}