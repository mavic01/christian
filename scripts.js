
const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const playImg = document.querySelector('.play-img')
const checkbox = document.querySelector('#checkbox')


//song titles
const songs = ["Anne Marie David - Be Merciful", "Dahter - When you feel like God is playing games with you", "Dåhter - Your grass is the greenest #greenpastures", "Dahter - When anxiety comes and you dont feel safe anywhere", "Dahter  (Deanna Lorea ~Unraveled) - We arent we of ONE mind right now", "Dahter - Knowledge does not equal security in Me", "Dahter - I want to make My home with you", "Dahter - What happens when you wait on God but nothing happens", "Dahter - Proving our love to God", "Dahter - When you try to MIMIC Bible characters lives  Talks with Yahweh", "Dahter  (Deanna Lorea) - The REST youre looking for lies in your FAITH  Talks with Yahweh", "Dahter - When you feel like God is quiet in your life", "Dahter - Be careful what you reach for when you feel insignificant", "Dahter - When your environment doesnt match your true identity", "Dåhter - I will show you whats from Me. He is faithful", "Dahter - Did I hear from God or were those my thoughts", "Dahter - How did I get here in my thoughts", "Dahter - Loving those who hurt me", "Dahter - Curious to know whats on the other side of His Word_", "Dahter - Your life was well planned", "Dahter - Discernment_ What is He saying_!", "Dåhter - When you feel life is suffocating you. God felt that too", "Dahter - He's Removing False Confidence", "Dahter (Unraveled) - You have the FULL attention of your FATHER", "Dahter - Scarcity Mindset with God", "Dahter - Will you give Me those limiting words you've collected", "Dahter - Stay, so you witness the capacity of My character", "Dahter - When you have nothing left to give", "Dahter - When you struggle with comparison and insecurity", "Dahter - When it gets darker after following God", "Dåh_ter  (Deanna Lorea) - Rest in My INEVITABLE direction", "Dahter - When He makes you lie down in green pastures"]

checkbox.addEventListener('change', () => {
    //change website theme
    document.body.classList.toggle('dark');
});

//keep track of the song
let songIndex = 0;
// console.log(songs.length);

//Initially load song into the DOM
loadSong(songs[songIndex])

//update the song details.. create the function above
function loadSong(song){
    title.innerText = song;
    // audio.src = `music/${song}.mp3`
    // cover.src = `images/${song}.jpg`
    audio.src = 'music/'+ song + '.mp3'
    cover.src = 'images/'+ song + '.jpg'
}

function playSong(){
    musicContainer.classList.add('play')

    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    playImg

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1 //aka 131-1 which is 16...ie. the last index song
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex > 31){
        songIndex = songs.length - 32
    }
    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement //here we just destructured the event object for what we need 
    const progressPercent = (currentTime / duration) * 100 //we multiplied by 100 so it doesnt return a decimal
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX//wanna find the width on the x axis
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration

}

/*
Trial
*/
function loadImage(){
    playImg.setAttribute('src', 'images/home.jpg')
    playImg.classList.add('img-container')
    playImg.classList.add('play')
}

function  removeImage(){
    playImg.removeAttribute('src')
    playImg.classList.remove('img-container')

}

//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if (isPlaying){
        pauseSong()
        removeImage()
    }
    else{
        playSong()
        loadImage()
    }
})


//Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)