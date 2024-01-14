import Head from 'next/head'
import Preview from '../components/Preview'
import { useCallback, useRef, useState } from 'react'
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

      <main className="w-4/5 mx-auto flex flex-col justify-center items-center gap-8">
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
    </>
  )
}
