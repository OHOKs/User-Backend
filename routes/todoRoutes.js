const express = require('express');
const router = express.Router();

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
    
} = require('../controllers/todoController');

    

// GET /todos - Teendők lekérdezése
router.get('/', getTodos);

// POST /todos - Új teendő létrehozása
router.post('/', createTodo);

// PUT /todos/:id - Teendő frissítése
router.put('/:id', updateTodo);

// DELETE /todos/:id - Teendő törlése
router.delete('/:id', deleteTodo);

module.exports = router;