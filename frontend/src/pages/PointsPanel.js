import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import Scoreboard from "../components/Scoreboard";
import ProblemInfo from "../components/ProblemInfo";
import SubmitResults from "../components/SubmitResults";

import {
  MdArrowBack,
  MdScoreboard,
  MdPerson,
  MdQuiz,
  MdHelpCenter,
} from "react-icons/md";

function PointsPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const compId = searchParams.get("id");

  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showProblemInfo, setShowProblemInfo] = useState(false);
  const [showSubmitMenu, setShowSubmitMenu] = useState(false);
  const [competitionState, setCompetitionState] = useState(null);
  const [attempts, setAttempts] = useState(1);
  const [zone, setZone] = useState(false);
  const [top, setTop] = useState(false);
  const [time, setTime] = useState(0);

  console.log("compid", competitionState, "time", time);

  function toggleScoreboard() {
    if (showScoreboard) {
      setShowScoreboard(false);
    } else {
      setShowScoreboard(true);
    }
  }
  function toggleProblemInfo() {
    if (showProblemInfo) {
      setShowProblemInfo(false);
    } else {
      setShowProblemInfo(true);
    }
  }
  function topAndZoneToggle(type) {
    if (type === "top") {
      top ? setTop(false) : setTop(true);
    } else {
      zone ? setZone(false) : setZone(true);
    }
  }
  function SubmitToggle() {
    showSubmitMenu ? setShowSubmitMenu(false) : setShowSubmitMenu(true);
  }

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/result/${compId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setCompetitionState(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-6">
      <button
        className="absolute rounded-lg text-xs m-4 mr-5 bg-bg-200 hover:bg-primary-200 top-0 left-1 p-1 font-semibold 
        drop-shadow"
        onClick={() => navigate(-1)}
      >
        <MdArrowBack size={32} className="text-text-100" />
      </button>
      <button
        className="absolute rounded-lg text-xs m-4 mr-5 bg-bg-200 hover:bg-primary-200 top-0 right-1 p-1 font-semibold 
        drop-shadow"
        onClick={() => toggleScoreboard()}
      >
        <MdScoreboard size={32} className="text-text-100" />
      </button>
      {competitionState ? (
        <div>
          {showScoreboard && (
            <Scoreboard
              scoredata={competitionState.scoreboard.competitors_scores}
              showScoreboard={setShowScoreboard}
            />
          )}
          {showProblemInfo && (
            <ProblemInfo
              problemData={competitionState.problem_data}
              showProblem={setShowProblemInfo}
            />
          )}
          {showSubmitMenu && (
            <SubmitResults
              showSubmitMenu={setShowSubmitMenu}
              problemData={competitionState.problem_data}
              competitor={competitionState.competitor}
              challenge_id={competitionState.challenge_id}
              competition_id={competitionState.competition_id}
              attempts={attempts}
              zone={zone}
              top={top}
              time={time}
            />
          )}
          <div className="m-auto w-2/3">
            <h1 className="text-3xl capitalize text-center font-header font-bold text-accent-200 p-4 text-ellipsis overflow-hidden">
              {competitionState.competition_title}
            </h1>
          </div>

          <div className="bg-bg-200 my-4 drop-shadow rounded-lg mt-2 p-3 px-2 flex flex-wrap justify-between">
            <h3 className="mx-2 flex flex-row">
              <MdPerson
                size={24}
                className="text-text-100 mr-2 bg-primary-100 rounded-full"
              />
              {"   "}
              <span className="font-bold text-right">
                {competitionState.competitor}
              </span>
            </h3>
            <h3 className="mx-2 mb-2 flex flex-row">
              <MdQuiz
                size={24}
                className="text-text-100 mr-2 bg-primary-100 rounded-full"
              />{" "}
              <span className="font-bold">
                {competitionState.problem_nr}/{competitionState.total_problems}
              </span>
            </h3>
            <div className="px-2 flex flex-row w-full justify-between mt-2">
              <div className="flex flex-row mt-1">
                <h3 className="">
                  <MdHelpCenter
                    size={24}
                    className="text-text-100 mr-2 bg-primary-100 rounded-full"
                  />
                </h3>
                <h3 className="font-bold">
                  {competitionState.problem_data.name}
                </h3>
              </div>
              <div className="">
                <button
                  onClick={() => toggleProblemInfo()}
                  className="rounded-lg bg-primary-100 hover:bg-primary-200 p-1 w-20
            drop-shadow flex flex-row justify-center"
                >
                  <MdQuiz
                    size={24}
                    className="text-text-100 mr-2 bg-primary-100 rounded-full"
                  />
                  Info
                </button>
              </div>
            </div>
          </div>

          <Timer
            timelimit={competitionState.problem_data.timelimit}
            setSaveTime={setTime}
          />
          <div className="bg-bg-200 drop-shadow rounded-lg my-4 py-1">
            <h3 className="text-text-100 text-center font-header">
              Attempt-Counter
            </h3>
            <div className="flex justify-evenly my-4">
              <button
                onClick={() => setAttempts(attempts + 1)}
                className="bg-primary-100 hover:bg-primary-200 text-text-100 text-2xl font-body font-bold w-16 h-16 p-3 rounded-full"
              >
                +
              </button>
              <p className="text-center text-6xl text-light">{attempts}</p>
              <button
                onClick={() => setAttempts(attempts - 1)}
                className="bg-primary-100 hover:bg-primary-200 text-text-100 text-2xl font-body font-bold w-16 h-16 p-3 rounded-full"
              >
                -
              </button>
            </div>
            <div className="flex justify-evenly my-8">
              <button
                onClick={() => topAndZoneToggle("top")}
                className={`${
                  top ? "bg-succes" : "bg-primary-100"
                } hover:bg-primary-200 text-text-100 font-body font-bold w-28 h-20 p-3 rounded-lg`}
              >
                Top
              </button>
              {competitionState.problem_data.zonepoints !== 0 && (
                <button
                  onClick={() => topAndZoneToggle("zone")}
                  className={`${
                    zone ? "bg-succes" : "bg-primary-100"
                  } hover:bg-primary-200 text-text-100 font-body font-bold w-28 h-20 p-3 rounded-lg`}
                >
                  Zone
                </button>
              )}
            </div>
            <div className="flex justify-center pb-3">
              <button
                onClick={() => SubmitToggle()}
                className="bg-primary-100 hover:bg-primary-200 text-light font-body font-bold w-72 h-20 p-3 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>LOADING</h1>
      )}
      {(showScoreboard || showProblemInfo || showSubmitMenu) && (
        <div className="absolute top-0 left-0 border w-full h-full backdrop-blur-sm"></div>
      )}
    </div>
  );
}
export default PointsPanel;
