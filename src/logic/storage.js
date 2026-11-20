import { newProject } from "../data/project.js";
import { createSubsection } from "../data/todo.js";

const  STORAGE_KEY = "todoProjects";

function saveProjects(projects) {
    const serializedProjects = projects
        .map(project => {
            const serializedSubsections = project.getSubsections()
            .map(sub => {
                const serializedTasks = sub.getTasks()
                .map(task => {
                    return { id: task.id, text: task.text, isCompleted: task.completed};
                });
                return { id: sub.id, title: sub.title, dueDate: sub.dueDate,  isCompleted: sub.getCompleted(), tasks: serializedTasks };
            });
            return { id: project.id, name: project.name, subsections: serializedSubsections};
        });
        
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedProjects));    
};

function loadProjects() {
    
};


