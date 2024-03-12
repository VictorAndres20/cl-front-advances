import { Col, Row } from "antd";
import { useGenerateAdvacne } from "../../../_hooks/advance/useGenerateAdvance.hook";
import SelectAdvance from "./select_advance";
import Confirmation from "./confirmation";

export default function AdvancePage(){

    const generateHook = useGenerateAdvacne();

    return(
        <Row>
            {
                ! generateHook.amount &&
                <Col lg={24} xs={24}>
                    <SelectAdvance hook={generateHook} />
                </Col>
            }
            {
                generateHook.amount &&
                <Col lg={24} xs={24}>
                    <Confirmation hook={generateHook} />
                </Col>
            }
            
        </Row>
    );
}