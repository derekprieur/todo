import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li className={`flex justify-between bg-slate-200 p-4 my-2 capitalize ${todo.completed && 'bg-slate-400'}`}>
            <div className='flex'>
                <input type="checkbox" checked={todo.completed && true} onChange={() => { toggleComplete(todo) }} className='cursor-pointer' />
                <p onClick={() => toggleComplete(todo)} className={`ml-2 cursor-pointer ${todo.completed && 'line-through'}`}>{todo.text}</p>
            </div>
            <button className='cursor-pointer flex items-center' onClick={() => deleteTodo(todo)}><FaRegTrashAlt /></button>
        </li>
    )
}

export default Todo