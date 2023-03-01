import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load Keras model for plant disease detection
model = load_model('Deployment/models/my_model.h5')

# Start video capture
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)  # Set the width to 1920 pixels
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080) # Set the height to 1080 pixels
cap.set(cv2.CAP_PROP_FPS, 30)
address = "http://192.168.79.56:8080/video"
cap.open(address)

# Loop through each frame of the live video stream
while True:
    ret, frame = cap.read()
    
    if ret:
        # Resize the frame to a fixed size for efficient processing
        resized_frame = cv2.resize(frame, (100, 100))

        # Normalize the pixel values of the image
        normalized_frame = np.divide(resized_frame, 255)

        # Reshape the image for input to the model
        input_frame = np.reshape(normalized_frame, (-1, 100, 100, 3))

        # Pass the image through the model for prediction
        output = model.predict(input_frame)

        # Find the index of the predicted class
        predicted_class = np.argmax(output)

        # Define the class labels for the prediction
        class_labels = ['Pepper__bell___Bacterial_spot','Pepper__bell___healthy',
 'Potato___Early_blight' ,'Potato___Late_blight', 'Potato___healthy',
 'Tomato_Bacterial_spot' ,'Tomato_Early_blight', 'Tomato_Late_blight',
 'Tomato_Leaf_Mold' ,'Tomato_Septoria_leaf_spot',
 'Tomato_Spider_mites_Two_spotted_spider_mite' ,'Tomato__Target_Spot',
 'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus',
 'Tomato_healthy']

        # Draw the predicted class label on the frame
        label = class_labels[predicted_class]
        cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

        # Display the live video stream with the predicted class label
        cv2.imshow('Plant Disease Detection', frame)

        # Press 'q' to exit the live preview
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Release the video capture and close all windows
cap.release()
cv2.destroyAllWindows()
