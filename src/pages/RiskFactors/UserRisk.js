import React, { useState, useEffect } from "react";
import { getAll as getAllFactors, getByUser } from "../../services/riskfactors.services";
import { useAuth } from "../../context";
import SelectFactor from "../../components/SelectFactor/SelectFactor";
import FactorsForUserCard from "./FactorsForUserCard";

const UserRisk = () => {
  
    const { authState } = useAuth();
    const [riskList, setRiskList] = useState([]);

    const [list, setList] = useState([]);

    const getOptions = async () => {
        const res = await getAllFactors()
        const data = res.data
        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        })
        )

        const filterOptions = options.filter((op) => !(riskList?.find((index) => index.id === op.value)))
        setList({ selectOptions: filterOptions })
    }
    const getAllFactorsUser = async () => {
        const factor = await getByUser(authState.user.id)
        if (factor?.success) {
            setRiskList(factor?.data?.riskInfo)
        }
    }

    useEffect(() => {

        getAllFactorsUser();
        getOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getOptions();
    }, [riskList])

    return (
        <div className="display-block" >
            <h1>Factores de Riesgo</h1>

            {list?.selectOptions?.length > 0 && (
                <SelectFactor getAllFactorsUser={getAllFactorsUser} riskList={riskList} list={list} />
            )}
            {riskList?.length > 0 && (

                <FactorsForUserCard riskList={riskList} getAllFactorsUser={getAllFactorsUser} getOptions={getOptions} />

            )}

        </div>
    );
};

export default UserRisk;
