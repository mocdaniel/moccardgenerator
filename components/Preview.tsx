"use client";

import React from "react";
import Image from "next/image";
import flickrSVG from "../public/flickr.svg";
import globeSVG from "../public/globe.svg";
import instagramSVG from "../public/instagram.svg";
import mailSVG from "../public/mail.svg";
import backgroundImage from "../public/background.png";
import { Lato } from "next/font/google";
import { Color } from "react-color-palette";
import { LinkDropdown } from "./LinkDropdown";
import FooterDropdown from "./FooterDropdown";
import RoguebricksSVG from "./ui/roguebricks-svg";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";
import TitleSizeDropdown from "./TitleSizeDropdown";

const latoBold = Lato({ subsets: ["latin-ext"], weight: "700" });
const lato = Lato({ subsets: ["latin-ext"], weight: "400" });

type PreviewProps = {
  branding: boolean;
  color: Color;
  useColor: any;
  toggleColorPicker: () => void;
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.";

export default function Preview(props: PreviewProps) {
  const [showFlickr, setShowFlickr] = React.useState(true);
  const [showInstagram, setShowInstagram] = React.useState(true);
  const [showEmail, setShowEmail] = React.useState(false);
  const [showWebsite, setShowWebsite] = React.useState(false);
  const [showRogueLight, setShowRogueLight] = React.useState(true);
  const [showRogueDark, setShowRogueDark] = React.useState(false);
  const [footerImage, setFooterImage] = React.useState<File | null>(null);
  const [avatarImage, setAvatarImage] = React.useState<File | null>(null);
  const [hoversAvatar, setHoversAvatar] = React.useState<boolean>(false);
  const [titleSize, setTitleSize] = React.useState<4.5 | 3.5 | 2.5 | 2>(4.5);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarImage(file);
    }
  };

  const handleFooterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFooterImage(file);
    }
  };

  return (
    <div id="preview" className="w-[874px] h-[1240px] bg-white">
      <div
        className="preview-backgrounds left-0 bottom-0 w-full h-[220px]  opacity-100"
        style={{ backgroundColor: props.color.hex }}
      />

      <Image
        priority
        className="preview-backgrounds left-0 top-0 w-full h-auto"
        src={backgroundImage}
        alt=""
      />

      <div className="preview-backgrounds left-0 top-0 w-full h-[1020px] bg-white opacity-60" />

      <div
        id="preview-content"
        className="flex flex-col w-[874px] h-[1240px] text-center bg-transparent text-black pt-4"
      >
        <TitleSizeDropdown titleSize={titleSize} setTitleSize={setTitleSize} />
        <input
          type="text"
          id="mocName"
          placeholder="MOC title"
          className={`mx-auto w-4/5 h-[196px] text-center uppercase ${latoBold.className}`}
          style={{ fontSize: `${titleSize}rem` }}
        ></input>

        <div
          className="h-1 mx-auto w-4/5"
          style={{ backgroundColor: props.color.hex }}
        />

        <textarea
          className={
            "mx-auto w-4/5 text-3xl h-[562px] resize-none shrink " +
            lato.className
          }
          id="mocDescription"
          name="mocDescription"
          placeholder={loremIpsum}
        />

        <div
          className="h-1 mx-auto w-4/5"
          style={{ backgroundColor: props.color.hex }}
        ></div>

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

          <input
            id="avatar"
            type="file"
            hidden
            className="opacity-0 absolute inset-0"
            onChange={handleImageChange}
          />

          <div
            onMouseLeave={() => setHoversAvatar(false)}
            onMouseEnter={() => setHoversAvatar(true)}
            onClick={() =>
              (document.getElementById("avatar") as HTMLInputElement)?.click()
            }
            className="ml-8 mb-8 rounded-full border-4  h-[160px] w-[160px]"
            style={{
              backgroundImage: avatarImage
                ? `url(${URL.createObjectURL(avatarImage)})`
                : 'url("/avatar.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderColor: props.color.hex,
            }}
          >
            {hoversAvatar && (
              <div className="w-full h-full bg-slate-500 rounded-full bg-opacity-75 flex flex-col justify-center items-center">
                <ImagePlus className="text-white" size={40} />
              </div>
            )}
          </div>
          <div className="flex flex-col py-4 self-stretch grow gap-1 justify-start">
            <div className="flex flex-col gap-1 justify-between items-start">
              <input
                className={"text-4xl " + latoBold.className}
                type="text"
                id="builder"
                name="builder"
                placeholder="Builder"
              />

              <input
                className={"text-2xl mb-6 " + latoBold.className}
                type="text"
                id="from"
                name="from"
                placeholder="Billund"
              />
            </div>

            <div className="flex flex-col grow justify-start items-start">
              {showFlickr && (
                <div className="flex flex-row gap-2 my-1 items-center">
                  <Image width={30} src={flickrSVG} alt="Flickr Logo" />
                  <input
                    className={"text-2xl " + lato.className}
                    type="text"
                    id="flickr"
                    name="flickr"
                    placeholder="username"
                  />
                </div>
              )}

              {showInstagram && (
                <div className="flex flex-row gap-2 my-1 items-center">
                  <Image width={30} src={instagramSVG} alt="Instagram Logo" />
                  <input
                    className={`text-2xl ${lato.className}`}
                    type="text"
                    id="instagram"
                    name="instagram"
                    placeholder="username"
                  />
                </div>
              )}

              {showEmail && (
                <div className="flex flex-row gap-2 my-1 items-center">
                  <Image width={30} src={mailSVG} alt="Mail Logo" />
                  <input
                    className={`text-2xl ${lato.className}`}
                    type="text"
                    id="mail"
                    name="mail"
                    placeholder="user@example.com"
                  />
                </div>
              )}

              {showWebsite && (
                <div className="flex flex-row gap-2 my-1 items-center">
                  <Image width={30} src={globeSVG} alt="Globe Logo" />
                  <input
                    className={`text-2xl ${lato.className}`}
                    type="text"
                    id="website"
                    name="website"
                    placeholder="example.com"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col bg-opacity-10 h-[220px] justify-center">
          <Button
            onClick={props.toggleColorPicker}
            className="no-render absolute top-0 left-0 m-2 border-none"
            variant="default"
          >
            Change Color
          </Button>
          <input
            id="footer-image"
            type="file"
            hidden
            className="opacity-0 absolute inset-0"
            onChange={handleFooterImageChange}
          />
          <FooterDropdown
            showRogueLight={showRogueLight}
            setShowRogueLight={setShowRogueLight}
            showRogueDark={showRogueDark}
            setShowRogueDark={setShowRogueDark}
            footerImage={footerImage}
            setFooterImage={setFooterImage}
          />
          {(footerImage || showRogueLight || showRogueDark) && footerImage ? (
            <img
              className="max-h-[220px] max-w-[300px] justify-self-center self-center"
              src={URL.createObjectURL(footerImage)}
              alt="Logo"
            />
          ) : showRogueLight ? (
            <RoguebricksSVG dark={false} />
          ) : showRogueDark ? (
            <RoguebricksSVG dark={true} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
