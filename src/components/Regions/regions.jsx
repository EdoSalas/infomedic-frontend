import React from 'react';
import * as regionService from '../../Services/regions.services';


const regions = async () => {
    const regions = await regionService.getAll()
        .then(async response => {
            return JSON.stringify(await response.data);
        });
    console.log(regions);
    return (
        <div>
            <h1>Hola</h1>
            <ui>
                <li>1</li>
            </ui>
        </div>
    )
}

export default regions;

