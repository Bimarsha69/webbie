import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Project } from '../types';

interface DashboardProps {
  projects: Project[];
  onSaveCode: (projectId: number, code: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onSaveCode }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (selectedProject && value !== undefined) {
      setSelectedProject({ ...selectedProject, code: value });
    }
  };

  const handleSaveCode = () => {
    if (selectedProject) {
      onSaveCode(selectedProject.id, selectedProject.code);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h3 className="text-xl font-bold mb-2">Projects</h3>
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className={`cursor-pointer p-2 ${
                  selectedProject?.id === project.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleProjectSelect(project)}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4">
          <h3 className="text-xl font-bold mb-2">Code Editor</h3>
          {selectedProject ? (
            <>
              <Editor
                height="60vh"
                defaultLanguage="javascript"
                value={selectedProject.code}
                onChange={handleCodeChange}
              />
              <button
                onClick={handleSaveCode}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Code
              </button>
            </>
          ) : (
            <p>Select a project to start editing</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
