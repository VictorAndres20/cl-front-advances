import { Col, Row } from "antd";
import { useGenerateAdvacne } from "../../../_hooks/advance/useGenerateAdvance.hook";
import SelectAdvance from "./select_advance";
import Confirmation from "./confirmation";
import Information from "./information";
import { useFindEmployeeById } from "../../../_hooks/employees/useFindEMployeeById.hook";

export default function AdvancePage(){

    const employee = useFindEmployeeById();
    const generateHook = useGenerateAdvacne();

    return(
        <Row>
            {
                generateHook.panel === 1 &&
                <Col lg={24} xs={24}>
                    <SelectAdvance hook={generateHook} />
                </Col>
            }
            {
                generateHook.panel === 2 && generateHook.amount &&
                <Col lg={24} xs={24}>
                    <Information hook={generateHook} employee={employee} />
                </Col>
            }
            {
                generateHook.panel === 3 && generateHook.amount && generateHook.confirm &&
                <Col lg={24} xs={24}>
                    <Confirmation hook={generateHook} employee={employee} />
                </Col>
            }
        </Row>
    );
}