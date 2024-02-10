import { Col, Row } from "antd";
import LoginForm from "./form";

export default function LoginPage(){

    return(
            <Row>
                <Col lg={24} xs={24}>
                <div style={{ height: '60px', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 19%, rgba(0,212,255,1) 100%)' }}>
                </div>
                </Col>
                <Col lg={8} xs={24}>
                    
                </Col>
                <Col lg={8} xs={24}>
                    <LoginForm />
                </Col>
                <Col lg={8} xs={24}>
                    
                </Col>
            </Row>
    );
}