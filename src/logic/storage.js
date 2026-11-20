import { newProject } from "../data/project.js";
import { createSubsection } from "../data/todo.js";

const  STORAGE_KEY = "todoProjects";

export function saveProjects(projects) {
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

export function loadProjects() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
        return [];
    }

    try {
        const parsedProjects = JSON.parse(rawData);
        return parsedProjects.map(projData => {
            const project = newProject(projData.name, projData.id);

            projData.subsections.forEach(subData => {
                const sub = createSubsection(
                    subData.title,
                    subData.dueDate,
                    subData.id,
                    subData.isCompleted
                );

                subData.tasks.forEach(taskData => {
                    sub.addTask(taskData.text, taskData.id, taskData.isCompleted);
                });

                project.addExistingSubsection(sub);
            });

            return project;
        });
    } catch (error) {
        console.error("Something went wrong:", error.message);
        return [];
    }
};


