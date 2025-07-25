class Product {
  /**
   * @param {string} title
   * @param {string} price
   * @param {string} imageUrl
   * @param {string} description
   * @param {Buffer} imageBuffer
   * @param {string} customerRating
   * @param {string} recommendationPercentage
   */
  constructor(title, price, imageUrl, description, imageBuffer, customerRating, recommendationPercentage) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.imageBuffer = imageBuffer;
    this.customerRating = customerRating;
    this.recommendationPercentage = recommendationPercentage;
  }
}

module.exports = Product;
