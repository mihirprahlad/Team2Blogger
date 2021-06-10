import { RiEditBoxLine } from "react-icons/ri";
import { useState } from 'react';
export default function EditCartItem(props) {
    const [edit, setEdit] = useState(false);
    const handleClick = () => setEdit(true);
    const itemQuantity = props.itemQuantity;
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            
            {/* <div style={{paddingRight: "20px"}}>
            {!edit ? {itemQuantity} : null }
                
            </div>

            <div>
                <RiEditBoxLine onClick={handleClick}/>
            </div> */}

        </div>
    );
}