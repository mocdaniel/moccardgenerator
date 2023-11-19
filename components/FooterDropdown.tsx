import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

type FooterDropdownProps = {
  showRogue: boolean,
  showRebel: boolean,
  footerImage: File | null,
  setShowRogue: (show: boolean) => void,
  setShowRebel: (show: boolean) => void,
  setFooterImage: (image: File | null) => void,
}

export default function FooterDropdown(props: FooterDropdownProps) {
    return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="no-render absolute top-0 right-0 m-2 border-none" variant="default">Socials</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={props.showRogue}
          onCheckedChange={() => {
            if (!props.showRogue) {
                props.setShowRebel(false)
                props.setFooterImage(null)
                props.setShowRogue(true)
            } else {
                props.setShowRogue(false)
            }
          }}
          className="text-black"
        >
          RogueBricks
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.showRebel}
          onCheckedChange={() => {
            if (!props.showRebel) {
                props.setShowRogue(false)
                props.setFooterImage(null)
                props.setShowRebel(true)
            } else {
                props.setShowRebel(false)
            }
          }}
          className="text-black"
        >
          RebelLUG
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.footerImage !== null}
          onCheckedChange={() => {
            if (!props.footerImage) {
                props.setShowRogue(false);
                props.setShowRebel(false);
                (document.getElementById('footer-image') as HTMLInputElement)?.click();
            } else {
                props.setFooterImage(null)
            }
          }}
          className="text-black"
        >
          Upload
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}