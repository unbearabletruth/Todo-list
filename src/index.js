import '../public/styles/style.css';
import { ProjectLogic } from './classes';
import { renderProjectName, renderProject, createNewProject } from './projectDom';
import { renderWelcomeCard } from './cardDom';
import { getProjectFromStorage } from './storage';

const DefaultProject = new ProjectLogic("Daily Project", 'id' + (new Date()).getTime());
let CurrentProject = DefaultProject;
renderProjectName(DefaultProject);
renderProject(DefaultProject);
createNewProject();
renderWelcomeCard();
getProjectFromStorage();


export {CurrentProject};
