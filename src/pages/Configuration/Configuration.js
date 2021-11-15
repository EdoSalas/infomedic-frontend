import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth, useModal } from "../../context";
import { Title, Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import { updateUser } from "../../Services/users.services";
import SelectProvince from "../../components/SelectProvince";
import SelectCanton from "../../components/SelectCanton/SelectCanton";
import {getCantonById} from "../../services/cantones.services";
import ChangePassword from "./ChangePassword";

const Configuration = () => {
  const { authState ,setAuthState} = useAuth();
  const { setModalOpen } = useModal();
  const [province, setProvince] = useState({ provinceId: "1" });
  const [stateUserReg, setstateUserReg] = useState({
    id: parseInt(authState?.user?.idNumber,10) ,
    name: authState?.user?.name,
    lastname: authState?.user?.lastname ,
    dateOfBirth: "",
    email: authState?.user?.email,
    canton: authState?.user?.canton,
  });

  const handleChangeProvince = (name, value) => {
    setProvince(prev => ({ ...prev, [name]: value }))
  }
  
  const validateData = () => {
    if (stateUserReg.id !== "" && stateUserReg.name !== "" &&
      stateUserReg.lastname !== "" && stateUserReg.dateOfBirth !== "" &&
      stateUserReg.email !== "" && stateUserReg.canton !== "") {
      
      return true;
    }
    toast.error("¡Debe completar todos los datos solicitados!")
    return false;
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const user = await updateUser(stateUserReg)
      if (user.success) {
        toast.success("¡Datos actualizados con éxito!")
        setAuthState((prev) => ({ ...prev, user: user.data, isLoggedIn: true }));
      }
    }
  }
  const getProvince = async () => {
    const canton = await getCantonById(authState?.user?.canton)
    if (canton.success) {
      setProvince(prev => ({ ...prev, "province": canton.data?.province }))
    }
}
  const handleChange = (name, value) => {
    if (name === "id") {
      setstateUserReg(prev => ({ ...prev, [name]: value, password: value }))
    } else if (name === "canton") {
      setstateUserReg(prev => ({ ...prev, [name]: parseInt(value, 10) }))
    } else {
      setstateUserReg(prev => ({ ...prev, [name]: value }))
    }
  }
  const handleChangePassword = (e)=> {
    e.preventDefault();
    setModalOpen(true, <ChangePassword  onClose={() => setModalOpen(false)} />);
  }
  useEffect(() => {

    getProvince();
    var curr = new Date(authState?.user?.dateOfBirth);
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);
    setstateUserReg(prev => ({ ...prev, dateOfBirth: date }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return (
    <div className="display-block" >
      <h1>Perfil de usuario</h1>

      <form className=" content-page" onSubmit={handleRegister}>
        
        <Field>
          <Control>
            <Label>Correo electrónico:</Label>
            <Input required type="email" maxLength="45" name="email" placeholder="Correo electrónico" value={stateUserReg.email}
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Nombre:</Label>
            <Input type="text" maxLength="45" name="name" placeholder="Nombre" value={stateUserReg.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Apellidos:</Label>
            <Input type="text" maxLength="45" name="lastname" placeholder="Apellidos" value={stateUserReg.lastname}
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Fecha de nacimiento:</Label>
            <Input type="date" maxLength="45" name="dateOfBirth" placeholder="Fecha de nacimiento:" value={stateUserReg.dateOfBirth}
              onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Control>
            <SelectProvince label="Provincia:" name="provinceId" value={province.provinceId} onChange={handleChangeProvince} />
            <SelectCanton label="Cantón:" idProvince={province.provinceId} name="canton" value={stateUserReg.canton} onChange={handleChange} />
          </Control>
        </Field>

        <Button type="submit" color="primary">Guardar Cambios</Button>
        <Button type="submit" color="secondary" onClick={(e)=>handleChangePassword(e)}>Cambiar Contraseña</Button>
      </form>
    </div>
  );
};

Configuration.propTypes = {
 
};

export default Configuration;
