import { useState } from 'react';
import './App.css';
import AddProject from './components/AddProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectSidebar from './components/ProjectSidebar.jsx';
import SelectedTask from './components/SelectedTask.jsx';
function App() {

 
  const [projectstate, setProjectState] = useState({
  selectedProjectId: undefined,
  projects:[],
  tasks:[],
  });

  function handleAddTask(text){
    setProjectState((prevState)=>{
      const taskId = Math.random();
      const newTask = {
       text: text,
       projectId: prevState.selectedProjectId,
       id: taskId,
      };
      return{
        ...prevState,
       tasks: [newTask, ...prevState.tasks]
      };
    });
  }

 function handleDeleteTask(id){
  setProjectState((prevState) => {
    return{
      ...prevState,
      tasks:prevState.tasks.filter((task) =>task.id !== id),
    };
  });
 } 

  function handleSelectProject(id){
    setProjectState((prevState) => {  
      return{
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handlestate(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProject(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData){
    setProjectState((prevState)=>{
      const projectId = Math.random();
      const newProject = {
       ...projectData,
       id: projectId,
      };
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject(id){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:prevState.projects.filter(
          (project)=>project.id !== prevState.selectedProjectId
        ),
      };
    });
  } 
  

 
  const selectedTask = projectstate.projects.find(project=>project.id === projectstate.selectedProjectId); 

  let content = (
  <SelectedTask  project={selectedTask}  
  onDelete = {handleDeleteProject}
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks= {projectstate.tasks}
  selectedProjectId ={projectstate.selectedProjectId}
  />
);

  if(projectstate.selectedProjectId === null){
    content = ( 
    <AddProject  onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    );

  } else if(projectstate.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject = {handlestate}/>;
    }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject = {handlestate}
      projects = {projectstate.projects}
      onSelectProject = {handleSelectProject}
      />
     {content}
    </main>
  );
}

export default App;
