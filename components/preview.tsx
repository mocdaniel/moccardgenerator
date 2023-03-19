type PreviewProps = {
    mocName: string,
    mocDescription: string,
    builder: string,
    instagram: string,
    flickr: string,
    lug: string,
    branding: boolean,
}

export default function Preview(props: PreviewProps) {
    const loremIpsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."


    return ( 
        <div className="flex flex-col justify-between gap-4 w-[874px] h-[1240px] bg-light text-dark px-2 py-4">
            <div className="flex flex-col gap-4">
                <h1 className="mx-auto">{ props.mocName ? props.mocName : "MOC Name"}</h1>
                <div className="h-1 mx-auto w-4/5 bg-brand"/>
            </div>
            
            <div className="mx-auto grow w-4/5 text-xl font-bold">
                { props.mocDescription ? props.mocDescription : loremIpsum }
            </div>

            <div className="flex h-1/3 mx-auto w-4/5 flex-col gap-4">
                <div className="h-1 mx-auto w-full bg-brand"></div>
                <p><b>Builder:</b> { props.builder}</p>
                <p><b>Instagram:</b> { props.instagram}</p>
                <p><b>Flickr:</b> { props.flickr}</p>
                { props.branding ? <p><b>Branding:</b> { props.lug }</p> : ""}
            </div>
        </div>
    )
}