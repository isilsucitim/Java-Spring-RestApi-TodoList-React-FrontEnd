import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import {inject, observer} from 'mobx-react';

const TodoItem = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;

    return (
        <div className="col-12">


            <tr>
                <td></td>
                <td>
                    <span
                        className={classnames({'todo-item-label': true, 'completed': props.todo.completed})}
                    >
                        {props.todo.title}
                    </span>
                </td>
                <td>{
                    props.todo.expires.split('T')[0]

                }</td>
                <td>
                    <span className="remove-item" onClick={(event) => TodoStore.deleteTodo(props.todo.id)}>
                        &times;
                    </span>
                </td>
            </tr>
        </div>


    );
}));

TodoItem.wrappedComponent.propTypes = {
    todo: PropTypes.object.isRequired,
    TodoStore: PropTypes.object.isRequired,
};

export default TodoItem;
