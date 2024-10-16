import Link from "next/link";
import { Button } from "./ui/button";
import { FileDownIcon } from "lucide-react";

type HeaderProps = {
  renderImage: (() => void) | null;
};
export default function Header(props: HeaderProps) {
  return (
    <div className="flex flex-row w-full h-8 justify-between py-4 px-8 items-baseline text-white">
      <span className="text-2xl">Brick.cards</span>
      <div className="flex flex-row justify-between items-center gap-8">
        <Link className="hover:underline text-xl" href={"/"}>
          Home
        </Link>
        <Link className="hover:underline text-xl" href={"/faq"}>
          FAQ
        </Link>
        {props.renderImage && (
          <Button onClick={props.renderImage} variant="affirmative">
            <FileDownIcon className="mr-2" />
            Download PDF
          </Button>
        )}
      </div>
    </div>
  );
}
