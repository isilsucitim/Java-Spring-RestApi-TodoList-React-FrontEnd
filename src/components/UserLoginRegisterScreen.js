import React, { Component } from 'react';
import '../App.css';
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class UserLoginRegisterScreen extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        return (
            <div className="App">

                <div className="Todo-container">

                    {
                        TodoStore.isLoginRegister ? <LoginScreen/> : <RegisterScreen/>

                    }

                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.TodoStore.SessionCheck();
    }
}

export default UserLoginRegisterScreen;
