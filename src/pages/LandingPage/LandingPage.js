import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/index.scss";
import UserRegister from "../../components/UserRegister";
import UserLoggin from "../../components/UserLoggin/UserLoggin";


const LandingPage = () => {
  const { setAuthState, authState } = useAuth();
  const [loginSection, setLoginSection] = useState(true);

  
  return  (
    <div >
    {loginSection && (
      <UserLoggin setLoginSection={setLoginSection}/>
    )}
    {!loginSection && (
      <UserRegister setLoginSection={setLoginSection}/>
    )}  
    </div>
  )
};

LandingPage.propTypes = {};

export default LandingPage;
