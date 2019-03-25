import React, {Component} from 'react';
import '../App.css';
import '../bs.css';

import TodoScreen from '../screens/TodosScreen'
import TodoListScreen from '../screens/TodoListScreen'
import UserLoginRegisterScreen from '../screens/UserLoginRegisterScreen'


import {inject, observer} from 'mobx-react';

@inject('TodoStore')
@observer
class App extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        return (

            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-around">
                    <a className="navbar-brand justify-content-start" style={{color: "white"}}>

                        {
                            TodoStore.listName
                        } Todo List
                    </a>

                    {
                        TodoStore.userId !== null ?
                            (<ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link">
                                        {
                                            TodoStore.userName
                                        }
                                    </a>
                                </li>
                                <li className="nav-item">

                                    <button
                                        onClick={() => TodoStore.SessionAbandom()}
                                        className="btn nav-link"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>) : ""
                    }

                </nav>


                <div className="container-fluid">
                    <div className="Todo-container">
                        {
                            TodoStore.userId === null ? <UserLoginRegisterScreen/> : (
                                TodoStore.todoListId === null ?
                                    <TodoListScreen/> : <TodoScreen/>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.TodoStore.userId !== null) {
            this.props.TodoStore.GetListId();
        }
    }
}

export default App;
