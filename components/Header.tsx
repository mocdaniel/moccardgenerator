import Link from "next/link";
import { Button } from "./ui/button";
import {FileDownIcon } from "lucide-react";

type HeaderProps = {
    renderImage: (() => void) | null;
}
export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-row w-screen h-8 justify-between py-4 px-8 items-baseline text-white">
            <span className="text-2xl">MOCCardGenerator</span>
            <div className="flex flex-row justify-between gap-8">
                <Link className="hover:underline text-xl pt-4" href={"/"}>Home</Link>
                <Link className="hover:underline text-xl pt-4" href={"/faq"}>FAQ</Link>
                { props.renderImage && 
                    <Button onClick={props.renderImage} variant="affirmative">
                        <FileDownIcon className="mr-2"/>
                        Download PDF
                    </Button>
                }
            </div>
        </div>
    )
}
