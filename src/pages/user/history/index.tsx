import { Col, Divider, Row } from "antd";
import InfoAdvances from "./info";

export default function HistoryPage(){

    return(
        <Row>
            <Col lg={24} xs={24}>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginTop: '10px' }}>Historial de anticipos</div>
                <Divider />
            </Col>
            <InfoAdvances />
        </Row>
    );
}