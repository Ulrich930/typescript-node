export interface InvoiceItem {
    code: string
    description: string
    quantity: number
    tva: string
    priceHT: number
    priceTTC: number
    totalHT: number
    totalTTC: number
  }
  
  export interface InvoiceData {
    items: InvoiceItem[]
    date: string
    invoiceNumber: string,
    totalHt: number,
    tva: number,
    totalTtc: number
    sender: {
      name: string
      address: string
      city: string
      phone: string
      email: string
      website: string
      tva: string
      naf: string
      rccm: string
    }
    recipient: {
      name: string
      address: string
      city: string
    }
  }
  
  export const sampleInvoiceData: InvoiceData = {
    date: '14/08/2024',
    invoiceNumber: 'Proforma',
    totalHt: 12000,
    tva: 4500,
    totalTtc: 13000,
    sender: {
      name: 'SMARTCONGO SARLU',
      address: '129 Bis Avenue de l\'école, Quartier Brikin, Ngaliema',
      city: '012 Kinshasa - République Démocratique du Congo',
      phone: '+243893795899 , +243840850257',
      email: 'services@smartcongo.com',
      website: 'www.smartcongo.com',
      tva: 'A1918495A',
      naf: '01-H6300-N51469R',
      rccm: '19-B-01785'
    },
    recipient: {
      name: 'GIZ LOT 1',
      address: 'Kinshasa',
      city: 'République Démocratique du Congo'
    },
    items: [
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      },
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      },
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      },
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      },
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      },
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      },
      {
        code: '000599',
        description: 'Batterie Lithium BYD Flex 5.0 KWh/48V',
        quantity: 3,
        tva: '-',
        priceHT: 2090.00,
        priceTTC: 2090.00,
        totalHT: 6270.00,
        totalTTC: 6270.00
      },
      {
        code: '000600',
        description: 'Panneau solaire GoSolar 450V',
        quantity: 7,
        tva: '-',
        priceHT: 240.00,
        priceTTC: 240.00,
        totalHT: 1680.00,
        totalTTC: 1680.00
      },
      {
        code: '000601',
        description: 'Regulateur de charge BlueSolar MPPT 150/70',
        quantity: 1,
        tva: '-',
        priceHT: 699.00,
        priceTTC: 699.00,
        totalHT: 699.00,
        totalTTC: 699.00
      }
    ]
  }