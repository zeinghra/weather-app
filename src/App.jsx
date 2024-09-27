import { useEffect, useState } from "react";


function App() {

  const apiKey = '4fb3a2482023bbeb714f57d2291538a9';
  const [city, setCity] = useState('Moscow');
  const [input, setInput] = useState('')
  const [responseObj, setResponseObj] = useState({weather: 'weather', desc: 'description', temp: 0, iconUrl: ''});


  useEffect(()=>{

    let controller = new AbortController();

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {signal: controller.signal})
    .then(response => {
      if (!response.ok) throw new Error('Something went wrong')
      
      return response.json()
    })
    .then(value => {
      setResponseObj({
        weather: value.weather[0].main,
        desc: value.weather[0].description,
        temp: value.main.temp,
        iconUrl: `https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
      })
      console.log(value)
    })
    .catch(error => console.error(error.message))

    return ()=>{controller?.abort()}
  },[city])


  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleChangeCity = () => {
    setCity(input)
  }


  return (
    <div className="w-screen bg-slate-900 text-white grid place-content-center min-h-screen">
      <div className="w-96 p-6 border border-current rounded-3xl text-center flex flex-col gap-4 backdrop-filter backdrop-blur-md bg-opacity-10 bg-gray-700">
        <div>
          <p className="font-bold">Forecast</p>
          <h1 className="text-4xl font-black uppercase">{city}</h1>
        </div>
        <img src={responseObj.iconUrl} alt="" />

        <div className="flex justify-between">
          <p className="font-medium">{responseObj.weather}</p>
          <p>{`${Math.round(responseObj.temp - 273)}°`}</p>
        </div>
        <div>
          <p>{responseObj.desc}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input type="text" className="bg-transparent backdrop-filter backdrop-blur-md border border-current rounded-md px-2 col-span-2 outline-none hover:shadow-current hover:shadow-sm"  value={input} onChange={handleInputChange} />
          <button type="button" onClick={handleChangeCity} className="block px-4 py2 text-nowrap border border-current rounded-md">Change</button> 
        </div>
      </div>
    </div>
  )
}

export default App
