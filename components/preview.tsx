'use client'

import Image from "next/image"
import roguebricksSVG from '../public/roguebricks.svg'
import rebellugSVG from '../public/rebellug.svg'
import placeholderAvatar from '../public/avatar.png'
import instagramSVG from '../public/instagram.svg'
import flickrSVG from '../public/flickr.svg'
import backgroundImage from '../public/background.jpeg'
import { Roboto_Condensed } from 'next/font/google'
import { Color } from "react-color-palette"

const robotoBold = Roboto_Condensed({ subsets: ['latin-ext'], weight: '700'})
const roboto = Roboto_Condensed({ subsets: ['latin-ext'], weight: '400'})

type PreviewProps = {
    lug: string,
    branding: boolean,
    accent: Color,
    avatar: File | null,
}

const loremIpsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."

export default function Preview (props: PreviewProps) {
    return (
        <div id="preview" className="w-[874px] h-[1240px] bg-white">
            <div className="preview-backgrounds left-0 bottom-0 w-full h-[220px]  opacity-100" style={{ backgroundColor: props.accent.hex }}/>

            <Image className="preview-backgrounds left-0 top-0 w-full h-auto opacity-50" src={ backgroundImage } alt=""/>
            
            
            
            <div id="preview-content" className="w-[874px] h-[1240px] text-center bg-transparent text-black pt-4">
                <input type="text" id="mocName" placeholder="MOC title" className={`mx-auto w-4/5 h-[196px] text-7xl text-center uppercase ${robotoBold.className}`}></input> 

                <div className="h-1 mx-auto w-4/5" style={{ backgroundColor: props.accent.hex }}/>

                <textarea className={"grow mx-auto w-4/5 text-4xl h-[562px] resize-none " + roboto.className} id="mocDescription" name="mocDescription" placeholder={ loremIpsum }/>

                <div className="h-1 mx-auto w-4/5" style={{ backgroundColor: props.accent.hex }}></div>

                <div className="flex mx-auto w-4/5 flex-row pt-8 gap-16 h-[256px]">
                    <Image className="ml-8 mb-8 rounded-full h-[160px] w-[160px] ring-4 ring-black" src={ props.avatar ? URL.createObjectURL(props.avatar) : placeholderAvatar } width={200} height={200} alt="Profile picture"/>

                    <div className="flex mb-6 flex-col">
                        <input className={"text-4xl " + robotoBold.className} type="text" id="builder" name="builder" placeholder="Builder"/>

                        <input className={"text-3xl " + robotoBold.className } type="text" id="from" name="from" placeholder="Billund"/>

                        <div className="flex flex-row gap-2 mt-4 mb-2">
                            <Image className="border-4 rounded-lg border-black" width={30} height={30} src={ flickrSVG } alt="Flickr Logo"/>
                            <input className={"text-2xl " + roboto.className } type="text" id="flickr" name="flickr" placeholder="username"/>
                        </div>

                        <div className="flex flex-row gap-2">
                            <Image width={30} height={30} src={ instagramSVG } alt="Instagram Logo"/>
                            <input className={"text-2xl " + roboto.className } type="text" id="instagram" name="instagram" placeholder="username"/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-opacity-10 h-[220px] pb-8">
                    { props.lug && (
                        <Image className="max-h-1/4 h-[220px] justify-self-center self-center" width={300} src={ props.lug == "Roguebricks" ? roguebricksSVG : rebellugSVG } alt="Roguebricks Logo"></Image>
                    )}
                </div>
                
        
            </div>
        </div>  
    )
}