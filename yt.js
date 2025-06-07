import axios from "axios";
const vidsec = document.querySelector('.video-section')
let str=''
let data=[]
let filtereddata=[]
fetchdata()
function fetchdata(){
axios.get('http://localhost:3000/api/videos')
                .then(function (response) {
                  console.log(response.data)
                  data=response.data
                  filtereddata=data
                  displaydata()})
                .catch(err=>{
                  console.log(err.code, err.message)
                })}
function displaydata(){
filtereddata.videos.forEach((element,index) => {
        str+=`<article class="video-container" onclick='openVideo(${index})'>
        <a href="http://localhost:3000${element.videoUrl}" class="thumbnail" data-duration="12:24">
          <img class="thumbnail-image" src="http://localhost:3000${element.thumbnailUrl}" />
        </a>
        <div class="video-bottom-section">
          <a href="#">
            <img class="channel-icon" src="http://unsplash.it/36/36?gravity=center" />
          </a>
          <div class="video-details">
            <a href="#" class="video-title">${element.title}</a>
            <a href="#" class="video-channel-name">Channel Name</a>
            <div class="video-metadata">
              <span>12K views</span>
              •
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </article>`});
      vidsec.innerHTML=str}
const searchInput = document.querySelector('.search-input');
const suggestionsContainer = document.querySelector('#suggestions');
searchInput.addEventListener('keyup' , function() {
            const searchTerm = searchInput.value.toLowerCase();
            suggestionsContainer.innerHTML = ' ';
            if (searchTerm.length > 0) {
                const suggestions = data.videos.filter(function(uni) {
                    return uni.title.toLowerCase().includes(searchTerm);
                }).slice(0, 5); 

                suggestions.forEach(function(suggestion) {
                    const div = document.createElement('div');
                    
                    div.textContent = suggestion.title;
                    div.onclick = function() {
                        searchInput.value = suggestion.title;
                        vidsec.innerHTML=``
                        str=`<article class="video-container">
        <a href="http://localhost:3000${suggestion.videoUrl}" class="thumbnail" data-duration="12:24">
          <img class="thumbnail-image" src="http://localhost:3000${suggestion.thumbnailUrl}" />
        </a>
        <div class="video-bottom-section">
          <a href="#">
            <img class="channel-icon" src="http://unsplash.it/36/36?gravity=center" />
          </a>
          <div class="video-details">
            <a href="#" class="video-title">${suggestion.title}</a>
            <a href="#" class="video-channel-name">Channel Name</a>
            <div class="video-metadata">
              <span>12K views</span>
              •
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </article>`;
      vidsec.innerHTML=str

                        suggestionsContainer.innerHTML = ''; 
                        filterdata(); 
                    };
                    
                    div.classList.add('suggestion-item')
                    suggestionsContainer.appendChild(div);
                });            }
            filterdata(); 
        });
  let clickedText=''
  suggestionsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('suggestion-item')) {
         clickedText = event.target.textContent;
                suggestionsContainer.innerHTML = '';
                searchInput.focus();
            }})
function filterdata() {
            // const searchTerm = searchInput.value.toLowerCase();
            filtereddata = data.videos.filter(function(uni) {
                return uni.title.toLowerCase().includes(clickedText);
               
            });
              console.log(filtereddata)
            // displaydata();
            
        }
  function openVideo(index){

  }  