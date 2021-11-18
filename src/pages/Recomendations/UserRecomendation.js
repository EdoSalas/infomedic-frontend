import React, { useState, useEffect } from "react";
import { getAll as getAllRecomendations } from "../../services/recomendations.services";
import "../../styles/index.scss"
import RecomendationUserCard from "./RecomendationUserCard";

const UserRecomendations = () => {

    const [recomendationList, setRecomendationList] = useState([]);


    const getRecomendations = async () => {
        const recomendations = await getAllRecomendations()
        if (recomendations.success) {
            setRecomendationList(recomendations.data)
        }
    }


    useEffect(() => {

        getRecomendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="display-block" >
            <h1>Recomendaciones Médicas</h1>

            {recomendationList?.length > 0 && (
                <RecomendationUserCard recomendationList={recomendationList} getRecomendations={getRecomendations} setRecomendationList={setRecomendationList} />
            )}
        </div>
    );
};

export default UserRecomendations;
