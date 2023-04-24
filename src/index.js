import '../public/styles/style.css';
import { ProjectLogic } from './classes';
import { renderProjectName, renderProject, createNewProject, projectNumberofCards} from './projectDom';
import { renderCard } from './cardDom';
import { getProjectFromStorage } from './storage';
import { ToDoCard } from './classes';



const DefaultProject = new ProjectLogic("Daily Project", 'id' + (new Date()).getTime());
let CurrentProject = DefaultProject;
renderProjectName(DefaultProject);
renderProject(DefaultProject);
createNewProject();

function renderWelcomeCard(){
    const uniqueID = 'id' + (new Date()).getTime();
    const title = "Welcome";
    const description = "This is a welcoming card! Just click the bin icon below to delete it!";
    const dueDate = "2018-06-07T00:00";
    const priority = "Low";
    const projectID = CurrentProject.index;
    const newToDo = new ToDoCard(title, description, dueDate, priority, uniqueID, projectID);
    CurrentProject.add(newToDo);
    projectNumberofCards(CurrentProject);
    renderCard(newToDo);
}

renderWelcomeCard();
getProjectFromStorage();


export {CurrentProject};
