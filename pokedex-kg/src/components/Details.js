import { useContext } from 'react';
import { selectedItemContext } from "./MainBoard";
import { Empty } from "antd";

function Details() {
    // eslint-disable-next-line
    const {selectedItem, setSelectedItem} = useContext(selectedItemContext);
    console.log(selectedItem);
    if (Object.keys(selectedItem).length === 0)
        return (
            <Empty description={
                <span>Select a Node or Link to see details</span>
            } />
        );
    else {
        return (
            <div> 
                <span>{JSON.stringify(selectedItem)}</span>
            </div>
        );
    }
}

export default Details;