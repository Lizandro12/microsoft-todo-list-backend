const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require('./models/db.js');
const sequelize = require('./tabelaDeTarefas.js');



/* Usa o express para habilitar o Backend */
app.use(express.json());

/* Habililta o Frontend a fazer requisições no backend */
app.use(cors());

app.get('/', async (request, response) => {
    const getTasks = await sequelize.findAll({
        where: {
            completed: false
        }
    });

    return response.send(getTasks);
})
/* Fim */


/* Cadastra um nova tarefa */
app.post('/newtask', async (request, response) => {
    const { title, completed, favorite } = request.body;

    const newTask = {
        task_id: Math.floor(Math.random()*100),
        title,
        completed,
        favorite
    }

    /* Tratamento do processo asyncrono para inserção no banco de dados */
    await sequelize.create(newTask).then( () => {
        return sequelize.findAll({
            where: {
                completed: false
            }
        });
    }).then( (allTasks) => {
        return response.status(201).send(allTasks);
    }).catch(  () => {
        return response.status(400).json({
            error: true,
            message: "Houve um erro ao cadastrar a tarefa"
        });
    });
})
/* Fim */

/* Recebe os dados e edita o estado da tarefa */
app.patch('/editstatus/:id', async (request, response) => {
    const id = Number(request.params.id);
    const { completed } = request.body;
    const taskToEdit = await sequelize.findByPk(id);

    //Pesquisar por where para procurar uma tarefa e editar  em vez de usar o findByPk

    
    taskToEdit.completed = completed;
    await taskToEdit.save();
    return response.send(taskToEdit);

})
/* Fim */

/* Recebe os dados e edita para favorito ou não */
app.patch('/editfavorite/:id', async (request, response) => {
    const id = Number(request.params.id);

    const { favorite } = request.body;

    const taskToEdit = await sequelize.findByPk(id);
    taskToEdit.favorite = favorite;
    await taskToEdit.save();
    return response.send(taskToEdit);
})
/* Fim */



/* ============================================ */
//Rotas para tarefas importantes
/* ============================================ */

/* Busca as tarefa estão marcadas como importantes no banco de dados e envias para o Front-end */
app.get('/importants', async (request, response) => {
    const getTasks = await sequelize.findAll({
        where: {
            completed: false,
            favorite: true
        }
    });

    return response.send(getTasks);
})
/* Fim */

/* Cadastra um nova tarefa importante*/
app.post('/newtaskimportant', async (request, response) => {
    const { task_id, title, completed, favorite } = request.body;

    const newTask = {
        task_id,
        title,
        completed,
        favorite
    }

    await sequelize.create(newTask).then( () => {
        return sequelize.findAll({
            where: {
                completed: false,
                favorite: true
            }
        });
    }).then( (allTasks) => {
        return response.status(201).send(allTasks);
    }).catch(  () => {
        return response.status(400).json({
            error: true,
            message: "Houve um erro ao cadastrar a tarefa"
        });
    });
})
/* Fim */


/* ============================================ */
//Rotas para tarefas concluidas
/* ============================================ */

/* Busca as tarefa estão marcadas como importantes no banco de dados e envias para o Front-end */
app.get('/completed', async (request, response) => {
    const getTasks = await sequelize.findAll({
        where: {
            completed: true,
        }
    });

    return response.send(getTasks);
})
/* Fim */


app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));