document.addEventListener("DOMContentLoaded", function () {
  // ========= MODAL LOGIC =========
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.querySelector(".close-btn");
  const bgVideo = document.getElementById("bgVideo");
  const hoverImage = document.getElementById("hoverImage");

  if (modal && closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Hover behavior for modal
    modal.addEventListener("mouseenter", () => {
      if (bgVideo) bgVideo.pause();
      if (hoverImage) hoverImage.style.display = "block";
    });

    modal.addEventListener("mouseleave", () => {
      if (bgVideo) bgVideo.play();
      if (hoverImage) hoverImage.style.display = "none";
    });
  }

  // ========= PANEL VIDEO LOGIC =========
  const panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => {
    const video = panel.querySelector("video");

    if (!video) return;

    // Initial state: muted & paused
    video.pause();
    video.muted = true;

    // Play with sound when clicked
    panel.addEventListener("click", () => {
      // Stop other videos
      document.querySelectorAll("video").forEach((vid) => {
        if (vid !== video) {
          vid.pause();
          vid.muted = true;
          vid.currentTime = 0;
        }
      });

      // Play current video with sound
      video.muted = false;
      video.play();
    });

    // Pause/mute when clicking outside the panel
    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target)) {
        video.pause();
        video.muted = true;
      }
    });

    // Optional: Stop at end
    video.addEventListener("ended", () => {
      video.pause();
      video.currentTime = video.duration;
    });
  });

  // ========= PAGE VISIBILITY CONTROL =========
  document.addEventListener("visibilitychange", () => {
    document.querySelectorAll("video").forEach((video) => {
      if (document.hidden) {
        video.muted = true;
        video.pause();
      } else {
        if (!video.ended) {
          video.play();
        }
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // your panel click logic...

  // 🔽 ADD THIS BELOW 🔽
  let activeVideo = null;

  document.querySelectorAll(".panel").forEach((panel) => {
    const video = panel.querySelector("video");

    if (!video) return;

    panel.addEventListener("click", () => {
      document.querySelectorAll("video").forEach((vid) => {
        if (vid !== video) {
          vid.pause();
          vid.muted = true;
          vid.currentTime = 0;
        }
      });

      video.muted = false;
      video.play();
      activeVideo = video;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && activeVideo) {
      e.preventDefault();
      if (activeVideo.paused) {
        activeVideo.play();
      } else {
        activeVideo.pause();
      }
    }
  });

 
});
