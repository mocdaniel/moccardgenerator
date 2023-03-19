import Head from 'next/head'
import Preview from '../components/preview'
import { useState } from 'react'



export default function Home() {
  const [branding, setBranding] = useState(true)
  const [lug, setLug] = useState("")

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "lug": {
        console.log("value: " + e.target.value)
        setLug(e.target.value)
        console.log("new value: " + lug)
        break
      }
    }
    setLug(e.target.value)
  }

  return (
    <>
      <Head>
        <title>MOC Card Generator</title>
        <meta name="description" content="Simple generator of MOC cards" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 py-8">
        <h1>MOC Card Generator</h1>

        <form className="flex flex-row w-4/5 justify-between gap-4 mx-auto my-16" action="/api/generator" method="post">
          <Preview branding={ branding } lug={ lug }></Preview>
          <div className="flex flex-col gap-2">
            <div>
              <fieldset>
                <input type="radio" id="roguebricks" name="lug" value="Roguebricks" onChange={ handleInputChange }/> Roguebricks
                <input type="radio" id="rebellug" name="lug" value="RebelLUG" onChange={ handleInputChange }/> RebelLUG
              </fieldset>
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </main>
    </>
  )
}
