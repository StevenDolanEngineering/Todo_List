import { differenceInCalendarDays, parseISO } from "date-fns";

export function createSubsection(title, dueDate, id, isCompleted = false) {
    if (id === undefined) {
        id = crypto.randomUUID();
    };

    const tasks = [];
    let completed = isCompleted;    

    const priority = ((dueDate) => {

        //Extracts days left from today to target due date for Project
        const daysLeft = differenceInCalendarDays(parseISO(dueDate), new Date());

        //Uses daysLeft to set priority for projects automatically
        if (daysLeft <= 2) {
            const priority = "High";
            return priority;
        } else if (daysLeft > 2 && daysLeft < 7) {
            const priority = "Medium";
            return priority;
        } else {
            const priority = "Low";
            return priority;
        }
    })(dueDate);

    function addTask(text, taskId = crypto.randomUUID(), isCompleted = false) {
        const newTask = {
            id : taskId,
            text,
            completed : isCompleted,
            toggleCompleted() {
                this.completed = !this.completed;
            }
        };
        tasks.push(newTask);
        return newTask;
    }

    function removeTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return tasks;
        };
    };

    function getTasks() {
        return [...tasks];
    };

    function toggleCompleted() {
        completed = !completed;
    }

    function getCompleted() {
        return completed;
    }

    return { id, title, dueDate, priority, addTask, removeTask, getTasks, toggleCompleted, getCompleted }
};