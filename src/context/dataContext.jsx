import { createContext ,useState,useRef,useEffect, useMemo} from "react";
import React from "react";


const dataContext=createContext()

export const DataProvider=({children})=>{
  const [shuffleOption, setShuffleOption] = useState(0); 
   const [isWideScreen,setIsWideScreen]=useState(window.innerWidth>768)
   const [num, setNum] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef=useRef(null)// Shuffle state
   const imageRef=useRef(null)
   const progressRef=useRef(null)
   const [currentTime, setCurrentTime] = useState('00:00');
   const [maxDuration, setMaxDuration] = useState('00:00'); 

   const toggleShuffle = () => {
    setShuffleOption(prevOption => (prevOption === 1 ? 0 : 1));
  };


   const handleNextSong = () => {
    if (shuffleOption === 1) {
      const randomNum = Math.floor(Math.random() * audios.length);
      setNum(randomNum);
    } else {
      setNum(prevNum => (prevNum >= audios.length - 1 ? 0 : prevNum + 1));
    }
    if(isPlaying==false) {
      handlePlayPause()
    }
    
  };

  const handlePrevSong = () => {
    if (shuffleOption === 1) {
      const randomNum = Math.floor(Math.random() * audios.length);
      setNum(randomNum);
    } else {
      setNum(prevNum => (prevNum <= 0 ?audios.length - 1 : prevNum - 1));
    }
    if(isPlaying==false) {
       handlePlayPause()
    }
  };


  const handleChangeSong = (index) => {
    setNum(index);
    if(!isPlaying) {
      handlePlayPause()}
  };

  const handleVolumeChange = (increment) => {
    const audioElement = audioRef.current?.audio.current;
    if (audioElement) {
      const newVolume = Math.min(1.0, Math.max(0.0, audioElement.volume + increment));
      audioElement.volume = newVolume;
    }
    
  };


  const handleProgressInput = (e) => {
    const audioElement = audioRef.current?.audio.current;
    if (audioElement) {
      audioElement.currentTime = e.target.value;
    }
   
  };
  
  const handlePlayPause = () => {
    const audioElement = audioRef.current?.audio.current;
    setIsPlaying(prevIsPlaying=>{
      const newIsPlaying=!prevIsPlaying
      if(newIsPlaying){
        imageRef.current?.classList.add('animation')
        audioElement.play();
      } else {
        imageRef.current?.classList.remove('animation')
        audioElement.pause();
      }
      return newIsPlaying
    }
     
    )
  
  };

  
   const audios=useMemo(()=>[new Audio('/src/assets/audios/audio1.mp3'),
    new Audio('/src/assets/audios/audio2.mp3'),
    new Audio('/src/assets/audios/audio3.mp3')  
    ],[])

    const images=useMemo(()=>[
      {src:'/src/assets/images/image1.jpg'},
      {src:'/src/assets/images/image2.jpg'},
      {src:'/src/assets/images/image3.jpg'}
    ],[])


   
    const styledLinkElement={
    color:"#191919",
    textDecoration:"none"
    }


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;

      };
   
  
      
    const songName = (favourite) => {
      const songURL = favourite;
      if (!songURL) return 'Unknown Song'; // Handle undefined songURL
      const nameOfSong = songURL.slice(songURL.lastIndexOf('/') + 1, songURL.lastIndexOf('.'));
      return nameOfSong;
    };
      
    const handleSong=(song)=>{
       const indexOfSong=audios.findIndex(audio=>audio.src==song)
       setNum(indexOfSong)
       if(!isPlaying) {
        handlePlayPause()}
    }
    useEffect(()=>{
      const audioElement = audioRef.current?.audio.current;
      if (audioElement) {
        audioElement.src = audios[num].src;
        audioElement.volume=0.5
        audioElement.load() // Update the src when num or audioLists change
      }
      const imageElement=imageRef.current
      if(imageElement){
        imageElement.src=images[num].src;
        imageElement.alt=`Album art ${num + 1}`
      }

      const handleLoadedMetadata = () => {
        if (audioElement) {
          const duration = formatTime(audioElement.duration);
          setMaxDuration(duration);
          if (progressRef.current) {
            progressRef.current.max = audioElement.duration;
          }
        } 

      }
    
      const handleTimeUpdate = () => {
        if (audioElement) {
          const time = formatTime(audioElement.currentTime);
          setCurrentTime(time);
          if (progressRef.current) {
            progressRef.current.value = audioElement.currentTime;
          }
        }
      };
    
      const handleEnded=()=>{
        if (shuffleOption === 1) {
          const randomNum = Math.floor(Math.random() * audios.length);
          setNum(randomNum);
        } else {
          setNum(prevNum=>prevNum >= audios.length - 1 ? 0 : prevNum+ 1);
        }
      }
      audioElement?.addEventListener('timeupdate',handleTimeUpdate)
      audioElement?.addEventListener('loadedmetadata', handleLoadedMetadata)
      audioElement?.addEventListener('ended',handleEnded)
      return ()=>{
        audioElement?.removeEventListener('timeupdate',handleTimeUpdate)
        audioElement?.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioElement?.removeEventListener('ended',handleEnded)
      }

    },[num,audios])

    return(
        <>
        <dataContext.Provider value={{
          formatTime,styledLinkElement,audios,songName,
          isWideScreen,setIsWideScreen,num,setNum,isPlaying,setIsPlaying,audioRef,
          handleNextSong,handlePlayPause,handlePrevSong,handleVolumeChange,
          handleProgressInput,handleChangeSong,imageRef,toggleShuffle,
          handleSong,currentTime,maxDuration
       
        }}>{children}</dataContext.Provider>
        </>
    )
}

export default dataContext