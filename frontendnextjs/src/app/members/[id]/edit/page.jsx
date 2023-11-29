"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Useredit = ({ params }) => {
  const [loader, setLoader] = useState(false);
  const [InputErrorList, setInputErrorList] = useState({});
  const [members, setMembers] = useState({});

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:8000/api/members/${params.id}/edit`)
      .then((res) => {
        console.log(res);
        setMembers(res.data.members);
        setLoader(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setInputErrorList(error.response.data.message);
            setLoader(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoader(false);
          }
        }
      });
  }, [params.id]);

  const handleBinding = (e) => {
    e.persist();
    setMembers({ ...members, [e.target.id]: e.target.value });
  };
  const updateMembers = (e) => {
    e.preventDefault();
    setLoader(true);

    const data = {
      name: members.name,
      course: members.course,
      email: members.email,
      phone: members.phone,
    };

    axios
      .put(`http://localhost:8000/api/members/${params.id}/edit`, data)
      .then((res) => {
        alert(res.data.message);
        setLoader(false);
        window.location.href = "/dashboard";
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
            setLoader(false);
          }
          if (error.response.status === 404) {
            setInputErrorList(error.response.data.message);
            setLoader(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoader(false);
          }
        }
      });
  };

  if (Object.keys(members).length === 0) {
    return (
      <div
        className="flex flex-col
                    items-center
                    justify-center 
                    text-red-500 
                    italic 
                    text-xl
                    space-y-10"
      >
        <h4>No such member id found</h4>
        <div class="w-auto px-3 mb-6">
          <Link href="/dashboard" className="bg-red-100 py-3 px-10 rounded-lg">
            Cancel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      {loader ? (
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <form class="w-full max-w-lg" onSubmit={updateMembers}>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="name"
              >
                Fullname
              </label>

              <input
                class="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Your fullname"
                id="name"
                onChange={handleBinding}
                value={members.name}
              />
              <span className="text-red-500 italic text-sm">
                {InputErrorList.name}
              </span>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="example.512@gmail.com"
                onChange={handleBinding}
                value={members.email}
              />
              <span className="text-red-500 italic text-sm">
                {InputErrorList.email}
              </span>
            </div>
          </div>
          <div class="flex justify-between -mx-3 mb-2">
            <div class="w-auto px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="course"
              >
                Course
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="course"
                type="text"
                placeholder="BSIT"
                onChange={handleBinding}
                value={members.course}
              />
              <span className="text-red-500 italic text-sm">
                {InputErrorList.course}
              </span>
            </div>
            <div class="w-auto px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="phone"
              >
                Phone
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phone"
                type="number"
                placeholder="09091234565"
                onChange={handleBinding}
                value={members.phone}
              />
              <span className="text-red-500 italic text-sm">
                {InputErrorList.phone}
              </span>
            </div>
          </div>
          <div class="flex justify-center items-center mb-2">
            <div class="w-auto px-3 mb-6">
              <Link
                href="/dashboard"
                className="bg-red-100 py-3 px-10 rounded-lg"
              >
                Cancel
              </Link>
            </div>
            <div class="w-auto px-3 mb-6">
              <button
                type="submit"
                className="bg-indigo-100 py-3 px-10 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Useredit;
