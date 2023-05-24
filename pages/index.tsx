import Head from 'next/head'
import Preview from '../components/preview'
import { useState } from 'react'
import { toJpeg, toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/lib/css/styles.css"


export default function Home() {
  const [branding] = useState(true)
  const [color, setColor] = useColor("hex", "#121212")
  const [lug, setLug] = useState("")
  const [visible, setVisible] = useState(false)

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

  const generatePdf = async () => {
    const dataFormatA5 = { code: 'a5', h: 1240, w: 874 }
    const dataFormat = dataFormatA5;
    const dataQuality = {
      low: 1.0,
      medium: 1.25,
      high: 2.0,
      superhigh: 3,
      supersuperhigh: 4,
    }

    var imgData = await generatePng()

    if (!imgData) { return }
    var doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: dataFormat.code,
      hotfixes: ['px_scaling']
    })
    doc.viewerPreferences({ FitWindow: true}, true)
    doc.addImage(imgData, 'PNG', 0, 0, dataFormat.w, dataFormat.h, undefined, 'NONE')
    doc.save('moccard.pdf')
  }

  const generatePng = async () => {
    const element = document.getElementById("preview")
    if (!element) { return }
    const png = await toPng(element, { height: 1240, width: 874, canvasWidth: 874, canvasHeight: 1240, quality: 1.0, pixelRatio: 1.0})
    return png
  }

  const handleDownloadPng = async () => {
    const png = await generatePng()
    if (!png) { return }
    const link = document.createElement('a')
    link.download = 'moccard.png'
    link.href = png
    link.click()
    link.remove()
  }

  const handleDownloadJpeg = async () => {
    const element = document.getElementById("preview")
    if (!element) { return }
    const jpeg = await toJpeg(element, { height: 1240, width: 874, canvasWidth: 874, canvasHeight: 1240, quality: 1.0, pixelRatio: 1.0})
    const link = document.createElement('a')
    link.download = 'moccard.jpeg';
    link.href = jpeg
    link.click()
    link.remove()
  }

  const toggleModal = () => {
    setVisible(!visible)
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

        <form className="flex flex-row w-4/5 justify-between gap-4 mx-auto my-16" action="/api/generate" method="post">
          <Preview branding={ branding } lug={ lug } accent={ color }></Preview>
          <div className="flex flex-col gap-2">
            <div>
              <fieldset>
                <input type="radio" id="roguebricks" name="lug" value="Roguebricks" onChange={ handleInputChange }/> Roguebricks
                <input type="radio" id="rebellug" name="lug" value="RebelLUG" onChange={ handleInputChange }/> RebelLUG
              </fieldset>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <label>Accent Color</label>
                <div style={{ backgroundColor: color.hex}} className="w-8 h-8" onClick={toggleModal}></div>
            </div>
          </div>
        </form>

        <button type="button" onClick={ handleDownloadPng }>Download as PNG</button>
        <button type="button" onClick={ handleDownloadJpeg }>Download as JPEG</button>
        <button type="button" onClick={ generatePdf }>Download as PDF</button>
      </main>

      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-dark bg-opacity-50 flex justify-center items-center">
          <div className="bg-light p-4 rounded-lg flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold text-black">Pick an accent color</h2>
            <ColorPicker width={456} height={228} color={color} 
              onChange={setColor} hideHSV dark 
            />
            <button className="bg-blue-500 border-black text-black px-4 py-2 rounded-lg" onClick={toggleModal}>Save</button>
          </div>
        </div>
        
      )}
    </>
  )
}
