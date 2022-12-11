export const NotFoundLabel = (props: {text:string}) => {
    return <span style={{position: "fixed", left: "50%", top: "50%", transform:"translate(-50%, -50%)", fontSize:"2rem", color:"gray", fontWeight:"bold"}}>{props.text}</span>
}