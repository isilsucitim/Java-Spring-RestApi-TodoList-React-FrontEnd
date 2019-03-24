import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';

const TodoListItem = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;

    return (
        <div>
            <div key={props.todo.id} className="todo-item">
                <div className="todo-item-left">


                    <div
                        className={classnames({'todolist-item-label': true})}
                        onClick={(event) => TodoStore.SelectTodoList(props.todo.id)}
                    >
                        {props.todo.title}
                    </div>


                </div>
                <button className="btn btn-danger btn-sm" onClick={(event) => TodoStore.deleteTodoList(props.todo.id)}>
                    Remove
                </button>
            </div>
            <hr/>
        </div>
    );
}));

TodoListItem.wrappedComponent.propTypes = {
    todo: PropTypes.object.isRequired,
    TodoStore: PropTypes.object.isRequired,
};

export default TodoListItem;
