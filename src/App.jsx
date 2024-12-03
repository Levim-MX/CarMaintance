
import React from 'react';

import Header from './componts/Header.jsx';
import FQA from './componts/FQA.jsx';
import Home from './componts/Home.jsx';
import ServicesContent from './componts/ServicesContent.jsx';
import Home2 from './componts/Home2.jsx';
import Footer from './componts/Footer.jsx';
import AboutUs from './componts/AboutUs.jsx';

import './App.css';



function App() {

  return (
   
        
      <>
     <Header /> 
     
     <Home/>
     <div className='FqaHome2'>
     <Home2/>
     <FQA />
     
     </div>

     <ServicesContent/>
     <AboutUs/>
     
     <div className='AApp'>
     
      <Footer/>
      </div>
      </>
        
  );

}


export default App
