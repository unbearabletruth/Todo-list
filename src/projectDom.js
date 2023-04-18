import { fillNewCard } from './cardDom';
import { ProjectLogic, allprojects } from './classes';
import { CurrentProject } from '.';


const sidebar = document.querySelector(".projects");


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
    const addProject = document.querySelector("button.addProject");
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
        console.log(project)
        project.renderAllCards();
        CurrentProject = project;
    });
}

fillNewCard();
export {createNewProject, renderProject, renderProjectName};