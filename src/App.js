import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
function App() {
  const [arr, setArray] = useState([]);

  async function getdata() {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    let data = await response.json();
    setArray((arr) => [...arr, ...data]);
    console.log(data);
  }

  useEffect(() => {
    getdata();
  }, []);

  const handleDelete = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleUpdate = (item) => () => {
    console.log(item);
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        status: item.completed,
        userId: item.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, user_task, task_status } = e.target.elements;
    console.log({
      userId: userId.value,
      title: user_task.value,
      completed: task_status.value,
    });

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId.value,
        title: user_task.value,
        completed: task_status.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const datas = [data, ...arr];
        setArray(datas);
      });
  };
  return (
    <div className='App'>
      <h1> TODO LIST API APP</h1>
      <form onSubmit={handleSubmit} className='form-list'>
        <input placeholder='UID' name='uid_input' id='userId' />
        <input placeholder='Enter task' name='task_input' id='user_task' />
        <input type='radio' id='task_status1' name='task_status' value='true' />
        <label for='task_status'> completed</label>
        <input
          type='radio'
          id='task_status2'
          name='task_status'
          value='false'
        />
        <label for='task_status'> Not completed</label>
        <button>Add</button>
        <h3>Here is our list of tasks</h3>
      </form>

      <ul>
        {arr.map((item) => {
          return (
            <div key={item.id} className='item-list'>
              <span>{item.title}</span>
              <span>
                <button onClick={handleUpdate(item)} className='but1'>
                  update
                </button>
                <button onClick={handleDelete} className='but2'>
                  delete
                </button>
              </span>
            </div>
          );
        })}
      </ul>
      <Footer />
    </div>
  );
}

export default App;
