import React from 'react';
import {observable, action, computed, configure, runInAction} from 'mobx';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';
configure({enforceActions: true});

class TodoStore {

    //REF
    @observable todoInput = React.createRef();
    @observable todoExpiresInput = React.createRef();
    @observable todoListInput = React.createRef();
    @observable nameInput = React.createRef();
    @observable emailInput = React.createRef();
    @observable passwordInput = React.createRef();


    //
    @observable isLoginRegister = true;


    //
    @observable filter = 'all';
    @observable beforeEditCache = '';
    @observable todos = [];
    @observable todoLists = [];
    @observable todoListId = null;
    @observable userId = null;
    @observable listName = "";
    @observable userName = "";


    @action SessionCheck = ()=>{
        if (localStorage.getItem('userId')!==null){
            this.userId = localStorage.getItem('userId');
            this.userName = localStorage.getItem('userName');
        }
        else{
            this.userId = null;
            this.userName = "";
        }
    }

    @action SessionSave = data =>{
        this.userId = data.id;
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userName', data.name);

    }

    @action SessionAbandom = ()=>{
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('listName');
        localStorage.removeItem('todoListId');
        this.userId = null;
        this.todoListId = null;
        this.listName = "";
        this.userName = "";
    }


    @action isLoginRegisterScreenAct = selectx => {
        this.isLoginRegister = selectx;
    };


    @action LoginAct = () => {
        if (this.emailInput.current.value==="" || this.passwordInput.current.value==="")
        {
            alert("Email Or Password Not Empty");
        }
        else{

            const email = this.emailInput.current.value;
            const password = this.passwordInput.current.value;
            axios.post('/user/login', {
                mail: email,
                password: password,
            })
                .then(response => {
                    runInAction(() => {

                        if(response.data===""){
                            alert("E-Mail Or Password Wrong");
                        }
                        else{
                            this.userId = response.data.id;
                            this.userName = response.data.name;
                            this.SessionSave(response.data);
                        }

                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }


    @action RegisterAct = () => {
        if (this.emailInput.current.value==="" || this.nameInput.current.value==="" || this.passwordInput.current.value==="")
        {
            alert("Email Or Password Not Empty");
        }
        else{

            const email = this.emailInput.current.value;
            const password = this.passwordInput.current.value;
            const name = this.nameInput.current.value;
            axios.post('/user/register', {
                mail: email,
                password: password,
                name:name
            })
                .then(response => {
                    runInAction(() => {

                        if(response.data===""){
                            alert("Register Error");
                        }
                        else{
                            this.userId = response.data.id;
                            this.userName = response.data.name;
                            this.SessionSave(response.data);
                        }

                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }



    @action GetListId=()=>{
        if (localStorage.getItem("todoListId")!==null){
            this.listName = localStorage.getItem("listName");
            this.todoListId = localStorage.getItem("todoListId");
        }
        else{
            this.listName = "";
            this.todoListId = null;
        }
    }

    @action BackTodoList = () =>{
        this.listName = "";
        this.todoListId = null;
        localStorage.removeItem('todoListId');
        localStorage.removeItem('listName');
    }

    @action SelectTodoList = selectId =>{
        this.listName = this.todoLists.find(x => x.id === selectId).title;
        this.todoListId = selectId;
        localStorage.setItem("listName",this.listName);
        localStorage.setItem("todoListId",this.todoListId);
    }

    @action retrieveTodos = () => {
        this.todos = [];
        axios.get('/todo/'+this.todoListId)
            .then(response => {
                let tempTodos = response.data;
                tempTodos.forEach(todo => todo.editing = false);

                runInAction(() => {
                    this.todos = tempTodos;
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    @action retrieveTodoLists = () => {
        this.todoLists = [];
        axios.get('/todolist/'+this.userId)
            .then(response => {
                let tempTodos = response.data;
                //tempTodos.forEach(todo => todo.editing = false);

                runInAction(() => {
                    this.todoLists = tempTodos;
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    @action addTodo = event => {
        if (event.key === 'Enter') {
            const todoInput = this.todoInput.current.value;
            const expiresInput = this.todoExpiresInput.current.value;

            if (todoInput.trim().length === 0) {
                return;
            }

            if (expiresInput.trim().length === 0) {
                return;
            }


            axios.post('/todo', {
                title: todoInput,
                expires: expiresInput,
                createDate:new Date(),
                completed: false,
                list_Id: this.todoListId
            })
                .then(response => {
                    runInAction(() => {
                        this.todos.push({
                            id: response.data.id,
                            title: response.data.title,
                            expires: expiresInput,
                            createDate:response.data.createDate,
                            list_Id: this.todoListId,
                            completed: false,
                            editing: false,
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });

            this.todoInput.current.value = '';
            this.todoExpiresInput.current.value = '';
        }
    };



    @action addTodoList = event => {
        if (event.key === 'Enter') {
            const todoInput = this.todoListInput.current.value;

            if (todoInput.trim().length === 0) {
                return;
            }

            axios.post('/todolist', {
                title: todoInput,
                userId: this.userId
            })
                .then(response => {
                    runInAction(() => {
                        this.todoLists.push({
                            id: response.data.id,
                            title: response.data.title,
                            userId: this.userId,
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });

            this.todoListInput.current.value = '';
        }
    };




    @action deleteTodo = id => {
        axios.delete('/todo/' + id)
            .then(response => {
                runInAction(() => {
                    const index = this.todos.findIndex(item => item.id === id);
                    this.todos.splice(index, 1);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };


    @action deleteTodoList = id => {
        axios.delete('/todolist/' + id)
            .then(() => {
                runInAction(() => {
                    const index = this.todoLists.findIndex(item => item.id === id);
                    this.todoLists.splice(index, 1);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    @action checkTodo = (todo, event) => {
        axios.patch('/todo/' + todo.id, {
            title: todo.title,
            completed: !todo.completed,
        })
            .then(response => {
                runInAction(() => {
                    todo.completed = !todo.completed;
                    const index = this.todos.findIndex(item => item.id === todo.id);
                    this.todos.splice(index, 1, todo);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }



    @action updateFilter = filter => {
        this.filter = filter;
    }

    @computed get todosCompletedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }

    @computed get todosFiltered() {
        if (this.filter === 'all') {
            return this.todos;
        } else if (this.filter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        } else if (this.filter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        }
        else if (this.filter === 'expires') {
            return this.todos.filter(todo => new Date(todo.expires)<new Date());
        }
        return this.todos;
    }

    @computed get remaining() {
        return this.todos.filter(todo => !todo.completed).length;
    }

    @computed get anyRemaining() {
        return this.remaining !== 0;
    }
}

const store = new TodoStore();
export default store;
