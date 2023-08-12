import React from 'react';
import TypingBox from '../Components/TypingBox';
import Header from '../Components/Header'
import Footer from '../Components/Footer';
import { useTheme } from '../Context/ThemeContext';
import { Button} from '@mui/material';





const HomePage = ()=>{

    const{theme} = useTheme();

    return(
        <div className="canvas">
        <Header />
        <hr className='hyper' style={{borderColor: theme.textColor, width: '1000px'}}/>
       <TypingBox/>
        <hr className='hyper' style={{borderColor: theme.textColor, width: '1000px'}}/>
        <div>Press <Button variant="contained" size='small'style=
            {{
                height:'20px',
                fontSize:'.7rem' ,
                background:theme.textColor,
                color:theme.background}}>
          Tab
        </Button> to open commands</div>
        <Footer />
        </div>
    )
}

export default HomePage;