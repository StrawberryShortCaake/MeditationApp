
//TOGGLE MENU
const openMenuBtn = document.querySelector(".toggle-menu"),
seasonsMenu = document.querySelector(".seasons")
openMenuBtn.addEventListener("click", () => {
seasonsMenu.classList.toggle("open")
openMenuBtn.classList.toggle("rotate")
})

//INACTIVE FADEAWAY

const app = document.querySelector(".app")

const inactiveTime = 4000

let mouseLastMoveTime = new Date()

document.addEventListener("mousemove", () => {
    mouseLastMoveTime = new Date()
    app.classList.remove("inactive")
    document.body.style.cursor = "auto"
})

function deactivateApp(){
let now = new Date()
let deltaTime = now - mouseLastMoveTime;

if(deltaTime >= inactiveTime){
    app.classList.add("inactive")


    document.body.style.cursor = "none"
}

requestAnimationFrame(deactivateApp)
}

deactivateApp()


//SELECT PLAY AND PAUSE BUTTONS

const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
//SELECT AUDIO
const audio = document.querySelector(".audio audio")

play.addEventListener("click", () => {
audio.play()
update()

})

pause.addEventListener("click", () => {
    audio.pause()
})

//SELECT SEASONS AND SELECT THEEEE VIDEO

const seasons = document.querySelectorAll(".season"),
video = document.querySelector(".video video")

seasons.forEach((season) => {
    season.addEventListener("click", () => {
        video.src = season.getAttribute("video-src")
    })
})


//SELECT DURATION BUTTONS

const durations = document.querySelectorAll(".duration")

//DEFAULT AUDIO DURATION

let audioDuration = 120

//CHANGE AUDIO DURATION

durations.forEach( duration => {

    duration.addEventListener("click", () => {
        audioDuration = duration.getAttribute("audio-duration")
        update()
    })  
 
})


//SELECT REC AND REMAINING TIME

 const path = document.querySelector(".rect")
 const remainingTimeEl = document.querySelector(".audio-remaining-time")

 const pathLength = path.getTotalLength()

 //set the length

 path.style.strokeDasharray = pathLength

 function update(){

    if(audio.currentTime >= audioDuration) {
        audio.pause()
        audio.currentTime = 0
    }
    let portionPlayed = audio.currentTime / audioDuration

    let remainingTimeInSec = audioDuration - audio.currentTime
    renderRemainingTime(remainingTimeInSec)

    //stroke dashoffset is proportional to the portionplayed
   
    if(!audio.paused){
        path.style.strokeDashoffset = -portionPlayed * pathLength
        requestAnimationFrame(update)
    }
    
 }



 update()

 //render remaining time

 function renderRemainingTime(timeInSec){
    let min = Math.floor(timeInSec / 60)
    let sec = Math.floor(timeInSec % 60)

     min = min < 10 ? `0${min}` : min
     sec = sec < 10 ? `0${sec}` : sec

    remainingTimeEl.innerHTML = `${min}:${sec}`
 }
