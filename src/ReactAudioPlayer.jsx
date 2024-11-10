import { useContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import dataContext from './context/dataContext';

const ReactAudioPlayer=()=>{
     const {audios,audioRef,isPlaying,setIsPlaying,num}=useContext(dataContext)

     
    return(
      <>
      <div>
      <AudioPlayer
      style={{display:"none"}}
        src={audios[num]}  // Set audio source
        autoPlay={isPlaying}
        ref={audioRef}
        id="audio-player"
        onPlay={()=>setIsPlaying(true)}
        onPause={()=>setIsPlaying(false)}
        controls={true} // Hide default controls to use custom buttons
      />
      </div>
      </>
    )
   }

export default ReactAudioPlayer  


