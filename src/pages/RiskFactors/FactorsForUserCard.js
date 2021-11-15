import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "../../styles/index.scss";
import { removeFactorForUser } from "../../services/factorByUser.services"

const FactorsForUserCard = ({ riskList, getAllFactorsUser, getOptions }) => {
   

    const handleDeleteFactorByUser = async (factor, e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(factor.pk)
        const param = {
            id: factor.pk,
        }
        const isDeleted = await removeFactorForUser(param);
        if (isDeleted.success) {
            toast.success("Factor de riesgo eliminado con éxito!")
            getAllFactorsUser();
            getOptions();
        }
    }
    return (
        <div className="grid">
            {riskList?.map((factor) => (
                <Card
                    key={factor.id}
                    className="card-content display-flex hover-table-options"
                >
                    <div key={factor.id} >
                        <h2>{factor.name}</h2>
                    </div>
                    <Icon className="hover-table-options icon-cancel">
                        <FontAwesomeIcon
                            icon="trash-alt"
                            size="1x"
                            onClick={(e) => handleDeleteFactorByUser(factor, e)}
                        />
                    </Icon>
                </Card>
            ))}
        </div>
    );
};
FactorsForUserCard.defaultProps = {
    riskList: [],
};
FactorsForUserCard.propTypes = {
    riskList: PropTypes.array,
    getAllFactorsUser: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
};

export default FactorsForUserCard;
