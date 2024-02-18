window.addEventListener('load', function(){

let get_started = document.querySelectorAll('.get_started'), 
form_body = document.querySelector('#section--2'),
nav_icon = document.querySelector('.icons'),
 nav_content = document.querySelector('.nav_links'),
parent = document.querySelector('.shorted_links')

const allSections = document.querySelectorAll('.section')


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
var store;
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
    shortUrl()
    submit_btn.innerHTML = 'Please wait...'
  }
})

const shortUrl = async function(){
  const formData = new FormData()
  formData.append('link', encodeURIComponent(input_tag.value))
    const settings = {
      header: {
          'Accept': 'application/json'
      },
      method: 'POST',
      body: formData
    }
  try{
  const get = await fetch('https://riganapi.pythonanywhere.com/api/v1/url/shorten/', settings)
  const response = await get.json()
  // console.log(response)
  submit_btn.innerHTML = 'Shorten it...'

  if(localStorage.links){
    let updated_store = new Map(JSON.parse(localStorage.links))
    updated_store.set(`${input_tag.value}`, `${response.data}`)
    store = [...updated_store]
    localStorage.links = JSON.stringify(store)
    parent.innerHTML=''
    name()
    location.reload()
    form_body.scrollIntoView({
      behavior: "smooth"
    })
  }
  else{
    var all_data = new Map();
  all_data
      .set(`${input_tag.value}`, `${response.data}`)
  store = [...all_data]
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
  localStorage.links = JSON.stringify(store)
  location.reload()
    form_body.scrollIntoView({
      behavior: "smooth"
    })

  }

  }

  catch(error){
    console.log(error)
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
}


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
 
let delete_btn = document.querySelectorAll('.delete')
let copy_btn = document.querySelectorAll('.copy')

//deleting function
delete_btn.forEach(each=>{
  each.onclick = function(){
   let value = each.closest('.each_link').childNodes[1].value;
   var all_data = new Map(JSON.parse(localStorage.links))
   all_data.delete(value)
   all_data = [...all_data]
   localStorage.links = JSON.stringify(all_data)
    each.closest('.each_link').remove()
  }
})


//copy function
copy_btn.forEach(each=>{
  each.onclick = function(){
   var value = each.closest('.each_link').childNodes[3].id;
   var value = document.querySelector(`#${value}`)
   value.select();
   document.execCommand('copy')
   each.innerHTML = 'Copied!'
   setTimeout(()=>{
    each.innerHTML= 'Copy'
   }, 1000)
  }
})

// scroll into view funvtion
get_started.forEach((each)=>{
  each.addEventListener('click', function(){
    form_body.scrollIntoView({
      behavior: "smooth"
    })
  })
})



})



