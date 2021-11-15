import React from 'react'
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Select from 'react-select'
import { addFactorForUser } from "../../services/factorByUser.services";
import "../../styles/index.scss";
import { useAuth } from "../../context";

const SelectFactor = ({ getAllFactorsUser, riskList, list }) => {
    const { authState } = useAuth();

    const handleChange = async (e) => {
    
            //add new factor
            const factorAndUser =
            {
                "user": parseInt(authState.user.id, 10),
                "riskFactor": parseInt(e.value, 10),
            }
            const res = await addFactorForUser(factorAndUser);
            const data = res;
            if (data.success) {
                toast.success("Factor registrado con éxito!")
                getAllFactorsUser();
            }

    }

    return (
        <div className="content-page">
            <Select className="multi-select" options={list?.selectOptions} onChange={handleChange.bind(this)} placeholder="Buscar Factor..." />
        </div>
    )
}
SelectFactor.defaultProps = {
    riskList: [],
    list: {},
};
SelectFactor.propTypes = {
    getAllFactorsUser: PropTypes.func.isRequired,
    getOptions: PropTypes.func,
    list: PropTypes.object,
    riskList: PropTypes.array,
};
export default SelectFactor;

