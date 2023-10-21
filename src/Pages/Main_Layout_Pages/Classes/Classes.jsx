import React, { useState, useEffect } from 'react';

const Classes = () => {
  const [log, setLog] = useState('');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const show = (e) => {
    setcheckBox(!checkbox)
    const currentTime = new Date().toLocaleTimeString();
    setLog(`Hold Time: ${currentTime}`);

    // Show the context menu at the mouse cursor position
    setContextMenuPosition({ x: e.clientX, y: e.clientY });

    // Determine if it's a mobile device (you can use a more precise check)
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // On mobile, show the context menu at the bottom of the screen
      setContextMenuPosition({ x: 0, y: window.innerHeight - 100 });
    }

    // setShowContextMenu(true);
  };

  const handleDoubleClick = () => {
    const currentDate = new Date().toLocaleDateString();
    setLog(`Double Click Date: ${currentDate}`);
  };

  const [checkbox, setcheckBox] = useState(false);
  const handleContextMenu1 = e => {
    e.preventDefault();
    show(e);
  }

  return (
    <div>

      <label
        htmlFor="{admin?._id}"
        className='hover:cursor-pointer hover:underline hover:text-blue-400'
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu1}
        onClick={() => { setcheckBox(true) }}
      >
        See Details
      </label>

      {/* hidden toggle  */}
      <input type="checkbox" id="{admin?._id}" className="peer modal-toggle" checked={checkbox} readOnly />
      <label htmlFor="{admin?._id}" className="cursor-pointer modal  bg-gray-700/50 m-0 p-0" onClick={() => { setcheckBox(false) }} >

        <label
          style={{
            position: 'absolute',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            transform: 'translate(10px, 10px)' // Offset to adjust the position
          }}
          className='px-4 md:px-6 py-8 scale-90 rounded-3xl bg-white transition shadow-2xl'
        >
          {/* toggle cross  */}
          <label htmlFor="{admin?._id}" className="btn-lg absolute right-1 cursor-pointer top-3 font-semibold text-red-600 active:bg-transparent" onClick={() => { setcheckBox(false) }}>x</label>
          {/* modal  */}
          <ul>
            <li className="cursor-pointer">Navigation Item 1</li>
            <li className="cursor-pointer">Navigation Item 2</li>
            <li className="cursor-pointer">Navigation Item 3</li>
          </ul>
        </label>
      </label>
      {log}

      {log}
    </div>
  );
};

export default Classes;
