/**
 * 
 *  SLIDESHOW
 * 
 */
const buttons = document.querySelectorAll("[data-carousel-button]")
let previous_photo = 0
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const carousel = button.closest("[data-carousel]")
    const slides = carousel.querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    // A previos image for the first image: last image
    if (newIndex < 0) newIndex = slides.children.length - 1
    // A nex image for the last image: first image
    if (newIndex >= slides.children.length) newIndex = 0
    // The actual number of image gets updated to show in the slideshow count
    carousel.dataset.actualImage = newIndex+1
    update_download_url(newIndex)
    if(previous_photo == 0 && newIndex == slides.children.length-1){
      slides.children[slides.children.length-1].style.transform = 'translateX(50vw)'
      slides.children[0].removeAttribute('style')
    }else if(previous_photo == slides.children.length-1 && newIndex == 0){
      slides.children[0].style.transform = 'translateX(50vw)'
      slides.children[slides.children.length-1].removeAttribute('style')
    }else if(previous_photo < newIndex){
      // Removes the translateX style of the previous photo
      slides.children[newIndex+1 < slides.children.length ? newIndex+1 : 0].style.transform = 'translateX(50vw)'
      // Add a translateX style to the next photo so it starts downloading
      slides.children[newIndex-1 >= 0 ? newIndex-1 : slides.children.length-1 ].removeAttribute('style')
    }else{
      // Removes the translateX style of the next photo
      slides.children[newIndex-1 >= 0 ? newIndex-1 : slides.children.length-1 ].style.transform = 'translateX(50vw)'
      // Add a translateX style to the previous photo so it starts downloading
      slides.children[newIndex+1 < slides.children.length ? newIndex+1 : 0].removeAttribute('style')
    }

    previous_photo = newIndex
    // The old slide gets removed from active and
    delete activeSlide.dataset.active
    // The new slide gets active
    slides.children[newIndex].dataset.active = true
  })
})


/**
 * 
 *  DOWNLOADS UPDATING
 * 
 */
const photos_base_name = 'Bety'
const photos = document.querySelectorAll('.slide')
const download_button = document.getElementById('download_image')
function update_download_url(index_photo){
  let path = download_button.getAttribute('href')
  path = path.substring(0,path.lastIndexOf('/'))
  download_button.setAttribute('href',`${path}/${photos_base_name}_${index_photo+1}.jpg`)
}
 