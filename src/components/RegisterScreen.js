
import React, { Component } from 'react';
import '../App.css';

import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class RegisterScreen extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        return (
            <div className="App">

                <div className="Todo-container">

                    <div className="App-header">
                        Register
                    </div>



                    <input type="text" className="form-control bottomMargin" placeholder="Name" ref={TodoStore.nameInput}/>
                    <input type="text" className="form-control bottomMargin" placeholder="E-Mail" ref={TodoStore.emailInput}/>
                    <input type="password" className="form-control bottomMargin" placeholder="Password" ref={TodoStore.passwordInput} />


                    <div className="row" style={{margin:0,marginBottom:10,padding:0}}>

                        <button
                            onClick={() => TodoStore.RegisterAct()}
                            className="btn btn-success bottomMargin"
                        >
                            Register
                        </button>

                        <div className="col-1"></div>
                        <button
                            onClick={() => TodoStore.isLoginRegisterScreenAct(true)}
                            className="btn btn-info bottomMargin"
                        >
                            Login Screen
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

export default RegisterScreen;
