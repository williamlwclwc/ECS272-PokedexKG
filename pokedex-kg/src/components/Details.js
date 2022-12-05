import { useContext } from 'react';
import { selectedItemContext } from "./MainBoard";
import { Empty } from "antd";
import Banner from './Banner';

function Details() {
    // eslint-disable-next-line
    const {selectedItem, setSelectedItem} = useContext(selectedItemContext);
    // console.log(selectedItem);
    if (Object.keys(selectedItem).length === 0)
        return (
            <Empty description={
                <span>Select a Node to see details</span>
            } />
        );
    else {
        // console.log(selectedItem);
        return (
            <Banner {...selectedItem}/>
        );
    }
}

export default Details;