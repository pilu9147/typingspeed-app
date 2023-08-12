import { createGlobalStyle } from "styled-components";






export const GlobalStyles = createGlobalStyle`

*{
    box-sizing: border-box;
    font-family: 'Fira Sans', sans-serif;

}
    
body{
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.textColor};
    padding:0;
    margin: 0;
    transition: all 0.25s linear; 
}
.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    width: 100vw;
    align-items: center;
    text-align: center;
    
}
.logo{
   display: flex;
   flex-direction:row;
   flex-wrap: wrap;
   justify-content:center;
   align-items: center;
   gap: 10px;
   font-size: 2.5rem;
   font-color: white !important;
}
.logoo{
 height: 70px;
 width: 70px; 
 border-radius: 50%;
}
.type-box{
    display: block;
    max-width: 1000px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.typeBoxText};
}
.word{
    margin: 5px;
    padding-right:2px;
}
.hidden-input{
    opacity: 0;
}
.current{
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;
    @keyframes blinking{
        0%{border-left-color: ${({theme})=>theme.textColor};}
        25%{border-left-color: ${({theme})=>theme.background};}
        50%{border-left-color: ${({theme})=>theme.textColor};}
        75%{border-left-color: ${({theme})=>theme.background};}
        100%{border-left-color: ${({theme})=>theme.textColor};}
    }
}
.current-right{
    border-right: 1px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight{
        0%{border-right-color: ${({theme})=>theme.textColor};}
        25%{border-right-color: ${({theme})=>theme.background};}
        50%{border-right-color: ${({theme})=>theme.textColor};}
        75%{border-right-color: ${({theme})=>theme.background};}
        100%{border-right-color: ${({theme})=>theme.textColor};}
    }
}
.correct{
    color: ${({theme})=>theme.textColor};
}

.incorrect{
    color: red;
}
.upper-menu{
    display: flex;
    width: 1000px;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.35rem;
    padding: 0.5rem; 
}
.modes{
    display: flex;
    gap: 0.4rem;
}
.time-mode:hover{
   color: #00FF00;
   cursor: pointer;
}

.footer{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    
    
}
.stats-box{
    display: flex;
    width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats{
    width: 30%;
    padding: 30px;
}
.right-stats{
    width: 70%;
}
.title{
    font-size: 20px;
    color:${({theme})=>theme.typeBoxText};
}
.subtitle{
    font-size: 30px;
}
.header{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    align-items: center;

}
.user-profile{
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 0.8fr 1.5fr 2fr;
    height: 10rem;
    background: ${({theme})=>theme.textColor};
    color: ${({theme})=>theme.background};
    border-radius: 29px;
    padding: 1rem;
    margin-top: 25px;
    margin-bottom: 15px;
    align-items: center;     /* Vertically center items */
  justify-items: center;
    
}
.user{
   
    display: flex;
   
    font-size: 1.5rem;
    padding:1rem;
    border-right: 2px solid !important;
    word-wrap : break-word;
}
.logos{
   gap: 5px;
   font-size: 2rem;
   font-color: white !important;
}

.info{
    font-size: 1rem;
    padding: 1rem;
    margin-top: 1rem;

}
.picture{
    width: 40%;
}
.total-tests{
    font-size: 2rem;
}
.table, .graph-user-page{
    margin: auto;
    width: 1000px;
}
.center-of-screen{
    display: flex;
    min-height: 100vh;
    justify-content:center;
    align-items: center;
}
.refresh{
    display: flex;
   
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    
}
.links{
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}
.tooltip {
    position: relative;
    display: inline-block;
   
  }
  
.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: ${({theme})=>theme.textColor};
    color: ${({theme})=>theme.background};
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: 50%;
    margin-left: -60px;
  }
  
.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
  
.tooltip:hover .tooltiptext {
    visibility: visible;
  }
.tabBox{
     display: flex;
     flex-direction: column;
     background:${({theme})=>theme.background};
     color:${({theme})=>theme.textColor};
     gap: 12px;
     padding: 7px;
     border-radius: 10px;
     opacity: .7;
  }
` 