import React, { Fragment, useState } from 'react';
import Questionnaire from '../questionnaire/Questionnaire';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Select, DatePicker } from 'antd';
import cancelled from '../../img/cancelled.svg';
import deniedBoarding from '../../img/denied_boarding.svg';
import rerouted from '../../img/rerouted.svg';
import returned from '../../img/returned.svg';
import delayed from '../../img/delayed.svg';
import cash from '../../img/cash.svg';
import moneySafety from '../../img/money-safety.jpg';
import { LockFilled } from '@ant-design/icons';
import _ from 'lodash';
import moment from 'moment';

import { CollapseProps } from 'antd';
import { Collapse, Row, Col, Button, Input } from 'antd';

import DestinationImg from '../../img/destination.png';
import DepartureImg from '../../img/Departure.png';
import './style.css';
const withRouter = (Component) => (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  return <Component {...props} router={{ location, navigate, params }} />;
};

const DelayedFlight = (props) => {
  const [currentStep, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [nextBtnEnable, setNextBtnEnable] = useState(false);
  const [passengerNumber, setPassengerNumber] = useState(1);
  const history = useNavigate();
  const handleDepartureChanged = (e) => {
    let tmpAnswers = _.clone(answers);
    let tmpAnswer = answers[currentStep]
      ? answers[currentStep]
      : { departure: null, destination: null };
    tmpAnswer.departure = e;
    setNextBtnEnable(!!tmpAnswer.departure && !!tmpAnswer.destination);
    tmpAnswers[currentStep] = tmpAnswer;
    setAnswers(tmpAnswers);
  };
  const handleDestinationChanged = (e) => {
    let tmpAnswers = _.clone(answers);
    let tmpAnswer = answers[currentStep]
      ? answers[currentStep]
      : { departure: null, destination: null };
    tmpAnswer.destination = e;
    setNextBtnEnable(!!tmpAnswer.departure && !!tmpAnswer.destination);
    tmpAnswers[currentStep] = tmpAnswer;
    setAnswers(tmpAnswers);
  };

  const handleDeparture3Changed = (e) => {
    let tmpAnswers = _.clone(answers);
    let tmpAnswer = answers[currentStep]
      ? answers[currentStep]
      : { departure: null, date: null };
    tmpAnswer.departure = e;
    setNextBtnEnable(!!tmpAnswer.departure && !!tmpAnswer.date);
    tmpAnswers[currentStep] = tmpAnswer;
    _.unset(tmpAnswer);
    setAnswers(tmpAnswers);
  };
  const handleDatePickerChange = (e) => {
    let tmpAnswers = _.clone(answers);
    let tmpAnswer = answers[currentStep]
      ? answers[currentStep]
      : { departure: null, date: null };
    tmpAnswer.date = e.date();
    setNextBtnEnable(!!tmpAnswer.departure && !!tmpAnswer.date);
    tmpAnswers[currentStep] = tmpAnswer;
    _.unset(tmpAnswer);
    setAnswers(tmpAnswers);
  };
  const getPassengers = () => {
    let tmp = [];
    for (let i = 0; i < passengerNumber; i++) {
      tmp.push(<img src={cash} style={{ width: '80px' }}></img>);
    }
    return tmp;
  };
  const items = [
    {
      key: '1',
      label: 'What do these options mean',
      children: (
        <Row>
          <Col
            span={24}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ padding: '2px' }}>
              <img src={delayed} style={{ width: '28px' }} />{' '}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Delayed
              </div>
              <p style={{ fontSize: '16px' }}>
                A delayed flight is generally defined as a flight that arrives
                at its destination later than the scheduled arrival time.
              </p>
            </div>
          </Col>
          <Col
            span={24}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ padding: '2px' }}>
              <img src={cancelled} style={{ width: '28px' }} />{' '}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Cancelled
              </div>
              <p style={{ fontSize: '16px' }}>
                A flight is considered canceled if it does not operate as
                scheduled. A flight is considered rebooked or rescheduled if the
                airline operates the flight at a different time or date than the
                originally booked flight.
              </p>
            </div>
          </Col>
          <Col
            span={24}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ padding: '2px' }}>
              <img src={rerouted} style={{ width: '28px' }} />{' '}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Rerouted
              </div>
              <p style={{ fontSize: '16px' }}>
                A flight reroute occurs when an aircraft deviates from the
                originally planned course during a flight and flies to a
                different destination than the one it was originally supposed to
                fly to.
              </p>
            </div>
          </Col>
          <Col
            span={24}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ padding: '2px' }}>
              <img src={returned} style={{ width: '28px' }} />{' '}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Returned
              </div>
              <p style={{ fontSize: '16px' }}>
                A returned flight occurs when an aircraft returns to the
                original departure location during a flight instead of reaching
                the intended destination.
              </p>
            </div>
          </Col>
          <Col
            span={24}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ padding: '2px' }}>
              <img src={deniedBoarding} style={{ width: '28px' }} />{' '}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Boarding denied
              </div>
              <p style={{ fontSize: '16px' }}>
                A denied boarding occurs when a passenger is unable to board the
                flight despite having an existing reservation and a valid
                ticket.
              </p>
            </div>
          </Col>
        </Row>
      )
    }
  ];

  const handleMinusBtnClick = () => {
    setNextBtnEnable(true);
    passengerNumber > 1 && setPassengerNumber(passengerNumber - 1);
  };
  const handlePlusBtnClick = () => {
    setNextBtnEnable(true);
    setPassengerNumber(Number(passengerNumber) + 1);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handle7StepChanged = (value, name) => {
    let tmpAnswers = _.clone(answers);
    let tmpAnswer = answers[currentStep] ? answers[currentStep] : {};
    const fields = [
      'gender',
      'first_name',
      'last_name',
      'email',
      'minor',
      'agree'
    ];
    switch (name) {
      case 'email':
        if (validateEmail(value)) {
          tmpAnswer[name] = value;
        } else delete tmpAnswer[name];
        break;
      default:
        if (value === '' || value === false) delete tmpAnswer[name];
        tmpAnswer[name] = value;
    }
    tmpAnswers[currentStep] = tmpAnswer;
    setAnswers(tmpAnswers);

    let flag = true;
    _.map(fields, (field) => {
      console.log(tmpAnswer[field], field);
      flag = flag && !!tmpAnswer[field];
    });
    setNextBtnEnable(flag);
  };
  const questions = [
    //1
    {
      progressName: 'Check your flight for free',
      title: 'What was the problem with your flight?',
      question: [
        <div>
          <img src={delayed} style={{ width: '30px' }} /> Delayed
        </div>,
        <div>
          <img src={cancelled} style={{ width: '30px' }} /> Cancelled
        </div>,
        <div>
          <img src={rerouted} style={{ width: '30px' }} /> Rerouted
        </div>,
        <div>
          <img src={returned} style={{ width: '30px' }} /> Returned
        </div>,
        <div>
          <img src={deniedBoarding} style={{ width: '30px' }} /> Boarding denied
        </div>
      ],
      footer: (
        <Collapse
          accordion
          items={items}
          style={{
            width: '100%',
            marginTop: '30px',
            backgroundColor: 'white',
            fontSize: '1.5rem'
          }}
          expandIconPosition="end"
        />
      ),
      questionType: 'radio',
      description: (
        <div>
          <h1 className="description-caption">Let's start</h1>
          <p className="description-content">
            Just a few details about your flight and we will calculate your
            possible compensation claim.
          </p>
        </div>
      )
    },
    //2
    {
      progressName: 'Check your flight for free',
      title: 'Did you originally book a direct flight?',
      question: ['Direct flight', 'With stopovers'],
      questionType: 'radio',
      description: (
        <div>
          <h1 className="description-caption">Let's start</h1>
          <p className="description-content">
            Just a few details about your flight and we will calculate your
            possible compensation claim.
          </p>
        </div>
      )
    },
    //3
    {
      progressName: 'Check your flight for free!',
      title: 'What was your original itinerary?',
      question: [
        <Fragment>
          <Select
            options={[
              { value: '1', label: 'Anaa(AAA)' },
              { value: '2', label: 'Arabury(AAB)' }
            ]}
            placeholder="Departure airport"
            style={{
              width: '100%',
              margin: '12px 0px',
              height: '60px',
              fontSize: '20px',
              border: '1px solid black',
              outline: 'none'
            }}
            onChange={handleDepartureChanged}
          ></Select>
        </Fragment>,
        <Fragment>
          <Select
            options={[
              { value: '1', label: 'Anaa(AAA)' },
              { value: '2', label: 'Arabury(AAB)' }
            ]}
            optionFontSize={24}
            placeholder="Destination airport"
            style={{
              width: '100%',
              margin: '12px 0px',
              height: '60px',
              fontSize: '20px',
              border: '1px solid black',
              outline: 'none'
            }}
            onChange={handleDestinationChanged}
          ></Select>
        </Fragment>
      ]
    },
    //4
    {
      progressName: 'Check your flight for free!?',
      question: [
        <Fragment>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
            Which airline did you fly with?
          </div>
          <Select
            options={[
              { value: '1', label: 'Anaa(AAA)' },
              { value: '2', label: 'Arabury(AAB)' }
            ]}
            name=""
            optionFontSize={24}
            placeholder="Departure airport"
            style={{
              width: '100%',
              margin: '12px 0px',
              height: '60px',
              fontSize: '20px',
              border: '1px solid black',
              borderRadius: '7px',
              outline: 'none'
            }}
            onChange={handleDeparture3Changed}
          ></Select>
        </Fragment>,
        <Fragment>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
            When did your journey begin?
          </div>
          <DatePicker
            placeholder="MM/DD/YYYY"
            format={'MM/DD/YYYY'}
            size={'large'}
            style={{
              width: '100%',
              height: '60px',
              fontSize: '20px',
              border: '1px solid black'
            }}
            onChange={handleDatePickerChange}
          ></DatePicker>
        </Fragment>
      ]
    },
    //5
    {
      progressName: 'Check your flight for free!',
      description: (
        <div>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>
            With how much delay did you arrive at Annaba?
          </h1>
          <p className="description-content">
            It is important to specify the delay in order to check whether you
            are entitled to compensation.
          </p>
        </div>
      ),
      question: [
        <div>Less than 3 hours</div>,
        <div>Between 3 and 4 hours</div>,
        <div>More than 4 hours</div>,
        <div>I never arrived to my destination</div>
      ],
      questionType: 'radio'
    },
    //6
    {
      progressName: 'Check your flight for free!',
      // title: 'How many travelers would you like to claim for?',
      description: (
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>
            How many travelers would you like to claim for?
          </h1>
          <p className="description-content" style={{ fontWeight: 'normal' }}>
            Simply request compensation for your fellow passengers.
          </p>
        </div>
      ),
      question: [
        <Row>
          <Col span={24} style={{ textAlign: 'center', fontSize: '24px' }}>
            <Button
              style={{
                textAlign: 'center',
                height: 'auto',
                fontSize: '32px',
                padding: '2px 30px',
                fontWeight: 'bold',
                margin: '0px 8px'
              }}
              onClick={handleMinusBtnClick}
            >
              -
            </Button>
            <Button
              style={{
                textAlign: 'center',
                height: 'auto',
                fontSize: '32px',
                padding: '2px 60px',
                fontWeight: 'bold',
                margin: '0px 8px'
              }}
            >
              {passengerNumber}
            </Button>
            <Button
              style={{
                textAlign: 'center',
                height: 'auto',
                fontSize: '32px',
                padding: '2px 30px',
                fontWeight: 'bold',
                margin: '0px 8px'
              }}
              onClick={handlePlusBtnClick}
            >
              +
            </Button>
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{ textAlign: 'center', fontSize: '24px', padding: '20px' }}
          >
            <div style={{ width: '350px', margin: 'auto' }}>
              {getPassengers()}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Number of travelers (including yourself)
            </div>
          </Col>
        </Row>
      ]
    },
    //7
    {
      progressName: 'Check your flight for free!',
      // title: 'How many travelers would you like to claim for?',
      description: (
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>
            Please enter your details
          </h1>
          <p className="description-content" style={{ fontWeight: 'normal' }}>
            We need the applicants passenger data so that we can enforce your
            claim.
          </p>
        </div>
      ),
      question: [
        <Row>
          <Col
            span={24}
            style={{ textAlign: 'left', fontSize: '20px', padding: '12px 0px' }}
          >
            <label htmlFor="male" className="gender-radio">
              <input
                type="radio"
                name="gender"
                id="male"
                onChange={(e) => handle7StepChanged('male', 'gender')}
              ></input>{' '}
              <span>Male</span>
            </label>
            <label htmlFor="female" className="gender-radio">
              <input
                type="radio"
                name="gender"
                id="female"
                onChange={(e) => handle7StepChanged('male', 'gender')}
              ></input>{' '}
              <span>Female</span>
            </label>
            <label htmlFor="other" className="gender-radio">
              <input
                type="radio"
                name="gender  "
                id="other"
                onChange={(e) => handle7StepChanged('male', 'gender')}
              ></input>{' '}
              <span>Other</span>
            </label>
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'center',
              fontSize: '24px',
              padding: '12px 0px'
            }}
          >
            <Input
              placeholder="First name"
              style={{
                fontSize: '24px',
                padding: '8px 16px',
                border: '1px solid black'
              }}
              onChange={(e) => handle7StepChanged(e.target.value, 'first_name')}
            />
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'center',
              fontSize: '24px',
              padding: '12px 0px'
            }}
          >
            <Input
              placeholder="Last name"
              style={{
                fontSize: '24px',
                padding: '8px 16px',
                border: '1px solid black'
              }}
              onChange={(e) => handle7StepChanged(e.target.value, 'last_name')}
            />
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'center',
              fontSize: '24px',
              padding: '12px 0px'
            }}
          >
            <Input
              placeholder="E-mail"
              style={{
                fontSize: '24px',
                padding: '8px 16px',
                border: '1px solid black'
              }}
              onChange={(e) => handle7StepChanged(e.target.value, 'email')}
            />
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'left',
              fontSize: '24px',
              padding: '0px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'baseline'
            }}
          >
            <div style={{ padding: '0px 10px 0px 0px' }}>
              <input
                type="checkbox"
                id="agree"
                onChange={(e) => handle7StepChanged(e.target.checked, 'agree')}
              ></input>
            </div>
            <label htmlFor="agree" style={{ fontSize: '16px' }}>
              Optional: I would like to be informed by email about offers and
              services from Flyhjælp ApS. I also agree to receive emails to
              complete my data. My agreement can be revoked at any time. For
              information on data protection, please click the corresponding
              link below on this page.
            </label>
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'left',
              fontSize: '24px',
              padding: '12px 0px 12px 0px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'baseline'
            }}
          >
            <div style={{ padding: '0px 10px 0px 0px' }}>
              <input
                onChange={(e) => handle7StepChanged(e.target.checked, 'minor')}
                type="checkbox"
                id="minor"
              ></input>
            </div>
            <label for={'minor'} style={{ fontSize: '16px' }}>
              I am a minor.
            </label>
          </Col>
        </Row>,
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'left',
              fontSize: '24px',
              padding: '12px 0px 12px 0px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontWeight: 'bold'
            }}
          >
            <LockFilled />{' '}
            <span style={{ fontSize: '20px', marginLeft: '8px' }}>
              Safe SSL encryption of your data.
            </span>
          </Col>
        </Row>
      ]
    },
    {
      progressName: 'Claim now without risk!',

      description: (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
            We can help you!
          </h1>
          <p className="description-content" style={{ fontWeight: 'normal' }}>
            Your possible claim for your flight (before success fee has been
            deducted):
          </p>
          <div
            className={'theme-color'}
            style={{ fontSize: '7rem', fontWeight: 'bold' }}
          >
            12,000€
          </div>
          <div
            className={'theme-color'}
            style={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            for {passengerNumber} person{passengerNumber > 1 && 's'}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              backgroundColor: 'white',
              padding: '25px 20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  paddingRight: '10px',
                  fontSize: '40px',
                  fontWeight: 'bold'
                }}
              >
                AAL
              </div>
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  marginTop: '36px',
                  display: 'block',
                  position: 'relative',
                  backgroundSize: '12px 1px',
                  backgroundImage:
                    'linear-gradient(to right, #DDDDDD 50%, transparent 50%)',
                  backgroundPosition: '0 0, 0 0, 100% 0, 0 100%'
                }}
              ></div>
              <div
                style={{
                  paddingLeft: '10px',
                  fontSize: '40px',
                  fontWeight: 'bold'
                }}
              >
                AAK
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div>Departure airport</div>
              <div>Destination airport</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div>Aalborg</div>
              <div>Aranuka</div>
            </div>
          </div>
          <div
            className="theme-color"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '20px 0px'
            }}
          >
            <img src={moneySafety} style={{ width: '30px' }} />
            <span>No win, no fee</span>
          </div>
          <div>
            <span>
              The success commission is 30% including VAT. If we have to engage
              our external lawyers, we charge a surcharge of 15% including VAT.
              By placing an order, you agree to our{' '}
              <a
                href="https://refundmore.com/pages/persondatapolitik"
                target="_blank"
              >
                Privacy Statement
              </a>{' '}
              and{' '}
              <a href="https://refundmore.com/pages/terms">
                Terms and Conditions
              </a>{' '}
              including the{' '}
              <a href="https://refundmore.com/pages/terms">
                comsumer cancellation policy
              </a>
              .
            </span>
          </div>
        </div>
      )
    }
  ];
  const onSelect = (selectedItem) => {
    console.log(selectedItem);
  };

  const handleBackBtnClick = () => {
    currentStep > 0 && setStep(currentStep - 1);
    let tmpAnswers = _.clone(answers);
    if (currentStep < 2) tmpAnswers = [];
    else {
      delete tmpAnswers[currentStep - 1];
      delete tmpAnswers[currentStep];
    }
    if (currentStep === 6) setNextBtnEnable(true);
    else {
      setNextBtnEnable(false);
      setAnswers(tmpAnswers);
    }
    _.unset(tmpAnswers);
  };
  const handleNextBtnClick = () => {
    currentStep < questions.length - 1 && setStep(Number(currentStep) + 1);
    if (currentStep == 0 && answers[currentStep] > 1) {
      props.router.navigate('/other-flight');
    }
    if (currentStep === 4 || currentStep === 6) setNextBtnEnable(true);
    else setNextBtnEnable(false);
  };
  const handleQuestionSelected = (selectedItem) => {
    let temp = _.clone(answers);

    temp[currentStep] = selectedItem;
    setAnswers(temp);
  };
  return (
    <section className="main-container">
      <Questionnaire
        currentStep={currentStep}
        questions={questions}
        answers={answers}
        onQuestionSelected={handleQuestionSelected}
        onNextBtnClick={handleNextBtnClick}
        onBackBtnClick={handleBackBtnClick}
        nextBtnEnable={nextBtnEnable}
      ></Questionnaire>
    </section>
  );
};

export default withRouter(DelayedFlight);
