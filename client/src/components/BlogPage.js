import PostCard from './PostCard'
export default function BlogPage(){

    const postContent = {
        "image":"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170",
        "date": Date().toLocaleString(),
        "content":"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus        ",
        "title":"Lorem Ipsum Exposed?"
    }
    console.log(postContent)

    return(
        <div>
            <h1 style={{textAlign:"center",padding:"15px"}}>My Blog.</h1>
            <PostCard postContent={postContent}/>
        </div>
    )

}