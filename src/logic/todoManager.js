import { newProject } from "../data/project.js";

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
            const currentProject = setActiveProject(createdProject.id)
            return currentProject;
        }
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
            return newSubsection;
        }

    };

    function removeProjectSubsection(subsectionId) {
        if (isProjectActive()) {
            activeProject.removeSubsection(subsectionId);
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
    }

    function addSubsectionTask(subsectionId, text) {
        const newSubsectionTask = findProjectSubsection(subsectionId)?.addTask(text);
        return newSubsectionTask;
    }

    function removeSubsectionTask(subsectionId, taskId) {
        findProjectSubsection(subsectionId)?.removeTask(taskId);
    }

    function toggleSubsectionTaskCompleted(subsectionId, taskId) {
        findProjectSubsection(subsectionId)?.getTasks().find(task => task.id === taskId)?.toggleCompleted();
    }
    //Group C Initialization
    function init() {
        if (listOfProjects.length === 0) {
            addProject("General");
        }
    };


    return { addProject, removeProject, getProjects, setActiveProject, getActiveProject, addProjectSubsection, removeProjectSubsection, findProjectSubsection, toggleProjectSubsectionCompleted, addSubsectionTask, removeSubsectionTask, toggleSubsectionTaskCompleted, init  }
};