window.addEventListener('load', function(){
  var url = 'https://khennyboy.github.io/Hackathon'
const formData = new FormData()
  formData.append('link', encodeURIComponent(url))
  const shortUrl = async function(){
    const settings = {
      header: {
          'Accept': 'application/json'
      },
      method: 'POST',
      body: formData
    }
  try{
  const get = await fetch('https://riganapi.pythonanywhere.com/api/v1/url/shorten/', settings)
  const data = await get.json()
  console.log(data)
  console.log(data.data)
  }
  catch(error){
    console.error(error.message)
  }
}
shortUrl()


let nav_icon = document.querySelector('.icons')
let nav_content = document.querySelector('.nav_links')

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

})



