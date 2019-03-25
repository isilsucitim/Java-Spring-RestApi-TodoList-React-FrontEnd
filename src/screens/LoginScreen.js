
import React, { Component } from 'react';
import '../App.css';
import '../bs.css';

import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class LoginScreen extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        return (
            <div className="App">

                <div className="Todo-container">

                    <div className="App-header">
                        Login
                    </div>



                    <input type="text" className="form-control bottomMargin" placeholder="E-Mail" ref={TodoStore.emailInput}/>
                    <input type="password" className="form-control bottomMargin"  placeholder="Password" ref={TodoStore.passwordInput} />

                    <div className="row" style={{margin:0,marginBottom:10,padding:0}}>
                    <button
                        onClick={() => TodoStore.LoginAct()}
                        className="btn btn-success bottomMargin"
                    >
                        Login
                    </button>
                        <div className="col-1"></div>
                    <button
                        onClick={() => TodoStore.isLoginRegisterScreenAct(false)}
                        className="btn btn-info bottomMargin"
                    >
                        Register Screen
                    </button>
                    </div>

                </div>
            </div>
        );
    }


    componentDidMount() {
        //this.props.TodoStore.SessionCheck();
    }
}

export default LoginScreen;
