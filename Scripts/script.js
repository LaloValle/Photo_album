/**
 *
 *  CHANGE OF PAGES ANIMATION(COVER AND SLIDESHOW)
 * 
 */
const change_page_elements = document.querySelectorAll('.change_page')
const title_page_hidder = document.getElementById('title_page_hidder')
const page_fold = document.getElementById('page_fold')
let status_change_page = false
function animation_page_change(){
    // When closhing the album to show the cover
    if(status_change_page){
        title_page_hidder.style.cssText = "width: 50px; height: 50px;"
        setTimeout(()=>{page_fold.style.cssText = "border-bottom: 50px solid var(--onyx) !important; border-left: 50px solid var(--ivory_shade) !important;"},500)
    // Opening the album to show the slideshow
    }else{
        title_page_hidder.style.cssText = "width: 200vw; height: 200vh;"
        page_fold.style.cssText = "border-bottom: max(100vw,100vh) solid var(--onyx) !important; border-left: max(100vw,100vh) solid var(--ivory_shade) !important;"
    }
    status_change_page = !status_change_page
}
function change_pages(change_delay){
    setTimeout( () => {
        const pages = document.getElementsByClassName("page")
        for(let i=0; i<pages.length; i++){
            if(pages[i].dataset.front) delete pages[i].dataset.front
            else pages[i].dataset.front = true
        }
    },
    change_delay)
}
change_page_elements.forEach(element => {
    element.addEventListener('click', ()=>{
        if(element.id != 'start_button'){
            focus_execution_button(0)
            execution_status = 0
        }
        animation_page_change()
        change_pages(status_change_page ? 900 : 0)
    })
});

/**
 * 
 *  CONTROLS AND EXECUTION OF THE SLIDES
 * 
 */
const delay_input = document.getElementById('images_delay')
delay_input.addEventListener('input', (e)=>{
    delay_input.value = parseInt(delay_input.value == '' ? 0: delay_input.value)
})

/**
 * Execution status
 *  0 - Paused
 *  1 - Playing
 *  2 - Restarting
 */
let execution_status = 0; let time_elapsed = 0
const carousel = document.querySelector("[data-carousel]")
const next_slide_button = document.querySelectorAll("[data-carousel-button]")[1]
const execution_buttons = document.getElementsByClassName('execution_buttons')
function next_slide(){
    next_slide_button.click()
}
function focus_execution_button(new_status){
    // Changes the actual execution button to the green style and removes it from the former
    execution_buttons[execution_status].classList.remove('button_green')
    execution_buttons[new_status].classList.toggle('button_green')
}
function play(delay_play){
    focus_execution_button(1)
    window.setTimeout(()=>{
        if(time_elapsed < 2*(parseInt(delay_input.value))){
            let waiting_next_slide = window.setInterval(()=>{
                // If it's still playing
                if(execution_status%2 == 1){
                    time_elapsed += 1
                    // When the time has been reached or exceeded
                    if(time_elapsed >= 2*(parseInt(delay_input.value))){
                        next_slide()
                        time_elapsed = 0
                    }
                }else window.clearInterval(waiting_next_slide)
            }, 500)// Steps of 500ms
        } else next_slide()
    }, delay_play)
    execution_status = 1

}
const slides = carousel.querySelectorAll(".slide")
const slideshow_play = document.querySelectorAll('.slideshow_play')
const slideshow_pause = document.querySelector('.slideshow_pause')
const slideshow_restart = document.querySelector('.slideshow_restart')
slideshow_play.forEach(element => {
    element.addEventListener('click', () => { play(element.id == 'start_button' ? 1000: 0)})
});
slideshow_pause.addEventListener('click', ()=>{ 
    focus_execution_button(0)
    execution_status = 0
})
slideshow_restart.addEventListener('click', ()=>{
    if(carousel.dataset.actualImage != '1'){
        // Removes the data-active from the actual slide
        delete slides[parseInt(carousel.dataset.actualImage)-1].dataset.active
        // Adds the data-active attribute in the first slide
        carousel.dataset.actualImage = 1
        slides[0].dataset.active = true
    }
})


/**
 * 
 *  COPY SHARE LINK
 * 
 */
const link_buttons = document.querySelectorAll('.share_button')
const notification = document.querySelector('.notification.copied_clipboard')
link_buttons.forEach(element => {
    if(navigator.clipboard){
        element.addEventListener('click',() => {
            navigator.clipboard.writeText(element.dataset.link)
            notification.dataset.show = true
            setTimeout(()=>{delete notification.dataset.show},5000)
        })
    }else element.remove()
});