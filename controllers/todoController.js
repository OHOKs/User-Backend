const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "todo"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM todo", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

const getTodos = async (req, res) => {
    try
    {
         const todos = await prisma.todo.findMany();
         res.json(todos);
    } catch (error){
        res.status(500).json({error : 'Hiba a lekérdezés során'});
    }
};


const createTodo = async (req, res) => {
    const { title, userId } = req.body;
    try{
        const newTodo = await prisma.todo.create({
            data: {
                title,
                user: { connect : {id : id} }
            }
        }
        );
        res.json(newTodo);
    }
    catch (error){
        res.status(500).json({error : 'Hiba történt a létrehozás során'});
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try{    
        const updateTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: {
                completed,
            }
        });
        res.json(updateTodo);
    }
    catch (error){
        res.status(500).json({error : 'Hiba történt a frissítés során'});
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try{    
        await prisma.todo.delete({
            where: { id: parseInt(id) },
            data: {
                completed,
            }
        });
        res.json(deleteTodo);
    }
    catch (error){
        res.status(500).json({error : 'Hiba történt a törlés során'});
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}