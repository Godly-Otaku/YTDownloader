const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 5000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server works at port http://localhost:${PORT}`)
})

app.get('/downloadmp3', async (req, res) => {
    var title;
    let url = req.url.split('url=')[1];
    if (!ytdl.validateURL(url)) return res.status(400)
    await ytdl.getInfo(url, (err, info) => {
        if (err) throw err;
        title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });
    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
    ytdl(url, {
        format: 'mp3',
        filter: 'audioonly'
    }).pipe(res.sendStatus(200));
})

app.get('/downloadmp4', async (req, res) => {
    var title;
    let url = req.url.split('url=')[1];
    if (!ytdl.validateURL(url)) return res.status(400)
    await ytdl.getInfo(url, (err, info) => {
        if (err) throw err;
        title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });
    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    ytdl(url, {
        format: 'mp4'
    }).pipe(res.sendStatus(200))
})
