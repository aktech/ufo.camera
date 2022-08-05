import './App.css';
import {useState} from "react";


function UFOImage() {
    const [imgSrc, setImgSrc] = useState("");
    const [imgDivClass, setImgDivClass] = useState("hide");

    const getImage = async function () {
        const response = await fetch("https://picsum.photos/v2/list?limit=100");
        const images = await response.json();
        selectRandomImage(images);
    };

    const selectRandomImage = function (images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];
        console.log(randomImage);
        displayImage(randomImage);
    };

    const displayImage = function (randomImage) {
        let imageAddress = randomImage.download_url;
        console.log(imageAddress);
        setImgSrc(imageAddress)
        setImgDivClass("")
    };


  return (
      <div className="main">
        <h1>Random UFO Image</h1>
        <div className={"image-container " + imgDivClass}>
          <h3>Image by: <span className="author"></span></h3>
          <figure>
            <img className="img" src={imgSrc} alt="ufo" />
          </figure>
        </div>
        <button onClick={getImage}>
          Show me a UFO!
        </button>
      </div>
  )
}

function App() {
    return (
    <div className="App">
      <header className="App-header">
        {UFOImage()}
      </header>
    </div>
  );
}

export default App;
