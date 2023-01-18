import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBDataTable } from 'mdbreact';
import React from 'react';

function App() {

  const [users, setUsers] = React.useState();

  const fetchApiBackend = async () => {
    const response = await fetch('http://localhost:80/api/users')
    const responseJson = await response.json()
    if (responseJson) setUsers(responseJson.users)
  }

  React.useEffect(() => {
    fetchApiBackend();
  }, []);

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Phone',
        field: 'phone',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Country',
        field: 'country',
        sort: 'asc',
        width: 100
      }
    ],
    rows: users
  };

  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  );
}

export default App;