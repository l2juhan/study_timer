import './App.css';
import {useState} from 'react';
//import {} from 'react-bootstrap';
//import {} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useQuery} from '@tanstack/react-query';
import Sidebar from './components/SideBar';
import WeeklyCalendar from './components/WeeklyCalendar';
import AnalogClock from './components/Clock';
//components import 하기

//그 외 



function App() {



  return (
    <div className='App'>
      <Sidebar/>
      <div className='main'>
          <AnalogClock/> 
      <WeeklyCalendar/>
      </div>
    </div>
  );
}

export default App;
