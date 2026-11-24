import { projectManager } from "../logic/todoManager.js";

export function renderProjects() {
    
};

export function renderCreateProject() {
    const content = document.querySelector("#main-content");

    const createProjectDiv = document.createElement("div");
    createProjectDiv.classList.add("create-project-container");

    const createProjectTitle = document.createElement("h2");
    createProjectTitle.classList.add("create-project-title");
    createProjectTitle.textContent = "Create A New Project";

    const createProjectForm = document.createElement("form");
    createProjectForm.method = "post";

    const createProjectLabel = document.createElement("label");
    createProjectLabel.textContent = "Project Name";

    const createProjectInput = document.createElement("input");
    createProjectInput.type = "text";
    createProjectInput.id = "project_name";
    createProjectInput.placeholder = "Create To Do List...";

    
    
    function createDivider() {
        const line = document.createElement("div");
        line.classList.add("section-line");
        return line;
    }
};