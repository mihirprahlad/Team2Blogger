import { RiEditBoxLine } from "react-icons/ri";
export default function EditCartItem(props) {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{paddingRight: "20px"}}>
                {props.itemQuantity}
            </div>

            <div>
                <RiEditBoxLine />
            </div>

        </div>
    );
}