import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

type FooterDropdownProps = {
  showRogue: boolean,
  showRebel: boolean,
  showFooterImage: boolean,
  setShowRogue: (show: boolean) => void,
  setShowRebel: (show: boolean) => void,
  setShowFooterImage: (show: boolean) => void,
  footerBlobExists: boolean,
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
                props.setShowFooterImage(false)
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
                props.setShowFooterImage(false)
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
          checked={props.showFooterImage}
          onCheckedChange={() => {
            if (!props.showFooterImage) {
                props.setShowRogue(false);
                props.setShowRebel(false);
                props.setShowFooterImage(true);
            } else {
                props.setShowFooterImage(false)
            }
          }}
          className="text-black"
          disabled={!props.footerBlobExists}
        >
          Your Upload
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}