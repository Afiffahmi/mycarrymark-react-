const Button = (props) => {
    let mode = false 
    
    const handleClick = () => {
        mode = !mode
        mode ? console.log("true") : console.log("false")
    }
    return (
        <div>
    <button onClick={handleClick}>try me</button>
</div>
    )
}

export default Button;
