
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './TaskList.module.css'
import { TaskItem } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../../contaxt/TaskContext';
import type { ITaskItem } from '../../database/database'
import { useEffect } from 'react';


export function TaskList() {
    const {tasks, setTasks} = useTaskContext();

    const sortTasks = (TaskList: ITaskItem[]) => {
        return [...TaskList].sort((a, b) => {
            if (a.status !== b.status) {
                return Number(a.status) - Number(b.status);
            }
            if (a.priority !== b.priority) {
                return Number(b.priority) - Number(a.priority);
            }
            return 0;
        });
    }

    useEffect(() => {
        setTasks(sortTasks([...tasks]));
    }, []);

    const navigate = useNavigate();
    const goTask = () => navigate('/task')

    return (
        <Container fluid>
            <Row className={styles.row}>
                {tasks.map((task, index) => (
                    <Col key={index}>
                        <TaskItem task={task}></TaskItem>
                    </Col>
                ))}
            </Row>
            <Button variant="primary" className={styles.button__primary} onClick={goTask}>Добавить</Button>
        </Container>
    );
}
