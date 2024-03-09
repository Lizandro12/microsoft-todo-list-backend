/* Criação das tabelas no banco de dados */
const Sequelize = require('sequelize');
const sequelize = require('./models/db.js');

/* Estrutura da tabela */
const all_tasks = sequelize.define("all_tasks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    task_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

/* Criar tabela quando ela não existir */
//all_tasks.sync();

module.exports = all_tasks;