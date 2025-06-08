import axios from "axios";
const vidsec = document.querySelector(".video-section");
let data = [];
let filtereddata = [];

document.querySelector('.search-bar').addEventListener('submit',(e)=>{
  e.preventDefault()
})


fetchdata();
function fetchdata() {
  axios
    .get("http://localhost:3000/api/videos")
    .then(function (response) {
      data = response.data;
      filtereddata = data;
      displaydata();
    })
    .catch((err) => {
      console.log(err.code, err.message);
    });
}

function displaydata() {
  vidsec.innerHTML = "";

  filtereddata.videos.forEach((element) => {
    const videoArticle = document.createElement("article");
    videoArticle.className = "video-container";

    videoArticle.innerHTML = `
            <div class="thumbnail" data-duration="12:24">
              <img class="thumbnail-image" src="http://localhost:3000${element.thumbnailUrl}" />
            </div>
            <div class="video-bottom-section">
              <a href="#">
                <img class="channel-icon" src="http://unsplash.it/36/36?gravity=center" />
              </a>
              <div class="video-details">
                <p class="video-title">${element.title}</p>
                <p class="video-channel-name">iTube Creator</p>
              </div>
            </div>
        `;

    videoArticle.addEventListener("click", () => {
      sessionStorage.setItem("selectedVideoId", element.id);

      window.location.href = `player.html?id=${element.id}`;
    });

    vidsec.appendChild(videoArticle);
  });
}

const searchInput = document.querySelector(".search-input");
const suggestionsContainer = document.querySelector("#suggestions");

searchInput.addEventListener("keyup", function () {
  const searchTerm = searchInput.value.toLowerCase();
  suggestionsContainer.innerHTML = " "; // Clear previous suggestions
  if (searchTerm.length > 0) {
    const suggestions = data.videos
      .filter(function (uni) {
        return uni.title.toLowerCase().includes(searchTerm);
      })
      .slice(0, 5);

    suggestions.forEach(function (suggestion) {
      const div = document.createElement("div");

      div.textContent = suggestion.title;
      div.onclick = function () {
        searchInput.value = suggestion.title;
        vidsec.innerHTML = ``;

        const videoArticle = document.createElement("article");
        videoArticle.className = "video-container";
        videoArticle.innerHTML = `
                          <div class="thumbnail" data-duration="12:24">
                            <img class="thumbnail-image" src="http://localhost:3000${suggestion.thumbnailUrl}" />
                          </div>
                          <div class="video-bottom-section">
                            <a href="#">
                              <img class="channel-icon" src="http://unsplash.it/36/36?gravity=center" />
                            </a>
                            <div class="video-details">
                              <p class="video-title">${suggestion.title}</p>
                              <p class="video-channel-name">iTube Creator</p>
                            </div>
                          </div>`;

        videoArticle.addEventListener("click", () => {
          sessionStorage.setItem("selectedVideoId", suggestion.id);
          window.location.href = `player.html?id=${suggestion.id}`;
          console.log(suggestion.id);
        });
        vidsec.appendChild(videoArticle);
        suggestionsContainer.innerHTML = "";
      };

      div.classList.add("suggestion-item");
      suggestionsContainer.appendChild(div);
    });
  } else {
    filtereddata = data;
    displaydata();
  }
});
