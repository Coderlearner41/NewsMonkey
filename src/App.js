import React, {useState} from 'react';
import './App.css';
import NavBar from './Components/NavBar.js';
import LoadingBar from 'react-top-loading-bar'
import New from './Components/News.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const  App =() => {

  const [progress, setProgress] = useState(0)

  const changeProgress = () => {
    setProgress(100)
  }
    return (
      <BrowserRouter>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/business" element={<New setProgress= {changeProgress} key="business" pageSize={6} country="in" category="business" />} />
          <Route exact path="/sports" element={<New setProgress={changeProgress} key="sports" pageSize={6} country="in" category="sports" />} />
          <Route eaxct path="/entertainment" element={<New setProgress={changeProgress} key="entertainment" pageSize={6} country="in" category="entertainment" />} />
          <Route eaxct path="/health" element={<New setProgress={changeProgress} key="health" pageSize={6} country="in" category="health" />} />
          <Route eaxct path="/science" element={<New setProgress={changeProgress} key="science" pageSize={6} country="in" category="science" />} />
          <Route eaxct path="/technology" element={<New setProgress={changeProgress} key="technology" pageSize={6} country="in" category="technology" />} />
          <Route eaxct path="/" element={<New setProgress={changeProgress} key="general" pageSize={6} country="in" category="general" />} />
        </Routes>
      </BrowserRouter>
    );
  }


export default App;
