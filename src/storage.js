import { ProjectLogic, ToDoCard, allprojects } from "./classes";
import { renderProject } from "./projectDom";


export function addProjectToStorage(project){
    const projects = allprojects.getAllProjects();
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

export function getProjectFromStorage(){
    const projects = JSON.parse(localStorage.getItem("storedProjects" || "[]"));
    const cards = JSON.parse(localStorage.getItem("storedCards") || "[]");
    console.log(projects)
    console.log(cards)
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

