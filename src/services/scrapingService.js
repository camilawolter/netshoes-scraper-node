const NetshoesScraper = require('../infrastructure/scraping/netshoesScraper');
const PDFReport = require('../infrastructure/reporting/pdfReport');
const config = require('../config');

class ScrapingService {
  constructor() {
    this.scraper = new NetshoesScraper();
  }

  async scrapeAndReport(productUrl) {
    console.log("Iniciando processo de scraping e geração de relatório...");

    const product = await this.scraper.scrapeProduct(productUrl);

    if (product) {
      console.log("\n--- INFORMAÇÕES DO PRODUTO EXTRAÍDAS ---");
      console.log(`Título: ${product.title}`);
      console.log(`Preço: ${product.price}`);
      console.log("------------------------------------------\n");

      // Gera um nome de arquivo seguro a partir do título do produto
      const safeFileName = product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const reportFileName = `${config.reporting.outputDir}${config.reporting.reportPrefix}${safeFileName}.pdf`;
      const report = new PDFReport(reportFileName);

      console.log("Adicionando produto ao relatório PDF...");
      report.addTitlePage();
      report.addProductPage(product);
      report.finalize();
    } else {
      console.log("Não foi possível extrair as informações do produto. Nenhum relatório será gerado.");
    }
  }
}

module.exports = ScrapingService;
