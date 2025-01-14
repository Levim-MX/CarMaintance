import React from 'react';
import './ServicesContent.css'
import '../App.css'

function ServicesContent({ onServiceClick }){

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
                    <img src="/images/audiCarEngin.jpg" alt="" />
                    
                      <button className='btn' id='btn' onClick={onServiceClick}> صيانة المحرك </button>
                      <span>150$</span>
                    
                  </div>

                       {/* card 2 */}
                       <div className='box'>
                    <img src="/images/part2.png" alt="" />
                  
                      <button className='btn' id='btn' onClick={onServiceClick}> تبديل بستم المحرك  </button>
                      <span>45$</span>
                  </div>

                       {/* card 3 */}
                       <div className='box'>
                    <img src="/images/audiCarWheel.jpeg" alt="" />
                    
                    
                      <button className='btn' id='btn' onClick={onServiceClick}> صيانة الأطارات </button>
                      <span>30$</span>
                      
                  </div>

                       {/* card 4 */}
                       <div className='box'>
                    <img src="/images/oilChange.jpg" alt="" />
                    
                    
                      <button className='btn' id='btn' onClick={onServiceClick}> تبديل زيت  وفلاتر السيارة  </button>
                      <span>100$</span>
                      
                  </div>  

                   {/* card 5 */}
                  <div className='box'>
                    <img src="/images/car battrey.jpg" alt="" />
                    
                    
                      <button className='btn' id='btn' onClick={onServiceClick}>  فحص وتبديل البطارية  </button>
                      <span>100$</span>
                    
                  </div> 
                  
                     {/* card 6 */}
                  <div className='box'>
                    <img src="/images/carWashinggg.jpg" alt="" />
                   
                    
                      <button className='btn' id='btn' onClick={onServiceClick}>  غسل وتنطيف السيارة </button>
                      <span>60$</span>
                     
                  </div>
                           {/* card 7 */}
                           <div className='box'>
                    <img src="/images/wiers.jpg" alt="" />
                    
                    
                      <button className='btn' id='btn' onClick={onServiceClick}> إصلاح أنظمة الكهرباء   </button>
                      <span>150$</span>
                      
                  </div>
                           {/* card 8 */}
                           <div className='box'>
                    <img src="/images/640px-Bremsanlage.jpg" alt="" />
                    
                    
                      <button className='btn' id='btn' onClick={onServiceClick}> صيانة المكابح </button>
                      <span>200$</span>
                  </div>
                  

          </div>
        
    </section>

    );
}
export default ServicesContent