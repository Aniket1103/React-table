import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

function Table(){

  var url = 'https://jsonplaceholder.typicode.com/users';

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    return (
      fetch(url)
      .then(response => response.json())
      .then(json => {
        setData(json);
        console.log(json);
      })
      )
  }

  // const getData = async () => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setData(data);
  //   console.log(data);
  // }
  
  const columns = [
    {
      title: 'Name', field: 'name'
    },
    {
      title: 'Username', field: 'username'
    },
    {
      title: 'Email', field: 'email'
    },
    {
      title: 'Phone', field: 'phone'
    },
    {
      title: 'Website', field: 'website'
    }
  ]
  return(
    <div className="head">
      <MaterialTable title = "User Details"
      data = {data}
      columns = {columns}
      
      editable={{
        // isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
        // isEditHidden: rowData => rowData.name === 'x',
        // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
        // isDeleteHidden: rowData => rowData.name === 'y',
        // onBulkUpdate: changes => 
        //     new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             setData([...data, changes]); 

        //             resolve();
        //         }, 1000);
        //     }),
        onRowAddCancelled: rowData => console.log('Row adding cancelled'),
        onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
        onRowAdd: newData =>
            new Promise((resolve, reject) => {
                //const updatedData = [...data,newData];
                setTimeout(() => {
                    /* setData([...data, newData]); */
                    setData([...data,newData]);
                    resolve();
                }, 1000);
                console.log(newData);
            }),
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    resolve();
                }, 1000);
            }),
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              //console.log(oldData);
                setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve();
                }, 1000);
                
            })
    }}

    options = {{
      actionsColumnIndex:-1,
      addRowPosition:"first",
      paging: false
    }}
      />
    </div>
  )
}

export default Table;