import React, { useContext, useEffect, useState } from 'react';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import dataContext from '../context/dataContext';


const Menulist = () => {
  const {styledLinkElement,audios}=useContext(dataContext)
  // Use state to handle the audioFiles array to avoid mutating props
  const [audioFiles, setAudioFiles] = useState();



  const addSong = (file) => {
    const audioUrl = URL.createObjectURL(file); // Create a URL for the file
    const newAudio = new Audio(audioUrl); // Create new Audio object
    setAudioFiles([...audios, newAudio]); // Add new audio file to state
    // Log the file details for debugging
  };

  
  return (
    <>
      <section id="listlayout">
        <section className="menu-list">
          <NavBar style={styledLinkElement} />
        </section>
        <section className="addsong">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const songFile = e.target.elements.song.files[0]; // Access file from input field
              if (songFile) {
                addSong(songFile); // Add song using the addSong function
              } else {
                console.log('No file selected'); // Handle case where no file is selected
              }
            }}
          >
            <label htmlFor="song">Add song</label>
            <input type="file" id="song" name="song" accept="audio/*" />
            <button type="submit">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </form>
        </section>
      </section>

    </>
  );
};

export default Menulist;
