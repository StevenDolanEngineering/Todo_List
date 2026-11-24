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
    createProjectInput.placeholder = "Create A Grocery List...";

    const addSubsectionButton = document.createElement("button");
    addSubsectionButton.classList.add("form-button-add-new");
    addSubsectionButton.textContent = "+ New Subsection";
    addSubsectionButton.type = "button";
    addSubsectionButton.addEventListener("click", () => createSectionSubsection());

    function createSectionSubsection() {
        const createSubsectionlabel = document.createElement("label");
        createSubsectionlabel.textContent = "Section Name";

        const createSubectionInput = document.createElement("input");
        createSubsectionInput.type = "text";
        createSubectionInput.id = "subsection_name";
        createSubectionInput.placeholder = "Plan Meals..."

        const createDueDateLabel = document.createElement("label");
        createDueDateLabel.textContent = "Due Date: "

        const createDueDateInput = document.createElement("input");
        createDueDateInput.type = "date";
        createDueDateInput.id = "due_date";

        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("form-button-add-new");
        addTaskButton.textContent = "+ New Task";
        addTaskButton.type = "button";
        addTaskButton.addEventListener("click", () => createSectionTask());

        createSectionTask();
    }

    function createSectionTask() {
        const createTaskLabel = document.createElement("label");
        createTaskLabel.textContent = "To Do: "

        const createTaskInput = document.createElement("input");
        createTaskInput.type = "text";
        createTaskInput.id = "task_text";
        createTaskInput.placeholder = "Look up recipes...";
    }
    
    function createDivider() {
        const line = document.createElement("div");
        line.classList.add("section-line");
        return line;
    }
};