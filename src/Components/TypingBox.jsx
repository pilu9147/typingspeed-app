import { useTestMode } from "../Context/TestModeContext";
import Uppermenu from "./UpperMenu";
import React, { useEffect, useState, createRef, useMemo, useRef } from 'react';
import{ generate} from 'random-words';
import Stats from "./Stats";
//var randomWords = require('random-words');
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from "../Context/ThemeContext";
import { Box, Modal } from '@mui/material';
const TypingBox = () => {
    const inputRef = useRef(null);
    const {testTime} = useTestMode();
    const [countDown,setCountDown] = useState(testTime);
    const [intervalId,setIntervalId] = useState(null);
    const [testStart,setTestStart] = useState(false);
    const [testEnd,SetTestEnd] = useState(false);
    const [correctChars,setCorrectChars] = useState(0);
    const [incorrectChars,setIncorrectChars] = useState(0);
    const [missedChars,setMissedChars] = useState(0);
    const [extraChars,setExtraChars] = useState(0);
    const [correctWords,setCorrectWords] = useState(0);
    const [wordsArray,setWordsArray] = useState(()=>{
        return generate(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [graphData,setGraphData] = useState([]);
    
    const{theme} = useTheme();

    const wordsSpanRef = useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    },[wordsArray]);

    
    const startTimer = ()=>{

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);

        function timer(){
            setCountDown((LatestCountDown)=>{
                setCorrectChars((correctChars)=>{
                    setGraphData((graphData)=>{
                        return [...graphData, [
                            testTime-LatestCountDown+1,
                            (correctChars/5)/((testTime-LatestCountDown+1)/60)
                        ]]
                    })
                    return correctChars;
                })

                if(LatestCountDown === 1){

                    SetTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                
                return LatestCountDown-1;
            });
        }
    } 
   
//new code

const[open,setOpen] = useState(false);
   
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = ()=>{

        setOpen(false);
    }

//end new code
    const handleUserInput = (e)=>{

   if(e.keyCode === 9)
    {
       clearInterval(intervalId);
       handleOpen();
       return;
    }
    else

    {
      if(!testStart){
         
        startTimer();           
        setTestStart(true);
      }

        if(wordsSpanRef[currWordIndex].current){


        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;


       if(e.keyCode === 13){
        //logic for enter keybtn
        window.location.reload(true);
        return;
       }
       if(e.keyCode === 27){
        handleClose();
        return;
       }

        if(e.keyCode === 32){
            // logic for space
            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords+1);
            }

            if(allCurrChars.length <= currCharIndex){
                //remove cursor from last place in a word
                allCurrChars[currCharIndex-1].classList.remove('current-right');
            }else{
                //remove cursor from in between of the word
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));//we have get missed char through this

                allCurrChars[currCharIndex].classList.remove('current');
            }

            wordsSpanRef[currWordIndex+1].current.childNodes[0].className = 'current';
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;
        }

        if(e.keyCode === 8){
            //logic for backspace
            if(currCharIndex !== 0){

                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex-1].className.includes('extra')){
                         allCurrChars[currCharIndex-1].remove();
                         allCurrChars[currCharIndex-2].className +=' current-right';
                    }else{
                        allCurrChars[currCharIndex-1].className = 'current'
                    }

                    setCurrCharIndex(currCharIndex-1);
                    return;
                }

                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex-1].className ='current';
                setCurrCharIndex(currCharIndex-1);
            }
            return;
        }
    
        
        if(currCharIndex === allCurrChars.length){
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex-1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            setExtraChars(extraChars+1);
            return;
        }

        if(e.key === allCurrChars[currCharIndex].innerText){

            allCurrChars[currCharIndex].className = 'correct';
            setCorrectChars(correctChars+1);

        }else{

            allCurrChars[currCharIndex].className = 'incorrect';
            setIncorrectChars(incorrectChars+1);

        }
        
        if(currCharIndex+1 === allCurrChars.length){
            allCurrChars[currCharIndex].className+=' current-right';
        }else{
            allCurrChars[currCharIndex+1].className = 'current';
        }
        
        setCurrCharIndex(currCharIndex+1);
       }
     }
    }


    const resetTest = ()=>{
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        SetTestEnd(false);
        setWordsArray(generate(50));
        resetWordsSpanRefClassname();
        focusInput();
    }


    const resetWordsSpanRefClassname = ()=>{
        wordsSpanRef.map(i=>{
            Array.from(i.current.childNodes).map(j=>{
                j.className = '';
            })
        });
        wordsSpanRef[0].current.childNodes[0].className='current';
    }

    useEffect(()=>{
         resetTest();
        //setCountDown(testTime);

    },[testTime])
    
    const calculateWPM = ()=> {
        return Math.round((correctChars/5)/(testTime/60));
    }


    const  calculateAcc = ()=>{
        return Math.round((correctWords/currWordIndex)*100);
    }

    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{ 
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className ='current';
    },[]);

    return(
        <div>
            
          <Uppermenu countDown={countDown}/>
            {
            (testEnd)?
            (
            <Stats 
            wpm={calculateWPM()} 
            accuracy={calculateAcc()} 
            correctChars={correctChars} 
            incorrectChars={incorrectChars} 
            missedChars={missedChars} 
            extraChars={extraChars}
            graphData={graphData}
            />
            ):
            (
            <div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {
                        wordsArray.map((word,index)=>(
                            <span className='word' ref={wordsSpanRef[index]}>
                            {word.split('').map(char=>(
                                <span>{char}</span>
                            ))}
                            </span>

                        ))
                        
                    }
                </div>
            </div>
            )
            }
           <div className="refresh"> 
            <div className="tooltip"><RefreshIcon onClick={()=>window.location.reload(false)} style={{cursor:'pointer',color: theme.textColor}} />
            <span className="tooltiptext">Restart Test</span>
            </div>
           </div>
            <input
            id="name"
                type='text'
                className='hidden-input'
                ref={inputRef}
                onKeyDown={handleUserInput}
            
            />   
            <Modal 
               open={open} 
               onClose={handleClose}
               style={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
               }}
            >
                
                <Box className='tabBox'>
                <div>press SPACE to Redo</div>
                <div>press ENTER to ReStart</div>
                <div>press ESCAPE to exit</div>
                </Box>
                
        </Modal>
        </div>
    )
}


export default TypingBox;