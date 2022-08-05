import './App.css';
import {useEffect, useState} from "react";



import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

function UFOImage() {
    const [imgSrc, setImgSrc] = useState("");
    const [imgDivClass, setImgDivClass] = useState("invisible");
    const [datetime, setDatetime] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [shape, setShape] = useState("")
    const [index, setIndex] = useState(true)
    const [generate, setGenerate] = useState(false)
    const [imgData, setImgData] = useState(null)

    const onClickShowUfo = async function() {
        setGenerate(true)
        setIndex(false)
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let index_id = null
            if (index) {
                if (window.location.hash) {
                    index_id = window.location.hash.substring(1)
                } else {
                    return
                }
            } else if (!generate) {
                return
            }
            const { data, error } = await supabase
                .rpc('random_ufo', {index_id: index_id})
            return data.length !== 0 ? data[0] : {}
        }

        fetchMyAPI().then((data) => {
            console.log(data)
            if (data && Object.keys(data).length !== 0) {
                setImgData(data)
                setImgDivClass("")
                setGenerate(false)
                setCity(data.city)
                setCountry(data.country)
                setShape(data.shape)
                setImgSrc(data.images)
                window.location.hash = `#${data.index}`
                if (data.date_time) {
                    const event = new Date(data.date_time)
                    setDatetime(event.toString())
                    console.log(event)
                }

            }
        })
    }, [index, generate]);

    const showMeUfoButton = function () {
        return (
            <a href="#_" className="relative inline-block text-lg group my-8" onClick={onClickShowUfo}>
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
        )
    }

    const imageBox = function () {
        return (
            <div className={"image-container " + imgDivClass}>
                <figure>
                    <img className="img object-cover object-scale-down" src={imgSrc} alt="ufo"/>
                </figure>
            </div>
        )
    }

    const infoBox = function () {
        return (
            <div className="grid m-2 gap-8 mt-5 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-2 xl:mt-4">

                <div
                   className="p-4 max-w-sm bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Date Time</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{datetime}</p>
                </div>

                <div
                    className="p-4 max-w-sm bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Location</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{city} {country}</p>
                </div>

                <div
                    className="p-4 max-w-sm bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Shape</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{shape}</p>
                </div>

            </div>
        )
    }

    const header = function () {
        return (
            <>
                <h1 className="font-passion-one text-6xl text-black sm:text-5xl xl:text-8xl my-5">ufo.camera</h1>
                <h2 className="font-passion-one sm:text-1xl xl:text-2xl max-w-lg mx-auto text-gray-400">
                    (Random images of UFO from NUFORC)
                </h2>
            </>
            )
    }

    return (
      <div className="main">
          <div className="max-w-lg mx-auto text-center xl:max-w-5xl">
              {header()}
              {showMeUfoButton()}
              {imgSrc ? infoBox() : ""}
              {/*{reportLinkBox()}*/}
              {imgData ? imageBox() : ''}
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
