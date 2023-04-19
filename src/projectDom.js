import { fillNewCard } from './cardDom';
import { ProjectLogic, allprojects } from './classes';
import { CurrentProject } from '.';


const sidebar = document.querySelector(".projects");


function projectFormName(){
    const nameinput = document.createElement("input");
    nameinput.id = "projectinput"
    nameinput.type = "text";
    nameinput.placeholder = "Project name";
    nameinput.required = true;
    return nameinput;
}

function projectFormSubmit(){
    const submit = document.createElement("button");
    submit.id = "projectsubmitbutton";
    submit.innerText = "Add";
    return submit;
}

function projectFormForm(nameinput){
    const formProject = document.createElement("form");
    formProject.id = "projectForm";
    formProject.addEventListener("submit", (e) => {
        const newProjectL = new ProjectLogic(nameinput.value);
        renderProject(newProjectL);
        formProject.remove();  
        e.preventDefault();   
    });
    return formProject;
}

function createNewProject(){
    const addProject = document.querySelector("button.addProject");
    addProject.addEventListener("click", () => {
        const nameinput = projectFormName();
        const submit = projectFormSubmit();
        const formProject = projectFormForm(nameinput);
        formProject.appendChild(nameinput);
        formProject.appendChild(submit);
        sidebar.appendChild(formProject);   
    })
}

function renderProjectName(project){
    const previous = document.querySelector(".currentproject");
    if (previous != null){
        previous.remove();
    }
    const whichProject = document.createElement("p");
    whichProject.classList.add("currentproject");
    whichProject.textContent = project.name;
    const content = document.querySelector(".content");
    content.appendChild(whichProject);
    return whichProject;
}

function renderProjectColor(projectDom){
    document.querySelectorAll("div.project").forEach(el => el.style.backgroundColor = "#fafafa");
    projectDom.style.backgroundColor = "#7dd3fc";
}  

function renderProject(project){
    const newproject = document.createElement("div");
    newproject.classList.add("project");
    newproject.textContent = project.name;
    sidebar.appendChild(newproject);
    allprojects.add(project);
    newproject.addEventListener("click", () => {
        const todos = document.querySelector(".todos");
        while (todos.firstChild) {
            todos.removeChild(todos.firstChild);
        }
        renderProjectName(project);
        renderProjectColor(newproject);
        console.log(project)
        project.renderAllCards();
        CurrentProject = project;
    });
}

fillNewCard();
export {createNewProject, renderProject, renderProjectName};