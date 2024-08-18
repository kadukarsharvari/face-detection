const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const overlayCtx = overlay.getContext('2d');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error(err));
}

video.addEventListener('play', () => {
    overlay.width = video.videoWidth;
    overlay.height = video.videoHeight;

    async function detectFaces() {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

        overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

        faceapi.draw.drawDetections(overlay, detections);
        faceapi.draw.drawFaceLandmarks(overlay, detections);
        faceapi.draw.drawFaceExpressions(overlay, detections);

        requestAnimationFrame(detectFaces);
    }

    detectFaces();
});