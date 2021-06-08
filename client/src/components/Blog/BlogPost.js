import React from "react";
import {useParams} from "react-router-dom"
export default function BlogPost(){
    const {blogID} = useParams();
    console.log("active?")

    return(
        <div>
            <h1>Specific Blog Page</h1>
            <h1>{blogID}</h1>
        </div>
    )

}