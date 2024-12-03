import React from 'react';
import './ServicesContent.css'
import '../App.css'

function ServicesContent(){

    return(
    <section className='Services' id='Services'>
           {/* heading */}
        <div className='heading'>
        <h1> خدمات الصيانة </h1>
        <p></p>

        </div>
       
      
        
        
        {/* serverice continar  */}

          <div className='serverice-continar' id='serverice-continar'>
                      {/* card 1 */}
                  <div className='box'>
                    <img src="/images/part1.png" alt="" />
                    
                      <button className='btn' id='btn'> صيانة المحرك </button>
                      <span>150$</span>
                    
                  </div>

                       {/* card 2 */}
                       <div className='box'>
                    <img src="/images/part2.png" alt="" />
                  
                      <button className='btn' id='btn'> تبديل بستم المحرك  </button>
                      <span>45$</span>
                  </div>

                       {/* card 3 */}
                       <div className='box'>
                    <img src="/images/part6.png" alt="" />
                    
                    
                      <button className='btn' id='btn'> صيانة الأطارات </button>
                      <span>30$</span>
                      
                  </div>

                       {/* card 4 */}
                       <div className='box'>
                    <img src="/images/CarOil.png" alt="" />
                    
                    
                      <button className='btn' id='btn'> تبديل زيت السيارة  </button>
                      <span>100$</span>
                      
                  </div>  

                   {/* card 5 */}
                  <div className='box'>
                    <img src="/images/part1.png" alt="" />
                    
                    
                      <button className='btn' id='btn'> صيانة المحرك </button>
                      <span>100$</span>
                    
                  </div> 
                  
                     {/* card 6 */}
                  <div className='box'>
                    <img src="/images/CarWashing.png" alt="" />
                   
                    
                      <button className='btn' id='btn'>  غسل وتنطيف السيارة </button>
                      <span>60$</span>
                     
                  </div>
                           {/* card 7 */}
                           <div className='box'>
                    <img src="/images/part1.png" alt="" />
                    
                    
                      <button className='btn' id='btn'> صيانة المحرك </button>
                      <span>150$</span>
                      
                  </div>
                           {/* card 8 */}
                           <div className='box'>
                    <img src="/images/part1.png" alt="" />
                    
                    
                      <button className='btn' id='btn'> صيانة المكابج </button>
                      <span>200$</span>
                  </div>
                  

          </div>
        
    </section>

    );
}
export default ServicesContent