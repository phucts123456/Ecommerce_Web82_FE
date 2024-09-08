import React, {useState, useRef, useEffect} from 'react'
import './TodaySales.css'
function TodaySalesTimer({totalTime}) {
     // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
     
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + totalTime);
        return deadline;
    };
 
    const getInitTime = (totalTime) => {
            const total =
            Date.parse(totalTime) - Date.parse(new Date());
            const initDays = Math.floor(total / (1000 * 60 * 60 * 24));
            const initHours = Math.floor(
            (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const initMinutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
            const initSeconds = Math.floor((total % (1000 * 60)) / 1000);
        return {
            initDays,
            initHours,
            initMinutes,
            initSeconds,
        };
    }
    let { initDays , initHours, initMinutes, initSeconds } = getInitTime(getDeadTime());

    // The state for our timer
    const [timer, setTimer] = useState("00:00:00:00");
    const [days, setDays] = useState(initDays);
    const [hours, setHours] = useState(initHours);
    const [minutes, setMinutes] = useState(initMinutes);
    const [seconds, setSeconds] = useState(initSeconds);
    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
            const days = Math.floor(total / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((total % (1000 * 60)) / 1000);
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e) => {
        let { total, days , hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
            setTimer(
               (days > 9 ? days : "0" + days) +
               ":" +
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
 
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    };
    
  return (
    <div className='today_sales_timer_container'>
      <div className="today_sales_timer_title">Flash Sales</div>
      <div className="today_sales_timer">
        <p className='today_sales_timer_item'><span>Days</span> <span>{days}</span></p><span className='time_split'>:</span>
        <p className='today_sales_timer_item'><span>Hours</span> <span>{hours}</span></p><span className='time_split'>:</span>
        <p className='today_sales_timer_item'><span>Minutes</span> <span>{minutes}</span></p><span className='time_split'>:</span>
        <p className='today_sales_timer_item'><span>Seconds</span> <span>{seconds}</span></p>
      </div>
    </div>
  )
}

export default TodaySalesTimer
