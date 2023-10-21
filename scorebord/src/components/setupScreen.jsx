import { useState } from 'react'
import './setupScreen.css'
import Scorebord from './scorebord';

const SetupScreen = () => {
    const [HomeTeamName, setHomeTeamName] = useState("");
    const [HomeTeamImage, setHomeTeamImage] = useState("");
    const [AwayTeamName, setAwayTeamName] = useState("");
    const [AwayTeamImage, setAwayTeamImage] = useState("");
    const [hasMatchStarted, sethasMatchStarted] = useState(false);

    const handleHomeTeamSetup = (event) => {
        event.preventDefault();
        const { HomeName, HomeImage } = event.target.elements;
        setHomeTeamName(HomeName.value);
        setHomeTeamImage(URL.createObjectURL(HomeImage.files[0]));
    };

    const handleAwayTeamSetup = (event) => {
        event.preventDefault();
        const { AwayName, AwayImage } = event.target.elements;
        setAwayTeamName(AwayName.value);
        setAwayTeamImage(URL.createObjectURL(AwayImage.files[0]));
    };

    const StartMatch = () => {
        sethasMatchStarted(true);
    };

    return (
        <div>
            {hasMatchStarted ? <Scorebord HomeTeamName={HomeTeamName} HomeTeamImage={HomeTeamImage} AwayTeamImage={AwayTeamImage} AwayTeamName={AwayTeamName}></Scorebord>
            : 
                <div className='SetupScreen-Container'>
                <div className='Team-Container'>
                    <div>Home Team:</div>
                    {HomeTeamName === "" || HomeTeamImage === "" ? (
                        <form onSubmit={handleHomeTeamSetup}>
                            <div>
                                <label>Naam: </label>
                                <input type="text" name="HomeName" required />
                            </div>
                            <div>
                                <label>Logo:  </label>
                                <input type="file" name="HomeImage" required />
                            </div>
                            <button type="submit">Setup Home Team</button>
                        </form>
                    ) : (
                        <div className='Team-Info'>
                            <div>Naam: {HomeTeamName}</div>
                            <div>Logo: <img width={'50%'} src={HomeTeamImage} alt="" /></div>
                        </div>
                    )}
                </div>
                <div className='Startmatch-button-container'>
                    <button className='Startmatch-button' onClick={StartMatch}>Start Match</button>
                </div>
                <div className='Team-Container'>
                    <div>Visitor Team:</div>
                    {AwayTeamName === "" || AwayTeamImage === "" ? (
                        <form onSubmit={handleAwayTeamSetup}>
                            <div>
                                <label>Naam: </label>
                                <input type="text" name="AwayName" required />
                            </div>
                            <div>
                                <label>Logo:  </label>
                                <input type="file" name="AwayImage" required />
                            </div>
                            <button type="submit">Setup Visitor Team</button>
                        </form>
                    ) : (
                        <div className='Team-Info'>
                            <div>Naam: {AwayTeamName}</div>
                            <div>Logo: <img width={'50%'} src={AwayTeamImage} alt="" /></div>
                        </div>
                    )}
                    </div>
                </div>
            }
        </div>
        
    );
};

export default SetupScreen;