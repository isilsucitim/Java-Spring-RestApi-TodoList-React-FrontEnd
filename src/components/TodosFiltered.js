import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';


const TodosFiltered = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;
  return (
    <div className="row">

        <button
            onClick={() => TodoStore.BackTodoList()}
            className="btn btn-dark btn-sm "
            style={{marginRight:25}}
        >
            &lt; Back Lists
        </button>

      <button
        onClick={() => TodoStore.updateFilter('all')}
        className={classnames({ 'active': TodoStore.filter === 'all',"btn btn-primary btn-sm marginLeft5":true })}

      >
        All
      </button>
      <button
        onClick={() => TodoStore.updateFilter('active')}
        className={classnames({ 'active': TodoStore.filter === 'active',"btn btn-primary btn-sm marginLeft5":true  })}
      >
        Active
      </button>
      <button
        onClick={() => TodoStore.updateFilter('completed')}
        className={classnames({ 'active': TodoStore.filter === 'completed',"btn btn-primary btn-sm marginLeft5":true  })}
      >
        Completed
      </button>

        <button
            onClick={() => TodoStore.updateFilter('expires')}
            className={classnames({ 'active': TodoStore.filter === 'completed',"btn btn-primary btn-sm marginLeft5":true  })}
        >
            Expires Date
        </button>
    </div>
  );
}));

TodosFiltered.wrappedComponent.propTypes = {
  TodoStore: PropTypes.object.isRequired,
};

export default TodosFiltered;
