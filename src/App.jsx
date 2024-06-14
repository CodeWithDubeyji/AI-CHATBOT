import axios from 'axios'
import { useState } from 'react'
function App() {

  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);

  async function generateAnswer() {

    setQuestions("")
    setAnswer("loading...")

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${String(import.meta.env.VITE_API_KEY)}`,
      method: "post",
      data: {
        contents:[
          {
            parts:[
              {text:`${questions}`}
            ]
          }
        ]
      }
    })

    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
  }
  return (
    <>
      <h1 className='flex items-center justify-center text-4xl mt-8 font-semibold'>My Ai-Chatbot</h1>
      <div className=' mt-12 flex flex-wrap gap-4 justify-center items-center'>
      <input type="text" className='bg-gray-800 rounded-3xl border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors w-[700px] duration-200 ease-in-out' placeholder='Enter Your Prompt Here' value={questions} onChange={(e) => setQuestions(e.target.value)}/>
      <button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-3xl text-lg' onClick={generateAnswer}>Send</button>
      </div>

      <div className=' mt-12 flex items-center justify-center'>
      <p className=' text-center w-3/4'>{answer}</p>
      </div>
    </>
  )
}

export default App
