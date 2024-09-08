"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import "./Card.css"; // Ensure the CSS file is present in the same directory

const Card = ({ question, answer, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isKnown, setIsKnown] = useState(null);
  const router = useRouter();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    setIsKnown(true);
  };

  const handleUnknown = () => {
    setIsKnown(false);
  };

  const handleEdit = () => {
    const queryParams = new URLSearchParams({
      question,
      answer,
      
    }).toString();
    router.push(`/edit?${queryParams}`);
  };

  return (
    <div className="cardContainer">
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="cardInner">
          {/* Card Front */}
          <div className="cardFace cardFront" onClick={handleFlip}>
            <div className="cardHeader cardHeaderFront">
              <button className="iconButton" onClick={handleEdit}>
                <FaEdit />
              </button>
              <button className="iconButton" onClick={onDelete}>
                <FaTrashAlt />
              </button>
            </div>
            <p className="question">{question}</p>
          </div>

          {/* Card Back */}
          <div className="cardFace cardBack" onClick={handleFlip}>
            <div className="cardHeader cardHeaderBack">
              <Link className="iconButton" href="/edit">
                <FaEdit />
              </Link>
              <button className="iconButton" onClick={onDelete}>
                <FaTrashAlt />
              </button>
            </div>
            <p className="answer">{answer}</p>
            <div className="progressButtons">
              <button
                onClick={handleKnown}
                className={`progressButton ${isKnown ? "known" : ""}`}
              >
                Known
              </button>
              <button
                onClick={handleUnknown}
                className={`progressButton ${!isKnown && isKnown !== null ? "unknown" : ""}`}
              >
                Unknown
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cardActions">
        <button className="iconButton">
          <FaChevronLeft />
        </button>
        <button className="iconButton">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Card;
