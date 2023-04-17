import { fillNewCard } from './cardDom';
import { ListofProjects } from './classes';
import { ProjectLogic } from './classes';

const addProject = document.querySelector("button.addProject");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".todos");

function createNewProject(){
    addProject.addEventListener("click", () => {
        const formProject = document.createElement("form");
        formProject.id = "projectForm";
        const titlelabel = document.createElement("label");
        titlelabel.textContent = "Name";
        const titleinput = document.createElement("input");
        titleinput.type = "text";
        const submit = document.createElement("button");
        submit.innerText = "Add";
        formProject.appendChild(titlelabel);
        formProject.appendChild(titleinput);
        formProject.appendChild(submit);
        sidebar.appendChild(formProject);
        submit.addEventListener("click", (e) => {
            const newProjectL = new ProjectLogic(titleinput.value);
            renderProject(newProjectL);
            formProject.remove();  
            e.preventDefault();   
        });
    })
}
    
function renderProject(project){
    const newproject = document.createElement("div");
    newproject.classList.add("project");
    newproject.textContent = project.name;
    sidebar.appendChild(newproject);
    newproject.addEventListener("click", () => {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
        console.log(project)
        project.renderAllCards();
        const allprojects = new ListofProjects;
        allprojects.add(project);
        fillNewCard(project);
    });
}

export {createNewProject, renderProject};