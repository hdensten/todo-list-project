import React from "react";
import TodoItem from "./TodoItem";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      todo: ""
    };
  }

  componentDidMount() {
    fetch("https://murmuring-plateau-50795.herokuapp.com/todos")
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          title={todo.title}
          done={todo.done}
          id={todo.id}
          delete={this.deleteTodo}
        />
      );
    });
  };
  handleChange = event => {
    this.setState({ todo: event.target.value });
  };
  addTodo = event => {
    event.preventDefault();
    fetch("https://murmuring-plateau-50795.herokuapp.com/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.state.todo,
        done: false
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: [...this.state.todos, data],
          todo: ""
        })
      );
  };

  deleteTodo = id => {
    fetch(`https://murmuring-plateau-50795.herokuapp.com/todo/${id}`, {
      method: "DELETE"
    }).then(
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      })
    );
  };

  render() {
    return (
      <div className="App">
        <h1>ToDo list</h1>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add ToDo"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}
export default App;
