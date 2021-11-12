import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Control, Input, Icon, Textarea } from "rbx";
import { getAll as getAllFactor, updateFactor} from "../../services/riskfactors.services";


const FactorDetails = ({ factor, setFactorList, onClose }) => {
   

    const [edit, setEdit] = useState(false);
    const [factorChange, setFactorChange] = useState({  name: "", });

    const getFactors = async () => {
        const factors = await getAllFactor()
        if (factors.success) {
            setFactorList(factors.data)
        }
    }
    
    const handleEdit=(e)=>{
        setEdit(true);
    }
    const handleChange = (name, value) => {
        setFactorChange(prev => ({ ...prev, [name]: value }))
    }
   
    const handleSave = async (e) => {
        e.preventDefault();
        // update
         if (factorChange?.name!=="") {
           const user = await updateFactor(factorChange)
           if (user.success) {
            setEdit(false);
             toast.success("¡Factor actualizado!")
             getFactors(); 
             onClose();
            
           }else {
               if(factorChange?.name===factor.name ){
                toast("¡No se registraron cambios en el factor!")
                setEdit(false);
               }else{
                   toast.error("!Ya existe un factor registrado con el nombre suministrado!")
               }
           }
         } 
    }

    useEffect(() => {

        setFactorChange({
            id: factor.id,
            name: factor.name,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div >
            <div className=" content-page">
            <div className="flex">
            <Field className="fields-size2">
                    <Control>
                        <Input disabled={!edit} type="text" name="name"
                            placeholder="Nombre"
                            value={factorChange?.name}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                {!edit && (
                    <Icon className="hover-table-options" size="large">
                    <FontAwesomeIcon icon="edit" onClick={(e)=>handleEdit(e)}/>
                </Icon>
                   )} 
                   {edit && (
                    <Icon className="hover-table-options" size="large">
                    <FontAwesomeIcon icon="check" onClick={(e)=>handleSave(e)}/>
                </Icon>
                   )} 
                </div>
                
               
            </div>
           
        </div>
    );
};
FactorDetails.defaultProps = {
};
FactorDetails.propTypes = {
    factor: PropTypes.object,
    setFactorList: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default FactorDetails;
