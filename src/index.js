import './style.css';
import { ProjectLogic } from './classes';
import { renderProject, createNewProject } from './projectDom';


const DefaultProject = new ProjectLogic("default");
renderProject(DefaultProject);
createNewProject();


