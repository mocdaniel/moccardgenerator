import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faq() {
    return (
        <>
            <Header renderImage={null}/>
            <div className="mx-auto w-[800px] text-white mt-48">
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-2xl">Is this tool free to use?</AccordionTrigger>
                        <AccordionContent className="text-xl">
                            <b>Yes.</b> MOCCardGenerator is free to use and will always be free to use.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-2xl">Do you store/collect my data?</AccordionTrigger>
                        <AccordionContent className="text-xl">
                            <b>No.</b> The whole application runs exclusively in your browser. No data is sent to our server.<br/>In fact, we don&apos;t even see what you are uploading or generating.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-2xl">How many PDFs may I generate?</AccordionTrigger>
                        <AccordionContent className="text-xl">
                            <b>As many as you want to!</b> There is no quota. We might add the possibility to generate bulks of PDFs in the future.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-2xl">Who created this tool?</AccordionTrigger>
                        <AccordionContent className="text-xl">
                            <b><a className="underline" href="https://roguebricks.de">RogueBricks LUG</a>.</b> More accurately, Daniel/dbodkylego.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="text-2xl">Where can I request features or report problems?</AccordionTrigger>
                        <AccordionContent className="text-xl">
                            <b>Via Mail.</b> Send a message Daniel&apos;s way (<b>dbodky[at]gmail[dot]com</b>) and he&apos;ll be in touch!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="text-2xl">The preview doesn&apos;t fit on my screen!</AccordionTrigger>
                        <AccordionContent className="text-xl">
                            <b>This can happen.</b> Daniel&apos;s no web designer/frontend engineer. Better responsive design is on the roadmap.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}