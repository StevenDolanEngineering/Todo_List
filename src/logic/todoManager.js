import { newProject } from "../data/project.js";

export function projectManager() {
    
    const listOfProjects = [];
    let activeProject = null;

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

    //Group C Initialization

    return { addProject, removeProject, getProjects, setActiveProject, getActiveProject  }
};