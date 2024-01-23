window.addEventListener('DOMContentLoaded', function(){

let parent = document.querySelector('.wrapper')
let searchContainer = document.querySelector('.search')
let searchContainerValue;


for(var i=0;  i < datas.length; i++){
    let m = datas[i], x;
 x = `<div class="each_role" id='each_role${m.id}'>
<div class="left">
<div class="company-logo">
  <img src='${m.logo}' alt='${m.company}_logo' >
</div>
<div class="info_1">
   <span class="company">${m.company}</span>

</div>
<div class="info_2" >
  <h3 class="position">${m.position}</h3>
</div>
<div class="info_3">
  <span class="postedAt">${m.postedAt}</span>
  <span class="contract">${m.contract}</span>
  <span class="location">${m.location}</span>
</div>
</div>
<div class="right">
<span class="language first" data-language="${m.role.toLowerCase()}">${m.role}</span>
<span class="language" data-language="${m.level.toLowerCase()}">${m.level}</span>
</div>
</div>`

parent.insertAdjacentHTML('beforeend', x)

let right = document.querySelector(`#each_role${m.id} .right`)
let info_1 = document.querySelector(`#each_role${m.id} .left .info_1`)

m.languages.forEach(each=>{
  let tag = `<span class="language" data-language="${each.toLowerCase()}">${each}</span>`
  right.insertAdjacentHTML('beforeend', tag)
})

m.tools.forEach(each=>{
    let tag = `<span class="language" data-language="${each.toLowerCase()}">${each}</span>`
    right.insertAdjacentHTML('beforeend', tag)
  })

  m.new && info_1.insertAdjacentHTML('beforeend', `<span class="new">NEW!</span>` )
  m.featured && info_1.insertAdjacentHTML('beforeend', `<span class="featured">FEATURED</span>` )

}

let all_roles = document.querySelectorAll('.language')
let child = document.querySelectorAll('.each_role')
let rights = document.querySelectorAll('.right')
// let roles = []


// all_roles.forEach(each=> roles.push((each.dataset['language'])))
// roles = [... new Set(roles)]

searchContainer.addEventListener('keyup', function(e){
  e.target.value = e.target.value.toLowerCase()
  
  if(e.target.value!=''){
  child.forEach(each=>each.style.display='none')
  searchContainerValue = searchContainer.value.split(' ').filter(each=>{
     if(each!=''){
      return each;
    }
  });
  console.log(searchContainerValue)

  //function to check if all input exist in a div with class right as children
  function handleChildrenWithClasses(element, classList){
    for(const className of classList){
        if(!element.querySelector(`.language[data-language="${className}"]`)){
            return false
        }
    }
    return true
}

for (const right of rights){
    if(handleChildrenWithClasses(right, searchContainerValue)){
        right.closest('.each_role').style.display= 'block'
    }
    else{
      console.error('no result for this search')
    }
}
  
  // searchContainerValue.forEach(each=>{
  //   if(roles.includes(each)){
  //   //  console.log('hello')
  //    let matchingElements = document.querySelectorAll(`.language[data-language="${each}"]`);
  //   //  console.log(matchingElements)
  //    matchingElements.forEach(each_tag=>{
  //    each_tag.closest('.each_role').style.display='block'
  //    })
  //  }
  //  else{
  //    console.error('welcome')
  //  } 
  //  })
  }

  else{
    child.forEach(each=>each.style.display='block')
  }

})

});

