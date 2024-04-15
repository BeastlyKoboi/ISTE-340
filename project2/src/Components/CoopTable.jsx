import React, { useState } from 'react'
import getData from '../utils/getData'

// Components
import { DataGrid } from '@mui/x-data-grid';

const columns = [] = [
    { field: 'employer', headerName: 'Employer', width: 250 },
    { field: 'degree', headerName: 'Degree', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },
    {
        field: 'term',
        headerName: 'Term',
        width: 90,
    },
];

const CoopTable = ({ table, id }) => {
    table.coopInformation.forEach((row, index) => {
        row.id = index;
    });

    return (
        <div id={id}>
            <h1>{table.title}</h1>
            <div style={{ height: 400, width: '100%', maxWidth: '1000px' }}>
                <DataGrid
                    rows={table.coopInformation}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25 },
                        },
                    }}
                    pageSizeOptions={[25, 100]}
                // checkboxSelection
                />
            </div>
        </div>
    );
}

export default CoopTable;