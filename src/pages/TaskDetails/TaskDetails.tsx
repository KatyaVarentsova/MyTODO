import { useNavigate, useParams } from "react-router-dom"
import type { ITaskItem, TCategory } from "../../database/database"
import { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './TaskDetails.module.css'
import { useTaskContext } from "../../contaxt/TaskContext";


export function TaskDetails() {
  const {tasks, setTasks} = useTaskContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const existingTask = tasks.find((t) => t.id === Number(id))

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [category, setCategory] = useState("другое")

  useEffect(() => {
    if (isEditMode && existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description ?? "");
      setPriority(existingTask.priority);
      setCategory(existingTask.category);
    }
}, [existingTask, isEditMode])

const handleSave = () => {
  if (title.trim() === "") return;

  if (isEditMode && existingTask) {
    const updatedTasks = tasks.map((t) => 
    t.id === existingTask.id
    ? {...t, title, description, priority, category: category as TCategory}
    : t
    );
    setTasks(updatedTasks)
  } else {
    const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 0;
      const newTask: ITaskItem = {
        id: newId,
        title,
        description,
        priority,
        category: category as TCategory,
        status: false,
      };
      setTasks([...tasks, newTask]);
    }

    navigate("/");
  };

  const handleDelete = () => {
    if (!isEditMode || !existingTask) return;
    setTasks(tasks.filter((t) => t.id !== existingTask.id));
    navigate("/");
  };
  
  const goTaskList = () => navigate('/');

  return (
    <div>
      <h2>{id ? 'Редактировать задачу' : 'Создать новую задачу'}</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Задача:</Form.Label>
          <Form.Control type="text" required value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Описание:</Form.Label>
          <Form.Control as="textarea" rows={3} value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            label="Важно"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId="formGridState">
          <Form.Label>Категория</Form.Label>
          <Form.Select value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value='studies'>учёба</option>
            <option value='job'>работа</option>
            <option value='house'>дом</option>
            <option value='family'>семья</option>
            <option value='health'>здоровье</option>
            <option value='meetings'>встречи</option>
            <option value='other'>другое</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div className={styles.group__buttons}>
        <Button className={styles.button__primary} size="lg" variant="primary" onClick={handleSave}>{isEditMode ? 'Сохранить' : 'Добавить'}</Button>
        <div className={styles.auxiliary__buttons}>
          {isEditMode && (<Button variant="danger" onClick={handleDelete}>Удалить</Button>)}
          <Button variant="secondary" onClick={goTaskList}>Отмена</Button>
        </div>
      </div>
    </div>
  )
}