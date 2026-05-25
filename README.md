# Exame ENGWEB2026 - Normal

## Exercício 1: API de Jogos de Tabuleiro
- **Base de Dados:** Os dados foram persistidos num contentor MongoDB (porta 27017).
- **Importação:** Foi utilizado o ficheiro original e um script Node.js (`importData.js`) para popular a coleção `jogos` na base de dados `jogostabuleiro`.
- **Como executar:**
  1. Entrar na pasta `ex1`
  2. Correr `docker compose up --build -d`
  3. Correr `node importData.js` para popular a BD
  4. A API ficará disponível em `http://localhost:17000` (Swagger em `/api-docs`)
- **Respostas Textuais (Queries):** Encontram-se no ficheiro `ex1/queries.txt`.

## Exercício 2: Lista de Leituras (Engenharia Reversa)
- **Base de Dados:** MongoDB isolado na rede interna do Docker (sem portas exportadas).
- **Setup e Importação:** O dataset exemplificativo foi injetado diretamente no contentor via `mongoimport`.
- **Como executar:**
  1. Entrar na pasta `ex2`
  2. Correr `docker compose up --build -d`
  3. Importar dados: `docker cp dataset_livros.json mongodb_ex2:/tmp/dataset_livros.json && docker exec -it mongodb_ex2 mongoimport -d listaLeituras -c livros --file /tmp/dataset_livros.json --jsonArray`
  4. Aceder ao Frontend Nginx na porta `19021` (`http://localhost:19021`)
  5. A API de dados está exposta na porta `19020`.