function download() {
  const url = document.getElementById("urlInput").value;

  fetch("/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("result").innerText = "Error: " + data.error;
      } else {
        document.getElementById("result").innerHTML = `
          <p><a href="${data.video}" target="_blank">Download Video</a></p>
          <p><a href="${data.audio}" target="_blank">Download MP3</a></p>
        `;
      }
    });
}
