import './FormStyles.css';

const Form = () => {
    const fstyles = {
        form: {
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            margin: "auto",
            maxWidth: "600px",
       }
    }
    const inputStyle = {
       input: {
        marginBottom: "1rem",
        padding: "10px 10px",
        fontSize: "1.2rem",
        fontFamily: "'Russo One', sans-serif",
        color: "#f4f4f4",
       }
    }
    return (
        <div className='form'>
            <form style={fstyles.form}>
            <label>Full Name</label>
            <input type="text" style={inputStyle.input}></input>
            <label>Email Address</label>
            <input type="text" style={inputStyle.input}></input>
            <label>Facebook Username</label>
            <input type="text" style={inputStyle.input}></input>
            <label>How Can We Help You ?</label>
            <textarea style={inputStyle.input} name="info" id="" cols="35" rows="10" plaecholder="describe..."/>
            <button className='btn'>Submit</button>
        </form>
        </div>
    )
}


export default Form;
