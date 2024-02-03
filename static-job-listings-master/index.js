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
<div class='left_left'>
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


let child = document.querySelectorAll('.each_role')

// keyup event listener start here
searchContainer.addEventListener('input', function(e){
  e.target.value = e.target.value.toLowerCase()
  let searchContainerValue;

  if(e.target.value!=''){
  child.forEach(each=>each.style.display='none')
  searchContainerValue = searchContainer.value.split(' ').filter(each=>{
     if(each!=''){
      return each;
    }
  });
  
  handleChildrenWithClasses(searchContainerValue)
}
  else{
    child.forEach(each=>each.style.display='flex')
    // var allHighlight = document.querySelectorAll(`.language[data-language]`)
    // allHighlight.forEach(each=>{
    //   let m = each.dataset.language
    //   each.innerHTML = m[0].toUpperCase()+ m.slice(1)
    // })
  }
// keyUp functions ends here
})

function handleChildrenWithClasses(searchContainerValue){
     let rights = document.querySelectorAll('.right')
     for(var i =0; i<rights.length; i++){
      let children = rights[i].children
      let confirm =[];
      for(var j =0; j<children.length; j++){
        confirm.push(children[j].getAttribute('data-language'))
     }

const allIndexesExist = searchContainerValue.every((item)=>{
  return (
   confirm.some((subItem)=>{
    if(subItem.indexOf(item)!==-1){
      var allHighlight = document.querySelector(`#each_role${i+1} .right .language[data-language=${subItem}]`)
        var index = subItem.indexOf(item)
        var originalText = subItem[0].toUpperCase()+subItem.slice(1) ;
        const highlightedText = `${originalText.substring(0, index)}<span class="highlight">${originalText.substr(index, item.length)}</span>${originalText.substring(index + item.length)}`;
        allHighlight.innerHTML = highlightedText;
      // var highlight =  document.querySelectorAll(`.language[data-language=${subItem}]`)
      // highlight.forEach(each=>{
      //   var index = subItem.indexOf(item)
      //   var originalText = subItem[0].toUpperCase()+subItem.slice(1) ;
      //   const highlightedText = `${originalText.substring(0, index)}<span class="highlight">${originalText.substr(index, item.length)}</span>${originalText.substring(index + item.length)}`;
      //   each.innerHTML = highlightedText;
      // })
    }
 
    return (subItem.indexOf(item) !==-1)
  })
  )
})

if (allIndexesExist) {
  rights[i].closest('.each_role').style.display='flex'
}
  }
}

});








