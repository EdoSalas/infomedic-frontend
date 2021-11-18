import React from "react";
import PropTypes from "prop-types";
import {Table} from "rbx"
import "../../styles/index.scss";



const Tables = ({dataList, title}) => {

  
    return (
        <div className="display-block">
        <Table className="table-report" bordered fullwidth hoverable narrow striped>
        <Table.Head>
          <Table.Row>
            <Table.Heading className="color-table">
              <abbr><h3>{title}</h3></abbr>
            </Table.Heading>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {dataList?.map((data) => (
            <Table.Row key={data.id}>
              <Table.Heading>
                {data.name}
              </Table.Heading>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
        </div>
    )
};

Tables.propTypes = {
    dataList: PropTypes.array.isRequired,   
};

export default Tables;

