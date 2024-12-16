import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { InvoiceData } from './invoiceData'
import * as fs from 'fs'
import * as path from 'path'

export default class InvoiceGenerator {
  private data: InvoiceData
  private fonts = {
    Roboto: {
      normal: 'public/fonts/roboto/Roboto-Regular.ttf',
      bold: 'public/fonts/roboto/Roboto-Medium.ttf',
      italics: 'public/fonts/roboto/Roboto-Italic.ttf',
      bolditalics: 'public/fonts/roboto/Roboto-MediumItalic.ttf'
    }
  }

  constructor(data: InvoiceData) {
    this.data = data
  }

  private getLogoBase64(): string {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png')
    const logoBase64 = fs.readFileSync(logoPath).toString('base64')
    return `data:image/png;base64,${logoBase64}`
  }

  private getTableBody() {
    const headers = [
      { text: 'Code', style: 'tableHeader' },
      { text: 'Produit / Service', style: 'tableHeader' },
      { text: 'Quantité', style: 'tableHeader', alignment: 'center' },
      { text: 'TVA(%)', style: 'tableHeader', alignment: 'center' },
      { text: 'Prix unit. HT', style: 'tableHeader', alignment: 'right' },
      { text: 'Prix unit. TTC', style: 'tableHeader', alignment: 'right' },
      { text: 'Total HT', style: 'tableHeader', alignment: 'right' },
      { text: 'Total TTC', style: 'tableHeader', alignment: 'right' }
    ]

    const rows = this.data.items.map(item => [
      item.code,
      item.description,
      { text: item.quantity.toString(), alignment: 'center' },
      { text: item.tva, alignment: 'center' },
      { text: item.priceHT.toFixed(2), alignment: 'right' },
      { text: item.priceTTC.toFixed(2), alignment: 'right' },
      { text: item.totalHT.toFixed(2), alignment: 'right' },
      { text: item.totalTTC.toFixed(2), alignment: 'right' }
    ])

    return [headers, ...rows]
  }

  public generateDefinition(): TDocumentDefinitions {
    return {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: [
            {
                columns: [
                    {
                        width: '40%',
                        text: ''
                    },
                    {
                        width: '20%',
                        image: this.getLogoBase64(), // Adjust as needed for your image encoding method
                        width: 100,
                        alignment: 'center'
                    },
                    {
                        width: '40%',
                        text: ''
                    }
                ]
            },
            { text: '\n\n' },
            {
                table: {
                    widths: ['45%', '10%', '45%'],
                    body: [
                        [
                            {
                                stack: [
                                    {
                                        table: {
                                            widths: ['*'],
                                            //padding: [0, 0, 0, 0],
                                            body: [
                                                [
                                                    { 
                                                        text: this.data.sender.name , 
                                                        bold: true, 
                                                        fillColor: '#00FF00', // Background vert
                                                        margin: [0, 0, 0, 0] // Marges autour du texte
                                                    }
                                                ],
                                                [
                                                    {
                                                        stack: [
                                                            this.data.sender.address + '\n',
                                                            this.data.sender.city + '\n',
                                                            this.data.sender.phone + '\n',
                                                            this.data.sender.email + '\n',
                                                            this.data.sender.website + '\n',
                                                            `N° TVA : ${this.data.sender.tva}\n`,
                                                            `Code NAF : ${this.data.sender.naf}\n`,
                                                            `RCCM : ${this.data.sender.rccm}\n`
                                                        ],
                                                        fillColor: '#E0E0E0', // Background gris
                                                        margin: [5, 5, 5, 5] // Marges autour du texte
                                                    }
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders'
                                    }
                                ],
                                
                                //fillColor: '#E0E0E0', // Background gris
                                //padding: [0, 0, 0, 0],
                            },
                            { 
                                text: '', 
                                  },
                            {
                                stack: [
                                    {
                                        table: {
                                            widths: ['*'],
                                            //padding: [0, 0, 0, 0],
                                            body: [
                                                [
                                                    { 
                                                        text: 'Destinataire\n', 
                                                        bold: true, 
                                                        fillColor: '#00FF00', // Background vert
                                                        margin: [0, 0, 0, 0] // Marges autour du texte
                                                    }
                                                ],
                                                [
                                                    {
                                                        stack: [
                                                            this.data.recipient.name + '\n',
                                                            this.data.recipient.address + '\n',
                                                            this.data.recipient.city + '\n'
                                                        ],
                                                        fillColor: '#E0E0E0', // Background gris
                                                        margin: [5, 5, 5, 5] // Marges autour du texte
                                                    }
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders'
                                    }
                                ],
                                //fillColor: '#E0E0E0', // Background gris
                                //padding: [0, 0, 0, 0],
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            { text: '\n' },
            {
                columns: [
                    {
                        width: '50%',
                        text: { text: `Devis N° : ${this.data.invoiceNumber}`, bold: true, fontSize: 12, alignment: 'left' }
                    },
                    {
                        width: '50%',
                        text: { text: `Date du devis : ${this.data.date}`, bold: true, fontSize: 7, alignment: 'right' }
                    }
                ]
            },
            { text: '\n' },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: this.getTableBody()
                }, 
                layout: { 
                    fillColor: (rowIndex) => { 
                        return rowIndex % 2 === 0 ? '#FFFFFF' : '#F0F0F0'; 
                    } 
                }
            },
            { text: '\n' },
            {
                columns: [
                    {
                        width: '*',
                        text: [
                            { text: 'TOTAL : ', bold: true, fillColor: '#E0E0E0' },
                            `${this.data.totalHt} USD`,
                            '\n',
                            /*{ text: 'TVA : ', bold: true, fillColor: '#E0E0E0' },
                            `${this.data.tva} USD`,
                            '\n',
                            { text: 'Total TTC : ', bold: true, fillColor: '#E0E0E0'},
                            `${this.data.totalTtc} USD`,*/
                        ],
                        alignment: 'right',
                    },
                ],
            },
            { text: '\n\n',
            margin: 40
             },
            
            {
                table: 
                {
                    widths: ['50%', '50%'],
                    body: [
                        [
                            {
                                stack: [
                                    { text: 'Signature expéditeur', bold: true, margin: [0, 10, 0, 5] },
                                    { image: this.getLogoBase64(), width: 100 }, // Adjust as needed for your signature image
                                ]
                            },
                            { 
                                text: '', 
                            },
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Coordonnées bancaires', bold: true, margin: [0, 40, 0, 5] },
                                    { text: 'Company: SMARTCONGO SARLU' },
                                    { text: 'Bank: EquityBCDC' },
                                    { text: 'Account Number: 00011050377200024765485' }
                                ]
                            },
                            { 
                                text: '', 
                            },
                        ]
                    ]
                },
                layout: 'noBorders',
                //relativePosition: { x: 40, y: 400 },
            }
        ],
        footer: (currentPage, pageCount) => {
            return {
                columns: [
                    {
                        width: '50%',
                        text: `Date de génération : 19/08/2024 16:03`
                    },
                    {
                        width: '50%',
                        text: `Page ${currentPage} of ${pageCount}`,
                        alignment: 'right'
                    }
                ],
                margin: [40, 10, 40, 0]
            };
        },
        styles: {
            tableHeader: {
                bold: true,
                fontSize: 10,
                fillColor: '#00FF00'
            }
        },
        defaultStyle: {
            fontSize: 10
        }
    };
  }
}