const startCapture = async (displayMediaOptions) => {    
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    console.log('got stream')
    return mediaStream
    
}
 
var analyser = null
var dataArray = null
 
const getAudio = async () => {
    const audio = await startCapture({video: true, audio: true})
    const audioCtx = new window.AudioContext
    analyser = audioCtx.createAnalyser()
 
    const source = audioCtx.createMediaStreamSource(audio)
    source.connect(analyser)
 
    const bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
}
 
const getFrequencies = () => {
    if (!analyser || !dataArray) { return null }
 
    analyser.getByteFrequencyData(dataArray)
    avgArray = []
    for (var i = 0; i < 200; i++){
        
        avgArray.push(dataArray.slice(i * 2, i * 2 + 5))
    }
    console.log(dataArray)
 
    avgArray = avgArray.map(group => {
        var length = group.length
        if (!length) { return null }
        return Math.floor(group.reduce((a,b) => a+b) / length)
    })
    return avgArray
}
 
getAudio()