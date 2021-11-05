import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Title, Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import { registerUser } from "../../Services/users.services";
import SelectProvince from "../SelectProvince";
import SelectCanton from "../SelectCanton/SelectCanton";
import SelectGender from "../SelectGender";

const UserRegiter = ({ setLoginSection }) => {
  const { setAuthState } = useAuth();
  const [province, setProvince] = useState({ provinceId: "1" });

  const [stateUserReg, setstateUserReg] = useState({
    id: "",
    name: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    password: "",
    canton: "",
    genero: "F",
  });


  const handleChangeProvince = (name, value) => {
    setProvince(prev => ({ ...prev, [name]: value }))
  }
  const validateData = () => {
    if (stateUserReg.id !== "" && stateUserReg.name !== "" &&
      stateUserReg.lastname !== "" && stateUserReg.dateOfBirth !== "" &&
      stateUserReg.email !== "" && stateUserReg.canton !== "") {
      if(stateUserReg.id.length < 9) {
        toast.error("¡El número de cédula debe tener un mínino de 9 dígitos!")
        return false;
      } 
      return true;
    }
    toast.error("¡Debe completar todos los datos solicitados!")
    return false;
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const user = await registerUser(stateUserReg)
      if (user.success) {
        setAuthState((prev) => ({ ...prev, user: user.data, isLoggedIn: true }));
      }
    } 
  }

  const handleChange = (name, value) => {
    if (name === "id") {
      setstateUserReg(prev => ({ ...prev, [name]: value, password: value }))
    } else if(name ==="canton"){
      setstateUserReg(prev => ({ ...prev, [name]: parseInt(value,10) }))
    }else{
      setstateUserReg(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginSection(true);
  }
  return (
    <div className="principal-container landing-page scroll">
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
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Cédula de identidad:</Label>
            <Input type="text" name="id" placeholder="Cédula de identidad" value={stateUserReg.id}
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Fecha de nacimiento:</Label>
            <Input type="date" name="dateOfBirth" placeholder="Fecha de nacimiento:" value={stateUserReg.dateOfBirth}
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <SelectGender label="Género:" name="genero" value={stateUserReg.genero} onChange={handleChange} />
          </Control>
        </Field>
        <Field>
          <Control>
            <SelectProvince label="Provincia:" name="provinceId" value={province.provinceId} onChange={handleChangeProvince} />
            <SelectCanton label="Cantón:" idProvince={province.provinceId} name="canton" value={stateUserReg.canton} onChange={handleChange} />
          </Control>
        </Field>
        <Button type="submit" color="primary">Registrarse</Button>
        <Button type="button" color="secondary" onClick={(e) => handleLogin(e)}>Iniciar Sesión</Button>
      </form>
    </div>
  );
};

UserRegiter.propTypes = {
  setLoginSection: PropTypes.func.isRequired,
};

export default UserRegiter;
