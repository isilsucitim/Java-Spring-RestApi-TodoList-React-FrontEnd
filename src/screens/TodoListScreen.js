import React, {Component} from 'react';
import '../App.css';
import TodoListItem from '../components/TodoListItem';


import {inject, observer} from 'mobx-react';

@inject('TodoStore')
@observer
class TodoListScreen extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        return (
            <div>

                <input type="text" className="form-control bottomMargin" placeholder="Add New Todo List And Press Enter" ref={TodoStore.todoListInput}
                       onKeyUp={TodoStore.addTodoList}/>

                <hr/>
                {TodoStore.todoLists.map(todo =>
                    <TodoListItem key={todo.id} todo={todo}/>
                )}


            </div>

        );
    }

    componentDidMount() {

        if (this.props.TodoStore.userId !== null) {
            this.props.TodoStore.retrieveTodoLists();
        }

        this.props.TodoStore.GetListId();

    }
}

export default TodoListScreen;
