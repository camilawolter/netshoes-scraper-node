const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../../domain/entities/product');
const config = require('../../config');

class NetshoesScraper {
  constructor() {
    this.headers = config.scraping.headers;
  }

  async scrapeProduct(productUrl) {
    try {
      console.log(`- Extraindo dados de: ${productUrl}`);
      const { data } = await axios.get(productUrl, { headers: this.headers });
      const $ = cheerio.load(data);

      const title = $('h1.product-name').text().trim();
      let price = $('div.price-box__saleInCents .saleInCents-value').first().text().trim() ||
                  $('div.price-box__saleInCents').first().text().trim() ||
                  $('div.price-box__listInCents').first().text().trim();

      const description = $('p.features--description').text().trim();
      const imageUrl = $('img.carousel-item-figure__image').first().attr('src');
      const customerRating = $('div.reviews-header__rating__big-number').eq(0).text().trim();
      const recommendationText = $('div.reviews-header__rating__big-number').eq(1).text().trim();
      const recommendationPercentage = recommendationText.replace('%', '').trim() || 'N/A';

      const imageBuffer = imageUrl ? await this._downloadImage(imageUrl) : null;

      if (!title || !price) {
        console.warn(`-- Produto em ${productUrl} não possui título ou preço. Verifique os seletores.`);
        return null;
      }

      return new Product(title, price, imageUrl, description, imageBuffer, customerRating, recommendationPercentage);

    } catch (error) {
      console.error(`Falha ao processar a URL ${productUrl}: ${error.message}`);
      return null;
    }
  }

  async _downloadImage(imageUrl) {
    try {
      const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
      console.log(`-- Baixando imagem de: ${fullImageUrl}`);
      const response = await axios({
        method: 'get',
        url: fullImageUrl,
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao baixar a imagem ${imageUrl}: ${error.message}`);
      return null;
    }
  }
}

module.exports = NetshoesScraper;
