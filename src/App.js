import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/Todo'
import { db } from './firebase'

const App = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') return toast('Please enter a task', { type: 'error' })
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false
    })
    setInput('')
  }

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      setTodos(todosArr)
    });
    return () => unsubscribe();
  }, [])

  // update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }
  // delete todo in firebase
  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id))
  }

  return (
    <div className='h-screen w-screen p-4 bg-gradient-to-b from-[#2F80ED] to-[#1CB5E0]'>
      <ToastContainer position='top-center' />
      <div className='bg-slate-100 max-w-lg w-full m-auto rounded-md shadow-xl p-4 mt-16'>
        <h3 className='text-3xl font-bold text-center text-gray-800 p-2'>Quick Task</h3>
        <form className='flex justify-between' onSubmit={createTodo}>
          <input type="text" placeholder='Add Task' className='border p-2 w-full text-xl' value={input} onChange={(e) => setInput(e.target.value)} />
          <button className='border p-4 ml-2 bg-purple-500 text-slate-100'><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length > 0 && <p className='text-center p-2'>You have {todos.length} task{todos.length !== 1 && 's'} </p>}
      </div>
    </div>
  )
}

export default App
