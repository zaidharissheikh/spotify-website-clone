console.log("Let's do javacript")
let currentSong = new Audio();
let songs;
let currFolder;
let folderPath;

async function getSongs(folder){
    currFolder = folder;
    console.log("Current Folder:", folder);  // Debugging

    // Fetch the directory listing
    
    let a = await fetch(`${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log("Anchor tags found:", as);  // Debugging

    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            
            let songName = element.href.split(`${folder.split("/").pop()}/`)[1];
            console.log("Song Name before replace:", songName);  // Debugging
            if (songName) {
                songName = songName.replace(".mp3", "");
                songName = songName.replaceAll("%20", " ");
                songs.push(songName);
            } else {
                console.warn("Song Name is undefined for:", element.href);  // Warning if undefined
            }
        }
    }

    console.log("Songs array:", songs);  // Debugging
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUl.innerHTML = "";
    for (const song of songs) {
        songUl.innerHTML += `<li>
                            <img src="images/musicicon.svg" alt="music icon" class="invert">
                            <div class="info">
                                <div>${song}</div>
                                <div>Music Artist</div>
                            </div>
                            <div class="play-now">
                                <span>Play Now</span>
                                <img src="images/play.svg" alt="play icon" class="invert">
                            </div>
                            </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })
}

async function displayAlbums(baseUrl = `http://192.168.18.46:3000/sigma web dev/Spotify Clone/songs/`) {
    // Build folderPath carefully to avoid duplicating "songs"
    // folderPath = currentFolder ? `${baseUrl}/${currentFolder}` : baseUrl;
    folderPath = baseUrl;
    console.log("Constructed folderPath:", folderPath);  // Debugging

    let response = await fetch(folderPath);
    let textResponse = await response.text();

    let div = document.createElement("div");
    div.innerHTML = textResponse;
    let anchors = Array.from(div.getElementsByTagName("a"));
    anchors.shift();


    for (let anchor of anchors) {
        let href = anchor.href;
        console.log(href);
        
        let folderName = href.split("/Spotify%20Clone/")[1];
        if(anchor.href.includes("/songs")){
            let folder = anchor.href.split("/").slice(-2)[0];
            //get the metadata of the folder
            let a = await fetch(`${folderPath}${folder}/info.json`);
            let resp = await a.json();
            console.log(resp);
            document.querySelector(".playlistContainer").innerHTML += `
                <div class="card" data-folder="${folder}">
                        <div class="play-button">
                            <img src="images/play-button-svgrepo-com.svg" alt="play button">
                        </div>
                        <img src="${folderPath}${folder}/cover.jpeg" alt="artist">
                        <h4>${resp.title}</h4>
                        <p>${resp.description}</p>
                </div>`
        }
    }
    // Attach event listeners after cards are added to the DOM
    Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async item => {
                console.log("Card clicked:", item.currentTarget.dataset.folder);
                await getSongs(`${folderPath}${item.currentTarget.dataset.folder}`);
            });
        });
}


const playMusic = (song)=>{
    currentSong.src = `${currFolder}/${song}.mp3`;
    currentSong.play();
    play.src = "images/pause.svg";

    document.querySelector(".songinfo").innerHTML = `${song.replaceAll("%20", " ")}`;
    document.querySelector(".songtime").innerHTML = "00:00";
    // Show the playbar when a song is played
    document.querySelector(".playbar").style.display = "block";
}

function convertToMinutesAndSeconds(durationInSeconds) {
    if(isNaN(durationInSeconds) || durationInSeconds < 0){
        return "00:00";
    }
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = (durationInSeconds % 60).toFixed(0);

    // Add leading zeros if necessary
    minutes = minutes < 10 ?  minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
}


async function main(){
    // await getSongs("songs");
    // console.log(songs);

    await displayAlbums();

    // Array.from(document.getElementsByClassName("card")).forEach(e => {
    //     e.addEventListener("click", async item => {
    //         await getSongs(`${item.currentTarget.dataset.folder}`);
    //     })
    // });

    let div = document.createElement("div");
    div.innerHTML = `
    <div class="playbar">
        <div class="info-container">
            <div class="songinfo">
                
            </div>
            <div class="songbtns">
                <img src="images/prev.svg" alt="" id="prev">
                <img src="images/play.svg" alt="" id="play">
                <img src="images/next.svg" alt="" id="next">
            </div>
            <div class="songtime">
                
            </div>
        </div>
        <div class="seekbar">
            <div class="circle">

            </div>
        </div>
    </div.`;
    document.querySelector(".right").append(div);


    document.querySelector("#play").addEventListener("click", () => {
        if(currentSong.paused){
            currentSong.play();
            play.src = "images/pause.svg";
        }
        else{
            currentSong.pause();
            play.src = "images/play.svg";
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${convertToMinutesAndSeconds(currentSong.currentTime)} / ${convertToMinutesAndSeconds(currentSong.duration)}`;
        let percent = 100 *(currentSong.currentTime / currentSong.duration);
        document.querySelector(".seekbar .circle").style.left = percent + "%";
        if(percent == 100){
            let index = songs.indexOf(currentSong.src.split(`/${currFolder.split('/').pop()}/`)[1].replace(".mp3", "").replaceAll("%20", " "));
            if (index+1 < songs.length){
                playMusic(songs[index+1]);
            }
        }
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        //The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = currentSong.duration * (percent/100);
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    document.querySelector(".close .cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%";
    })

    document.querySelector("#prev").addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split(`/${currFolder.split('/').pop()}/`)[1].replace(".mp3", "").replaceAll("%20", " "));
        if (index-1 >= 0){
            playMusic(songs[index-1]);
        }
    })

    document.querySelector("#next").addEventListener("click", () => {
        currentSong.pause();
        
        let index = songs.indexOf(currentSong.src.split(`/${currFolder.split('/').pop()}/`)[1].replace(".mp3", "").replaceAll("%20", " "));
        console.log(index)
        
        if (index+1 < songs.length){
            playMusic(songs[index+1]);
        }
    })
}
main()