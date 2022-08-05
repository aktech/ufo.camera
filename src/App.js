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
    const [text, setText] = useState("")
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
                setText(data.text)
                window.location.hash = `#${data.index}`
                if (data.date_time) {
                    const event = new Date(data.date_time)
                    setDatetime(event.toString())
                    console.log(event)
                }

            }
        })
    }, [index, generate]);


    const imageBox = function () {
        return (
            <div className={"p-2 image-container " + imgDivClass}>
                <figure>
                    <img className="img object-cover object-scale-down" src={imgSrc} alt="ufo"/>
                </figure>
            </div>
        )
    }

    const textBox = function () {
        return (
            <div className="grid m-2 mt-5 text-center sm:mt-16 sm:grid-cols-1 md:grid-cols-1 xl:mt-4">
                <div
                    className="p-4  bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">From the spectator</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{text}</p>
                </div>
            </div>
        )
    }

    const infoBox = function () {
        return (
            <div className="grid m-2 mt-5 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-4 md:grid-cols-3 md:gap-2 xl:mt-4">
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
                <h1 className="font-passion-one text-7xl text-black sm:text-5xl xl:text-8xl my-5">ufo.camera</h1>
                <h2 className="font-merriweather-sans sm:text-1xl xl:text-2xl max-w-lg mx-auto text-gray-400">
                    Random images of UFO from <a href="https://nuforc.org/" className="hover:underline">NUFORC</a>
                </h2>
            </>
            )
    }

    const footer = function () {
        return (
            <footer className="p-4 mt-5">
                <hr className="mb-4 sm:mx-auto " />
                <span className="font-merriweather-sans text-lg sm:text-center">
                   <p className="text-gray-500"> Made by <a href="https://twitter.com/iaktech" className="hover:underline text-black">Amit</a>
                   • Source on <a href="https://github.com/aktech/ufo.camera" className="hover:underline text-black">GitHub</a>
                   </p>

                </span>
            </footer>
    )
    }

    const ctaButtons = function () {
        return (
            <div
                className="grid mt-6 md:mt-6 lg:mt-6 xl:mt-6 grid-cols-2 gap-4 place-content-center justify-center">
                <div className="md:text-right lg:text-right xl:text-right">
                    <a href="#_" className="relative inline-block text-lg group" onClick={onClickShowUfo}>
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
                </div>


                <div className="md:text-left lg:text-left xl:left">
                    <a   href={`https://twitter.com/intent/tweet?text=Checkout this UFO 👉 ${encodeURIComponent(window.location.href)}`}
                         className="inline-flex items-center justify-center px-5 py-4 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500">
                        <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab"
                             data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path>
                        </svg>
                        <span className="relative">Share on Tweet</span>
                    </a>
                </div>

            </div>
        )
    }

    return (
      <div className="main">
          <div className="max-w-lg mx-auto text-center xl:max-w-5xl">
              {header()}
              {ctaButtons()}
              {imgSrc ? infoBox() : ""}
              {imgData ? imageBox() : ''}
              {imgData ? textBox() : ''}
              {footer()}
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
