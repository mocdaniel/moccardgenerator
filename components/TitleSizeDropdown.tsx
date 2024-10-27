import { ALargeSmall } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type TitleSizeDropdownProps = {
  titleSize: 4.5 | 3.5 | 2.5;
  setTitleSize: (size: 4.5 | 3.5 | 2.5) => void;
};

export default function TitleSizeDropdown(props: TitleSizeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="no-render absolute top-0 right-0 m-2 border-none"
          variant="default"
        >
          <ALargeSmall className="mr-2" />
          Title font size
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={props.titleSize == 4.5}
          onCheckedChange={() => {
            if (props.titleSize != 4.5) {
              props.setTitleSize(4.5);
            }
          }}
          className="text-black"
        >
          large
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.titleSize == 3.5}
          onCheckedChange={() => {
            if (props.titleSize != 3.5) {
              props.setTitleSize(3.5);
            }
          }}
          className="text-black"
        >
          medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.titleSize == 2.5}
          onCheckedChange={() => {
            if (props.titleSize != 2.5) {
              props.setTitleSize(2.5);
            }
          }}
          className="text-black"
        >
          small
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
