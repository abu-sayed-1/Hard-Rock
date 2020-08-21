
   const input = document.getElementById('input');

   document.getElementById('searchBtn').addEventListener('click',function(){
   fetch('https://api.lyrics.ovh/suggest/'+input.value)
   .then(res => res.json())
   .then(data =>{

     console.log(data);
     const titleText = document.getElementById('titleText');   
     allData = data;
     titleText.innerHTML='';
// console.log(data);
 for (let i = 0; i < data.data.length; i++)  {
     const title = data.data[i].title;
     const artistName = data.data[i].artist.name;
     
     document.getElementById('totalValue')
     totalValue.innerHTML +=`
                   <div class="container">      
                    <p class ="blog" id="gitTitle"></p>
                    <p class ="blog" id ="gitArtist"></p>
                    <par class ="blog" id ="lyricsText"></par>
                    </div>
                    `
    titleText.innerHTML += `
             <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${title}</h3>
                    <p class="author lead">Album by <span>${artistName}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onClick ="addTitle('${artistName}','${title}')">Get Lyrics</button>
             </div>
    `
      if (i == 9) {
         break;
     }

   }
   
  })

})

function addTitle(artistName,title){
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
    .then(res => res.json())
    .then(data=>{
     displayUserLyrics(data,artistName,title)
    })
}

 function displayUserLyrics(data,artistName,title){
     document.getElementById('gitTitle').innerHTML=`${title}`;
     document.getElementById('gitArtist').innerHTML=`${artistName}`;
 if (data.lyrics) {
     document.getElementById('lyricsText').innerHTML =`${data.lyrics}`
 }else if (data.lyrics == undefined) {
     document.getElementById('lyricsText').innerHTML = 'lyrics not found'
   }

 } 
