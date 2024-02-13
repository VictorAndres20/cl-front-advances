import { Col, Row } from "antd";
import AdminTitle from "../../../widgets /titles/admin_title";
import Table from "./table";

export default function AmountsPage(){

    return(
        <Row>
            <Col lg={24} xs={24}>
                <AdminTitle text={'Montos de adelanto'} />
                <Table />
            </Col>
        </Row>
    );
}