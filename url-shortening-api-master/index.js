window.addEventListener('load', function(){

let get_started = document.querySelectorAll('.get_started'), 
form_body = document.querySelector('#section--2'),
nav_icon = document.querySelector('.icons'),
 nav_content = document.querySelector('.nav_links'),
parent = document.querySelector('.shorted_links')

const allSections = document.querySelectorAll('.section')
let animate = document.querySelector('.animate')
const sentencesSplit = [
  ["Shorten your links and", "share them easily."],
  ["Make your URLs concise and", "user-friendly."],
  ["Link shortening made", "simple and effective."],
  ["Share long URLs with", "ease using our link shortener."],
  ["Enhance your online presence", "with shortened links."],
  ["Simplify your links for a", "cleaner online experience."],
  ["Optimize your social media", "sharing with shortened URLs."],
  ["Create short links for a", "more professional appearance."],
  ["Track and analyze the", "performance of your shortened links."],
  ["Empower your marketing efforts", "with our link shortening service."],
  ["Improve click-through rates with", "shortened, memorable links."],
  ["Customize and personalize your", "short URLs for branding."],
  ["Effortlessly manage and organize", "your shortened links."],
  ["Boost engagement by sharing", "concise links with your audience."]
];

let  wordsAndBreaks = animate.childNodes[0].nodeValue.trim();
let wordsAndBreaks2 = animate.childNodes[2].nodeValue.trim()
animate.innerHTML = ''; 
let cursorVisible = true;
let createdElement
function cursor(){
  createdElement = document.createElement('span')
  createdElement.id = 'cursor'
  createdElement.style.borderRightColor = '#ff000'; 
  animate.insertAdjacentElement('beforeend', createdElement)
  cursorVisible = !cursorVisible;
}
 let len = wordsAndBreaks.length
 let start =0
function opac() {
  if(start<len ){
    animate.removeChild(createdElement)
    animate.innerHTML += wordsAndBreaks[start]
    cursor()
    setTimeout(()=>{
      createdElement.style.borderRightColor =  'transparent' ; 
    }, 150)
    start +=1
  }
  if(start == wordsAndBreaks.length){
    let x  = document.createElement('br')
    animate.insertAdjacentElement('beforeend', x)
    console.log(animate)
    animate.innerHTML += ' '
    clearInterval(write)
    start = 0
    len = wordsAndBreaks2.length
    write2 = setInterval(opac2, 300)
  }
}

function opac2(){
  if(start<len ){
    let child = animate.querySelector("#cursor")
    child &&  animate.removeChild(child)
    animate.innerHTML += wordsAndBreaks2[start]
    cursor()
    setTimeout(()=>{
      createdElement.style.borderRightColor =  'transparent' ; 
    }, 150)
    start +=1
  }
  if(start == wordsAndBreaks2.length){
    animate.removeChild(createdElement)
    console.log(animate)
    clearInterval(write2)
  }
}

write = setInterval(opac, 300)
cursor()

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && nav_icon.classList.contains('change')) {
    nav_icon.classList.remove('change')
    nav_content.classList.remove('show')
  }
});

  nav_icon.addEventListener('click', function(e){
  nav_icon.classList.toggle('change')
  e.stopPropagation()
  if(nav_icon.classList.contains('change')){
    nav_content.classList.add('show')
  }
else{
  nav_content.classList.remove('show')
}
})
document.addEventListener('click', function(e){
  if(nav_icon.classList.contains('change') && !document.querySelector('.nav_links').contains(e.target) && !document.querySelector('.icons').contains(e.target)){
    nav_icon.classList.remove('change')
    nav_content.classList.remove('show')
    }
})


window.addEventListener('resize', function(){
if(nav_icon.classList.contains('change')){
  nav_content.classList.remove('show')
  nav_icon.classList.remove('change')
}
})
// animation functions
const revealSection = function(entries, sectionObserver){
  const [entry] = entries
  if(!entry.isIntersecting){
    return 
  }
  entry.target.classList.remove('section--hidden')
  sectionObserver.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
root:null,
threshold: 0.25
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

var form_shortner = document.querySelector('.link_shortener')
let input_tag = document.querySelector('.input_tag')
let error_message = document.querySelector('.input_message')
let submit_btn = document.querySelector('.submit')
let message

form_shortner.addEventListener('submit', function(e){
  e.preventDefault()
  if(input_tag.value.trim()==''){
    message = `<div class="message">***Please enter a valid link</div>`
    if(document.querySelector('.message')){
      document.querySelector('.message').remove()
    }
    error_message.insertAdjacentHTML('beforeend', message)
  }
  else{
    let x = input_tag.value.indexOf('https://')
    if(x==-1){
      input_tag.value = 'https://' + input_tag.value
    }
    console.log(input_tag.value)
    shortUrl()
  }
})

const shortUrl = async function(){
  const formData = new FormData()
 
  formData.append('link', input_tag.value)
    const settings = {
      header: {
          'Accept': 'application/json'
      },
      method: 'POST',
      body: formData
    }
  try{
    submit_btn.innerHTML = 'Please wait...'
  const get = await fetch('https://riganapi.pythonanywhere.com/api/v1/url/shorten/', settings)
  const response = await get.json()
  // console.log(response)
  submit_btn.innerHTML = 'Shorten it...'

  if(localStorage.links){
    let updated_store = new Map(JSON.parse(localStorage.links)) // local storage stores the array 
    updated_store.set(`${input_tag.value}`, `${response.data}`)
    let store = [...updated_store]
    localStorage.links = JSON.stringify(store)
    parent.innerHTML=''
    name()
    // console.log(store)
  }
  else{
    var all_data = new Map();
  all_data
      .set(`${input_tag.value}`, `${response.data}`)
  let store = [...all_data]
  localStorage.links = JSON.stringify(store)
  name()
  }

  }

  catch(error){
    console.log(error)
    submit_btn.innerHTML = 'Shorten it...'
   if(error.message=='Failed to fetch'){
    message =  `<div class="message">***Please check your internet connection, ${error.message}</div>`
   }
   else{
    message =  `<div class="message">*** ${error.message}</div>`
   }
    if(document.querySelector('.message')){
      document.querySelector('.message').remove()
    }
    error_message.insertAdjacentHTML('beforeend', message)
  }
  finally{
    input_tag.value =''
  }
 
}

// localStorage.clear()

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete')) {
    let input = event.target.closest('.each_link').childNodes[1].value;
    console.log(input)
    var all_data = new Map(JSON.parse(localStorage.links));
    all_data.delete(input);
    all_data = [...all_data];
    localStorage.links = JSON.stringify(all_data);
    event.target.closest('.each_link').remove();
  }
});


document.addEventListener('click', function (event) {
  if (event.target.classList.contains('copy')) {
    var value = event.target.closest('.each_link').childNodes[3].id;
    var valueElement = document.querySelector(`#${value}`);
    valueElement.select();
    document.execCommand('copy');
    event.target.innerHTML = 'Copied!';
    setTimeout(() => {
      event.target.innerHTML = 'Copy';
    }, 1000);
  }
});

function name(){
  if(localStorage.links){
   var store = JSON.parse(localStorage.links)
  store.forEach((each, index)=>{
  let x = `<div class="each_link"> 
  <input class="input_link" id='input_link_${index+1}' value= ${each[0]} readonly/>
  <input class="shorted_link" id='shorted_link_${index+1}' value=${each[1]} readonly/>
  <div class="buttons" id="button${index+1}">
    <button class="copy">Copy</button>
    <button class="delete">Delete!</button>
  </div>
</div>`
parent.insertAdjacentHTML('afterbegin', x)
}) 
  }
}
name()
 
// scroll into view funvtion
get_started.forEach((each)=>{
  each.addEventListener('click', function(){
    form_body.scrollIntoView({
      behavior: "smooth"
    })
  })
})

})

