import React from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



const Footer = () =>{
    const {setTheme, theme} = useTheme();
    const handleChange = (e)=>{
        setTheme(e.value);
        localStorage.setItem("theme",JSON.stringify(e.value));
    }
   
    return(
        <div className='footer'>
            <div className="links">
                <div><a href="https://github.com/pilu9147" style={{color:theme.textColor}}><GitHubIcon style={{cursor:'pointer'}} /></a></div>
                <div><a href="https://www.linkedin.com/in/priyanka-bhesaniya-07715918a/" style={{color:theme.textColor}}><LinkedInIcon style={{cursor:'pointer'}}/></a></div>
            </div>
            <div className="themeButton">
               <Select 
                   onChange={handleChange}
                   options={themeOptions}
                   menuPlacement='top'
                   defaultValue={{label: theme.label, value: theme}}
                   styles={{
                         control: styles => ({...styles, backgroundColor: theme.background}),
                         menu: styles =>({...styles,backgroundColor: theme.background}),
                         option: (styles, {isFocused}) =>{
                            return{

                                ...styles,
                                backgroundColor: (!isFocused) ? theme.background : theme.textColor,
                                color: (!isFocused) ? theme.textColor : theme.background,
                                cursor: 'pointer'
     
                            }
                           
                         }

                   }}
               />

            </div>

        </div>
    )
};

export default Footer;