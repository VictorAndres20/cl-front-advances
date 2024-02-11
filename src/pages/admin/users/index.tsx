import { Col, Row } from "antd";
import AdminTitle from "../../../widgets /titles/admin_title";
import Table from "./table";

export default function UsersPage() {

    return(
        <Row>
            <Col lg={24} xs={24}>
                <AdminTitle text={'Usuarios'} />
                <Table />
            </Col>
        </Row>
    );
}