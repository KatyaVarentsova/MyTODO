//TaskItem.tsx
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styles from './TaskItem.module.css';
import type { ITaskItem } from '../../database/database'
import { useTaskContext } from '../../contaxt/TaskContext';
import { Link } from 'react-router-dom';

interface TaskItemProps {
  task: ITaskItem;
}


export function TaskItem({ task }: TaskItemProps) {
  const { tasks, setTasks } = useTaskContext();

  const handleToggle = () => {
    const updatedTasks = tasks.map(t =>
      t === task ? { ...t, status: !t.status } : t
    )


    const sortedTasks = [...updatedTasks].sort((a, b) => {
      if (a.status !== b.status) return Number(a.status) - Number(b.status);
      if (a.priority !== b.priority) return Number(b.priority) - Number(a.priority);
      return 0;
    })
    setTasks(sortedTasks)
  };

  const cardClassName = `${styles[`card__${task.category}`]} ${task.status ? styles.doneCard : ''}`;
  const titleClassName = `${task.priority ? styles.priorityTitle : ''} ${task.status ? styles.doneText : ''} ${styles[`card__${task.priority}`]}`

  return (
    <Card className={cardClassName}>
      <Card.Body className={styles.form__body}>
        <Form.Check aria-label="option" className={styles.form__check} checked={task.status} onChange={handleToggle} />
        <div>
          <Card.Title className={titleClassName}>{task.title}</Card.Title>
          {task.description && (
            <Card.Text className={task.status ? styles.doneText : ''}>
            {task.description}
          </Card.Text>
        )}
        </div>
        <Link to={`/task/${task.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
          </svg>
        </Link>
      </Card.Body>
    </Card>
  );
}
