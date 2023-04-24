import { ProjectLogic, ToDoCard } from "./classes";
import { renderProject } from "./projectDom";


export function addProjectToStorage(project){
    console.log(project)
    localStorage.setItem("storedProject", JSON.stringify(project));  
}

export function addCardToProjectStorage(project, card){
    const cards = project.getAllCards();
    console.log(cards)
    localStorage.setItem("storedCards", JSON.stringify(cards));
}

export function removeCardFromProjectStorage(card){
    console.log(card)
    const cards = JSON.parse(localStorage.getItem("storedCards") || "[]");
    for (let i = 0; i < cards.length; i++){
        if(cards[i].uniqueID === card.uniqueID){
            cards.splice(i, 1);
        }        
    }
    localStorage.setItem("storedCards", JSON.stringify(cards));
}

export function getProjectFromStorage(){
    const project = ProjectLogic.fromJSON(localStorage.getItem("storedProject"))
    const keeper = JSON.parse(localStorage.getItem("storedCards") || "[]");
    for (let card of keeper){
        project.add(card);
    }
    console.log(project)
    renderProject(project);
}

