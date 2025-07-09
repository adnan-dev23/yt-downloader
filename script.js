
async function fetchVideo() {
  const url = document.getElementById('yt-url').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading...';
  try {
    const res = await fetch('/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (data.error) {
      resultDiv.innerHTML = 'Error: ' + data.error;
      return;
    }
    let html = `<h3>${data.title}</h3><ul>`;
    data.streams.forEach(s => {
      html += `<li><a href="${s.url}" target="_blank">${s.res}</a></li>`;
    });
    if (data.audio) {
      html += `<li><a href="${data.audio}" target="_blank">Audio (MP3)</a></li>`;
    }
    html += '</ul>';
    resultDiv.innerHTML = html;
  } catch (e) {
    resultDiv.innerHTML = 'Something went wrong';
  }
}
