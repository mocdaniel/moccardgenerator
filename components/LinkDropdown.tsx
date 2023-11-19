"use client"
 
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
type Checked = DropdownMenuCheckboxItemProps["checked"]

type LinkDropdownProps = {
  accent: string,
  showFlickr: boolean,
  showInstagram: boolean,
  showEmail: boolean,
  showWebsite: boolean,
  setShowFlickr: (show: boolean) => void,
  setShowInstagram: (show: boolean) => void,
  setShowEmail: (show: boolean) => void,
  setShowWebsite: (show: boolean) => void,
}
 
export function LinkDropdown(props: LinkDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="no-render absolute top-0 right-0 m-2 border-none" variant="default">Socials</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={props.showFlickr}
          onCheckedChange={props.setShowFlickr}
          className="text-black"
        >
          Flickr
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.showInstagram}
          onCheckedChange={props.setShowInstagram}
          className="text-black"
        >
          Instagram
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.showEmail}
          onCheckedChange={props.setShowEmail}
          className="text-black"
        >
          Email
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={props.showWebsite}
          onCheckedChange={props.setShowWebsite}
          className="text-black"
        >
          Website
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}