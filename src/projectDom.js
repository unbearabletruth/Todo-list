import { fillNewCard } from './cardDom';
import { ProjectLogic, allprojects } from './classes';
import { CurrentProject } from '.';
import { addProjectToStorage, removeProjectFromStorage } from './storage';
import bin from "../public/images/bin.svg";

const sidebar = document.querySelector(".projects");


function projectFormName(){
    const nameinput = document.createElement("input");
    nameinput.id = "projectinput"
    nameinput.type = "text";
    nameinput.placeholder = "Project name";
    nameinput.required = true;
    return nameinput;
}

function projectNumberofCards(project){
    const counter = document.getElementById(`${project.index}`);
    if (project.getLength() === 1){
        counter.textContent = `${project.getLength()} task`;
    }else{
        counter.textContent = `${project.getLength()} tasks`;
    } 
}

function projectFormSubmit(){
    const submit = document.createElement("button");
    submit.classList.add("projectFormButtons");
    submit.innerText = "Add";
    return submit;
}

function projectFormCancel(form){
    const cancel = document.createElement("button");
    cancel.classList.add("projectFormButtons");
    cancel.innerText = "Cancel";
    cancel.addEventListener("click", (e) => {
        e.preventDefault(); 
        form.remove();
    })
    return cancel;
}

function projectFormForm(nameinput){
    const formProject = document.createElement("form");
    formProject.id = "projectForm";
    formProject.addEventListener("submit", (e) => {
        const projectIndex = 'id' + (new Date()).getTime();
        const newProjectL = new ProjectLogic(nameinput.value, projectIndex);
        renderProject(newProjectL);
        addProjectToStorage(newProjectL);//
        
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
        const buttons = document.createElement("div");
        buttons.id = "projectFormButtons";
        const formProject = projectFormForm(nameinput);
        const cancel = projectFormCancel(formProject);
        formProject.appendChild(nameinput);
        buttons.appendChild(submit);
        buttons.appendChild(cancel);
        formProject.appendChild(buttons);
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
    const projects = document.querySelectorAll("div.project");
    projects.forEach(project => project.style.backgroundColor = "#fafafa");//check if color 1 element is better
    projectDom.style.backgroundColor = "#38bdf8";//hover overrides selected
}  

function renderProjectTaskCounter(project){
    const counter = document.createElement("div");
    counter.id = project.index;
    counter.classList.add("projectCounter");
    counter.textContent = `${project.getLength()} tasks`;
    return counter;
}

function deleteBinProject(project, renderedProject){
    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("cardimg");
    deleteIcon.src = bin;
    deleteIcon.addEventListener("click", () => {
        removeProject(project);
        renderedProject.remove();
    })
    return deleteIcon;
}

function renderProject(project){
    const newproject = document.createElement("div");
    newproject.classList.add("project");
    newproject.textContent = project.name;
    const counter = renderProjectTaskCounter(project);
    newproject.appendChild(counter);
    sidebar.appendChild(newproject);
    const deleteBin = deleteBinProject(project, newproject);
    newproject.appendChild(deleteBin);
    allprojects.add(project);
    newproject.addEventListener("click", () => {
        const todos = document.querySelector(".todos");
        while (todos.firstChild) {
            todos.removeChild(todos.firstChild);
        }
        renderProjectName(project);
        renderProjectColor(newproject);
        project.renderAllCards();
        CurrentProject = project;
    });
}

function removeProject(project){
    allprojects.remove(project);
    removeProjectFromStorage(project);
}

fillNewCard();
export {createNewProject, renderProject, renderProjectName, projectNumberofCards, renderProjectTaskCounter};