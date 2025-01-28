# 🤖 Object Detection with Speech Output & Distance Measurement

This React app uses the **Coco-SSD model** from TensorFlow.js to perform **object detection** and calculate the distance to objects detected in the webcam feed. It gives **verbal feedback** about nearby objects with a custom speech rate, and based on the proximity, it generates different messages for objects like "person" and "motorcycle".

## 🌟 Features:
- **Object Detection**: Detects objects in real-time using the webcam.
- **Distance Calculation**: Estimates the distance to detected objects.
- **Speech Feedback**: Provides voice alerts based on the detected objects and their distance.

## ⚙️ Setup Instructions

### 🔧 Prerequisites:
To run the project locally, make sure you have:
- **Node.js** (Version >= 14.x)
- **npm** (Node package manager)

### 🚀 Steps to Run Locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/krishhhr/ipdobj.git
   cd ipdobj
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

## 🛠️ How It Works:

- **Webcam Feed**: The webcam captures the video feed, which is analyzed in real-time.
- **Model Prediction**: The **Coco-SSD** model detects objects and their bounding boxes.
- **Distance Calculation**: The app calculates the distance of detected objects based on the size of the bounding box.
- **Speech Output**: If the detected object is within a certain distance, it triggers a speech message using the browser's speech synthesis API.

## 🧑‍💻 Contributing
Feel free to fork the repo, make improvements, or report issues! To contribute:
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Open a pull request.

## 📝 License:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🎮 Acknowledgments:
- **TensorFlow.js** and **Coco-SSD** for the object detection model.
- **React** and **Webcam** for the user interface and webcam handling.
- **Speech Synthesis API** for generating voice alerts.

## 🛠️ Technologies Used:
- React
- TensorFlow.js
- Speech Synthesis API
- Coco-SSD Model

Bring your webcam and have real-time object detection and verbal feedback with our app! 🎤👀
