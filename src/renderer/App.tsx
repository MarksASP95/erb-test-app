import { useEffect, useMemo, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import FilesViewer from './componets/FilesViewer'

const MainComponent = () => {

  const [ path, setPath ] = useState<string>();
  const [ filteredFiles, setFilteredFiles ] = useState<string[] | null>(null);

  const setAppPath = () => {
    // @ts-ignore
    (window.electron.getAppPath() as Promise<string>)
      .then((appPath) => {
        setPath(appPath);
      });
  }

  useEffect(() => {
    setAppPath();
  }, []);

  useEffect(() => {
    if (!path) return;
    // @ts-ignore
    (window.electron.getFiles(path) as Promise<string[]>)
      .then((files) => {
        const _filteredFiles = files.filter((s: any) => s.name.startsWith(searchString));
        setFilteredFiles(_filteredFiles);
      });
  }, [path]);

  // const onBack = () => {}
  // const onOpen = (folder: string) => {};
  const onBack = () => {
    const pathSplit = path!.split("/");
    pathSplit.pop();
    const pathBack = pathSplit.join("/");
    setPath(pathBack);
  }
  const onOpen = (folder: string) => {
    // @ts-ignore
    (window.electron.joinPaths(path, folder) as Promise<string>)
      .then((fullPath) => {
        setPath(fullPath);
      });
  };

  const [ searchString, setSearchString ] = useState("");

  if (!path || !filteredFiles) return <p>Loading...</p>;

  return (
    <div className="container mt-2">
    <h4>{path}</h4>
    <div className="form-group mt-4 mb-2">
      <input 
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
        className="form-control form-control-sm"
        placeholder="File search"
        type="text" 
      />
    </div>
    <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
  </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </Router>
  );
}
