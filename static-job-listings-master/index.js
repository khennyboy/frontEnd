window.addEventListener('DOMContentLoaded', function(){

let parent = document.querySelector('.wrapper')
let searchContainer = document.querySelector('.search')


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
<span class="language" data-language="${m.role.toLowerCase()}">${m.role}</span>
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
let all_search = []

all_roles.forEach(each=> all_search.push((each.dataset['language'])))
all_search = [... new Set(all_search)]
console.log(all_search)

// keyup event listener start here
searchContainer.addEventListener('keyup', function(e){
  let searchContainerValue;
  e.target.value = e.target.value.toLowerCase()
  
  if(e.target.value!=''){
  child.forEach(each=>each.style.display='none')
  searchContainerValue = searchContainer.value.split(' ').filter(each=>{
     if(each!=''){
      return each;
    }
  });
  handleChildrenWithClasses(all_search, searchContainerValue)
}
// else statement if the user has not entered any input
  else{
    child.forEach(each=>each.style.display='block')
  }
// keyUp functions ends here
})

function handleChildrenWithClasses(all_search, searchContainerValue){
  var store = []
  for(const each_input of searchContainerValue){
    for(const each_search of all_search){
      let pos = each_search.indexOf(each_input)
      if(each_input==each_search){
         store.push(each_search)
         console.log(store)
      }
     if(pos!=-1){
     let rights = document.querySelectorAll('.right')
     for(each of rights){
        if(each.querySelector(`.language[data-language=${each_search}]`)){
          each.closest('.each_role').style.display='none'
          //check if the latest result also  has the previous search input
          if(store.length!=0 ){
            store.forEach(each_tag=>{
               if(each.querySelector(`.language[data-language=${each_tag}]`)){
                  each.closest('.each_role').style.display='block'
                  console.log('inner each')
                  console.log(each)
               }
               else{
                each.closest('.each_role').style.display='none'
               }
            })
          }
           if(store.length==0){
            each.closest('.each_role').style.display='block'
          }
        }
     }
     }
  }
}
// end of the handleChildrenWithClasses function here
}

});


