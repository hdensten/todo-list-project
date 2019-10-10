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
    fetch("https://localhost:5000")
      .then(response => response.json())
      .then(data => console.log(data));
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return <TodoItem title={todo} />;
    });
  };
  handleChange = event => {
    this.setState({ todo: event.target.value });
  };
  addTodo = event => {
    event.preventDefault();
    this.setState({
      todos: [...this.state.todos, this.state.todo]
    });
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
