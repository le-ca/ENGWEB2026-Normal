# Exame ENGWEB2026 - Normal

## Exercício 1: API de Jogos de Tabuleiro

### Persistência e Setup da Base de Dados
A persistência foi garantida utilizando o MongoDB orquestrado via Docker Compose. Os dados originais do ficheiro `jogos.json` foram importados para a base de dados `jogostabuleiro` na coleção `jogos` usando um script dedicado em Node.js (`importData.js`), que utiliza o Mongoose para inserir os dados no contentor após este estar a correr.

### Como Executar
1. Navegar para a pasta `ex1` no terminal.
2. Levantar os serviços: `docker compose up --build -d`
3. Executar o script de importação de dados: `node importData.js`
4. A API ficará exposta em `http://localhost:17000`. 
5. A interface interativa Swagger está disponível em `http://localhost:17000/api-docs`.

### Respostas Textuais (Queries do ponto 1.2)
*(Estas queries também se encontram no ficheiro `ex1/queries.txt`)*

**1. Quantos jogos estão registados na base de dados?**
`db.jogos.countDocuments()`

**2. Quantos jogos pertencem à categoria "Family"?**
`db.jogos.countDocuments({ category: "Family" })`

**3. Qual a lista de autores (ordenada alfabeticamente e sem repetições)?**
`db.jogos.distinct("autores.name").sort()`

**4. Qual a distribuição de jogos por ano de lançamento?**
`db.jogos.aggregate([{ $group: { _id: "$year", total: { $sum: 1 } } }, { $sort: { _id: 1 } }])`

**5. Qual a distribuição de jogos por editora?**
`db.jogos.aggregate([{ $unwind: "$editoras" }, { $group: { _id: "$editoras.name", total: { $sum: 1 } } }, { $sort: { total: -1 } }])`

---

## Exercício 2: Engenharia Reversa - A Minha Lista de Leituras

### Persistência e Setup da Base de Dados
O modelo de dados foi desenhado no Mongoose para suportar as operações detetadas no frontend (`titulo`, `autor`, `paginas`, `genero`, e o estado booleano `lido`). O MongoDB foi configurado no `docker-compose.yml` de forma isolada, sem exposição de portas para o exterior. O dataset inicial (`dataset_livros.json`) é importado através do `mongoimport` diretamente na rede interna do contentor.

### Como Executar
1. Navegar para a pasta `ex2` no terminal.
2. Levantar a infraestrutura: `docker compose up --build -d`
3. Popular a base de dados copiando o ficheiro json e executando o import no contentor isolado através destes dois comandos:
   * `docker cp dataset_livros.json mongodb_ex2:/tmp/dataset_livros.json`
   * `docker exec -it mongodb_ex2 mongoimport -d listaLeituras -c livros --file /tmp/dataset_livros.json --jsonArray`
4. A API de dados (Express) está a correr na porta `19020` (mas não necessita de ser acedida manualmente).
5. O frontend (servido estaticamente pelo Nginx) está exposto na porta `19021`. 
6. Abrir o browser em `http://localhost:19021` para testar e interagir com a aplicação completa.
