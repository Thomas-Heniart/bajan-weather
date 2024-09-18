(() => {
  const startOfDay = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const video = document.createElement("video");
  video.width = 640;
  video.height = 480;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  const source = document.createElement("source");
  source.src =
    "/assets/videos/example.mp4?v=" + startOfDay(new Date()).getTime();
  video.appendChild(source);
  document.getElementById("subtitle").appendChild(video);
})();
