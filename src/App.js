import React from 'react';
import DataTable from 'react-data-table-component';
import { FaGithub, FaNetworkWired, FaMailBulk, FaEdit, FaTrash } from 'react-icons/fa';

import './App.css'
import logo from './assets/images/logo.svg';
import FilterComponent from './components/FilterComponent';
import Modal from './components/Modal';

function App() {

  const [users, setUsers] = React.useState([]);
  const [userRecord, setUserRecord] = React.useState({});
  const [statusModal, setStatusModal] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const fetchApiBackend = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/users`)
    const responseJson = await response.json()
    if (responseJson) setUsers(responseJson.users)
    setPending(false);
  }

  function handleClickUpdate(row) {
    setUserRecord(row)
    handleModal()
  };

  async function handleClickDestroy(row) {
    await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/users/${row._id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
    .then((response) => {
      alert('User deleted');
      fetchApiBackend();
    }).catch((error) => { alert('Error in delete user'); console.log(error) })
  };

  const handleModal = () => {
    setStatusModal(!statusModal)
  }

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        fetchApiBackend();
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return (
      <FilterComponent onFilter={e => {
        setFilterText(e.target.value);
        setUsers(users.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase())))
      }}
        onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, users]);

  const handleForm = async (event) => {
    event.preventDefault();
    let urlRequest;
    let methodRequest;
    if (userRecord.hasOwnProperty("_id")) {
      urlRequest = `${process.env.REACT_APP_BACKEND_URI}/api/users/${userRecord._id}`;
      methodRequest = 'PATCH';
    } else {
      urlRequest = `${process.env.REACT_APP_BACKEND_URI}/api/users`;
      methodRequest = 'POST';
    }
    await fetch(urlRequest, {
      method: methodRequest,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userRecord)
    }).then((response) => response.json())
    .then((res) => {
      if (res.code === 'OK') {
        alert(res.message);
        console.log(res);
        fetchApiBackend();
      } else { alert('Error'); console.log(res) }
    })
    .catch((error) => { alert('Error'); console.log(error) })
    handleModal()
    setUserRecord(null)
  }

  React.useEffect(() => {
    fetchApiBackend();
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: row => `${row.name} ${row.paternal_lastname} ${row.mother_lastname}`,
      sortable: true,
    },
    {
      name: 'Age',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'Country',
      selector: row => `${row.city}, ${row.state}, ${row.country}`,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: false,
    },
    {
      name: 'Actions',
      button: true,
      cell: (row) => <div style={{ display: 'flex' }}>
        <button style={{ border: 'none' }} onClick={ () => handleClickUpdate(row)}><FaEdit /></button>
        <button style={{ border: 'none' }} onClick={ () => handleClickDestroy(row) }><FaTrash /></button>
      </div>
    },
  ];
  let rows = users;

  return (
    <React.Fragment>
      <div id="wrapper">
        <header id="header" className="alt">
          <span className="logo"><img src={logo} alt="App Logo" /></span>
          <h1>Inxenius Test</h1>
          <p>Backend Developer</p>
        </header>

        <div id="main">
          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>User index</h2>
                  <button className='btn-add-user' onClick={() => {  setUserRecord(null); handleModal() }}>Add User</button>
                </header>
                <DataTable columns={columns} data={rows} pagination responsive
                  progressPending={pending} subHeader
                  subHeaderComponent={subHeaderComponentMemo} persistTableHead />
                <Modal handleClose={handleModal} show={statusModal}>
                  <form onSubmit={handleForm}>
                    <div className="banner">
                      <h1>Register Form</h1>
                    </div>
                    <div className="item">
                      <p>Name</p>
                      <div className="name-item">
                        <input type="text" name="name" placeholder="First" value={userRecord ? userRecord.name : ""} onChange={(event) => { setUserRecord({ ...userRecord, name: event.target.value }) }} />
                        <input type="text" name="paternal_lastname" placeholder="Last" value={userRecord ? userRecord.paternal_lastname : ""} onChange={(event) => { setUserRecord({ ...userRecord, paternal_lastname: event.target.value }) }} />
                        <input type="text" name="mother_lastname" placeholder="Last" value={userRecord ? userRecord.mother_lastname : ""} onChange={(event) => { setUserRecord({ ...userRecord, mother_lastname: event.target.value }) }} />
                      </div>
                    </div>
                    <div className="item">
                      <p>Age</p>
                      <input type="number" min={1} name="age" value={userRecord ? userRecord.age : ""} onChange={(event) => { setUserRecord({ ...userRecord, age: event.target.value }) }} />
                    </div>
                    <div className="item">
                      <p>Phone</p>
                      <input type="text" name="phone" value={userRecord ? userRecord.phone : ""} onChange={(event) => { setUserRecord({ ...userRecord, phone: event.target.value }) }} />
                    </div>
                    <div className="item">
                      <p>Birth date</p>
                      <input type="date" name="birthdate" value={userRecord ? userRecord.birthdate : ""} onChange={(event) => { setUserRecord({ ...userRecord, birthdate: event.target.value }) }} />
                    </div>
                    <div className="item">
                      <p>Hobbies</p>
                      <input type="text" name="hobbies" value={userRecord ? userRecord.hobbies : ""} onChange={(event) => { setUserRecord({ ...userRecord, hobbies: event.target.value }) }} />
                    </div>
                    <div className="item">
                      <p>Preferences</p>
                      <input type="text" name="preferences" value={userRecord ? userRecord.preferences : ""} onChange={(event) => { setUserRecord({ ...userRecord, preferences: event.target.value }) }} />
                    </div>
                    <div className="item">
                      <p>Address</p>
                      <input type="text" name="country" placeholder="Country" value={userRecord ? userRecord.country : ""} onChange={(event) => { setUserRecord({ ...userRecord, country: event.target.value }) }} />
                      <input type="text" name="state" placeholder="State" value={userRecord ? userRecord.state : ""} onChange={(event) => { setUserRecord({ ...userRecord, state: event.target.value }) }} />
                      <div className="city-item">
                        <input type="text" name="city" placeholder="City" value={userRecord ? userRecord.city : ""} onChange={(event) => { setUserRecord({ ...userRecord, city: event.target.value }) }} />
                        <input type="text" name="name" placeholder="Postal / Zip code" value={userRecord ? userRecord.postal_code : ""} onChange={(event) => { setUserRecord({ ...userRecord, postal_code: event.target.value }) }} />
                      </div>
                    </div>
                    <div className="item">
                      <p>Language</p>
                      <select name='language' value={userRecord ? userRecord.language : setUserRecord({ ...userRecord, language: "Spanish" })}
                        onChange={(event) => { setUserRecord({ ...userRecord, language: event.target.value }) }} >
                        <option value={'Spanish'}>Spanish</option>
                        <option value={'English'}>English</option>
                      </select>
                    </div>
                    <div className="item">
                      <p>Marital Status</p>
                      <select name='marital_status' value={userRecord ? userRecord.marital_status : setUserRecord({ ...userRecord, marital_status: "Single" })}
                        onChange={(event) => { setUserRecord({ ...userRecord, marital_status: event.target.value }) }} >
                        <option value={'Single'}>Single (a)</option>
                        <option value={'Married'}>Married (a)</option>
                        <option value={'Widower'}>Widower (a)</option>
                      </select>
                    </div>
                    <div className="btn-block">
                      <button type="submit">Send</button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
          </section>
        </div>

        <footer id="footer">
          <div id="contenedor">
            <h2>Salim Vazquez Solis</h2>
            <a href="mailto:salimvzqz@gmail.com"><FaMailBulk /></a>
            <a href="https://salimv.netlify.app"><FaNetworkWired /></a>
            <a href="https://github.com/SvS30"><FaGithub /></a>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default App;
