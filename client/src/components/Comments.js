import React, { Component } from "react"
import Disqus, {DiscussionEmbed} from "disqus-react"

export default function Comments(url, id, title) {
    console.log(`http://localhost:3000${url}`)
    const disqus_config = function() {
        this.page.url = `http://localhost:3000${url}`;
        this.page.identifier = id;
        this.page.title = title;
    };

    (function() {
        const d = document, s = d.createElement("script");

        s.src = "//thecamilleconnection.disqus.com/embed.js";
        s.setAttribute("data-timestamp", +new Date());
        (d.head || d.body).appendChild(s);
    })();



    // const disqusShortname = "thecamilleconnection"
    // const disqusConfig = {
    //   url: `http://localhost:3000/${id}`,
    //   identifier: id,
    //   title: title
    // }

    return (
        <div className="article-container">
            <DiscussionEmbed
                shortname = "thecamilleconnection"
                config = {{disqus_config}}
                // config = {{
                //     url: `http://localhost:3000${url}`,
                //     identifier: id,
                //     title: title,
                //     categoryID: id
                // }}
            />

        </div>
    )

}