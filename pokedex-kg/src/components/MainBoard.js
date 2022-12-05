import { Card, Row, Col } from "antd";
import NodeLink from "./NodeLink";
import Details from "./Details";
import { createContext, useState } from 'react';

export const selectedItemContext = createContext();

function MainBoard() {
    const [selectedItem, setSelectedItem] = useState({});
    return (
        <div>
            <Card style={{maxHeight: '88vh'}}>
                <Row>
                    <Col flex={4} id='main' style={{width: '60%', height: '86vh'}}>
                        <selectedItemContext.Provider value={{selectedItem, setSelectedItem}}>
                            <NodeLink />
                        </selectedItemContext.Provider>
                    </Col>
                    <Col flex={1} style={{width: '25%'}}>
                        <selectedItemContext.Provider value={{selectedItem, setSelectedItem}}>
                            <Details />
                        </selectedItemContext.Provider>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default MainBoard;