import './App.css';
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';



import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

function UFOImage() {
    const [imgSrc, setImgSrc] = useState("");
    const [imgDivClass, setImgDivClass] = useState("invisible");
    const [text, setText] = useState("");
    const [reportLink, setReportLink] = useState("");

    const getImage = async function () {
        let randUuid = uuidv4();
        const { data, error } = await supabase
            .from('nuforc')
            .select()
            .or(`index.lt.${randUuid},index.gt.${randUuid}`)
            .limit(1)

        console.log(data)
        displayImage(data[0])
    };

    const displayImage = function (randomImage) {
        setImgSrc(randomImage.images)
        setText(randomImage.text)
        setReportLink(randomImage.report_link)
        setImgDivClass("")
    };


  return (
      <div className="main">
          <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
              <h1 className="font-passion-one text-black sm:text-4xl xl:text-8xl my-8">ufo.camera</h1>
              <h2 className="font-passion-one sm:text-1xl xl:text-2xl max-w-lg mx-auto text-gray-400">
                  (Random images of UFO from NUFORC)
              </h2>

              <a href="#_" className="relative inline-block text-lg group my-8" onClick={getImage}>
            <span
                className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span
                className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative font-merriweather-sans">Show me a UFO</span>
            </span>
                  <span
                      className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg">
              </span>
              </a>
              <p className="font-merriweather-sans sm:text-1xl xl:text-1xl max-w-lg mx-auto text-gray-500 my-8">
                   {
                  reportLink ? `More Information: ${reportLink}`: ""
              }
              </p>
              <div className={"image-container " + imgDivClass}>
                  <figure>
                      <img className="img" src={imgSrc} alt="ufo"/>
                  </figure>
              </div>
          </div>
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
