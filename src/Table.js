import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

function Table(){

  var url = 'https://jsonplaceholder.typicode.com/users';

  const col = [
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
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(col);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    return (
      //GET request
      fetch(url)
      .then(response => response.json())
      .then(json => {
        setData(json);

      })
      )
  }
  
  
  return(
    <div className="head">
      <MaterialTable title = "User Details"
      data = {data}
      columns = {columns}
      
      editable={{
        
        onRowAddCancelled: rowData => console.log('Row adding cancelled'),
        onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
        onRowAdd: newData =>
            new Promise((resolve, reject) => {
                
                setTimeout(() => {
                    setData([...data,newData]);

                    //POST request
                    fetch(url, {
                      method: 'POST',
                      body: JSON.stringify({
                        name: newData.name,
                        username: newData.username,
                        email: newData.email,
                        phone: newData.phone,
                        website: newData.website
                      }),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                    })
                      .then((response) => response.json())
                      .then((json) => console.log(json));
                    

                    resolve();
                }, 1000);
                
            }),

        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    //PATCH request
                    fetch(url  + "/" + oldData.id, {
                      method: 'PATCH',
                      body: JSON.stringify({
                        name: newData.name,
                        username: newData.username,
                        email: newData.email,
                        phone: newData.phone,
                        website: newData.website
                      }),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                    })
                      .then((response) => response.json())
                      .then((json) => console.log(json));

                    resolve();
                }, 1000);
                
            }),

        onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    //DELETE request
                    fetch(url + "/" + oldData.id, {
                      method: 'DELETE',
                    });

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