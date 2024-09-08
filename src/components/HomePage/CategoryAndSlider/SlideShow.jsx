import React from 'react'
import { Carousel } from 'antd';

function SlideShow() {
    const contentStyle = {
        margin: 0,
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        cursor: 'pointer'
      };
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
    <div className='slider_container'>
        <Carousel afterChange={onChange}>
            <div>
                <h3 style={contentStyle}><a href='#'><img src='./img/Iphone14Banner.png'></img></a></h3>
            </div>
            <div>
                <h3 style={contentStyle}><img src='./img/Iphone14Banner.png'></img></h3>
            </div>
            <div>
                <h3 style={contentStyle}><img src='./img/Iphone14Banner.png'></img></h3>
            </div>
            <div>
                <h3 style={contentStyle}><img src='./img/Iphone14Banner.png'></img></h3>
            </div>
        </Carousel>
    </div>
  )
}

export default SlideShow