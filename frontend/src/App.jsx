import React, { use, useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [thoughts, setthought] = useState([])
  const [Name, setName] = useState("")
  const [writeThought, setwriteThought] = useState("")


  function getThoughts() {
    axios.get("http://localhost:3000/thought")
      .then((res) => {
        setthought(res.data.allThoughts)
        // console.log(res.data.allThoughts)
      })
  }
  useEffect(() => {
    getThoughts()
  }, [thoughts])

  const deleteHandler = ({ thoughts }) => {
    // e.preventDefault()
    axios.delete(`http://localhost:3000/thought/${thoughts._id}`, {
      data: {
        name: Name,
        thought: writeThought
      }
    }).then((res) => {
      console.log(res.data)
    })
    // getThoughts()
    // console.log()
  }


  const submitHandler = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/thought", {
      name: Name,
      thought: writeThought
    }).then((res) => {
      console.log(res.data)
    })
    setName("")
    setwriteThought("")
    // getThoughts()
  }






  function cards() {
    return thoughts.map((thoughts, idx) => (
      <div className="card border-2 border-l-cyan-950 rounded-2xl flex flex-col justify-around" key={idx} >
        <div>
          <h3 className="thought text-2xl w-90">{thoughts.thought}</h3>
          <div className="name text-right">{thoughts.name}</div>
        </div>
        <button className='border-2 border-y-red-700/70 hover:bg-red-700/30 transition-all rounded-2xl px-2' onClick={() => deleteHandler({ thoughts })}>  Remove </button>

      </div>

    ))

  }
  // cards()
  return (
    <main>
      <div className="background-img"></div>
      <div className="app-container item-center ">
        <form action="" className=' w-full border-2 border-x-cyan-950'>
          <h2 className='text-xl'>Put something from your heart❤...</h2>
          <input type="text" className='title border-x-blue-600 border-2 ' placeholder='   Enter your name....' onChange={(e) => { setName(e.target.value) }} value={Name} />
          <input type="text" className=' w-[80%] border-2 border-b-amber-800 rounded-2xl' placeholder='   Left your thought here....' onChange={(e) => { setwriteThought(e.target.value) }} value={writeThought} />
          <button className='w-[80%] border-bs-emerald-900 rounded-2xl border-2 hover:bg-emerald-600/30 transition-all' onClick={(e) => { submitHandler(e) }}>Submit</button>
        </form>
      </div>

      <div className="thoughtCards flex justify-center flex-wrap  gap-6 px-10 ">

        {cards()}




      </div>


    </main>
  )
}

export default App
