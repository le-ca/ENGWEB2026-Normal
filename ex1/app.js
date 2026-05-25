global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes/index');
const swaggerDocument = require('./swagger.json'); // Documentação Swagger

const app = express();
const PORT = 17000;

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jogostabuleiro';
mongoose.connect(mongoURI)
    .then(() => console.log('Ligado ao MongoDB!'))
    .catch(err => console.error('Erro de ligação ao MongoDB:', err));

app.use(cors());
app.use(express.json());

// Interface Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API a correr na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});