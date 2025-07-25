module.exports = {
    scraping: {
        // Altere a URL aqui para testar outros produtos
        targetUrl: 'https://www.netshoes.com.br/p/tenis-adidas-breaknet-masculino-NQQ-4378-890',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    },
    reporting: {
        reportPrefix: 'relatorio_produto_',
        outputDir: './' // Salva na raiz do projeto
    }
};
