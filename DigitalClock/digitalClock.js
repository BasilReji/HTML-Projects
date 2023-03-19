const hour = document.getElementById("hour");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");
const ampmFinal = document.getElementById("ampm");

function updateClock() {
  let hr = new Date().getHours();
  let mnt = new Date().getMinutes();
  let sec = new Date().getSeconds();
  let ampm = "AM";

  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }

  hr = hr < 10 ? "0" + hr : hr;
  mnt = mnt < 10 ? "0" + mnt : mnt;
  sec = sec < 10 ? "0" + sec : sec;

  hour.innerText = hr;
  minute.innerText = mnt;
  second.innerText = sec;
  ampmFinal.innerText = ampm;

  setTimeout(() => {
    updateClock();
  }, 1000);
}

updateClock();
