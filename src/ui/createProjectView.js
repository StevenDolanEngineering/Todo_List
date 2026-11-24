export function renderCreateProject(manager) {
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
    createProjectInput.name = "project_name";
    createProjectInput.placeholder = "Create A Grocery List...";
    createProjectInput.required = true;

    const addSubsectionButton = document.createElement("button");
    addSubsectionButton.classList.add("form-button-add-new");
    addSubsectionButton.textContent = "+ New Subsection";
    addSubsectionButton.type = "button";
    addSubsectionButton.addEventListener("click", () => {
        subsectionsList.appendChild(createSectionSubsection());
    });

    const subsectionsList = document.createElement("div");
    subsectionsList.classList.add("subsections-list");

    const submitButton = document.createElement("button");
    submitButton.classList.add("form-button-submit");
    submitButton.textContent = "Submit Project";
    submitButton.type = "submit";

    createProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const projectName = createProjectInput.value.trim();
        if (!projectName) return;

        const createdProject = manager.addProject(projectName);
        manager.setActiveProject(createdProject.id);

        const subsectionContainers = subsectionsList.querySelectorAll(".subsection-container");
        subsectionContainers.forEach(subContainer => {
            const subTitle = subContainer.querySelector('[name="subsection_name"]').value.trim();
            const subDueDate = subContainer.querySelector('[name="due_date"]').value;

            if (subTitle && subDueDate) {
                const createdSub = manager.addProjectSubsection(subTitle, subDueDate);

                const taskInputs = subContainer.querySelectorAll('[name="task_text"]');
                taskInputs.forEach(taskInput => {
                    const taskText = taskInput.value.trim();
                    if (taskText) {
                        manager.addSubsectionTask(createdSub.id, taskText);
                    }
                });
            }
        });

        renderProjects(manager);
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("form-button-cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";
    cancelButton.addEventListener("click", () => {
        content.innerHTML = "";
        renderProjects(manager);
    })

    function createSectionSubsection() {
        const newSubsectionDiv = document.createElement("div");
        newSubsectionDiv.classList.add("subsection-container");

        const createSubsectionlabel = document.createElement("label");
        createSubsectionlabel.textContent = "Section Name";

        const createSubsectionInput = document.createElement("input");
        createSubsectionInput.type = "text";
        createSubsectionInput.name = "subsection_name";
        createSubsectionInput.placeholder = "Plan Meals...";
        createSubsectionInput.required = true;

        const createDueDateLabel = document.createElement("label");
        createDueDateLabel.textContent = "Due Date: "

        const createDueDateInput = document.createElement("input");
        createDueDateInput.type = "date";
        createDueDateInput.name = "due_date";
        createDueDateInput.required = true;

        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("form-button-add-new");
        addTaskButton.textContent = "+ New Task";
        addTaskButton.type = "button";
        addTaskButton.addEventListener("click", () => createSectionTask(newTaskDiv));

        const newTaskDiv = document.createElement("div");
        newTaskDiv.classList.add("task-container");

        newSubsectionDiv.appendChild(createSubsectionlabel);
        newSubsectionDiv.appendChild(createSubsectionInput);
        newSubsectionDiv.appendChild(createDueDateLabel);
        newSubsectionDiv.appendChild(createDueDateInput);
        newSubsectionDiv.appendChild(addTaskButton);
        newSubsectionDiv.appendChild(newTaskDiv);

        createSectionTask(newTaskDiv);

        newSubsectionDiv.appendChild(createDivider());

        return newSubsectionDiv
    }

    function createSectionTask(tasksContainer) {
        const createTaskLabel = document.createElement("label");
        createTaskLabel.textContent = "To Do: "

        const createTaskInput = document.createElement("input");
        createTaskInput.type = "text";
        createTaskInput.name = "task_text";
        createTaskInput.placeholder = "Look up recipes...";

        tasksContainer.appendChild(createTaskLabel);
        tasksContainer.appendChild(createTaskInput);
    }
    
    function createDivider() {
        const line = document.createElement("div");
        line.classList.add("section-line");
        return line;
    }

    subsectionsList.appendChild(createSectionSubsection());

    createProjectDiv.appendChild(createProjectTitle);
    createProjectDiv.appendChild(createProjectForm);
    createProjectForm.appendChild(createProjectLabel);
    createProjectForm.appendChild(createProjectInput);
    createProjectForm.appendChild(createDivider());
    createProjectForm.appendChild(addSubsectionButton);
    createProjectForm.appendChild(subsectionsList);
    createProjectForm.appendChild(submitButton);
    createProjectForm.appendChild(cancelButton);
    content.appendChild(createProjectDiv);
};