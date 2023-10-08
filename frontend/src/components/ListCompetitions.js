import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

import { MdDelete, MdDeleteForever, MdGroups } from "react-icons/md";

const deleteItem = (id) => {
  // Send a POST request to delete the item
  fetch(`${API_URL}/api/competition/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Handle success, e.g., update your UI or state
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      // Handle the error, e.g., display an error message
    });
};

function ListCompetitions(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-bg-200 drop-shadow rounded-lg mt-2 p-2 px-4">
      <div className="flex mt-1">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 px-2">
          <MdDelete size={24} className="text-text-100 float-right ml-4" />
          <MdGroups size={24} className="text-text-100 float-right" />
        </div>
      </div>
      {props.competitions &&
        props.competitions.map((competition, index) => (
          <div className="flex flex-row w-full">
            <div
              key={index}
              className="flex w-full my-4 py-2 hover:bg-primary-200 border-l-4 border-accent-200 bg-primary-100 drop-shadow rounded-r-lg justify-between"
              onClick={() => navigate(`/competition/?id=${competition.id}`)}
            >
              <div key={index} className="w-1/2 text-light px-2 font-semibold">
                {competition.name}({competition.id})
              </div>
              <div className="w-1/4 text-light text-right px-3">
                <div className="text-right">
                  {competition.competitors.length}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteItem(competition.id)}
              className="w-1/5"
            >
              <MdDeleteForever
                size={24}
                className="text-accent-200 m-auto mr-2"
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default ListCompetitions;
