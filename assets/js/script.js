
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


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

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  songs: [
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
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
   
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
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
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;


    
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

  
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

   
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    

    
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      
      cdThumbAnimate.play();
    };

    
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    
    audio.ontimeupdate = function () {
      if (audio.duration) {
        let nt = audio.currentTime * (100 / audio.duration);
		    progress.value = nt;
        let curmins = Math.floor(audio.currentTime / 60);
	      let cursecs = Math.floor(audio.currentTime - curmins * 60);
       
        if(cursecs < 10){ cursecs = "0"+cursecs; }
	      if(curmins < 10){ curmins = "0"+curmins; }
		    currentTime.innerHTML = curmins+":"+cursecs;
        let durmins = Math.floor(audio.duration / 60);
	      let dursecs = Math.floor(audio.duration - durmins * 60);
      
	      if(dursecs < 10){ dursecs = "0"+dursecs; }
	      if(durmins < 10){ durmins = "0"+durmins; }
      
        durationTime.innerHTML = durmins+":"+dursecs; 
      }
    };
    
    

   
    progress.onchange = function (e) {
      let seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

   
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

       
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    titleHot.textContent = this.currentSong.name;
    singerTitle.textContent = this.currentSong.singer;
    
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    this.loadConfig();
   
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    
    this.handleEvents();


    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    
    this.loadCurrentSong();

    // Render playlist
    this.render();

    

  }
};

app.start();
