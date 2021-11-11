import React, { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import md5 from "md5";
import { useAuth } from "../../context/AuthContext";
import {changePassword} from "../../Services/users.services";
import {  Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";


const Configuration = ({onClose}) => {
    const { authState ,setAuthState} = useAuth();
    const [password, setPassword] = useState({ 
        passwordActual: "", passwordNew: "", passwordConfirm: "" })
    
    const handlePasswordChange = (name, value) => {
        setPassword(prev => ({ ...prev, [name]: value }))
    }
    const  changePasswordUser = async () => {
        const pass ={
            id: authState.user.idNumber, 
            password: password.passwordNew
        };
        const user = await changePassword(pass)
      if (user.success) {
        toast.success("¡Contraseña cambiada con éxito!", {
            timeOut: 1000,
            fadeOut: 1000,
            onHidden: onClose(),
          });
        setAuthState((prev) => ({ ...prev, user: user.data }));
      }
    }
    const handleChangePassword = async(e) => {
        e.preventDefault();
        console.log(authState.user.password, password.passwordActual)
        if( await md5(password.passwordActual) !== authState.user.password){
            toast.error("¡La contraseña actual suministrada es incorrecta!")
        }else {
            if(password.passwordNew === password.passwordConfirm){
                  changePasswordUser();
            }else{
                toast.error("¡La nueva contraseña y la confirmación no coinciden!")
            }
        }
    }
    return (
        <div className="display-block" >
            <h1>Contraseña</h1>

            <form className=" content-page" onSubmit={handleChangePassword}>
                <Field>
                    <Control>
                        <Label>Contraseña Actual:</Label>
                        <Input type="password" name="passwordActual" placeholder="Contraseña" value={password.passwordActual}
                            onChange={(e) => handlePasswordChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Label>Nueva Contraseña:</Label>
                        <Input type="password" name="passwordNew" placeholder="Contraseña" value={password.passwordNew}
                            onChange={(e) => handlePasswordChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Label>Confirme la contraseña:</Label>
                        <Input type="password" name="passwordConfirm" placeholder="Confirme la contraseña" value={password.passwordConfirm}
                            onChange={(e) => handlePasswordChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>


                <Button type="submit" color="primary">Realizar Cambio</Button>

            </form>
        </div>
    );
};

Configuration.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Configuration;
