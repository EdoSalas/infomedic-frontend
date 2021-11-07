import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Title, Field, Control, Input, Image, Button } from "rbx";
import { loginUser } from "../../Services/users.services";
import "../../styles/index.scss";
import logo from "../../styles/logo.png";

const UserLoggin = ({ setLoginSection }) => {
    const { setAuthState } = useAuth();

    const [stateUserLog, setstateUserLog] = useState({
        id: "",
        password: "",
    });
    const handleRegister=(e)=>{
        e.preventDefault();
        setLoginSection(false);
      }

    const handleLoggin = async (e) => {
        e.preventDefault();
         const user = await loginUser(stateUserLog);
         if(user.success){
           setAuthState((prev) => ({...prev, user: user.data, isLoggedIn: true}));
         }else{
             toast.error("Credenciales erróneas")
         } 
    }
    const handleChange = (name, value) => {
        setstateUserLog(prev => ({ ...prev, [name]: value }));
    }
    return (
        <div className="principal-container landing-page">
            <form className="block-container landing-page-container" onSubmit={handleLoggin}>
                <Title className="title-center">Inicio de Sesión</Title>
                <div className=" title-center">
                <div className="logo title-center">
                <Image.Container size="10px sq.">
                  <Image src={logo}/>
                </Image.Container>
              </div>
                </div>
               
                <Field>
                    <Control>
                        <Input required type="text" name="id" placeholder="Número de cédula" value={stateUserLog.id}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Input type="password" name="password" placeholder="Contraseña" value={stateUserLog.password}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>

                <Button type="submit" color="primary">Iniciar Sesión</Button>
                <Button type="button" color="secondary" onClick={(e)=>handleRegister(e)}>Registrarse</Button>
            </form>
        </div>
    );
};

UserLoggin.propTypes = {
    setLoginSection: PropTypes.func.isRequired,
};

export default UserLoggin;
