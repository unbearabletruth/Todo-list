import './style.css';
import { ProjectLogic } from './classes';
import { renderProjectName, renderProject, createNewProject } from './projectDom';
import { renderWelcomeCard } from './cardDom';



const DefaultProject = new ProjectLogic("Daily Project", 'id' + (new Date()).getTime());
let CurrentProject = DefaultProject;
renderProjectName(DefaultProject);
renderProject(DefaultProject);
createNewProject();
renderWelcomeCard();

export {CurrentProject};
