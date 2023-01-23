import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  MDBDataTable,
  MDBContainer,
  MDBCol,
  MDBBtn,
  MDBRow
} from 'mdbreact';
import React from 'react';

import './App.css'

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
    <React.Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">User index</MDBCol>
          <MDBCol md="6">Add</MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBDataTable
        striped
        bordered
        hover
        responsive
        data={data}
      />
    </React.Fragment>
  );
}

export default App;