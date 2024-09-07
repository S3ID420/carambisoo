"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import "./EditCard.css"; // Ensure this file exists

const EditCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const question = searchParams.get("question");
  const answer = searchParams.get("answer");
  const frontColor = searchParams.get("frontColor") || "#f6f6f6";
  const backColor = searchParams.get("backColor") || "#ffffff";

  const [newQuestion, setNewQuestion] = useState(question || "");
  const [newAnswer, setNewAnswer] = useState(answer || "");
  const [newFrontColor, setNewFrontColor] = useState(frontColor);
  const [newBackColor, setNewBackColor] = useState(backColor);

  useEffect(() => {
    if (question) setNewQuestion(question);
    if (answer) setNewAnswer(answer);
    if (frontColor) setNewFrontColor(frontColor);
    if (backColor) setNewBackColor(backColor);
  }, [question, answer, frontColor, backColor]);

  const handleSave = () => {
    console.log({
      newQuestion,
      newAnswer,
      newFrontColor,
      newBackColor,
    });

    router.push("/");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="wrapper">
      <div className="container">
        <button className="backButton" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <div className="formContainer">
          <h2 className="title">Edit Your Flashcard</h2>
          <div className="formGroup">
            <label className="label">Question:</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Answer:</label>
            <input
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="input"
            />
          </div>
          <div className="formGroupContainer">
            <div className="formGroup">
              <label className="colorLabel">Front Color:</label>
              <input
                type="color"
                value={newFrontColor}
                onChange={(e) => setNewFrontColor(e.target.value)}
                className="colorInput"
              />
            </div>
            <div className="formGroup">
              <label className="colorLabel">Front header Color:</label>
              <input
                type="color"
                value={newFrontColor}
                onChange={(e) => setNewFrontColor(e.target.value)}
                className="colorInput"
              />
            </div>
            <div className="formGroup">
              <label className="colorLabel">Back Color:</label>
              <input
                type="color"
                value={newBackColor}
                onChange={(e) => setNewBackColor(e.target.value)}
                className="colorInput"
              />
            </div>
            <div className="formGroup">
              <label className="colorLabel">Back header Color:</label>
              <input
                type="color"
                value={newFrontColor}
                onChange={(e) => setNewFrontColor(e.target.value)}
                className="colorInput"
              />
            </div>
          </div>

          <button className="saveButton" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
