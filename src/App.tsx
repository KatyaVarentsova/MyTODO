import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TaskList, TaskDetails } from './pages'
import { TaskProvider } from './contaxt/TaskContext';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task' element={<TaskDetails />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
