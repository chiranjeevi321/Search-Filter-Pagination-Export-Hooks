import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
function DataList() {
  const [userList, setUserList] = useState([]);
  const { ExportCSVButton } = CSVExport;
  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleClick}>
          Export to CSV
        </button>
      </div>
    );
  };

  const columns = [
    { dataField: "id", text: "Id", filter: textFilter() },
    { dataField: "name", text: "Name", sort: true, filter: textFilter() },
    {
      dataField: "username",
      text: "Username",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "email", text: "Email", sort: true, filter: textFilter() },
    {
      dataField: "address.city",
      text: "City",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "phone", text: "Phone", sort: true, filter: textFilter() },
    { dataField: "website", text: "Website", sort: true, filter: textFilter() },
    {
      dataField: "company.name",
      text: "Company Name",
      sort: true,
      filter: textFilter(),
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 3,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={userList}
        columns={columns}
        exportCSV
      >
        {(props) => (
          <React.Fragment>
            <MyExportCSV {...props.csvProps} />
            <BootstrapTable
              //   bootstrap4
              //   keyField="id"
              //   columns={columns}
              //   data={userList}
              pagination={pagination}
              filter={filterFactory()}
              {...props.baseProps}
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
      {/*<table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company Name</th>
          </tr>
          {userList && userList.length > 0
            ? userList.map((usr) => (
                <tr>
                  <td>{usr.id}</td>
                  <td>{usr.name}</td>
                  <td>{usr.username}</td>
                  <td>{usr.email}</td>
                  <td>{usr.address.city}</td>
                  <td>{usr.phone}</td>
                  <td>{usr.website}</td>
                  <td>{usr.company.name}</td>
                </tr>
              ))
            : "Loading"}
            </table>*/}
    </div>
  );
}

export default DataList;
