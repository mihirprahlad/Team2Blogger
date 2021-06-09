const db = require("../firebase.js");

// db.collection("blogpost").get().then(querySnapshot => {
//   querySnapshot.forEach((blog) => {
//     db.collection("blogpost").doc(blog.id).update({
//       likes: {},
//       dislikes: {}
//     })
//   })
// })

db.collection("users").get().then(querySnapshot => {
  querySnapshot.forEach((user) => {
    db.collection("users").doc(user.id).update({
      liked_posts: {},
      disliked_posts: {}
    })
  })
})
