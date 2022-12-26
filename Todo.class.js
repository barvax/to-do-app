class TodoManager {
  // members / properties
  currentId = 1;
  todos = [
    //   {
    //     id: 1,
    //     text: "Buy milk",
    //     isDone: true,
    //     createdAt: new Date(),
    //   },
  ];

  // Optional constructor function. new Todo() runs this functions
  // constructor() {
  //   this.currentId = 0;
  //   this.todos = [];
  // }

  // methods / function
  add(text) {
    if (typeof text !== "string" || text.length < 2) {
      throw new Error("Task must be at least two characters long");
    }

    const todo = {
      id: this.currentId++,
      text,
      isDone: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);

   this.save();
    return todo;
  }

  constructor(){
    this.load();
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.getAll()))
    localStorage.setItem("currentId", JSON.stringify(this.currentId))
  }

  load(){
    if(localStorage.getItem("todos"))
   {
    console.log(localStorage.getItem("todos"))
      this.todos =JSON.parse(localStorage.getItem("todos"))
      this.currentId =JSON.parse(localStorage.getItem("currentId"))
    }
  }
  getAll() {
    return this.todos;
  }

  getTodo(id) {
    const found = this.todos.find((todo) => todo.id === id);

    if (!found) {
      throw new Error("id was not found");
    }

    return found;
  }

  remove(id) {
    // find the index of the element with the specified id
    // remove the element on the index found from the array

    const removedTodo = this.getTodo(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this.save();
    return removedTodo;
  }

  changeDone(id, isDone = null) {
    const updatedTodo = this.getTodo(id);

    if (typeof isDone === "boolean") {
      updatedTodo.isDone = isDone;
    } else {
      updatedTodo.isDone = !updatedTodo.isDone;
    }

    this.save();
    return updatedTodo;
  }

  clear(isDone = null) {
    let removed = [];

    if (typeof isDone === "boolean") {
      removed = this.todos.filter((todo) => todo.isDone === isDone);

      this.todos = this.todos.filter((todo) => todo.isDone !== isDone);
    } else {
      removed = this.todos;
      this.todos = [];
    }
    this.save();
    return removed;
  }
}
