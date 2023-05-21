import Image from "next/image"
import roguebricksSVG from '../public/roguebricks.svg'
import rebellugSVG from '../public/rebellug.svg'
import avatarPNG from '../public/avatar.png'
import instagramSVG from '../public/instagram.svg'
import flickrSVG from '../public/flickr.svg'
import backgroundImage from '../public/background.jpeg'
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400'})

type PreviewProps = {
    lug: string,
    branding: boolean,
}

const previewClassName = "flex flex-col justify-between gap-4 w-[874px] h-[1240px] bg-light text-dark py-4 " + bebasNeue.className

console.log(previewClassName)

const loremIpsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

export default function Preview (props: PreviewProps) {
    return (
        <div id="preview" className={ previewClassName }>
            <Image id="preview-background" src={ backgroundImage } alt=""/>
            <div id="preview-content" className="flex flex-col justify-between gap-4 w-[874px] h-[1240px] bg-transparent text-dark py-4">
            <input type="text" id="mocName" placeholder="MOC title" className="text-6xl mx-auto w-4/5 font-bold text-center"></input> 

            <div className="h-1 mx-auto w-4/5 bg-brand"/>
             
            <textarea className="grow mx-auto w-4/5 text-xl font-bold resize-none" id="mocDescription" name="mocDescription" placeholder={ loremIpsum }/>

            <div className="h-1 mx-auto w-4/5 bg-brand"></div>

            <div className="flex mx-auto w-4/5 flex-row gap-16 ">
                <Image className="ml-8 my-8 rounded-full h-[160px] w-[160px] ring-dark" src={ avatarPNG } width={200} height={200} alt="Profile picture"/>
                
                <div className="flex my-6 flex-col gap-2">
                    <input className="text-4xl font-bold" type="text" id="builder" name="builder" placeholder="Builder"/>
                    <input className="text-3xl font-bold" type="text" id="from" name="from" placeholder="Billund"/>

                    <div className="flex flex-row gap-2">
                        <Image className="border-4 rounded-lg border-dark" width={40} height={40} src={ flickrSVG } alt="Flickr Logo"/>
                        <input className="text-2xl font-bold" type="text" id="flickr" name="flickr" placeholder="username"/>
                    </div>

                    <div className="flex flex-row gap-2">
                        <Image width={40} height={40} src={ instagramSVG } alt="Instagram Logo"/>
                        <input className="text-2xl font-bold" type="text" id="instagram" name="instagram" placeholder="username"/>
                    </div>
                </div>
            </div>
            <Image className="max-h-1/4 my-auto pb-10 justify-self-center self-center" width={300} src={ props.lug == "Roguebricks" ? roguebricksSVG : rebellugSVG } alt="Roguebricks Logo"></Image>
        
            </div>
        </div>  
    )
}