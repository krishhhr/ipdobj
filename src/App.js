import React, { useRef, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  async function runObjectDetection() {
    const model = await cocoSsd.load();
    setInterval(async () => {
      if (webcamRef.current) {
        const distance = await calculateDistanceToObjects();
        if (distance <= 5) {
          const imageSrc = webcamRef.current.getScreenshot();
          const img = new Image();
          img.src = imageSrc;
          img.onload = async () => {
            const predictions = await model.detect(img);
            console.log("Predictions:", predictions);
            const objects = predictions.filter((p) => p.score >= 0.5);
            for (let i = 0; i < objects.length; i++) {
              const object = objects[i];
              const distanceToObject = calculateDistance(object.bbox);
              console.log(`Distance to ${object.class}: ${distanceToObject}`);
              if (distanceToObject <= 2) {
                let announcement = `${object.class} go right`;
                if (synthRef.current.speaking) {
                  return;
                }
                if (object.class === "person") {
                  announcement = `${object.class} in front`;
                } else if (object.class === "motorcycle") {
                  announcement = `${object.class} is approaching`;
                }
                if (announcement) {
                  const utterance = new SpeechSynthesisUtterance(announcement);
                  utterance.rate = 2.5; // set the speech rate to 2x
                  synthRef.current.speak(utterance);
                }
              }
            }
          };
        }
      }
    }, 2000);
  }
  

  function calculateDistance(bbox) {
    // assuming object width is 0.1 meter
    const objectWidth = 4;
    const focalLength = 400;
    const imageWidth = 320;
    const imageHeight = 240;
    const x1 = bbox[0] * imageWidth;
    const y1 = bbox[1] * imageHeight;
    const x2 = (bbox[0] + bbox[2]) * imageWidth;
    const y2 = (bbox[1] + bbox[3]) * imageHeight;
    const w = x2 - x1;
    const h = y2 - y1;
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;
    const distance = (objectWidth * focalLength) / w;
    // console.log (distance*100)
    return distance*100;
  }

  async function calculateDistanceToObjects() {
    const model = await cocoSsd.load();
    const imageSrc = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = imageSrc;
    await tf.setBackend("webgl");
    const predictions = await model.detect(img);
    const objects = predictions.filter((p) => p.score >= 0.5);
    const distances = objects.map((object) => calculateDistance(object.bbox));
    const minDistance = Math.min(...distances);
    return minDistance;
  }

  useEffect(() => {
    async function setupCamera() {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "rear",
        },
      });
    }
    setupCamera();
    runObjectDetection();
  }, []);

  return (
    <div className="App">
      <Webcam ref={webcamRef} />
    </div>
  );
}

export default App;