# ASSYRIA

Sistema web de processamento de dados para construção de análises espaciais.

## 👀 Demo

Para experimentar o sistema em ação, acesse a versão de demonstração [clicando aqui](https://spatialworkspace.netlify.app/).

## 📌 Módulos

O sistema está dividido em 10 módulos, são eles:

    - [Map](#map)
    - [Example of Distance Between Two Points](#example-of-distance-between-two-points)
    - [Example of Fractal Dimension Calculation](#example-of-fractal-dimension-calculation)
    - [Massive Fractal Dimension Calculation](#massive-fractal-dimension-calculation)
    - [Associate Regions](#associate-regions)
    - [Search Regions](#search-regions)
    - [Associates CRS with City](#associates-crs-with-city)
    - [Example of Address Geocoding](#example-of-address-geocoding)
    - [Bulk Geocoding of Address](#bulk-geocoding-of-address)
    - [Number of Cases Counter](#number-of-cases-counter)

### Map

Nesta interface é possível importar dados georreferenciados de um arquivo .xslx para visualização dinâmica dos eventos (lat & lng) no mapa.

![App Screenshot](https://i.imgur.com/j6Xqh8J.png)

### Example of Distance Between Two Points

Esta interface exemplifica a distância angular entre 2 eventos. Clicando sobre o mapa é possível alterar o local dos eventos (origem e destino). Automaticamente é calculada a distância angular e em quilômetros entre os eventos.

![App Screenshot](https://i.imgur.com/5qwDpfk.png)

### Example of Fractal Dimension Calculation

Esta interface exemplifica o cálculo da dimensão fractal entre _n_ pares de eventos. É possível clicar no mapa, a cada click é adicionado um novo evento. Dinamicamente é calculada a dimensão fractal dos eventos sobre o mapa. Também, é possível variar a distância angular entre os eventos no input slider.

![App Screenshot](https://i.imgur.com/L31Q0LT.png)

### Massive Fractal Dimension Calculation

Nesta interface é possível calcular a dimensão fractal de um conjunto de dados georreferenciados. Para calcular a dimensão fractal você deve anexar um arquivo de dados .xslx e selecionar as colunas que representam as coordenadas geográficas (lat & lng). Após isso você deve escolher uma área de interesse para que o cálculo possa ser realizado de modo comparativo entre as áreas. Também, é possível realizar um filtro sobre os dados, exemplo: registros de uma determinada raça ou doença. Dinamicamente é calculada a dimensão fractal e apresentada na tabela ao lado. Variações entre a distância dos eventos pode ser realiza no input slide. Clicando no botão "submit" é possível realizar o download das informações apresentadas na tabela.

![App Screenshot](https://i.imgur.com/eMeRtPl.png)

### Associate Regions

Nesta interface é possível associar as regiões do IBGE às cidades do seu conjunto de dados. Para realizar a associação você deve selecionar a Unidade Federativa (UF) da sua região. Ao selecionar, dinamicamente é recuperada, a partir da API de localidades do IBGE, todas as cidades da UF selecionada com as regiões em que elas pertencem. Após selecionada a área de interesse, é possível anexar um arquivo de dados .xlsx. É necessário selecionar a coluna que representa a cidade dos seus registros para que a associação seja realizada. Clicando no botão "submit" é feito o download de um arquivo .xslx com a associação entre as cidades e regiões.

Obs.: as associações geradas facilitam a construção de mapas temáticos no QGIS e ArcGIS.

![App Screenshot](https://i.imgur.com/Jnlho7u.png)

### Search Regions

Nesta interface é possível filtrar cidades de uma Unidade Federativa (UF) específica e visualizar suas regiões.

![App Screenshot](https://i.imgur.com/88z121J.png)

### Associates CRS with City

Nesta interface é possível associar as Coordenadorias Regionais de Saúde do Rio Grande do Sul às cidades do seu conjunto de dados. Para realizar a associação é necessário anexar um arquivo de dados .xlsx e selecionar a coluna que representa a cidade dos seus registros. Clicando no botão “submit” é feito o download de um arquivo .xlsx com a associação realizada.

![App Screenshot](https://i.imgur.com/A7jxsID.png)

### Example of Address Geocoding

Esta interface exemplifica o georreferenciamento de um registro. Para realizar o georreferenciamento é necessário o endereço completo de uma localidade. Ao digitar o endereço e clicar no botão "submit" é enviada uma requisição ao serviço de Geocodificação do Google Maps API. Os dados retornados da API são tratados localmente e apresentados ao usuários de forma organizada na seguinte estrutura: endereço formatado, latitude, longitude, nome da rua, número da casa, bairro, cidade, estado e cep.

![App Screenshot](https://i.imgur.com/vimWSSB.png)

### Bulk Geocoding of Address

Nesta interface é possível realizar o georreferenciamento em massa de registros. Para realizar o georreferenciamento é necessário anexar um arquivo de dados .xlsx, selecionar a coluna que representa o endereço dos registros e selecionar a coluna que identifica os registros (esta coluna tem por finalidade a organização dos registros). Ao clicar no botão "submit", o georreferenciamento dos registros será iniciado. Após o termino, automaticamente será realizado o download de um arquivo .xslx com os registros georreferenciados. No arquivo .xslx haverá 2 folhas, uma com os registros que possivelmente obtiveram falha no georreferenciamento e outra folha com os registros que obtiveram sucesso.

![App Screenshot](https://i.imgur.com/yfuK63A.png)

### Number of Cases Counter

Nesta interface é possível contar o número de registros automaticamente por área específica. Para realizar a contagem é necessário anexar um arquivo de dados .xlsx e selecionar a área de interesse para contagem. Os dados de contagem serão apresentados na tabela ao lado. Se necessário, também é possível realizar uma filtragem sobre os dados. Se clicado em "submit", é realizado o download dos dados apresentados em um arquivo .xslx.

![App Screenshot](https://i.imgur.com/C5zXRnR.png)

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [reactjs](https://reactjs.org)
- [axios](https://github.com/axios/axios)
- [xlsx](https://www.npmjs.com/package/xlsx)
- [excel4node](https://www.npmjs.com/package/excel4node)
- [prismjs](https://prismjs.com/)
- [styled-components](https://styled-components.com)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/)
- [material-ui](https://material-ui.com/)
- [vs code][vc]

## ℹ️ Executando

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [Node.js v12.13][nodejs] ou superior + [Yarn v1.19][yarn] ou superior instalado no seu computador.

Na sua linha de comando execute:

```bash
# Clonando este repositório
$ git clone https://augustocesarfmo@bitbucket.org/augustocesarfmo/thesis-web.git

# Acessando o repositório
$ cd thesis-web

# Instalando as dependências
$ yarn install

# Executando o app
$ yarn start
```

## 📝 Licença

Este projeto está sob a licença MIT. Consulte a [LICENÇA](https://github.com/augustocesarfmo/assyria/blob/main/LICENSE.md) para obter mais informações.

---

by Augusto César Oliveira 👐🏼

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
