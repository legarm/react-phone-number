import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const TextField = styled.input`
height: 32px;
width: 30%;
padding: 0 32px 0 16px;

&:hover {
    cursor: text;
}
`;

const FilterComponent = ({ filterText, onFilter}) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter by First Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
            className='form-control'
        />
    </>
);

const Table = ({users}) => {

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    //Datatable
    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true
        },
        {
            name: 'Actions',
            selector: row => row.actions,
        }
    ];

    const filteredItems = users.filter(
		user => user.firstName && user.firstName.toLowerCase().includes(filterText.toLowerCase()),
    )

    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

    const handleSort = (column, sortDirection) => console.log(column.selector, sortDirection);

    return (
        <>  
            <div className='table-width card shadow'>
                <h4 className='card-header mt-1'>Contact List</h4>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    paginationResetDefaultPage={resetPaginationToggle}
                    striped
                    responsive
                    onSort={handleSort}
                />
            </div>
        </>
    );
}

export default Table;