

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

