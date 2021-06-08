import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Disqus, {CommentCount} from "disqus-react";

export default function CommentsNum (props) {
    const {url, id, title} = props

    return (
        <div>
            <Disqus.CommentCount
                shortname = "thecamilleconnection"
                config = {{
                    url: `http://localhost:3000${url}`,
                    identifier: id,
                    title: title
                }}
            >
            </Disqus.CommentCount>
        </div>
    )

}