import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Progress from "../common/Progress";
import { Row, Col } from "antd";
import "./style.css";

const Questionnaire = (props) => {
  const { questions, answers, currentStep } = props;
  const handleQuestionSelected = props.onQuestionSelected;
  const isSelected = !!answers[currentStep] || answers[currentStep] === 0;
  return (
    <div className="question-container">
      <Row>
        <Col span={24} className="progress-container">
          <h3 className="progress-label">
            {questions[currentStep].progressName}
          </h3>
          <Progress
            progress={((Number(currentStep) + 1) * 100) / questions.length}
          ></Progress>
        </Col>
        {questions[currentStep].description ? (
          <Col span={24}>{questions[currentStep].description}</Col>
        ) : null}
        {questions[currentStep].title && (
          <Col span={24}>
            <h1 className="progress-title">{questions[currentStep].title}</h1>
          </Col>
        )}
        {questions[currentStep].question && (
          <Col span={24}>
            {questions[currentStep].question.map((question, index) =>
              questions[currentStep].questionType &&
              questions[currentStep].questionType === "radio" ? (
                <label
                  key={"question_" + index}
                  className={
                    "question-card" +
                    (isSelected && index === answers[currentStep]
                      ? " question-card-selected"
                      : "")
                  }
                  htmlFor={"radio" + index}
                  onClick={() => handleQuestionSelected(index)}
                >
                  {questions[currentStep].questionType &&
                  questions[currentStep].questionType === "radio" ? (
                    <Fragment>
                      <input
                        type="radio"
                        value={index}
                        id={"radio" + index}
                        name="question_radio"
                      />
                      <span>{question}</span>
                    </Fragment>
                  ) : (
                    question
                  )}
                </label>
              ) : (
                <div>{question}</div>
              )
            )}
          </Col>
        )}
        <Col span={24}>
          {questions[currentStep].footer && questions[currentStep].footer}
        </Col>
      </Row>
      <Row>
        <Col span={24} className="btn-toolbar">
          {currentStep === 0 ? (
            <Link to="/">
              <button className="btn btn-back">Back</button>
            </Link>
          ) : (
            <button className="btn btn-back" onClick={props.onBackBtnClick}>
              Back
            </button>
          )}
          {/* {currentStep === questions.length - 1 ? (
            <Link to="/check-form">
              <button className="btn btn-back">Next</button>
            </Link>
          ) : ( */}
          <button
            className="btn"
            disabled={
              questions[currentStep].questionType === "radio"
                ? !isSelected
                : !props.nextBtnEnable
            }
            onClick={props.onNextBtnClick}
          >
            Next
          </button>
          {/* )} */}
        </Col>
      </Row>
    </div>
  );
};

export default Questionnaire;
