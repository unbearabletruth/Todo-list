import { fillNewCard } from './cardDom';
import { ListofProjects } from './classes';
import { ProjectLogic } from './classes';
import { CurrentProject } from '.';

const addProject = document.querySelector("button.addProject");
const sidebar = document.querySelector(".projects");
const todos = document.querySelector(".todos");
const content = document.querySelector(".content");

function projectFormName(){
    const nameinput = document.createElement("input");
    nameinput.id = "projectinput"
    nameinput.type = "text";
    nameinput.placeholder = "Project name";
    return nameinput;
}

function projectFormSubmit(formProject, nameinput){
    const submit = document.createElement("button");
    submit.id = "projectsubmitbutton";
    submit.innerText = "Add";
    submit.addEventListener("click", (e) => {
        const newProjectL = new ProjectLogic(nameinput.value);
        renderProject(newProjectL);
        formProject.remove();  
        e.preventDefault();   
    });
    return submit;
}

function createNewProject(){
    addProject.addEventListener("click", () => {
        const formProject = document.createElement("form");
        formProject.id = "projectForm";
        const nameinput = projectFormName();
        const submit = projectFormSubmit(formProject, nameinput);
        formProject.appendChild(nameinput);
        formProject.appendChild(submit);
        sidebar.appendChild(formProject);   
    })
}

function renderProjectName(project){
    const whichProject = document.createElement("p");
    whichProject.classList.add("currentproject")
    whichProject.textContent = project.name;
    content.appendChild(whichProject);
    return whichProject;
}
    
function renderProject(project){
    const newproject = document.createElement("div");
    newproject.classList.add("project");
    newproject.textContent = project.name;
    sidebar.appendChild(newproject);
    newproject.addEventListener("click", () => {
        while (todos.firstChild) {
            todos.removeChild(todos.firstChild);
        }
        renderProjectName(project);
        console.log(project)
        project.renderAllCards();
        const allprojects = new ListofProjects;
        allprojects.add(project);
        CurrentProject = project;
    });
}

fillNewCard();
export {createNewProject, renderProject, renderProjectName};