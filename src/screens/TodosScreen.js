import React, {Component} from 'react';
import '../App.css';

import TodosRemaining from '../components/TodosRemaining';
import TodosCheckAll from '../components/TodosCheckAll';
import TodosFiltered from '../components/TodosFiltered';
import * as classnames from 'classnames';

import {inject, observer} from 'mobx-react';

@inject('TodoStore')
@observer
class TodoScreen extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        return (
            <div>

                <p>Todo</p>
                <input type="text" className="form-control bottomMargin" placeholder="Add New Todo And Press Enter"
                       ref={TodoStore.todoInput} onKeyUp={TodoStore.addTodo}/>

                <p>Expires Date</p>
                <input type="date" className="form-control bottomMargin" placeholder="Expires Date"
                       ref={TodoStore.todoExpiresInput} onKeyUp={TodoStore.addTodo}/>


                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Todo</th>
                        <th>Created Date</th>
                        <th>Expires Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>


                    {TodoStore.todosFiltered.map(todo =>


                            <tr key={todo.id} className={classnames({'table-success': todo.completed})}>
                                <td>

                                    <input type="checkbox" onChange={(event) => TodoStore.checkTodo(todo, event)}
                                           checked={todo.completed}/>


                                </td>
                                <td>
                    <span
                        className={classnames({'todo-item-label': true})}
                    >
                        {todo.title}
                    </span>
                                </td>
                                <td>{
                                    todo.createDate.split('T')[0]

                                }</td>
                                <td>{
                                    todo.expires.split('T')[0]

                                }</td>

                                <td>
                                    <span className="badge badge-success">{
                                        todo.completed ? " Completed " : ""
                                    }</span>


                                    <span className="badge badge-danger">{
                                        (new Date(todo.expires) < new Date()) && !todo.completed ? " Expires " : ""
                                    }

                                    </span>

                                </td>


                                <td>

                                    <button className="btn btn-danger btn-sm"
                                            onClick={(event) => TodoStore.deleteTodo(todo.id)}>
                                        Remove

                                    </button>
                                </td>
                            </tr>
                    )}


                    </tbody>
                </table>


                <div className="extra-container">
                    <TodosCheckAll />
                    <TodosRemaining />
                </div>

                <div className="extra-container">
                    <TodosFiltered />


                </div>


            </div>



        );
    }

    componentDidMount() {

        if (this.props.TodoStore.todoListId !== null) {
            this.props.TodoStore.retrieveTodos();
        }


    }
}


export default TodoScreen;
