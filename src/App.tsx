import { FormEvent, useEffect, useState } from 'react';
import './App.css'

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [list, setList] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>({
    id: Math.floor((Math.random() * 100) + 1),
    text: "",
    completed: false,
  });

  useEffect(() => {
    const items = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items")!)
      : [];
    setList(items);
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!item.text.trim())
      return;
    setList([...list, item]);
    setItem({
      id: Math.floor((Math.random() * 100) + 1),
      text: "",
      completed: false,
    });
    localStorage.setItem("items", JSON.stringify([...list, item]));
  }

  const handleClick = (todo: Item) => {
    const newList = list.map(item => {
      if (item.id === todo.id) {
        const isCompleted = !item.completed;
        return { ...item, completed: isCompleted };
      }
      return item;
    });
    setList(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  }

  const handleDelete = (id: number) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-900">
      <div className="border rounded-md min-h-10 w-full sm:w-2/3 bg-white pb-4">
        <h1 className="text-4xl font-bold p-5 text-blue-900">To-Do List</h1>
        <form className="flex flex-grow mx-5 pl-3 rounded-full bg-gray-200 justify-center " onSubmit={handleSubmit}>
          <input
            className="placeholder:text-gray-600 w-full focus:outline-none bg-transparent"
            type="text"
            placeholder="Item"
            value={item.text}
            onChange={(e) => setItem({ ...item, text: e.target.value })}
          />
          <button type="submit" className="border border-transparent rounded-full py-2 px-8 bg-orange-500 text-white">Add</button>
        </form>
        <ul className='mx-6 mt-4'>
          {list.map(item =>
            <li key={item.id} className='flex justify-between'>
              <div className='flex gap-1'>
                <input type='checkbox' checked={item.completed} onChange={() => handleClick(item)} />
                <label>{item.completed ? <span className='line-through text-gray-500'>{item.text}</span> : <span>{item.text}</span>}</label>
              </div>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
