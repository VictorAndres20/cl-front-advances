import { Col, Row } from "antd";
import LoginForm from "./form";

export default function LoginAdminPage(){

    return(
            <Row>
                <Col lg={24} xs={24}>
                <div style={{ height: '60px', backgroundColor: '#0BA8E8' }}>
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