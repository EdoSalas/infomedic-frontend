import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { Title, Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import { registerUser } from "../../Services/users.services";

const UserRegiter = ({ setLoginSection }) => {
  const { setAuthState } = useAuth();


  const [stateUserReg, setstateUserReg] = useState({
    id: "",
    name: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    password: "",
    canton: 19,
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = await registerUser(stateUserReg)
    if(user.success){
      setAuthState((prev) => ({...prev, user: user.data, isLoggedIn: true}));
    }
  }

  const handleChange = (name, value) => {
    if(name === "id"){
      setstateUserReg(prev => ({...prev, [name]: value, password: value}))
    }else{
      setstateUserReg(prev => ({...prev, [name]: value}))
    }
    
  }

  const handleLogin=(e)=>{
    e.preventDefault();
    setLoginSection(true);
  }
  return (
    <div className="principal-container landing-page">
      <form className="block-container landing-page-container" onSubmit={handleRegister}>
        <Title className="title-center">Registro</Title>
        <Field>
          <Control>
            <Label>Correo electrónico:</Label>
            <Input required type="email" name="email" placeholder="Correo electrónico" value={stateUserReg.email} 
            onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Nombre:</Label>
            <Input type="text" name="name" placeholder="Nombre" value={stateUserReg.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Apellidos:</Label>
            <Input type="text" name="lastname" placeholder="Apellidos" value={stateUserReg.lastName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}/>
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Cédula de identidad:</Label>
            <Input type="text" name="id" placeholder="Cédula de identidad" value={stateUserReg.id}
            onChange={(e) => handleChange(e.target.name, e.target.value)}/>
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Fecha de nacimiento:</Label>
            <Input type="date" name="dateOfBirth" placeholder="Fecha de nacimiento:" value={stateUserReg.dateOfBirth}
            onChange={(e) => handleChange(e.target.name, e.target.value)}/>
          </Control>
        </Field>
        <Button type="submit" color="primary">Registrarse</Button>
        <Button type="button" color="secondary" onClick={(e)=>handleLogin(e)}>Iniciar Sesión</Button>
      </form>
    </div>
  );
};

UserRegiter.propTypes = {
  setLoginSection: PropTypes.func.isRequired,
};

export default UserRegiter;
