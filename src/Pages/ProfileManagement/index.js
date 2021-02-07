import React from "react";
import Navigation from "../../Layout/Navbar/Navigation";
import CardForm from "./Components/CardForm";

function ProfileManagement() {
    return (
        <>
            <Navigation />
            <br />
            <div className='container'>
                <CardForm />
            </div>
        </>
    )
};

export default ProfileManagement;