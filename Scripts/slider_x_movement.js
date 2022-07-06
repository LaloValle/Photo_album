const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const carousel = button.closest("[data-carousel]")
    const slides = carousel.querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    // A previos image for the first image: last image
    if (newIndex < 0){
        newIndex = slides.children.length - 1
        for(var i=0;i<slides.children.length;i++){ 
            slides.children[i].dataset.left = true
            delete slides.children[i].dataset.right
        }
    }
    // A nex image for the last image: first image
    if (newIndex >= slides.children.length){
        newIndex = 0
        for(var i=0;i<slides.children.length;i++){ 
            slides.children[i].dataset.right = true
            delete slides.children[i].dataset.left
        }
    }
    // The actual number of image gets updated to show in the slideshow count
    carousel.dataset.actualImage = newIndex+1 

    // The old slide gets removed from active and
    delete activeSlide.dataset.active
    if(offset == 1) activeSlide.dataset.left = true
    else activeSlide.dataset.right = true
    // The new slide gets active
    slides.children[newIndex].dataset.active = true
    if(offset == 1) delete slides.children[newIndex].dataset.right
    else delete slides.children[newIndex].dataset.left
  })
})