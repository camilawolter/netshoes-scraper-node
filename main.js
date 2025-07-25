const ScrapingService = require('./src/services/scrapingService');
const config = require('./src/config');

async function main() {
  console.log('🚀 Aplicação iniciada!');
  
  const productUrl = config.scraping.targetUrl;
  
  const scrapingService = new ScrapingService();
  
  await scrapingService.scrapeAndReport(productUrl);

  console.log('✅ Processo finalizado com sucesso.');
}

main().catch(error => {
  console.error("Ocorreu um erro inesperado no processo principal:", error);
});
