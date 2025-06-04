import React, { useState } from "react";
import { Row, Col, Button, Radio, Form, Select, DatePicker } from "antd";
import _ from "lodash";
import { CheckCircleFilled } from "@ant-design/icons";
import reason from "../data/reason.json";
import airline from "../data/airline.json";
import "./style.css";

const OtherFlight = (props) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedReason, selectReason] = useState();
  const onReasonChange = (e) => selectReason(e);
  const handleValueChanges = (e) => {
    let formData = form.getFieldsValue();
    if (!!formData.delayed_type) {
      setCurrentStep(6);
    } else if (!!formData.distruption_flight) {
      setCurrentStep(5);
    } else if (
      !!formData.arrival_airport &&
      !!formData.stopover_airport &&
      !!formData.departure_airport
    ) {
      setCurrentStep(4);
    } else if (!!formData.stopover_cnt) {
      setCurrentStep(3);
    } else if (
      !!formData.airline &&
      !!formData.flight_date &&
      formData.flight_date.format("MM/DD/YYYY")
    ) {
      setCurrentStep(2);
    } else if (!!formData.reason) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  };
  console.log(currentStep);
  return (
    <Form
      name="flight-form"
      form={form}
      className="flight-container"
      layout="vertical"
      onValuesChange={handleValueChanges}
    >
      <Row>
        <Col span={24} style={{ fontSize: "24px", fontWeight: "bold" }}>
          Refundmore Claims justice for you to the airline
        </Col>
        <Col span={24}>
          <div className="circle-check">
            <CheckCircleFilled className="icon-check" />
            <span>Let Refundmore handle the struggle with the airline</span>
          </div>
          <div className="circle-check">
            <CheckCircleFilled className="icon-check" />
            <span>
              It only takes 3 minutes to open a claim case at Refundmore
            </span>
          </div>
          <div className="circle-check">
            <CheckCircleFilled className="icon-check" />
            <span>
              No win – No fee! Our service is free if we are not successful
            </span>
          </div>
        </Col>
      </Row>
      {currentStep > -1 && (
        <Row>
          <Col span={24}>
            <Form.Item label="What happened with the flight?" name="reason">
              <Radio.Group
                onChange={onReasonChange}
                value={selectedReason}
                className="reason-card"
              >
                {_.map(reason, (item) => (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      )}
      {currentStep > 0 && (
        <Row>
          <Col span={12}>
            <Form.Item label="Airline" name="airline">
              <Select
                style={{
                  height: "48px",
                  marginRight: "40px",
                  width: "300px",
                  border: "1px solid silver",
                }}
              >
                {_.map(airline, (item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Scheduled departure date" name="flight_date">
              <DatePicker
                style={{
                  height: "48px",
                  width: "200px",
                  border: "1px solid silver",
                  fontSize: "24px",
                }}
                className="flight-date"
                format="MM/DD/YYYY"
              ></DatePicker>
            </Form.Item>
          </Col>
        </Row>
      )}
      {currentStep > 1 && (
        <Row>
          <Col span={24}>
            <Form.Item label="How many stopovers?" name="stopover_cnt">
              <Radio.Group
                onChange={onReasonChange}
                value={selectedReason}
                className="reason-card"
              >
                {_.map(reason, (item) => (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      )}
      {currentStep > 2 && (
        <Row>
          <Col span={24}>
            <Form.Item label="Departure airport" name="departure_airport">
              <Select
                style={{
                  height: "48px",
                  marginRight: "40px",
                  width: "300px",
                  border: "1px solid silver",
                }}
              >
                {_.map(airline, (item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="1. Stopover airport" name="stopover_airport">
              <Select
                style={{
                  height: "48px",
                  marginRight: "40px",
                  width: "300px",
                  border: "1px solid silver",
                }}
              >
                {_.map(airline, (item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Arrival airport" name="arrival_airport">
              <Select
                style={{
                  height: "48px",
                  marginRight: "40px",
                  width: "300px",
                  border: "1px solid silver",
                }}
              >
                {_.map(airline, (item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}
      {currentStep > 3 && (
        <Row>
          <Col span={24}>
            <Form.Item
              label="Which flight caused the disruption?"
              name="distruption_flight"
            >
              <Select
                style={{
                  height: "48px",
                  marginRight: "40px",
                  width: "300px",
                  border: "1px solid silver",
                }}
              >
                <Select.Option value="1">
                  Please choose delayed flight
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}
      {currentStep > 4 && (
        <Row>
          <Col span={24}>
            <Form.Item
              label="How delayed did you arrive at your destination?"
              name="delayed_type"
            >
              <Radio.Group
                onChange={onReasonChange}
                value={selectedReason}
                className="reason-card"
              >
                {_.map(reason, (item) => (
                  <Radio value={item.value}>{item.label}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      )}
      {currentStep > 5 && (
        <Row>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Button className="btn-continue">continue</Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default OtherFlight;
