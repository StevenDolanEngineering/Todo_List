import { createSubsection } from "./todo.js";

export function newProject(name, id) {
    if (id === undefined) {
        id = crypto.randomUUID();
    };

    const subsections = [];

        function addSubsection(title, dueDate) {
        const newSubsection = createSubsection(title, dueDate);
        subsections.push(newSubsection);
        return newSubsection;
    }

    function removeSubsection(subsectionId) {
        const subsectionIndex = subsections.findIndex(subsection => subsection.id === subsectionId);
        if (subsectionIndex !== -1) {
        subsections.splice(subsectionIndex, 1);
        return subsections;
        };
    };

    function getSubsections() {
        return [...subsections];
    };

    return { id, name, addSubsection, removeSubsection, getSubsections };
}