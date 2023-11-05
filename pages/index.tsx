import Head from 'next/head'
import Preview from '../components/preview'
import { useCallback, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/lib/css/styles.css"


export default function Home() {
  const [branding] = useState(true);
  const [color, setColor] = useColor("hex", "#ffc116");
  const [lug, setLug] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isRender, setIsRender] = useState(false);
  const ref = useRef<HTMLDivElement>(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref, branding, color, lug, avatarImage])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarImage(file)
    }
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
          <div ref={ref}><Preview isRender={isRender} branding={ branding } lug={ lug } accent={ color } avatar={ avatarImage }></Preview></div>

          <div className="flex flex-col gap-2 border-2 rounded-md p-4 border-light h-min">
            <h1>MOC Card Generator</h1>
          
            <div className="flex flex-col pt-8 gap-2">
              <div>
                <label>Choose your LUG or leave the bottom header empty</label>
                <fieldset className="font-bold pt-2">
                  <input type="radio" id="roguebricks" name="lug" checked={lug === 'Roguebricks'} value="Roguebricks" onChange={ event => setLug(event.target.value) }/> Roguebricks
                  <input type="radio" className="ml-4" id="rebellug" name="lug" checked={lug === 'RebelLUG'} value="RebelLUG" onChange={ event => setLug(event.target.value) }/> RebelLUG
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
                <button className="flex-grow" onClick={ onButtonClick }>Download as PNG</button>
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
