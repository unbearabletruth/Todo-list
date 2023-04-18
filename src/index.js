import './style.css';
import { ProjectLogic } from './classes';
import { renderProject, createNewProject } from './projectDom';


const DefaultProject = new ProjectLogic("Daily Project");
let CurrentProject = DefaultProject;
renderProject(DefaultProject);
createNewProject();

export {CurrentProject};
