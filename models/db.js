/* Conexão com o banco de dados */

/* Chamada do sequelize */
const Sequelize = require('sequelize');
require('dotenv').config();


/* Realização da conexão com o banco de dados */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

/* Este metodo permite verificar se a conexao com o banco de dados foi realizada com sucesso */

sequelize.authenticate().then( () => console.log("A conexão com o banco de dados foi realizada com sucesso")).catch( (err) => console.log("Erro: A conexão com o banco de dados falhou", err));

module.exports = sequelize;