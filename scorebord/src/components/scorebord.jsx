import './scorebord.css'
import volleybal from '../images/volleybalresized.png'
import maaseik from '../images/GreenyardMaaseikRGB_SMAL-removebg-preview.png'
import Decospan from '../images/decospan logo.jpg';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SponserADJC from '../images/SponserADJCLeaning.jpg';
import SponserMieledju from '../images/SponserMieledju.jpg';
import SponserTextr from '../images/SponserTextr.jpg';
import SponserCEV from '../images/CEVVolleyCUP.jpg';
import SponserVastgoed from '../images/SponserVastgoedexpert.jpg';
import consultes from '../images/consultes.png'

import { useEffect, useState } from 'react';

//https://media.licdn.com/dms/image/D4E22AQHLsTATqxlUWw/feedshare-shrink_800/0/1683318081669?e=1699488000&v=beta&t=vHF0En4T8onOM6s2AW_zsr5MSLf0gsVN3CLTnW1-ux0

const Scorebord = ({HomeTeamName, AwayTeamName, HomeTeamImage, AwayTeamImage}) => {
    const images = [SponserADJC, SponserMieledju, SponserTextr, SponserCEV, SponserVastgoed, consultes];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [playAds, setPlayAds] = useState(false);

    const [Commercial, setCommercial] = useState(false);
    const [HomeTimeouts, setHomeTimeOuts] = useState("");
    let currentHomeTimeouts = 0;
    const [isHomeTimeOut, setIsHomeTimeOut] = useState(false);
    const [isAwayTimeOut, setIsAwayTimeOut] = useState(false);
    const [AwayTimeouts, setAwayTimeOuts] = useState("");
    let currentAwayTimeouts = 0;
    const [ScoreSet1, setScoreSet1] = useState("0 - 0");
    const [ScoreSet2, setScoreSet2] = useState("0 - 0");
    const [ScoreSet3, setScoreSet3] = useState("0 - 0");
    const [ScoreSet4, setScoreSet4] = useState("0 - 0");
    const [currentSet, setCurrentSet] = useState(0);
    let currentSets = 0;
    const [HomePoints, setHomePoints] = useState(0);
    let HomeTeamPoints = 0;
    const [AwayPoints, setAwayPoints] = useState(0);
    let AwayTeamPoints = 0;
    const [HomeSetPoints, setHomeSetPoints] = useState(0);
    let HomeTeamSetPoints = 0;
    const [AwaySetPoints, setAwaySetPoints] = useState(0);
    let AwayTeamSetPoints = 0;

    const [CurrentlyTimeOut, setCurrentlyTimeOut] = useState(false);

    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (time <= 0) {
              clearInterval(timerInterval);
            } else {
              setTime(time - 1); // Subtract 10 milliseconds
            }
          }, 1000); // Update every 10 milliseconds
      
          return () => {
            clearInterval(timerInterval); // Clean up the timer when the component unmounts
          };
        }, [time]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "e") {
                HandleHomeTimeOuts();
            } else if (event.key === "s") {
                HandleHomeTeamPointDown()
            } else if (event.key === "d") {
                HandleHomeTeamPointUp();
            } else if (event.key === "l") {
                HandleAwayTeamPointDown()
            } else if (event.key === "m") {
                HandleAwayTeamPointUp()
            } else if (event.key === "c") {
                HandleHomeTeamSetPointUp()
            } else if (event.key === "x") {
                HandleHomeTeamSetPointDown()
            } else if (event.key === ":") {
                HandleAwayTeamSetPointDown()
            } else if (event.key === "=") {
                HandleAwayTeamSetPointUp()
            } else if (event.key === "p") {
                HandleAwayTimeOuts()
            } else if (event.key === "t") {
                PlayAdsBetweenSets();
            } else if (event.key === "y") {
                StopAdsBetweenSets();
            } else if (event.key === "z") {
                StopTimeOut();
            } else if (event.key === "o") {
                StopTimeOut();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [])

    const StopTimeOut = () => {
        setCurrentlyTimeOut(false);
        setTime(0);
    }

    useEffect(() => {
        if (time == 0) {
            setCurrentlyTimeOut(false);
        }
    }, [time])

    const PlayAdsBetweenSets = () => {
        setCommercial(false);
        setPlayAds(true);
    }

    const StopAdsBetweenSets = () => {
        setCommercial(true);
        setPlayAds(false)
    }

    const HandleHomeTimeOuts = () => {
        currentHomeTimeouts = currentHomeTimeouts + 1;
        setIsHomeTimeOut(true);
        setCommercial(prevState => !prevState);
        setCurrentlyTimeOut(true);
        HandleHomeTimeOut(currentHomeTimeouts);
    }

    const HandleHomeTimeOut = (numberOfTimeouts) => {
        setTime(30);
        const timeoutElements = Array.from({ length: numberOfTimeouts }, (_, index) => (
            <div key={index} className='Scorebord-Timeout-Point'></div>
        ));
        setHomeTimeOuts(<div className='Scorebord-Timeout-Left'>{timeoutElements}</div>);
    }

    const HandleAwayTimeOuts = () => {
        currentAwayTimeouts = currentAwayTimeouts + 1;
        setIsAwayTimeOut(true);
        setCommercial(prevState => !prevState);
        setCurrentlyTimeOut(true);
        HandleAwayTimeOut(currentAwayTimeouts)
    }

    const HandleAwayTimeOut = (numberOfTimeouts) => {
        setTime(30);
        const timeoutElements = Array.from({ length: numberOfTimeouts }, (_, index) => (
            <div key={index} className='Scorebord-Timeout-Point'></div>
        ));
        setAwayTimeOuts(<div className='Scorebord-Timeout-Right'>{timeoutElements}</div>);
    }

    const HandleHomeTeamSetPointUp = () => {

        switch (currentSets) {
            case 0:
                setScoreSet1(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            case 1:
                setScoreSet2(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            case 2:
                setScoreSet3(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            case 3:
                setScoreSet4(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            default:
                break;
        }

        if (currentSets < 4) {
            HomeTeamSetPoints = HomeTeamSetPoints + 1;
            setHomeSetPoints(HomeTeamSetPoints);

            setHomePoints(0);
            HomeTeamPoints = 0;
            setAwayPoints(0);
            AwayTeamPoints = 0;

            //clear timeouts
            currentHomeTimeouts = 0;
            setHomeTimeOuts()
            currentAwayTimeouts = 0;
            setAwayTimeOuts()

            setIsHomeTimeOut(false);
            setIsAwayTimeOut(false);

            currentSets = currentSets + 1
            setCurrentSet(currentSets);
        } else if (currentSets == 4) {
            currentSets = currentSets + 1
            setCurrentSet(currentSets);

            HomeTeamSetPoints = HomeTeamSetPoints + 1;
            setHomeSetPoints(HomeTeamSetPoints);
        }
    }
    const HandleHomeTeamSetPointDown = () => {
        HomeTeamSetPoints = HomeTeamSetPoints - 1;
        if (HomeTeamSetPoints < 0) {
            HomeTeamSetPoints = 0;
        }
        setHomeSetPoints(HomeTeamSetPoints);

        currentSets = currentSets - 1;
        if (currentSets < 0) {
            currentSets = 0;
        }
        setCurrentSet(currentSets);

        switch (currentSets) {
            case 0:
                setScoreSet1(`0 - 0`)
                break;
            case 1:
                setScoreSet2(`0 - 0`)
                break;
            case 2:
                setScoreSet3(`0 - 0`)
                break;
            case 3:
                setScoreSet4(`0 - 0`)
                break;
            default:
                break;
        }
    }

    const HandleAwayTeamSetPointUp = () => {

        switch (currentSets) {
            case 0:
                setScoreSet1(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            case 1:
                setScoreSet2(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            case 2:
                setScoreSet3(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            case 3:
                setScoreSet4(`${HomeTeamPoints} - ${AwayTeamPoints}`)
                break;
            default:
                break;
        }

        if (currentSets < 4) {
            AwayTeamSetPoints = AwayTeamSetPoints + 1;
            setAwaySetPoints(AwayTeamSetPoints);

            setHomePoints(0);
            HomeTeamPoints = 0;
            setAwayPoints(0);
            AwayTeamPoints = 0;

            //clear time outs
            currentHomeTimeouts = 0;
            setHomeTimeOuts()
            currentAwayTimeouts = 0;
            setAwayTimeOuts()

            setIsHomeTimeOut(false);
            setIsAwayTimeOut(false);

            currentSets = currentSets + 1
            setCurrentSet(currentSets);
        } else if (currentSets == 4) {
            currentSets = currentSets + 1
            setCurrentSet(currentSets);

            AwayTeamSetPoints = AwayTeamSetPoints + 1;
            setAwaySetPoints(AwayTeamSetPoints);
        }
    }
    const HandleAwayTeamSetPointDown = () => {
        AwayTeamSetPoints = AwayTeamSetPoints - 1;
        if (AwayTeamSetPoints < 0) {
            AwayTeamSetPoints = 0;
        }
        setAwaySetPoints(AwayTeamSetPoints);

        currentSets = currentSets - 1;
        if (currentSets < 0) {
            currentSets = 0;
        }
        setCurrentSet(currentSets)

        switch (currentSets) {
            case 0:
                setScoreSet1(`0 - 0`)
                break;
            case 1:
                setScoreSet2(`0 - 0`)
                break;
            case 2:
                setScoreSet3(`0 - 0`)
                break;
            case 3:
                setScoreSet4(`0 - 0`)
                break;
            default:
                break;
        }
    }

    const HandleHomeTeamPointDown = () => {
        HomeTeamPoints = HomeTeamPoints - 1;
        if (HomeTeamPoints < 0) {
            HomeTeamPoints = 0;
        }
        setHomePoints(HomeTeamPoints);
    }

    const HandleHomeTeamPointUp = () => {
        HomeTeamPoints = HomeTeamPoints + 1; 
        setHomePoints(HomeTeamPoints);
    }

    const HandleAwayTeamPointDown = () => {
        AwayTeamPoints = AwayTeamPoints - 1;
        if (AwayTeamPoints < 0) {
            AwayTeamPoints = 0;
        }
        setAwayPoints(AwayTeamPoints);
    }

    const HandleAwayTeamPointUp = () => {
        AwayTeamPoints = AwayTeamPoints + 1; 
        setAwayPoints(AwayTeamPoints);
    }


    return (
        <div className="Scorebord-Container">
            {/* <div className='Scorebord-Sponsers' style={{display: 'none'}}>
                <div className='Scorebord-Sponsers-top'></div>
                <div className='Scorebord-Sponsers-bot'></div>
                <div className='Scorebord-Sponsers-slide'>
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                </div>
                <div className='Scorebord-Sponsers-slide'>
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                </div>
            </div> */}
            <div className={CurrentlyTimeOut || playAds ? 'Scorebord-Content-Container-TimeOut' : 'Scorebord-Content-Container'}>
                {CurrentlyTimeOut || playAds ? 
                    <div className='image-slider'>
                        {images.map((image, index) => (
                            <img 
                                key={index} 
                                src={image} 
                                alt={`Image ${index + 1}`} 
                                className={`slider-image ${playAds ? 'slider-image-fullheight' : 'slider-image-smallheight'} ${currentImageIndex === index ? 'visible' : 'hidden'}`}/>
                        ))}
                    </div>
                :
                    <div className='Team-Names'>
                        <div className='Home-TeamName ContentWidth'>{HomeTeamName}</div>
                        <div className='Set-Points'>
                            <div className='Set-Points-Sets'>{HomeSetPoints} - {AwaySetPoints}</div>
                            <div className='Set-Points-Sets-Line'></div>
                            <div>{ScoreSet1}</div>
                            <div>{ScoreSet2}</div>
                            <div>{ScoreSet3}</div>
                            <div>{ScoreSet4}</div>
                        </div>
                        <div className='Away-TeamName ContentWidth'>{AwayTeamName}</div>
                    </div>
                }
                {CurrentlyTimeOut || playAds ? <div></div> :
                    <div className='Team-Logos'>
                        <div className='Home-Team-Logo ContentWidth'><img className='Scorebord-Logo' src={HomeTeamImage} alt="" /></div>
                        <div className='Away-Team-Logo ContentWidth'><img className='Scorebord-Logo' src={AwayTeamImage} alt="" /></div>
                    </div>
                }
                {playAds ? <div></div> :
                <div className='Team-Points'>
                    <div className='Home-Team-Points ContentWidth'>{HomePoints}</div>
                    <div className='TimeOut'>
                        <div className='Scorebord-Timeout'>Time-out</div>
                        {time > 0 ? <div className='Scorebord-Countdown'>{time}</div> : 
                        <div className={isHomeTimeOut ? 'Scorebord-Timeout-Container-withtimeout' : (isAwayTimeOut ? "Scorebord-Timeout-Container-AwaytimeOut" : "Scorebord-Timeout-Container")}>
                            {HomeTimeouts}
                            <div className='Scorebord-Timeout-Middle'></div>
                            {AwayTimeouts}
                        </div>
                        }
                    </div>
                    <div className='Away-Team-Points ContentWidth'>{AwayPoints}</div>
                </div>
                }
            </div>
            {/* <div className='Scorebord-Text-Container' style={{display: 'none'}}>
                <div className='Scorebord-Text-Team-Container'>
                    <div>MENEN</div>
                    <div className='Scorebord-Logo-Container'><img className='Scorebord-Logo' src={volleybal} alt="" /></div>
                    <div className='Scorebord-Text-Number'>23</div>
                </div>
                <div className='Scorebord-Text-Score-Container'>
                    <div>
                        <div className='Scorebord-Text-Score-Sets'>2 - 0</div>
                        <div className='Scorebord-Text-Score-Line'></div>
                        <div>{ScoreSet1}</div>
                        <div>25 - 23</div>
                        <div>0 - 0</div>
                        <div>0 - 0</div>
                    </div>
                    <div className='Scorebord-Timeout-Text'>
                        <div className='Scorebord-Timeout'>Time-out</div>
                        <div className='Scorebord-Timeout-Container' style={{display: 'none'}}>
                            <div className='Scorebord-Timeout-Arrow'>&lt;</div>
                            <div>{time}</div>
                            <div className='Scorebord-Timeout-Arrow'>&gt;</div>
                        </div>
                        <div className='Scorebord-Timeout-Container'>
                            <div className='Scorebord-Timeout-Left'>
                                <div className='Scorebord-Timeout-Point'></div>
                                <div className='Scorebord-Timeout-Point'></div>
                                <div className='Scorebord-Timeout-Point'></div>
                            </div>
                            <div className='Scorebord-Timeout-Middle'></div>
                            <div className='Scorebord-Timeout-Right'>
                                <div className='Scorebord-Timeout-Point'></div>
                                <div className='Scorebord-Timeout-Point'></div>
                                <div className='Scorebord-Timeout-Point'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Scorebord-Text-Team-Container'>
                    <div>MAASEIK</div>
                    <div className='Scorebord-Logo-Container'><img className='Scorebord-Logo' src={maaseik} alt="" /></div>
                    <div className='Scorebord-Text-Number'>19</div>
                </div>
            </div>
            <div className='Scorebord-Sponsers' style={{display: 'none'}}>
                <div className='Scorebord-Sponsers-right-top'></div>
                <div className='Scorebord-Sponsers-right-bot'></div>
                <div className='Scorebord-Sponsers-slide'>
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                </div>
                <div className='Scorebord-Sponsers-slide'>
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                    <img src={Decospan} alt="" />
                </div>
            </div> */}
        </div>
    )

}


export default Scorebord;