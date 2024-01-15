import Head from 'next/head'
import Preview from '../components/Preview'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/lib/css/styles.css"
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'

export default function Home() {
  const [branding] = useState(true);
  const [color, setColor] = useColor("hex", "#ffc116");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null)
  const [isChromeBased, setIsChromeBased] = useState(true);

  useEffect(() => {
        console.log(window.navigator.userAgent)
        setIsChromeBased(window.navigator.userAgent.includes("Chrom"));
  }, []);

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

      <main className="mx-auto flex flex-col justify-center items-center gap-8">
          <Header renderImage={onButtonClick}/>
          <div ref={ref}><Preview branding={ branding } toggleColorPicker={toggleModal} useColor={ useColor } color={ color }/></div>
      </main>

      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white max-w-xl flex-grow p-4 rounded-lg flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold text-black">Pick an accent color</h2>
            <ColorPicker width={456} height={228} color={color} 
              onChange={setColor} hideHSV dark 
            />
            <Button className="no-border" onClick={toggleModal} variant="default">Save</Button>
          </div>
        </div>  
      )}

      {!isChromeBased && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
         <div className="bg-white py-2 px-4 rounded-lg">
           <p className="text-4xl">Whoops!</p>
           <p className="text-2xl">This browser doesn&apos;t seem to be Chrome-based</p>
           <p className="text-xl pt-4">
            As this can lead to severe problems with generating the final PDF,<br/>
            we decided to postpone support for browsers like <b>Safari, Firefox,<br/>
            or Internet Explorer</b> to a later point in time.<br/>
            <br/>
            In the meantime, please use one of the following browsers:
            <ul className="list-disc pl-6">
              <li><a className="underline" href="https://www.google.com/chrome">Google Chrome</a></li>
              <li><a className="underline" href="https://www.microsoft.com/de-de/edge/download">Microsoft Edge</a></li>
              <li><a className="underline" href="https://brave.com/de/download/">Brave</a></li>
            </ul>
           </p>
         </div>
        </div> 
      )}
    </>
  )
}
