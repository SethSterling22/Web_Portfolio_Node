// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001


import React, { useState } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleAddTask = () => {
        if (newTask.trim() === '') {
        setShowAlert(true);
        return;
        }
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
        setShowAlert(false);
    };

    const toggleTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div>
        <h2 className="mb-4">Lista de Quehaceres 2.0</h2>
        
        {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Escribe la tarea primero 🙄
            </Alert>
        )}

        <Form.Group className="mb-3 d-flex">
            <Form.Control
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Añade una nueva tarea"
            />
            <Button variant="success" onClick={handleAddTask} className="ms-2">
            Añadir tarea
            </Button>
        </Form.Group>

        <ListGroup>
            {tasks.map((task, index) => (
            <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
            >
                <div>
                <Form.Check
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                    label={task.text}
                    className={task.completed ? 'text-decoration-line-through' : ''}
                />
                </div>
                <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(index)}
                >
                Eliminar
                </Button>
            </ListGroup.Item>
            ))}
        </ListGroup>

        {tasks.length === 0 && (
            <div className="text-center mt-4 text-muted">
            No se ha añadido ninguna tarea.
            </div>
        )}
        </div>
    );
};

export default TaskList;