"use client";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Kagel from "./taskPages/Kagel";
import Quiz from "./taskPages/Quiz";
import Reward from "./taskPages/Reward";
import SortNote from "./taskPages/SortNote";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

function UnAuthTask({}) {
  const router = useRouter();

  const tasks = [
    "video",
    "kagel",
    "sortNote",
    "quiz",
    "rewards",
    "suggestBlog",
  ];

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = tasks[selectedTaskIndex];
  const [UnAuthLocalStorageData, setUnAuthLocalStorageData] = useState({
    video: false,
    kagel: false,
    sortNote: false,
    quiz: false,
    rewards: false,
    suggestBlog: false,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("UnAuthDay");
    if (storedData) {
      setUnAuthLocalStorageData(JSON.parse(storedData));
    } else {
      localStorage.setItem("UnAuthDay", JSON.stringify(UnAuthLocalStorageData));
    }
  }, []);

  const unAuthInitialRender = useRef(true);

  useEffect(() => {
    if (!unAuthInitialRender.current) {
      if (selectedTask === "suggestBlog") {
        localStorage.setItem(
          "UnAuthDay",
          JSON.stringify({
            video: false,
            kagel: false,
            sortNote: false,
            quiz: false,
            rewards: false,
            suggestBlog: false,
          })
        );
      } else {
        localStorage.setItem(
          "UnAuthDay",
          JSON.stringify(UnAuthLocalStorageData)
        );
      }
    } else {
      unAuthInitialRender.current = false;
    }
  }, [UnAuthLocalStorageData]);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };
  const handleNext = () => {
    setUnAuthLocalStorageData((prevState) => ({
      ...prevState,
      [selectedTask]: true,
    }));

    if (selectedTask === "suggestBlog") {
      let unAuthDayId = localStorage.getItem("unAuthDayId");

      if (unAuthDayId === null) {
        localStorage.setItem("unAuthDayId", "1");
      } else if (unAuthDayId !== null) {
        let parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
        localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
      }
      router.push("/");
    }
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 pr-8 mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold ">Your Task for Today</h2>
            <ul className="list-decimal pl-6">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex justify-between h-10  hover:bg-slate-100 rounded ${
                    (UnAuthLocalStorageData as any)[task] === false
                      ? " cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  title={
                    (UnAuthLocalStorageData as any)[task] === false
                      ? "This task is not available"
                      : "you have completed this task"
                  }
                  onClick={() => {
                    if ((UnAuthLocalStorageData as any)[task] === true) {
                      handleTaskClick(index);
                    }
                  }}
                >
                  <li
                    className={`transition-colors duration-300  p-2 ${
                      selectedTask === task && "font-bold text-blue-600"
                    }`}
                  >
                    {task.replace(/^\w/, (c) => c.toUpperCase())}
                  </li>
                  <span className="pl-3 right-0 p-2">
                    <FaCheckCircle
                      className=""
                      size={25}
                      style={{
                        color:
                          (UnAuthLocalStorageData as any)[task] === true
                            ? "blue"
                            : "gray",
                        fontWeight: "bold",
                      }}
                    />
                  </span>
                </div>
              ))}
            </ul>
          </div>

          <div className="lg:w-2/3">
            <div
              style={{ height: "500px" }}
              className="p-3 rounded-lg shadow-md    mx-auto flex flex-col justify-evenly "
            >
              <div className="basis-1/6">
                <h3 className="text-xl font-bold ">
                  {selectedTask.replace(/^\w/, (c) => c.toUpperCase())}
                </h3>
              </div>
              <div className="basis-4/6">
                <Video selectedTask={selectedTask} />
                <Kagel selectedTask={selectedTask} />
                <SortNote selectedTask={selectedTask} />
                <Quiz selectedTask={selectedTask} />
                <Reward selectedTask={selectedTask} />
                <SuggestedBlog selectedTask={selectedTask} />
              </div>
              <div className="basis-1/6 flex justify-center align-bottom flex-col">
                <div className="flex justify-between mt-4">
                  <button
                    className={`px-4 py-2 text-white rounded focus:outline-none ${
                      selectedTaskIndex === 0
                        ? "bg-gray-500 cursor-not-allowed "
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    onClick={handlePrevious}
                    disabled={selectedTaskIndex === 0}
                  >
                    <span style={{ paddingRight: "10px" }}>
                      {" "}
                      <ArrowLeftOutlined />
                    </span>
                    Previous
                  </button>

                  <button
                    className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
                  }`}
                    onClick={handleNext}
                  >
                    Next
                    <span style={{ paddingLeft: "10px" }}>
                      <ArrowRightOutlined />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnAuthTask;