const mongoose = require('mongoose');
const fs = require('fs');

async function importarDados() {
  try {
    console.log('A tentar ligar ao MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/jogostabuleiro');
    console.log('Ligado ao MongoDB com sucesso!');

    const jogoSchema = new mongoose.Schema({ _id: String }, { strict: false });
    const Jogo = mongoose.model('Jogo', jogoSchema, 'jogos');

    const dados = JSON.parse(fs.readFileSync('./jogos.json', 'utf-8'));

    await Jogo.insertMany(dados);
    console.log('Dados importados com sucesso! Podes avançar no exame.');
    
    process.exit(0);
  } catch (err) {
    console.error('Erro fatal:', err.message);
    process.exit(1);
  }
}

importarDados();