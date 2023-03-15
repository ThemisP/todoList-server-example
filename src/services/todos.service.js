let todos = [
  {
    id: 1,
    message: "Example todo",
    completed: false,
  },
  {
    id: 2,
    message: "Example todo 2",
    completed: false,
  },
];

const todosService = {
  getAll: () => todos,
  add: ({ message }) => {
    const newTodo = {
      id: String(Math.floor(Math.random() * 1000000)),
      message,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  },
  remove: (todoId) => {
    let removedTodo;
    todos = todos.filter((todo) => {
      if (todo.id === todoId) {
        removedTodo = todo;
        return false;
      }
      return true;
    });
    return removedTodo;
  },
  update: (todoId, { message, completed }) => {
    let updatedTodo;
    todos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.message = message;
        todo.completed = completed;
        updatedTodo = todo;
      }
      return todo;
    });
    return updatedTodo;
  },
};

export default todosService;
