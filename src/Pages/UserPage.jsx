import React, { useState, useEffect } from 'react';
import {db, auth} from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';

const UserPage = ()=>{

    const[data, setData] = useState([]);
    const[graphData, setGraphData] = useState([]);
    const[dataLoading, setDataLoading] = useState(true);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchUserData = ()=>{

        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultsRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            //console.log(snapshot);
            snapshot.docs.map((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0],doc.data().wpm]);
                //console.log(doc.data());
            });
            setData(tempData);
            setGraphData(tempGraphData.reverse());
            setDataLoading(false);
        })
    }
useEffect(()=>{
    if(!loading){
        fetchUserData();
    }
    if(!loading && !user){
       navigate('/');
    }
   
},[loading]);
if(loading || dataLoading){
    return <div className='center-of-screen'>
        <CircularProgress size={300}/>
    </div>
    
}
    return(
        <div className="canvas">
            <UserInfo totalTestsTaken={data.length}/>
            <div className='graph-user-page'>
            <Graph graphData={graphData}/>
            </div>
            <TableUserData data={data}/>
        </div>
    )
}

export default UserPage;