import { ProjectLogic, ToDoCard, allprojects } from "./classes";
import { renderProject } from "./projectDom";


export function addProjectToStorage(project){
    const projects = allprojects.getAllProjects();
    projects.shift();//remove default from rerendering
    localStorage.setItem("storedProjects", JSON.stringify(projects));  
}

export function addCardToProjectStorage(){
    let cards = [];
    for (let project of allprojects.getAllProjects()){
        console.log(project.getAllCards())
        cards.push(project.getAllCards());
        console.log(cards)
    }
    console.log(cards)
    localStorage.setItem("storedCards", JSON.stringify(cards));
}

export function removeCardFromProjectStorage(card){
    console.log(card)
    const cards = JSON.parse(localStorage.getItem("storedCards") || "[]");
    for (let proj = 0; proj < cards.length; proj++) {
        for (let todo = 0; todo < cards[proj].length; todo++) {
            if(cards[proj][todo].uniqueID === card.uniqueID){
                cards[proj].splice(todo, 1);
            }  
        }  
    }
    localStorage.setItem("storedCards", JSON.stringify(cards));
}

export function removeProjectFromStorage(project){
    console.log(project)
    const projects = JSON.parse(localStorage.getItem("storedProjects" || "[]"));
    for (let i = 0; i < projects.length; i++) {
        console.log(projects[i].index)
        if (projects[i].index === project.index){
            projects.splice(i, 1);
        }    
    }
    localStorage.setItem("storedProjects", JSON.stringify(projects));  
}

export function getProjectFromStorage(){
    const projects = JSON.parse(localStorage.getItem("storedProjects" || "[]"));
    const cards = JSON.parse(localStorage.getItem("storedCards") || "[]");
    for (let project of projects){
        let projectObj = ProjectLogic.fromJSON(project);
        for (let proj of cards){
            for (let card of proj){
                if (projectObj.index === card.projectID)
                projectObj.add(card);
            }  
        }
        renderProject(projectObj);
    }   
}

