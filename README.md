# 🛍️ Scraper de Produtos da Netshoes

Este projeto é um web scraper desenvolvido em Node.js que extrai informações de uma página de um produto da Netshoes e gera um relatório em PDF.

O projeto é estruturado utilizando uma **arquitetura em camadas** (Domain, Services, Infrastructure) para promover a separação de responsabilidades, facilitar a manutenção e aumentar a testabilidade do código, seguindo princípios de Orientação a Objetos.

## 🏛️ Arquitetura do Projeto

A estrutura de pastas foi desenhada para separar claramente as responsabilidades de cada parte do sistema:

```
.
├── src/
│   ├── domain/        # O coração do negócio, contém as entidades.
│   ├── services/      # Orquestra as operações e a lógica da aplicação.
│   ├── infrastructure/  # Implementações que conectam com o mundo exterior (API, arquivos).
│   └── config/        # Arquivos de configuração.
│
├── main.js            # Ponto de entrada da aplicação.
├── package.json       # Dependências e scripts do projeto.
└── README.md
```

  * **`domain`**: Contém as regras de negócio e entidades puras (ex: `Product`), sem dependências externas.
  * **`infrastructure`**: Contém o código que interage com tecnologias externas, como o scraper (`cheerio`, `axios`) e o gerador de relatórios (`pdfkit`).
  * **`services`**: Orquestra o fluxo de dados entre a infraestrutura e o domínio.
  * **`config`**: Centraliza todas as configurações, como URLs e chaves, para fácil alteração sem mexer na lógica.

## ⚙️ Tecnologias Utilizadas

  * **[Node.js](https://nodejs.org/)**: Ambiente de execução para o JavaScript.
  * **[Axios](https://axios-http.com/)**: Cliente HTTP para fazer as requisições web.
  * **[Cheerio](https://cheerio.js.org/)**: Ferramenta para manipular o HTML recebido.
  * **[PDFKit](http://pdfkit.org/)**: Biblioteca para a criação de documentos PDF.

-----

## 🚀 Como Executar e Testar

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### 1\. Pré-requisitos

Certifique-se de ter o **Node.js** (versão 14 ou superior) e o **npm** instalados.

### 2\. Instalação

Primeiro, clone o repositório e navegue até o diretório do projeto:

```bash
git clone git@github.com:camilawolter/netshoes-scraper-node.git
cd netshoes-scraper-node
```

Em seguida, instale as dependências listadas no `package.json`:

```bash
npm install
```

### 3\. Execução

Para iniciar o script de scraping e geração de relatório, execute o seguinte comando no terminal:

```bash
node main.js
```

Ao executar, o console exibirá o progresso do processo. Ao final, um arquivo PDF (ex: `relatorio_produto_tenis_adidas_breaknet_masculino.pdf`) será gerado na raiz do projeto.

### 4\. Como Testar

O teste funcional do projeto consiste em alterar o produto a ser analisado e verificar se o relatório é gerado corretamente.

Siga os passos:

1.  **Abra o arquivo de configuração** localizado em:
    `src/config/index.js`

2.  **Altere o valor** da propriedade `targetUrl` para a URL do novo produto da Netshoes que você deseja testar.

    ```javascript
    // src/config/index.js

    module.exports = {
        scraping: {
            // Altere a URL nesta linha
            targetUrl: 'https://www.netshoes.com.br/p/outro-produto-que-voce-quer-testar',
            // ...
        },
        // ...
    };
    ```

3.  Salve o arquivo `index.js`.

4.  Execute o projeto novamente com `node main.js`.

5.  Verifique o console para acompanhar o processo e abra o novo arquivo PDF gerado para confirmar se as informações (título, preço, imagem, etc.) correspondem ao novo produto.

-----
