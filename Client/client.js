const Btn = document.getElementById('butt');
const select = document.querySelector('.opt');
let loadingElement = document.querySelector('.loading');
let URLinput = document.querySelector('.URL-input');
const serverURL = "http://localhost:5000";

loadingElement.style.display = 'none';
Btn.addEventListener('click', () => {
    if (!URLinput.value) alert('Enter a Youtube link');
    else {
        let link = URLinput.value.split('&')[0];
        loadingElement.style.display = '';
        URLinput.style.display = 'none';
        Btn.style.display = 'none';
        select.style.display = 'none';
        if (select.value == "mp3") downloadmp3(link);
        else if (select.value == "mp4") downloadmp4(link);
    }
});
async function downloadmp3(query) {
    const res = await fetch(`${serverURL}/downloadmp3?url=${query}`)
    if (res.status == 200) {
        var a = document.createElement('a');
        a.target = '_blank';
        a.href = `${serverURL}/downloadmp3?url=${query}`;
        a.setAttribute('download', '');
        a.click();
        loadingElement.style.display = 'none';
        URLinput.value = '';
        URLinput.style.display = '';
        Btn.style.display = '';
        select.style.display = '';
        console.log("MP3 Recieved");
    } else if (res.status == 400) {
        alert("Invalid URL");
    }
}
async function downloadmp4(query) {
    const res = await fetch(`${serverURL}/downloadmp4?url=${query}`)
    if (res.status == 200) {
        var a = document.createElement('a');
        a.target = '_blank';
        a.href = `${serverURL}/downloadmp4?url=${query}`;
        a.setAttribute('download', '');
        a.click();
        loadingElement.style.display = 'none';
        URLinput.style.display = '';
        Btn.style.display = '';
        select.style.display = '';
    } else if (res.status == 400) {
        alert("Invalid URL");
    }
}