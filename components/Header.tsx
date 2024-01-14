import Link from "next/link";
import { Button } from "./ui/button";
import {FileDownIcon } from "lucide-react";

type HeaderProps = {
    renderImage: () => void;
}
export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-row w-screen h-8 justify-center items-baseline text-white">
            <span className="text-2xl absolute left-8 pt-2">MOCCardGenerator</span>
            <div className="flex flex-row justify-center gap-8">
                <Link className="hover:underline text-xl pt-4" href={"/"}>Home</Link>
                <Link className="hover:underline text-xl pt-4" href={"/faq"}>FAQ</Link>
            </div>
            <div className="flex flex-row gap-4 absolute right-8 pt-2 justify-between">
                <Button onClick={props.renderImage} variant="affirmative">
                    <FileDownIcon className="mr-2"/>
                    Download PDF
                </Button>
            </div>
        </div>
    )
}