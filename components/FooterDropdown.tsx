import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type FooterDropdownProps = {
  showRogueLight: boolean;
  showRogueDark: boolean;
  footerImage: File | null;
  setShowRogueLight: (show: boolean) => void;
  setShowRogueDark: (show: boolean) => void;
  setFooterImage: (image: File | null) => void;
};

export default function FooterDropdown(props: FooterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="no-render absolute top-0 right-0 m-2 border-none"
          variant="default"
        >
          Add Logo
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={props.showRogueLight}
          onCheckedChange={() => {
            if (!props.showRogueLight) {
              props.setShowRogueDark(false);
              props.setFooterImage(null);
              props.setShowRogueLight(true);
            } else {
              props.setShowRogueLight(false);
            }
          }}
          className="text-black"
        >
          RogueBricks Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.showRogueDark}
          onCheckedChange={() => {
            if (!props.showRogueDark) {
              props.setShowRogueLight(false);
              props.setFooterImage(null);
              props.setShowRogueDark(true);
            } else {
              props.setShowRogueDark(false);
            }
          }}
          className="text-black"
        >
          RogueBricks Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.footerImage !== null}
          onCheckedChange={() => {
            if (!props.footerImage) {
              props.setShowRogueLight(false);
              props.setShowRogueDark(false);
              (
                document.getElementById("footer-image") as HTMLInputElement
              )?.click();
            } else {
              props.setFooterImage(null);
            }
          }}
          className="text-black"
        >
          Upload
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
