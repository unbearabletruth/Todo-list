import { ProjectLogic, ToDoCard, allprojects } from "./classes";
import { renderProject } from "./projectDom";


export function addProjectToStorage(){
    console.log(allprojects)
    const projects = allprojects.getAllProjects();
    projects.shift();//remove default from rerendering
    localStorage.setItem("storedProjects", JSON.stringify(projects));  
}

export function addCardToProjectStorage(){
    let cards = [];
    for (let project of allprojects.getAllProjects()){
        cards.push(project.getAllCards());
    }
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
    const projects = JSON.parse(localStorage.getItem("storedProjects" || "[]"));
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].index === project.index){
            projects.splice(i, 1);
        }    
    }
    localStorage.setItem("storedProjects", JSON.stringify(projects));  
}

export function getProjectFromStorage(){
    console.log(allprojects)
    const projects = JSON.parse(localStorage.getItem("storedProjects" || "[]"));
    const cards = JSON.parse(localStorage.getItem("storedCards") || "[]");
    for (let project of projects){
        let projectObj = ProjectLogic.fromJSON(project);
        projectObj.showAllCards();
        projectObj.empty();
        console.log(projectObj.getAllCards());
        for (let proj of cards){
            for (let card of proj){
                if (projectObj.index === card.projectID){
                    console.log("hello")
                    projectObj.add(card);
                }
            }  
        }
        renderProject(projectObj);
    }   console.log(allprojects)
}

//if i add another project after adding projects with cards their cards multiply
//fixed with emptying project array before adding cards from storage
//allprojects not empty after updating the page