// const { default: axios } = require("axios");
import axios from "axios";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const player = document.getElementById('video-player');
const title = document.getElementById('video-title-placeholder');
const description = document.getElementById('video-desc-placeholder');
const comment = document.getElementById('comment')
const commentInput = document.getElementById('commentInput')
const usernameInput = document.getElementById('usernameInput')
const comments_list = document.getElementById('comments-list')


let data = "";
fetchdata();
await getComments();
function fetchdata() {
  axios
    .get(`http://localhost:3000/api/videos/${id}`)
    .then(function (response) {
      data = response.data;
      console.log(data);
      player.poster = `http://localhost:3000${data.thumbnailUrl}`
      player.src = `http://localhost:3000${data.videoUrl}`
      title.textContent = `${data.title}`
      description.textContent = `${data.description}`
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
}

comment.addEventListener('click',async (e)=>{
  e.preventDefault()
  let headersList = {
 "Accept": "*/*",
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({ 
"username": usernameInput.value, 
"text": commentInput.value
});

let reqOptions = {
  url: `http://localhost:3000/api/videos/${id}/comments`,
  method: "POST",
  headers: headersList,
  data: bodyContent,
}

await axios.request(reqOptions);
getComments()

});

async function getComments(){
  try{
    const res = await axios.get(` http://localhost:3000/api/videos/${id}/comments `)
    data = res.data.comments
    console.log(data)
    comments_list.innerHTML=''
    data.forEach(element => {
      comments_list.innerHTML += `
<div id="user_comment">
                    <div id="username">${element.username}</div>
                    <div id="text">${element.text}</div>
                  </div>
`
        // console.log(element.text,element.username)
    });
  } catch(err){
    console.error(err.message)
  }
}
