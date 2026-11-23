import { newProject } from "../data/project.js";
import { saveProjects, loadProjects } from "./storage.js";

export function projectManager() {
    
    const listOfProjects = [];
    let activeProject = null;

    function isProjectActive() {
        if (activeProject != null) {
            return true;
        }
        return false;
    }

    //Group A Project Management
    function addProject(name) {
        const createdProject = newProject(name);
        listOfProjects.push(createdProject);
        if (listOfProjects[0] === createdProject) {
            setActiveProject(createdProject.id);
        }
        saveProjects(listOfProjects);
        return createdProject;
    };

    function removeProject(projectId) {
        const projectIndex = listOfProjects.findIndex(project => project.id === projectId);
        if (projectIndex !== -1) {
            listOfProjects.splice(projectIndex, 1);
            
            if (projectId === activeProject?.id) {
                activeProject = listOfProjects.length > 0 ? listOfProjects[0] : null;
            }
        }
        saveProjects(listOfProjects);
        return [...listOfProjects];
    };

    function getProjects() {
        return [...listOfProjects];
    };

    function setActiveProject(projectId) {
        activeProject = listOfProjects.find(project => project.id === projectId);
        return activeProject;
    };

    function getActiveProject() {
        return activeProject;
    };

    //Group B Delegating Subsections & Tasks
    function addProjectSubsection(title, dueDate) {
        if (isProjectActive()) {
            const newSubsection = activeProject.addSubsection(title, dueDate);
            saveProjects(listOfProjects);
            return newSubsection;
        }

    };

    function removeProjectSubsection(subsectionId) {
        if (isProjectActive()) {
            activeProject.removeSubsection(subsectionId);
            saveProjects(listOfProjects);
        }
    };

    function findProjectSubsection(subsectionId) {
        if (isProjectActive()) {
            const searchedSubsection = activeProject.getSubsections().find(subsection => subsection.id === subsectionId);
            return searchedSubsection;
        }
    };

    function toggleProjectSubsectionCompleted(subsectionId) {
        findProjectSubsection(subsectionId)?.toggleCompleted();
        saveProjects(listOfProjects);
    }

    function addSubsectionTask(subsectionId, text) {
        const newSubsectionTask = findProjectSubsection(subsectionId)?.addTask(text);
        saveProjects(listOfProjects);
        return newSubsectionTask;
    }

    function removeSubsectionTask(subsectionId, taskId) {
        findProjectSubsection(subsectionId)?.removeTask(taskId);
        saveProjects(listOfProjects);
    }

    function toggleSubsectionTaskCompleted(subsectionId, taskId) {
        findProjectSubsection(subsectionId)?.getTasks().find(task => task.id === taskId)?.toggleCompleted();
        saveProjects(listOfProjects);
    }
    //Group C Initialization
    function init() {
        const savedProjects = loadProjects();

        if (savedProjects.length > 0) {
            listOfProjects.push(...savedProjects);
            activeProject = setActiveProject(listOfProjects[0].id);
        } else {
            addProject("General");
        };
    };


    return { addProject, removeProject, getProjects, setActiveProject, getActiveProject, addProjectSubsection, removeProjectSubsection, findProjectSubsection, toggleProjectSubsectionCompleted, addSubsectionTask, removeSubsectionTask, toggleSubsectionTaskCompleted, init  }
};