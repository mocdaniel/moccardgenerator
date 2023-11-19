import Head from 'next/head'
import Preview from '../components/Preview'
import { useCallback, useRef, useState } from 'react'
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/lib/css/styles.css"
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { PutBlobResult } from '@vercel/blob'

export default function Home() {
  const [branding] = useState(true);
  const [color, setColor] = useColor("hex", "#ffc116");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null)
  const avatarInputFileRef = useRef<HTMLInputElement>(null);
  const [avatarBlob, setAvatarBlob] = useState<PutBlobResult | null>(null);
  const footerInputFileRef = useRef<HTMLInputElement>(null);
  const [footerBlob, setFooterBlob] = useState<PutBlobResult | null>(null);
  

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    function renderFilter(node: HTMLElement) {
      return (!node.classList.contains('no-render'));
    }

    toPng(ref.current, { filter: renderFilter })
      .then((dataUrl: string) => {
        var doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a5'
        })
         doc.viewerPreferences({ FitWindow: true}, true)
         doc.addImage(dataUrl, 'PNG', 0, 0, 148, 210, undefined, 'NONE')
         doc.save('moccard.pdf')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

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
          <div ref={ref}><Preview branding={ branding } accent={ color } avatarBlob={ avatarBlob } footerBlob={ footerBlob } /></div>

          <div className="flex flex-col gap-2 border-2 rounded-md p-4 border-light h-min">
            <h1>MOC Card Generator</h1>
          
            <div className="flex flex-col pt-8 gap-2">
              <div className="flex flex-row gap-2 pt-8 justify-between items-center">
                <div className="flex flex-row gap-2">
                  <div style={{ backgroundColor: color.hex}} className="w-8 h-8 mr-4" onClick={toggleModal}></div>
                  <label>Click to pick your accent color</label>
                </div>
              </div>

              <div className="ml-8">
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();
                  
                    if (!avatarInputFileRef.current?.files) {
                      throw new Error('No file selected');
                    }
                  
                    const file = avatarInputFileRef.current.files[0];
                  
                    const response = await fetch(
                      `/api/avatar/upload?filename=${file.name}`,
                      {
                        method: 'POST',
                        body: file,
                      },
                    );
                    
                    const newBlob = (await response.json()) as PutBlobResult;
                    
                    setAvatarBlob(newBlob);
                  }}
                >
                  <input name="file" ref={avatarInputFileRef} type="file" required />
                  <button type="submit">Upload Avatar</button>
                </form>
              </div>

              <div className="ml-8">
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();
                  
                    if (!footerInputFileRef.current?.files) {
                      throw new Error('No file selected');
                    }
                  
                    const file = footerInputFileRef.current.files[0];
                  
                    const response = await fetch(
                      `/api/footer/upload?filename=${file.name}`,
                      {
                        method: 'POST',
                        body: file,
                      },
                    );
                    
                    const newBlob = (await response.json()) as PutBlobResult;
                    
                    setFooterBlob(newBlob);
                  }}
                >
                  <input name="file" ref={footerInputFileRef} type="file" required />
                  <button type="submit">Upload Footer</button>
                </form>
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
