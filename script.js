import axios from 'axios';

const uploadButton = document.querySelector(".uploadButton");
const popupOverlay = document.getElementById("popupOverlay");
const goToHomeButton = document.querySelector(".go-home-button");

uploadButton.addEventListener("click", async () => {
  console.log("uploadButton");
  const formData = new FormData ();
  const title = document.querySelector('#video-title')
  const description = document.querySelector('#video-description')
  formData.append("title", title.value);
  formData.append("description", description.value);
  

  const thumbnail = document.querySelector("#video-thumbnail");
  formData.append("thumbnail", thumbnail.files[0]);

  const videoFile = document.querySelector("#videoFile");
  formData.append("videoFile", videoFile.files[0]);

  const options = {
  method: 'POST',
  url: 'http://localhost:3000/api/upload',
  body: formData
  };

  try {
    const response = await axios.post('http://localhost:3000/api/upload', formData, {

        headers: {

          'Content-Type': 'multipart/form-data'

        }
  });
    console.log(response.data);
    popupOverlay.classList.add("active");
  } catch (error) {
    console.error(error);
  }
});

goToHomeButton.addEventListener("click", () => {
 window.location.href = "http://localhost:5174/yt.html"; 
});