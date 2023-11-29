"use client";
import Link from "next/link";
import React from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [loader, setLoader] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/members`).then((res) => {
      setMembers(res.data.members);
      setLoader(false);
    });
  }, []);

  const delMember = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting ...";
    axios
      .delete(`http://localhost:8000/api/members/${id}/delete`)
      .then((res) => {
        alert(res.data.message);
        setMembers(members.filter((member) => member.id !== id));
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            thisClicked.innerText = "Delete";
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };
  const column = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-5">
          <Link href={`/members/${row.id}/edit`}>Edit</Link>
          <button onClick={(e) => delMember(e, row.id)}>delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl text-indigo-500">Member's list</h3>
        <Link
          href="/usercreate"
          className="px-4 py-2 text-gray-100 bg-indigo-500 rounded-lg"
        >
          Add member
        </Link>
      </div>
      <div className="text-center">
        <DataTable
          columns={column}
          data={members}
          pagination
          progressPending={loader}
        ></DataTable>
      </div>
    </div>
  );
};

export default Dashboard;
