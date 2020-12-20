async function gif(args) {
    let keywords = 'happy'
    if (args.length > 1) {
        keywords = args.slice(1, args.length).join(' ')
        console.log(keywords)
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&ContentFilter=off`
    let response = await fetch(url)
    let json = await response.json()
    const index = Math.floor(Math.random() * json.results.length)
    msg.channel.send(json.results[index].url)
    console.log("gif sent")
}

module.exports.gif = gif;