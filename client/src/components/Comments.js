import React from "react"
import {DiscussionEmbed} from "disqus-react"

export default function Comments(url, id, title) {
    console.log(`http://localhost:3000${url}`)
    const disqus_config = function() {
        this.page.url = `http://localhost:3000${url}`;
        this.page.identifier = id;
        this.page.title = title;
    };

    return (
        <div className="article-container">
            <DiscussionEmbed
                shortname = "thecamilleconnection"
                config = {{disqus_config}}
            />

        </div>
    )

}