import React, { useState } from 'react';

const Classes = () => {
    const [log, setLog] = useState('');

    const handleHold = (e) => {
      e.preventDefault(); // Prevent the default context menu
      const currentTime = new Date().toLocaleTimeString();
      setLog(`Hold Time: ${currentTime}`);
    };
  
    const handleDoubleClick = () => {
      const currentDate = new Date().toLocaleDateString();
      setLog(`Double Click Date: ${currentDate}`);
    };
  
    return (
      <div>
        <div
          onContextMenu={handleHold}
          onDoubleClick={handleDoubleClick}
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          Right-click (Hold) or Double-click me
        </div>
        <div>{log}</div>
      </div>
    );
};

export default Classes;