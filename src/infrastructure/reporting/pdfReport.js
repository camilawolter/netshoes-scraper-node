const fs = require('fs');
const PDFDocument = require('pdfkit');

class PDFReport {
  /**
   * @param {string} filePath O caminho onde o PDF será salvo.
   */
  constructor(filePath) {
    this.filePath = filePath;
    this.doc = new PDFDocument({ margin: 50, size: 'A4', autoFirstPage: false });
    this.doc.pipe(fs.createWriteStream(this.filePath));
  }

  addTitlePage() {
    this.doc.addPage();
    this.doc.fontSize(24).text('Relatório de Produtos - Netshoes', { align: 'center' });
    this.doc.moveDown(2);
    this.doc.fontSize(12).text(`Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, { align: 'center' });
  }

  /**
   * Adiciona uma página ao PDF com os dados de um produto.
   * @param {import('../../domain/entities/product')} product O objeto do produto.
   */
  addProductPage(product) {
    this.doc.addPage();

    this.doc.fontSize(18).fillColor('blue').text(product.title, { underline: true });
    this.doc.moveDown();

    this.doc.fontSize(16).fillColor('green').text(product.price);
    this.doc.moveDown(1.5);

    if (product.customerRating && product.recommendationPercentage) {
      this.doc.fontSize(12).fillColor('black').text('Avaliação dos Clientes: ', { continued: true }).fillColor('orange').text(product.customerRating);
      this.doc.fontSize(12).fillColor('black').text('Recomendação: ', { continued: true }).fillColor('orange').text(`${product.recommendationPercentage}%`);
      this.doc.moveDown(1.5);
    }

    if (product.imageBuffer) {
      try {
        this.doc.image(product.imageBuffer, {
          fit: [450, 250],
          align: 'center'
        });
        this.doc.moveDown();
      } catch (e) {
        console.error("Erro ao adicionar imagem ao PDF. A imagem pode estar corrompida ou em formato inválido.");
        this.doc.fillColor('red').text('Erro ao carregar imagem do produto.', { align: 'center' });
      }
    }

    this.doc.fontSize(10).fillColor('black').text('Descrição:', { underline: true });
    this.doc.moveDown(0.5);
    this.doc.fontSize(10).text(product.description, { align: 'justify' });
  }

  finalize() {
    console.log("Finalizando a criação do PDF...");
    this.doc.end();
    console.log(`Relatório salvo em: ${this.filePath}`);
  }
}

module.exports = PDFReport;
