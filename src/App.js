import React, {useState, useEffect} from "react";
import Vanta from './Vanta'
import './style.css'

function App() {


    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Пойти гулять',
            isActive: true,
            isDone: false,
            isImportant: false,
            time: toDate(new Date()).toLocaleString()
        },
        {
            id: 2,
            title: 'Купить хлеб',
            isActive: true,
            isDone: false,
            isImportant: false,
            time: toDate(new Date()).toLocaleString()
        }
    ]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(localStorage.getItem('status')
        ? JSON.parse(localStorage.getItem('status')) : "all");

    useEffect(() => {
        localStorage.setItem('status', JSON.stringify(status))
    }, [status]);

    const addTask = (e) => {
        e.preventDefault();
        if (tasks.filter(item => item.title === e.target[0].value).length !== 0) {
            alert('такая задача уже существует')
        } else {
            setTasks([...tasks, {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                title: e.target[0].value,
                isActive: false,
                isDone: false,
                time: toDate(new Date()).toLocaleString()
            }]);
        }
        e.target[0].value = ''
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((item) => {
            return item.id !== id
        }))
    };

    const doneHandler = (id) => {
        setTasks(tasks.map(item => {
            if (item.id === id) {
                return {...item, isDone: !item.isDone}
            } else {
                return item
            }
        }))
    };



    const importantHandler = (id) => {
        setTasks(tasks.map(item => {
            if (item.id === id) {
                return {...item, isImportant: !item.isImportant}
            } else {
                return item
            }
        }))
    };

    const deleteAllHandler = () => {
        setTasks(tasks.filter(item => !item.isDone))
    };

    function toDate (date) {
        return new Intl.DateTimeFormat('ru-Ru', {
            day:'2-digit',
            month:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
        }).format(new Date(date))
    }

    return (
        <div className="App">
            <div className="todo-content">
                <span style={{color: 'white'}}>{toDate(new Date())}</span>
                <h1 className="title">Todo-List</h1>
                {
                    tasks.length ?   <p style={{color: 'white'}}>



                        <span style={{color: 'white'}}>{tasks.length}</span> tasks to done <span>{tasks.filter(item => item.isDone).length}</span>
                    </p> : ''
                }


                <form onSubmit={addTask} className="form">
                    <input disabled={status === 'done' || status === 'important'} minLength={5} maxLength={20} className="form-input" required
                           placeholder={status === 'done' || status === 'important' ? 'not add' : 'add task'}
                           type="text"/>
                    <button className="form-btn" type='submit'>Add</button>
                </form>


                {
                    !tasks.length
                        ?
                        <h3 className="empty">Ваш список задач пуст</h3>
                        :
                        tasks.filter(item => item.isDone).length === 0 && status === 'done' ? <h3 className="empty">Ваш список выполненных задач пуст</h3> :
                        tasks.filter(item => item.isImportant).length === 0 && status ==='important' ? <h3 className="empty">Ваш список важных задач пуст</h3> :
                          !tasks.filter(item => {
                            return item.title.toLowerCase().startsWith(search.toLowerCase())
                        }).length ?
                              <h3 className="empty">По данному запросу ничего не найдено</h3>
                        :
                        <ul className="list"> {
                            tasks.filter(item => {
                                if (status === 'done') {
                                   return  item.isDone
                                } else if(status === 'important') {
                                    return item.isImportant
                                } else {
                                    return item
                                }
                            }).filter(item => {
                                return item.title.toLowerCase().startsWith(search.toLowerCase())
                            }).map(item => (
                                <li className="item" key={item.id}>
                                    <span style={{color: 'white'}}>{item.time}</span>
                                    <span className="title" style={{
                                        textDecoration: item.isDone ? 'line-through' : 'none',
                                        color: item.isImportant ? 'purple' : ''
                                    }}>{item.title}</span>
                                    <div className="list-btns">
                                        <button className="list-btn done-btn" onClick={() => doneHandler(item.id)}
                                                style={{background: item.isDone ? 'gold' : ''}} type={"button"}>Done
                                        </button>
                                        <button className="list-btn import-btn" onClick={() => importantHandler(item.id)}
                                                style={{background: item.isImportant ? 'purple' : ''}}
                                                type='button'>Important
                                        </button>
                                        <button className="list-btn delete-btn" onClick={() => deleteTask(item.id)}
                                                type='button'> x
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                }

                <input className="search" value={search} type="search" placeholder='enter task'
                       onChange={(e) => setSearch(e.target.value)}/>



                <div className="buttons">
                    <button className="status-btn" type="button" onClick={() => setStatus('all')} style={{background: status === 'all' ? 'green' : ''}}>All</button>
                    <button className="status-btn" type="button" onClick={() => setStatus('done')} style={{background: status === 'done' ? 'gold' : ''}}>Done</button>
                    <button className="status-btn" type="button" onClick={() => setStatus('important')} style={{background: status === 'important' ? 'purple' : ''}}>Important</button>
                    {
                        tasks.length ? <button className="clear-btn" type="button" onClick={deleteAllHandler}>Delete all
                            done</button> : ''
                    }
                </div>

            </div>
            <Vanta/>
        </div>
    );
}

export default App;
