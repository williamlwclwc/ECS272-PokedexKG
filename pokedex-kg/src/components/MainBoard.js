import { Divider, Card, Row, Col, Empty } from "antd";

function MainBoard() {
    return (
        <div>
            <Card style={{height: '88vh'}}>
                <Row>
                    <Col flex={4}>
                        Node-link Diagram
                    </Col>
                    <Divider style={{height: '84vh'}} type="vertical"></Divider>
                    <Col flex={1}>
                        <Empty description={
                            <span>Select a Node or Link to see details</span>
                        } />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default MainBoard;