import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import "./style.css";

const Landing = (props) => {
  return (
    <section className="landing">
      <Row>
        <Col span={24} xl={14}>
          <Row>
            <Col span={24}>
              <h1 className="caption">Claim a refund and compensation</h1>
            </Col>
          </Row>
          <Row className={"sub-caption"}>
            <Col span={24}>
              <CheckCircleFilled />
              <span className="sub-description">
                Get your cancelled plan tickets refunded
              </span>
            </Col>
            <Col span={24}>
              <CheckCircleFilled />
              <span className="sub-description">
                Compensation up to €600 per person
              </span>
            </Col>
            <Col span={24}>
              <CheckCircleFilled />
              <span className="sub-description">
                Legally authorized to claim refunds and compensation
              </span>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          xl={10}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className={"controls"}>
            <h1>Create a case regarding:</h1>
            <div>
              <Link to="/cancelled-flight">
                <button className="btn btn-primary">Cancelled flight</button>
              </Link>
            </div>
            <div>
              <Link to="/delayed-flight">
                <button className="btn btn-primary">Delayed flight</button>
              </Link>
            </div>
            <div>
              <Link to="/other-flight">
                <button className="btn btn-outline">other</button>
              </Link>
            </div>
            <div>
              <span>Already have a case?</span>
              <Link>Follow your case</Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {/* <Row className="review">
            <Col span={12} className="review-title">
              Trustpilot
            </Col>
            <Col span={12} className="review-rate">
              4.4 Out of 5 based on 50 reviews
            </Col>
          </Row>
          <Row>
            <Col span={2} className="review-avatar">
              <img
                src="./d.png"
                style={{ widht: '100%', borderRadius: '50%' }}
                alt="avatar"
              ></img>
            </Col>
            <Col span={10} className="review-description">
              <p>
                "Amazing service, Trustworthy, I got my refund for a flight
                delayed back in 2015 and another for a flight delayed in 2021."
              </p>
              <div className="review-footer">- Laura, 20. september 2023</div>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
