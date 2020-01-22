import React, {useState} from 'react';
import Clock from './Clock.jsx';
import Blockers from './Blockers.jsx';
import Editor from './Editor.jsx';

const App = () => {
  const [visible, setVisible] = useState(false)
  const cls = (visible)
    ? 'visible'
    : 'hidden'
  return <div>
    <div className={`popup ${cls}`}>
      <Editor sv={() => setVisible(!visible)} />      
    </div>
    <div>
      <Clock sv={() => setVisible(!visible)} />      
      <Blockers />
    </div>
  </div>
}

export default App;
