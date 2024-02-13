import { Col, Row } from "antd";
import AdminTitle from "../../../widgets /titles/admin_title";
import Table from "./table";

export default function AdvancesInboxPage(){

    return(
        <Row>
            <Col lg={24} xs={24}>
                <AdminTitle text={'Solicitudes de adelantos'} />
                <Table />
            </Col>
        </Row>
    );
}