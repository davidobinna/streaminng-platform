import './FormStyles.css';

const Form = () => {
    return (
        <div className='form'>
            <form>
            <label>Full Name</label>
            <input type="text"></input>
            <label>Email Address</label>
            <input type="text"></input>
            <label>Facebook Username</label>
            <input type="text"></input>
            <label>How Can We Help You ?</label>
            <textarea name="info" id="" cols="35" rows="10" plaecholder="describe..."/>
            <button className='btn'>Submit</button>
        </form>
        </div>
    )
}


export default Form;
