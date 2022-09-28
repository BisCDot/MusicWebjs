const player = $("#main");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const durationContainer = $("#duration-time");
const audioPlayerContainer = $(".play-Controls-wrap");
const seekSlider = $("#progress");
const currentTime = $("#current-time");
const durationTime = $("#duration-time");
const titleHot = $(".title-hot")
const singerTitle = $(".singer")
const playlist = $(".playlist");
const submitForm = $(".form-submit")
const songsOld = 
    [
      {
        name: "Pink Venom",
        singer: "BLACKPINK, BLACKPINK",
        path: "https://stream.nixcdn.com/YG_Audio2/PinkVenom-BLACKPINK-7802564.mp3?st=coRqdVFNyoPnv-A4B-5ZFQ&e=1662974173&t=1662887775607",
        image: "https://avatar-ex-swe.nixcdn.com/playlist/2022/09/07/9/0/3/7/1662516866218_500.jpg"
      },
      {
        name: "Chờ",
        singer: "KIM KUNNI",
        path: "https://stream.nixcdn.com/Sony_Audio101/Cho-KimKunni-7698700.mp3?st=0YMb6B-l8fbGsATEPTekeA&e=1663146823&t=1663060426369",
        image:
          "https://avatar-ex-swe.nixcdn.com/song/2022/08/02/8/0/4/5/1659423161666_500.jpg"
      },
      {
        name: "Chàng Trai Với Nụ Cười Tỏa Nắng",
        singer: "Miina, RIN9",
        path:
          "https://stream.nixcdn.com/NhacCuaTui2024/ChangTraiVoiNuCuoiToaNang-MiinaRIN9-7611314.mp3?st=SfrcLX49kW46HtcnRAuONg&e=1663147230&t=1663060834364",
        image: "https://avatar-ex-swe.nixcdn.com/song/2022/08/24/2/a/4/a/1661311132248_500.jpg"
      },
      {
        name: "Trái Tim Yêu Thương",
        singer: "Thúy Vân",
        path: "https://stream.nixcdn.com/NhacCuaTui2023/TraiTimYeuThuong-ThuyVanAHau-7583812.mp3?st=Z4aef2ShBNmAbAYrnoRkyA&e=1663147230&t=1663060905832",
        image:
          "https://avatar-ex-swe.nixcdn.com/song/2022/07/06/5/e/b/8/1657076544602_500.jpg"
      },
      {
        name: "Sao Em Không Rep?",
        singer: "Daduc, Dagiam",
        path: "https://stream.nixcdn.com/NhacCuaTui2023/SaoEmKhongRep-DaducDagiam-7583095.mp3?st=8Tt7chIbATlil-dENla_gA&e=1663147230&t=1663061017676",
        image:
          "https://avatar-ex-swe.nixcdn.com/song/2022/07/01/b/1/6/7/1656659095337_500.jpg"
      },
      {
        name: "Để Em Ôm Anh",
        singer: "Ngytoii",
        path:
          "https://stream.nixcdn.com/Sony_Audio99/DeEmOmAnh-ngytoii-7570794.mp3?st=JG3kWBAS6hUKueQOv-ILsw&e=1663147230&t=1663061442114",
        image:
          "https://avatar-ex-swe.nixcdn.com/song/2022/06/17/6/4/e/1/1655444497355_500.jpg"
      },
      {
        name: "Em Là Hoàng Hôn",
        singer: "Vang",
        path: "https://f9-stream.nixcdn.com/NhacCuaTui2028/EmLaHoangHon-Vang-7851208.mp3?st=7hKVVxYWWuCsFEUYo2xrkg&e=1663148026&t=1663061630124",
        image:
          "https://avatar-ex-swe.nixcdn.com/song/2022/09/07/b/d/f/6/1662554042275_500.jpg"
      }
    ]
    
$(document).ready(function(){
    var currentIndex = 0;
    let isPlaying = false;
    var myaudio = new Audio();
    
    
    function getDataListMusic(songs) {
      let endpoint = 'https://localhost:5001/api/Songs/GetSong'
      $.ajax({
          url: endpoint,
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
          },
            contentType: 'application/json',
            dataType: 'json',
            success: songs
      });
      
        
      
    }
    console.log(songsOld);

    function start(){
      
      getDataListMusic(function(songs){
        
        const render = () => {
          const htmls = songs.map((song,index) => {
            return `
                              <div class="song ${
                                index === currentIndex ? "active" : ""
                              }" data-index="${index}">
                                  <div class="thumb"
                                      style="background-image: url('${song.image}')">
                                  </div>
                                  <div class="body">
                                      <h3 class="title">${song.name}</h3>
                                      <p class="author">${song.singer}</p>
                                  </div>
                                  <div class="option">
                                      <i class="fas fa-ellipsis-h"></i>
                                  </div>
                              </div>
                          `;
            
          });
           playlist.html(htmls);
        }
        playlist.on('click',function (e) {
          const songNode = e.target.closest(".song:not(.active)");
    
          if (songNode || e.target.closest(".option")) {
            
            if (songNode) {
              currentIndex = Number(songNode.dataset.index);
              console.log(currentIndex);
              render();
              loadCurrentSong();
              myaudio.play();
              degree = 0;
              clearTimeout(timer);
            }
           
            if (e.target.closest(".option")) {
            }
          }
        }); 
        nextBtn.on('click',function(){
          currentIndex++;
          if (currentIndex >= songs.length) {
              currentIndex = 0;
          }
          render();
          loadCurrentSong();
          myaudio.play();
          degree = 0;
          clearTimeout(timer);
        });
        prevBtn.on('click',function(){
            currentIndex--;
            if (currentIndex < 0) {
              currentIndex = songs.length - 1;
            }
            console.log(currentIndex);
            render();
            loadCurrentSong();
            myaudio.play();
            degree = 0;
            clearTimeout(timer);
        });
        defineProperties(songs);
        render();
        loadCurrentSong();
      })
    }
    
    
    function defineProperties(songs) {
        Object.defineProperty(this, "currentSong",{
          get : function () {
            return songs[currentIndex];

          }
        })
    }
    function loadCurrentSong(){
      cdThumb.css('background-image','url('+ currentSong.image+')');
      titleHot.text(currentSong.name);
      singerTitle.text(currentSong.singer);
    
      myaudio.src = currentSong.path;
    }
    
      var degree = 0, timer;
      function rotate() {
        cdThumb.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        cdThumb.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});    
        timer = setTimeout(function() {
            ++degree; rotate();
        },35);
    }
    
    
    submitForm.on('click',function(){
      let endpoint = 'https://localhost:5001/api/Songs/PostSong';
      var songsPost = {
        Name: $('#song-name').val(),
        Singer : $('#singer').val(),
        Path : $('#path').val(),
        Image : $('#image').val(),
    }
      $.ajax({
        
        url: endpoint,
        type : "post",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(songsPost),
        
        success : function (msg) {
          if (msg) {
              alert("Somebody" + msg.Name + " was added in list !");
              location.reload(true);
          } else {
              alert("Cannot add to list !");
          }
      },
      })
    })
    playBtn.on('click',function(){
      if (myaudio.paused){
        myaudio.play();
      } 
      else{
        myaudio.pause();
      }
    });
     myaudio.onplay = function () {
      player.addClass("playing");
      rotate();
    };
    
    myaudio.onpause = function () {
      player.removeClass("playing");
      clearTimeout(timer);
    };
    myaudio.ontimeupdate = function () {
      if (myaudio.duration) {
        let nt = myaudio.currentTime * (100 / myaudio.duration);
		    progress.val(nt);
        let curmins = Math.floor(myaudio.currentTime / 60);
	      let cursecs = Math.floor(myaudio.currentTime - curmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
	      if(curmins < 10){ curmins = "0"+curmins; }
		    currentTime.html(curmins+":"+cursecs);
        let durmins = Math.floor(myaudio.duration / 60);
	      let dursecs = Math.floor(myaudio.duration - durmins * 60);
      
	      if(dursecs < 10){ dursecs = "0"+dursecs; }
	      if(durmins < 10){ durmins = "0"+durmins; }
      
        durationTime.html(durmins+":"+dursecs);
      }
    };
    progress.on('change',function (e) {
      const seekTime = (myaudio.duration / 100) * e.target.value;
      myaudio.currentTime = seekTime;
    });
    myaudio.onended = function() {
       nextBtn.click();
    }
    start();
    
});