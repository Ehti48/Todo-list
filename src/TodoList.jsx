import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editText, setEditText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const inputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const addTodo = () => {
        if (newTodo !== '') {
            setTodos([...todos, { id: Date.now(), text: newTodo }]);
            setNewTodo('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        setEditingTodo(id);
        setEditText(todoToEdit.text);
    };

    const saveEdit = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: editText.trim() } : todo
            )
        );
        setEditingTodo(null);
        setEditText('');
    };

    const searchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Wrapper>
            <div className='container'>
                <h1>React Todo List</h1>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={searchChange}
                    placeholder="Search"
                />
                <input
                    type="text"
                    value={newTodo}
                    onChange={inputChange}
                    placeholder="Add new todo"
                />
                <br />
                <button onClick={addTodo}>Add</button>
                <ul className='list-container'>
                    {filteredTodos.map((todo) => (
                        <li key={todo.id}>
                            {editingTodo === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <span><b>{todo.text}</b></span>
                            )}
                            <div className="list-btn">
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                                {editingTodo === todo.id ? (
                                    <button onClick={() => saveEdit(todo.id)}>Save</button>
                                ) : (
                                    <button onClick={() => editTodo(todo.id)}>Edit</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .container {
    width: 80%;
    height: 400px;
    margin: 100px auto;
    text-align: center;
    border: 1px solid #0000007;
  }
  h1 {
    margin: 30px 0;
    font-size: 30px;
  }
  input {
    width: 70%;
    margin: 15px 0;
    padding: 10px;
    border-radius: 8px;
  }
  button {
    width: 60px;
    margin: 0 5px;
    font-weight: 400;
    padding: 10px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgb(93 93 93), rgb(0 0 0));
    color: #fff;
    border: none; 
  }
  .list-container {
    width: 80%;
    min-height: 300px;
    max-height: 300px;
    margin: 10px auto;
    padding: 10px;
    border: 1px solid #a4a4a4;
    border-radius: 5px;
    overflow-y: scroll;
  }
  li {
    width: 100%;
    margin: 8px 0;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e9e9e9;
    border-radius: 5px;
    list-style: none;
  }
  li .list-btn button {
    width: 60px;
    margin: 0 5px;
    font-size: 12px;
    border-radius: 8px;
  }
  li input {
    width: 50%;
    height: 40px;
    margin: 0;
    background: none;
    font-size: 14px;
  }
`;

export default TodoList;
