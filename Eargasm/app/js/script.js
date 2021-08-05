const Playercontainer = document.querySelector('.player-container');
const Playbtn = document.querySelector('#play');
const Prevbtn = document.querySelector('#prev');
const Nextbtn = document.querySelector('#next');
const Music = document.querySelector('#music');
const Title = document.querySelector('#title');
const Cover = document.querySelector('#cover');
const Progressbar = document.querySelector('.progress-bar');
const Progress = document.querySelector('.progress');

const songs = ['Post ni Koe o Nageirete-YUKI', 'Tabidachi no Hi ni - Ai Kawashima', 'Welcome to alola - Pokemon Sun & Moon']

let songindex = 0;

loadsong(songs[songindex]);

function loadsong(song){
    Title.innerText = song;
    Music.src = `musics/${song}.mp3`;
    Cover.src = `images/${song}.png`;
}

function playsong(){
    Playercontainer.classList.add('play')
    Playbtn.querySelector('i.fas').classList.remove('fa-play')
    Playbtn.querySelector('i.fas').classList.add('fa-pause')
    Music.play()

}
function pausesong(){
    Playercontainer.classList.remove('play')
    Playbtn.querySelector('i.fas').classList.remove('fa-pause')
    Playbtn.querySelector('i.fas').classList.add('fa-play')
    Music.pause()
}

function prevsong(){
    songindex --
    if(songindex<0){
        songindex = songs.length -1;
    }
    loadsong(songs[songindex]);
    playsong()
}

function nextsong(){
    songindex ++
    if(songindex> songs.length -1){
        songindex = 0;
    }
    loadsong(songs[songindex]);
    playsong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progress = (currentTime/duration)*100
    Progress.style.width = `${progress}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clicked = e.offsetX
    const duration = Music.duration

    Music.currentTime = (clicked/width)*duration
}

//Event listeners
Playbtn.addEventListener('click', ()=>{
    const active = Playercontainer.classList.contains('play')

    if(active){
        pausesong()
    }else{
        playsong()
    }

})


Nextbtn.addEventListener('click', nextsong)
Prevbtn.addEventListener('click', prevsong)

Music.addEventListener('timeupdate', updateProgress)

Progressbar.addEventListener('click', setProgress)

Music.addEventListener('ended', nextsong)
