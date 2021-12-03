let request =
  "https://gist.githubusercontent.com/jasonbaldridge/2668632/raw/e56320c485a33c339791a25cc107bf70e7f1d763/music.json";
const xhr = new XMLHttpRequest();
xhr.open("GET", request);
let section = document.querySelector("#groups-section");
let groupsObj = {
  name: "",
};
let lengthArr = []
let lengthName = []
xhr.onload = () => {
  let array = JSON.parse(xhr.response);
  console.log(array);
  array.forEach((element) => {
    groupsObj.name = element.name;
    let group = document.createElement("div");
    group.classList.add("group");
    section.append(group);
    group.innerHTML = `
    <p>${groupsObj.name}</p>`;
    groupsObj.name = "";
    group.addEventListener("click", () => {
      section.style.display = "none";
      let newSection = document.createElement("div");
      newSection.classList.add("new-section");
      document.body.append(newSection);
      let newSectionBack = document.createElement("button");
      newSection.append(newSectionBack);
      newSectionBack.classList.add("back-btn");
      newSectionBack.innerHTML = "Back";
      newSectionBack.addEventListener("click", () => {
        newSection.remove();
        section.style.display = "flex";
      });
      let albumsSection = document.createElement("div");
      albumsSection.classList.add("albums-section");

      let groupTitle = document.createElement("h1");
      groupTitle.classList.add("group-title");
      groupTitle.innerHTML = `${element.name}`;
      newSection.append(groupTitle);
      newSection.append(albumsSection);
      element.albums.forEach((elem) => {
        let album = document.createElement("div");
        album.classList.add("album");
        albumsSection.append(album);
        album.innerHTML = `<p>${elem.title}</p>`;
        album.addEventListener("click", () => {
          newSection.style.display = "none";
          let songsSection = document.createElement("div");
          let songsSectionBack = document.createElement("button");
          songsSectionBack.classList.add("back-btn");
          songsSection.append(songsSectionBack);
          songsSectionBack.innerHTML = "Back";
          songsSectionBack.addEventListener("click", () => {
            songsSection.remove();
            newSection.style.display = "flex";
            lengthArr = []
            lengthName = []
          });
          songsSection.classList.add("songs-section");
          document.body.append(songsSection);
          let sortBlock = document.createElement("div");
          sortBlock.classList.add("sort-block");
          
          let sortByLength = document.createElement("button");
          sortByLength.innerHTML = "Sort by length";
          let sortByName = document.createElement("button");
          sortByName.innerHTML = "Sort by name";
         
          sortByName.classList.add('sort-name')
          sortByLength.classList.add('sort-length')
          let groupTitle = document.createElement("h1");
          groupTitle.classList.add("group-title");
          groupTitle.innerHTML = `${element.name}`;
          songsSection.append(groupTitle);
          let albumTitle = document.createElement("h4");
          albumTitle.classList.add("album-title");
          albumTitle.innerHTML = `${elem.title}`;
          songsSection.append(albumTitle);
          let albumDes = document.createElement("p");
          songsSection.append(albumDes);
          albumDes.innerHTML = `${elem.description}`;
          albumDes.classList.add("class-des");
          sortBlock.append(sortByName);
          sortBlock.append(sortByLength);
          songsSection.append(sortBlock);
          elem.songs.forEach((el) => {
            let song = document.createElement("div");
            songsSection.append(song);
            song.classList.add("song");
            song.innerHTML = `<h3>${el.title}</h3> <h5>${el.length}</h5>`;
            lengthArr.push(el);
            lengthName.push(el)
            sortByName.addEventListener("click", () => {
              let songRemove = songsSection.querySelectorAll('.song')
              for (let i = 0; i < songRemove.length; i++) {
                songRemove[i].remove()    
              }
              lengthName.sort(function (a, b) {
                if (a.title > b.title) {
                  return 1;
                }
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title == b.title) {
                  return 0;
                }
              });
              lengthName.forEach((element) => {
                let songName = document.createElement("div");
                songsSection.append(songName);
                songName.classList.add("song");
                songName.innerHTML = `<h3>${element.title}</h3> <h5>${element.length}</h5>`;
              });
              
            });
            sortByLength.addEventListener("click", () => {
              
              console.log(lengthArr);
              let songRemove = songsSection.querySelectorAll('.song')
              for (let i = 0; i < songRemove.length; i++) {
                songRemove[i].remove()    
              }
              lengthArr.sort(function (a, b) {
                if (a.length > b.length) {
                  return -1;
                }
                if (a.length < b.length) {
                  return 1;
                }
                if (a.length == b.length) {
                  return 0;
                }
              });
              lengthArr.forEach((element) => {
                let songLength = document.createElement("div");
                songsSection.append(songLength);
                songLength.classList.add("song");
                songLength.innerHTML = `<h3>${element.title}</h3> <h5>${element.length}</h5>`;
              });
            });
            
          });
        });
      });
    });
  });
};

xhr.send();
