import { createContext, useContext, useState } from "react";
import { DATABASE, type ITaskItem } from "../database/database";


type TaskContextType = {
    tasks: ITaskItem[];
    setTasks: React.Dispatch<React.SetStateAction<ITaskItem[]>>
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('Ошибка контекста!');
    return context;
}

export function TaskProvider({children} : {children: React.ReactNode}) {
    const [tasks, setTasks] = useState<ITaskItem[]>(DATABASE);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}