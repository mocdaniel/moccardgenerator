'use client'

import React from "react"
import Image from "next/image"
import roguebricksSVG from '../public/roguebricks.svg'
import rebellugSVG from '../public/rebellug.svg'
import placeholderAvatar from '../public/avatar.png'
import flickrSVG from '../public/flickr.svg'
import globeSVG from '../public/globe.svg'
import instagramSVG from '../public/instagram.svg'
import mailSVG from '../public/mail.svg'
import backgroundImage from '../public/background.png'
import { Roboto_Condensed } from 'next/font/google'
import { Color } from "react-color-palette"
import { LinkDropdown } from './LinkDropdown'
import FooterDropdown from "./FooterDropdown"

const robotoBold = Roboto_Condensed({ subsets: ['latin-ext'], weight: '700'})
const roboto = Roboto_Condensed({ subsets: ['latin-ext'], weight: '400'})

type PreviewProps = {
    branding: boolean,
    accent: Color,
    avatar: File | null,
}

const loremIpsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."

export default function Preview (props: PreviewProps) {
    const [showFlickr, setShowFlickr] = React.useState(true);
    const [showInstagram, setShowInstagram] = React.useState(true);
    const [showEmail, setShowEmail] = React.useState(false);
    const [showWebsite, setShowWebsite] = React.useState(false);
    const [showRebel, setShowRebel] = React.useState(false);
    const [showRogue, setShowRogue] = React.useState(false);
    const [footerImage, setFooterImage] = React.useState<File | null>(null);


    const handleFooterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          setFooterImage(file)
        }
      }

    return (
        <div id="preview" className="w-[874px] h-[1240px] bg-white">
            <div className="preview-backgrounds left-0 bottom-0 w-full h-[220px]  opacity-100" style={{ backgroundColor: props.accent.hex }}/>

            <Image priority className="preview-backgrounds left-0 top-0 w-full h-auto" src={ backgroundImage } alt=""/>
            
            <div className="preview-backgrounds left-0 top-0 w-full h-[1020px] bg-white opacity-60"/>
            
            
            <div id="preview-content" className="flex flex-col w-[874px] h-[1240px] text-center bg-transparent text-black pt-4">
                <input type="text" id="mocName" placeholder="MOC title" className={`mx-auto w-4/5 h-[196px] text-7xl text-center uppercase ${robotoBold.className}`}></input> 

                <div className="h-1 mx-auto w-4/5" style={{ backgroundColor: props.accent.hex }}/>

                <textarea className={"mx-auto w-4/5 text-4xl h-[562px] resize-none shrink " + roboto.className} id="mocDescription" name="mocDescription" placeholder={ loremIpsum }/>

                <div className="h-1 mx-auto w-4/5" style={{ backgroundColor: props.accent.hex }}></div>

                <div className="flex mx-auto w-4/5 flex-row gap-16 grow relative items-center">

                    <LinkDropdown
                        showInstagram={showInstagram}
                        setShowInstagram={setShowInstagram}
                        showFlickr={showFlickr}
                        setShowFlickr={setShowFlickr}
                        showEmail={showEmail}
                        setShowEmail={setShowEmail}
                        showWebsite={showWebsite}
                        setShowWebsite={setShowWebsite}
                    />

                    <Image className="ml-8 mb-8 rounded-full ring-4 ring-black h-[160px] w-[160px]" src={ props.avatar ? URL.createObjectURL(props.avatar) : placeholderAvatar } alt="Profile picture"/>
                    <div className="flex flex-col py-4 self-stretch grow gap-1 justify-start">
                        <div className="flex flex-col gap-1 justify-between items-start">
                            <input className={"text-4xl " + robotoBold.className} type="text" id="builder" name="builder" placeholder="Builder"/>

                            <input className={"text-3xl mb-6 " + robotoBold.className } type="text" id="from" name="from" placeholder="Billund"/>
                        </div>

                        <div className="flex flex-col grow justify-start items-start">
                            { showFlickr &&
                                <div className="flex flex-row gap-2 my-1 items-center">
                                    <Image width={30} src={ flickrSVG } alt="Flickr Logo"/>
                                    <input className={"text-2xl " + roboto.className } type="text" id="flickr" name="flickr" placeholder="username"/>
                                </div>
                            }

                            { showInstagram &&
                                <div className="flex flex-row gap-2 my-1 items-center">
                                    <Image width={30} src={ instagramSVG } alt="Instagram Logo"/>
                                    <input className={ `text-2xl ${roboto.className}` } type="text" id="instagram" name="instagram" placeholder="username"/>
                                </div>
                            }

                            { showEmail &&
                                <div className="flex flex-row gap-2 my-1 items-center">
                                    <Image width={30} src={ mailSVG } alt="Mail Logo" />
                                    <input className={ `text-2xl ${roboto.className}` } type="text" id="mail" name="mail" placeholder="user@example.com"/>
                                </div>
                            }

                            { showWebsite &&
                                <div className="flex flex-row gap-2 my-1 items-center">
                                    <Image width={30} src={ globeSVG } alt="Globe Logo" />
                                    <input className={ `text-2xl ${roboto.className}` } type="text" id="website" name="website" placeholder="example.com"/>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col bg-opacity-10 h-[220px] pb-8">
                    <input id="footer-image" type="file" hidden className="opacity-0 absolute inset-0" onChange={handleFooterImageChange} />
                    <FooterDropdown
                        showRogue={showRogue}
                        setShowRogue={setShowRogue}
                        showRebel={showRebel}
                        setShowRebel={setShowRebel}
                        footerImage={footerImage}
                        setFooterImage={setFooterImage}
                    />
                    { (footerImage || showRebel || showRogue) &&
                    <Image
                        className="max-h-1/4 h-[220px] justify-self-center self-center"
                        width={300}
                        src={ footerImage ? URL.createObjectURL(footerImage) : (showRebel ? rebellugSVG : roguebricksSVG) } alt="Logo"></Image>
                     }
                     </div>
                
        
            </div>
        </div>
    )
}
