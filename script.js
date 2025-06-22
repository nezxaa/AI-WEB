const apiKey = "4BIOPXYUIQYKI93MYJFM5M1W0LPRVVGHB0AF9GIYBE0";
  const model = "shapesinc/adel-nezaa";

  // Particles.js configuration
  tsParticles.load("tsparticles", {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.1, max: 0.3 } },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        bounce: true
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  });

  // DOM Content Loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initial loading sequence
    setTimeout(() => {
      document.getElementById('initial-loader').classList.add('animate__fadeOut');
      setTimeout(() => {
        document.getElementById('initial-loader').classList.add('hidden');
        document.getElementById('landing').classList.remove('hidden');
        document.getElementById('landing').classList.add('animate__fadeIn');
      }, 500);
    }, 2000);

    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });

    const messagesContainer = document.getElementById("messages");
    const chatLoading = document.getElementById("chat-loading");
    const chatLoadingProgress = document.getElementById("chat-loading-progress");
    const chatLoadingPercent = document.getElementById("chat-loading-percent");
    const chatLoadingMessage = document.getElementById("chat-loading-message");
    const chatSidebar = document.getElementById("chat-sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");
    const closeSidebar = document.getElementById("close-sidebar");

    // Toggle sidebar on mobile
    function toggleSidebar() {
      chatSidebar.classList.toggle("active");
    }

    sidebarToggle.addEventListener("click", toggleSidebar);
    mobileSidebarToggle.addEventListener("click", toggleSidebar);
    closeSidebar.addEventListener("click", toggleSidebar);

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && 
          !chatSidebar.contains(e.target) && 
          !sidebarToggle.contains(e.target) &&
          !mobileSidebarToggle.contains(e.target) &&
          !closeSidebar.contains(e.target) &&
          chatSidebar.classList.contains("active")) {
        chatSidebar.classList.remove("active");
      }
    });

    // Start Chat Button
    document.getElementById("start-btn").addEventListener("click", () => {
      document.getElementById('landing').classList.add('animate__fadeOut');
      setTimeout(() => {
        document.getElementById('landing').classList.add('hidden');
        chatLoading.classList.remove('hidden');
        chatLoading.classList.add('animate__fadeIn');
        
        let progress = 0;
        const loadingMessages = [
          "Initializing chat system...",
          "Loading Adel's personality...",
          "Preparing conversation memory...",
          "Finalizing connection...",
          "Ready to chat with Adel!"
        ];
        
        const loadingInterval = setInterval(() => {
          progress += Math.random() * 15 + 5;
          if (progress > 100) progress = 100;
          
          chatLoadingProgress.style.width = `${progress}%`;
          chatLoadingPercent.textContent = `${Math.floor(progress)}%`;
          
          if (progress < 25) chatLoadingMessage.textContent = loadingMessages[0];
          else if (progress < 50) chatLoadingMessage.textContent = loadingMessages[1];
          else if (progress < 75) chatLoadingMessage.textContent = loadingMessages[2];
          else if (progress < 90) chatLoadingMessage.textContent = loadingMessages[3];
          else chatLoadingMessage.textContent = loadingMessages[4];
          
          if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
              chatLoading.classList.add('animate__fadeOut');
              setTimeout(() => {
                chatLoading.classList.add("hidden");
                document.getElementById("chat-page").classList.remove("hidden");
                document.getElementById("chat-page").classList.add('animate__fadeIn');
                document.getElementById("landing-music-player").classList.add("hidden");
                messagesContainer.innerHTML = "";
                appendMessage("bot", "langsung chat aja ya!");
              }, 500);
            }, 500);
          }
        }, 200);
      }, 500);
    });

    // Back Button
    document.getElementById("back-btn").addEventListener("click", () => {
      document.getElementById("chat-page").classList.add('animate__fadeOut');
      setTimeout(() => {
        document.getElementById("chat-page").classList.add("hidden");
        document.getElementById("landing").classList.remove("hidden");
        document.getElementById("landing").classList.add('animate__fadeIn');
        document.getElementById("landing-music-player").classList.remove("hidden");
      }, 500);
    });

    // Send Message Functionality
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    // Clear Chat
    document.getElementById("clear-chat").addEventListener("click", () => {
      messagesContainer.innerHTML = "";
      appendMessage("bot", "Dah di bersihin, chat ulang aja.");
    });

    // Append Message to Chat with animation
    function appendMessage(role, text) {
      const msg = document.createElement("div");
      msg.className = `flex ${role === 'user' ? 'justify-end' : 'gap-2'} message-in`;
      
      if (role === 'user') {
        msg.innerHTML = `
          <div class="user-message px-4 py-2 max-w-xs md:max-w-md">
            ${text}
          </div>
        `;
      } else {
        msg.innerHTML = `
          <img src="https://i.pinimg.com/736x/b5/5b/92/b55b92882657fe2146d1e716a0877538.jpg" 
               class="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow">
          <div class="bot-message px-4 py-2 max-w-xs md:max-w-md">
            ${text}
          </div>
        `;
      }
      
      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send Message to AI
    function sendMessage() {
      const input = document.getElementById("user-input");
      const text = input.value.trim();
      if (!text) return;
      
      appendMessage("user", text);
      input.value = "";
      
      // Show typing indicator
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "flex gap-2 message-in";
      typingIndicator.innerHTML = `
        <img src="https://i.pinimg.com/736x/b5/5b/92/b55b92882657fe2146d1e716a0877538.jpg" 
             class="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow">
        <div class="bot-message px-4 py-2 max-w-xs md:max-w-md flex items-center gap-1">
          <div class="typing-dot w-2 h-2 bg-purple-400 rounded-full"></div>
          <div class="typing-dot w-2 h-2 bg-purple-400 rounded-full"></div>
          <div class="typing-dot w-2 h-2 bg-purple-400 rounded-full"></div>
        </div>
      `;
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Send to AI API
      fetch("https://api.shapes.inc/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: text }]
        })
      })
      .then(res => res.json())
      .then(data => {
        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);
        
        const reply = data.choices[0].message.content;
        appendMessage("bot", reply);
      })
      .catch(err => {
        console.error(err);
        messagesContainer.removeChild(typingIndicator);
        appendMessage("bot", "ha? jaringan mu eror kayaknya, coba nanti dah");
      });
    }
  });

  // Music Player Functionality for Chat Page
  document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const playButton = document.getElementById("play-button");
    const playIcon = document.getElementById("play-icon");
    const progressBar = document.getElementById("progress-bar");
    const progressContainer = document.getElementById("progress-container");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");
    const volumeButton = document.getElementById("volume-button");
    const volumeIcon = document.getElementById("volume-icon");
    const volumeControl = document.getElementById("volume-control");
    const volumeSlider = document.getElementById("volume-slider");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    // Initialize audio
    bgm.volume = 0.5;
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update progress bar
    function updateProgress() {
      const currentTime = bgm.currentTime;
      const duration = bgm.duration || 1;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeDisplay.textContent = formatTime(currentTime);
      
      if (bgm.duration && !isNaN(bgm.duration)) {
        durationDisplay.textContent = formatTime(bgm.duration);
      }
    }
    
    // Set progress when clicked on progress bar
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = bgm.duration;
      bgm.currentTime = (clickX / width) * duration;
    }
    
    // Toggle play/pause
    function togglePlay() {
      if (bgm.paused) {
        bgm.play()
          .then(() => {
            playIcon.classList.remove("fa-play");
            playIcon.classList.add("fa-pause");
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
          });
      } else {
        bgm.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
      }
    }
    
    // Toggle volume control
    function toggleVolumeControl(e) {
      e.stopPropagation();
      volumeControl.classList.toggle("hidden");
    }
    
    // Set volume
    function setVolume() {
      bgm.volume = this.value;
      if (this.value == 0) {
        volumeIcon.classList.remove("fa-volume-up", "fa-volume-down");
        volumeIcon.classList.add("fa-volume-mute");
      } else if (this.value < 0.5) {
        volumeIcon.classList.remove("fa-volume-up", "fa-volume-mute");
        volumeIcon.classList.add("fa-volume-down");
      } else {
        volumeIcon.classList.remove("fa-volume-down", "fa-volume-mute");
        volumeIcon.classList.add("fa-volume-up");
      }
    }
    
    // Event listeners
    playButton.addEventListener("click", togglePlay);
    progressContainer.addEventListener("click", setProgress);
    volumeButton.addEventListener("click", toggleVolumeControl);
    volumeSlider.addEventListener("input", setVolume);
    
    // Previous/next buttons
    prevButton.addEventListener("click", () => {
      bgm.currentTime = 0;
    });
    
    nextButton.addEventListener("click", () => {
      bgm.currentTime = bgm.duration - 0.1;
    });
    
    // Update time as audio plays
    bgm.addEventListener("timeupdate", updateProgress);
    bgm.addEventListener("ended", () => {
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    });
    
    // Load metadata when audio is ready
    bgm.addEventListener("loadedmetadata", () => {
      durationDisplay.textContent = formatTime(bgm.duration);
    });
    
    // Close volume control when clicking outside
    document.addEventListener("click", (e) => {
      if (!volumeButton.contains(e.target) && !volumeControl.contains(e.target)) {
        volumeControl.classList.add("hidden");
      }
    });
    
    // Initialize player state
    updateProgress();
  });

  // Music Player Functionality for Landing Page
  document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const playButton = document.getElementById("landing-play-button");
    const playIcon = document.getElementById("landing-play-icon");
    const progressBar = document.getElementById("landing-progress-bar");
    const progressContainer = document.getElementById("landing-progress-container");
    const currentTimeDisplay = document.getElementById("landing-current-time");
    const durationDisplay = document.getElementById("landing-duration");
    const volumeButton = document.getElementById("landing-volume-button");
    const volumeIcon = document.getElementById("landing-volume-icon");
    const volumeControl = document.getElementById("landing-volume-control");
    const volumeSlider = document.getElementById("landing-volume-slider");
    const prevButton = document.getElementById("landing-prev-button");
    const nextButton = document.getElementById("landing-next-button");
    const collapseButton = document.getElementById("collapse-button");
    const collapseIcon = document.getElementById("collapse-icon");
    const playerContent = document.getElementById("player-content");
    const musicPlayer = document.getElementById("landing-music-player");

    // Initialize audio
    bgm.volume = 0.5;
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update progress bar
    function updateProgress() {
      const currentTime = bgm.currentTime;
      const duration = bgm.duration || 1;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeDisplay.textContent = formatTime(currentTime);
      
      if (bgm.duration && !isNaN(bgm.duration)) {
        durationDisplay.textContent = formatTime(bgm.duration);
      }
    }
    
    // Set progress when clicked on progress bar
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = bgm.duration;
      bgm.currentTime = (clickX / width) * duration;
    }
    
    // Toggle play/pause
    function togglePlay() {
      if (bgm.paused) {
        bgm.play()
          .then(() => {
            playIcon.classList.remove("fa-play");
            playIcon.classList.add("fa-pause");
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
          });
      } else {
        bgm.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
      }
    }
    
    // Toggle volume control
    function toggleVolumeControl(e) {
      e.stopPropagation();
      volumeControl.classList.toggle("hidden");
    }
    
    // Set volume
    function setVolume() {
      bgm.volume = this.value;
      if (this.value == 0) {
        volumeIcon.classList.remove("fa-volume-up", "fa-volume-down");
        volumeIcon.classList.add("fa-volume-mute");
      } else if (this.value < 0.5) {
        volumeIcon.classList.remove("fa-volume-up", "fa-volume-mute");
        volumeIcon.classList.add("fa-volume-down");
      } else {
        volumeIcon.classList.remove("fa-volume-down", "fa-volume-mute");
        volumeIcon.classList.add("fa-volume-up");
      }
    }
    
    // Toggle player collapse
    function toggleCollapse() {
      playerContent.classList.toggle("hidden");
      musicPlayer.classList.toggle("h-16");
      collapseIcon.classList.toggle("fa-chevron-down");
      collapseIcon.classList.toggle("fa-chevron-up");
    }
    
    // Event listeners
    playButton.addEventListener("click", togglePlay);
    progressContainer.addEventListener("click", setProgress);
    volumeButton.addEventListener("click", toggleVolumeControl);
    volumeSlider.addEventListener("input", setVolume);
    collapseButton.addEventListener("click", toggleCollapse);
    
    // Previous/next buttons
    prevButton.addEventListener("click", () => {
      bgm.currentTime = 0;
    });
    
    nextButton.addEventListener("click", () => {
      bgm.currentTime = bgm.duration - 0.1;
    });
    
    // Update time as audio plays
    bgm.addEventListener("timeupdate", updateProgress);
    bgm.addEventListener("ended", () => {
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    });
    
    // Load metadata when audio is ready
    bgm.addEventListener("loadedmetadata", () => {
      durationDisplay.textContent = formatTime(bgm.duration);
    });
    
    // Close volume control when clicking outside
    document.addEventListener("click", (e) => {
      if (!volumeButton.contains(e.target) && !volumeControl.contains(e.target)) {
        volumeControl.classList.add("hidden");
      }
    });
    
    // Initialize player state
    updateProgress();
  });