import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Preview from '../components/preview'
import { useState } from 'react'



export default function Home() {
  const [mocName, setMocName] = useState("")
  const [mocDescription, setMocDescription] = useState("")
  const [builder, setBuilder] = useState("")
  const [instagram, setInstagram] = useState("")
  const [flickr, setFlickr] = useState("")
  const [branding, setBranding] = useState(true)
  const [lug, setLug] = useState("roguebricks")

  function handleMocNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMocName(e.target.value)
  }

  function handleMocDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMocDescription(e.target.value)
  }

  function handleBuilderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBuilder(e.target.value)
  }

  function handleInstagramChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInstagram(e.target.value)
  }

  function handleFlickrChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFlickr(e.target.value)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
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
      <main className={styles.main}>
        <h1>MOC Card Generator</h1>

        <Preview branding={ branding } mocName={ mocName } builder={ builder } instagram={ instagram } flickr={ flickr } mocDescription={ mocDescription} lug={ lug }></Preview>


        <form className="flex flex-col gap-2" action="/api/generator" method="post">
          <label htmlFor="mocName">MOC name:</label>
          <input type="text" id="mocName" name="mocName" value={ mocName } onChange={ handleMocNameChange }/>
          <label htmlFor="mocDescription">MOC description:</label>
          <textarea id="mocDescription" name="mocDescription" value={ mocDescription } onChange={ handleMocDescriptionChange }></textarea>
          <label htmlFor="builder">Builder name:</label>
          <input type="text" id="builder" name="builder" value={ builder } onChange={ handleBuilderChange }/>
          <label htmlFor="instagram">Instagram:</label>
          <input type="text" id="instagram" name="instagram" value={ instagram } onChange={ handleInstagramChange } />
          <label htmlFor="flickr">Flickr:</label>
          <input type="text" id="flickr" name="flickr" value={ flickr } onChange={ handleFlickrChange } />
          <div>
            <fieldset>
              <input type="radio" id="roguebricks" name="lug" value="Roguebricks" onChange={ handleInputChange }/> Roguebricks
              <input type="radio" id="rebellug" name="lug" value="RebelLUG" onChange={ handleInputChange }/> RebelLUG
            </fieldset>
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  )
}
