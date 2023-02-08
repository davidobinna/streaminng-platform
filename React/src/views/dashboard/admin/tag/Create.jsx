import { Paper } from "@mui/material";

const CreateTags = () => {
    const fstyles = {
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
       },
       span: {
            padding: "0 10px",
            backgroundColor: "var(--form-bg)",
       }
    }


    return (
        <div>
            <div style={{ justifyContent: "space-between", alignItems: "center"}}>          
                <h4>Create Tag</h4>
                <div className="card animated fadeInDown">
                  <form action="" style={fstyles.form}>
                    <input type="text" name="" id="" />
                     <button className="category-btn" style={{
          background: "#FC1503",
          color: "white"}}> Submit </button>
                  </form>
                </div>

            </div>
        </div>
    )
}


export default CreateTags;
