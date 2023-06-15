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
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

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
    const dataFormatA5 = { code: 'a5', h: 210, w: 148 }

    var imgData = await generatePng()

    if (!imgData) { return }
    var doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: dataFormatA5.code
    })
    doc.viewerPreferences({ FitWindow: true}, true)
    doc.addImage(imgData, 'PNG', 0, 0, dataFormatA5.w, dataFormatA5.h, undefined, 'NONE')
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
      <main className="w-4/5 mx-auto flex flex-row justify-center items-center pt-16 gap-8">
          <Preview branding={ branding } lug={ lug } accent={ color } avatar={ image }></Preview>

          <div className="flex flex-col gap-2 border-2 rounded-md p-4 border-light h-min">
            <h1>MOC Card Generator</h1>
          
            <div className="flex flex-col pt-8 gap-2">
              <div>
                <label>Choose your LUG or leave the bottom header empty</label>
                <fieldset className="font-bold pt-2">
                  <input type="radio" id="roguebricks" name="lug" value="Roguebricks" onChange={ handleInputChange }/> Roguebricks
                  <input type="radio" className="ml-4" id="rebellug" name="lug" value="RebelLUG" onChange={ handleInputChange }/> RebelLUG
                </fieldset>
              </div>
              <div className="flex flex-row gap-2 pt-8 justify-between items-center">
                <div className="flex flex-row gap-2">
                  <div style={{ backgroundColor: color.hex}} className="w-8 h-8 mr-4" onClick={toggleModal}></div>
                  <label>Click to pick your accent color</label>
                </div>
                
                <div className="ml-8">
                  <input id="avatar" type="file" hidden className="opacity-0 absolute inset-0" onChange={handleImageChange} />
                  <button onClick={() => (document.getElementById('avatar') as HTMLInputElement)?.click()}>Upload Avatar</button>                
                </div>
              </div>

              <div className="flex flex-row flex-grow gap-2 justify-between pt-8">
                <button className="flex-grow" onClick={ handleDownloadPng }>Download as PNG</button>
                <button className="flex-grow" onClick={ handleDownloadJpeg }>Download as JPEG</button>
                <button className="flex-grow" onClick={ generatePdf }>Download as PDF</button>
              </div>
            </div>
          </div>
      </main>

      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-dark bg-opacity-50 flex justify-center items-center">
          <div className="bg-light p-4 rounded-lg flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold text-black">Pick an accent color</h2>
            <ColorPicker width={456} height={228} color={color} 
              onChange={setColor} hideHSV dark 
            />
            <button className="hover:bg-dark hover:text-light text-dark border-dark" onClick={toggleModal}>Save</button>
          </div>
        </div>
        
      )}
    </>
  )
}
