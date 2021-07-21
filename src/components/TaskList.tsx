import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (newTaskTitle === undefined || newTaskTitle === '' || newTaskTitle === ' ') {
      return;
    }

    const newTask: Task = {
      id: CreateRandomID(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, newTask]);

    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {

    const indTask = tasks.findIndex(task => task.id === id);

    if (indTask == -1) {
      return;
    }

    const changedTasks = [...tasks];

    changedTasks[indTask].isComplete = !changedTasks[indTask].isComplete;

    setTasks(changedTasks);

  }

  function handleRemoveTask(id: number) {

    const indTask = tasks.findIndex(task => task.id === id);

    if (indTask == -1) {
      return;
    }

    const changedTasks = [...tasks];

    changedTasks.splice(indTask, 1);

    setTasks(changedTasks);

  }

  function CreateRandomID() {

    const min = 1;
    const max = 999999;

    return Math.floor(Math.random() * (max - min)) + min;

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}