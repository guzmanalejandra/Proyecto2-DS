from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from PIL import Image
import base64
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import os
import cv2
import json
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, UpSampling2D, concatenate
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

import pickle

pickled_model = pickle.load(open('./finalized_model_acc_90.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

# Define your routes here
@app.route('/')
def hello_world():
    return 'Hello from backend!'
# Example of a route that accepts POST requests



def create_image(image_name,img ):
    def create_mask(polygons, image_shape):
        mask = np.zeros(image_shape[:2], dtype=np.uint8)
        for polygon in polygons:
            if polygon['type'] == 'blood_vessel':
                coordinates = np.array(polygon['coordinates'])
                cv2.fillPoly(mask, [coordinates], 255)
        return mask

    def load_data(jsonl_path, train_dir):
        X, y = [], []
        with open(jsonl_path, 'r') as file:
            polygons_data = [json.loads(line) for line in file]

        for data in polygons_data:
            image_id = image_name
            image = img
            image = img_to_array(image)
            mask = create_mask(data['annotations'], image.shape)
            X.append(image)
            y.append(mask)
        
        return np.array(X, dtype='float32'), np.array(y, dtype='float32')

    jsonl_path = 'polygons.jsonl'
    train_dir = 'trainFiles'
    X, y = load_data(jsonl_path, train_dir)
    X /= 255.0
    y /= 255.0

    preds_val = pickled_model.predict(X)


    # Visualización de resultados
    import matplotlib.pyplot as plt

    def plot_sample(X, y, preds, ix=None):
        if ix is None:
            ix = np.random.randint(0, len(X))

        has_mask = y[ix].max() > 0

        fig, ax = plt.subplots(1, 3, figsize=(20, 10))
        ax[0].imshow(X[ix, ..., 0], cmap='gray')
        if has_mask:
            ax[0].contour(y[ix].squeeze(), colors='k', levels=[0.5])
        ax[0].set_title('Original')

        ax[1].imshow(y[ix].squeeze())
        ax[1].imshow(X[ix, ..., 0], cmap='gray', alpha=0.5)
        ax[1].set_title('True Mask')

        ax[2].imshow(preds[ix].squeeze(), vmin=0, vmax=1)
        if has_mask:
            ax[2].contour(y[ix].squeeze(), colors='r', levels=[0.5])
            ax[2].imshow(X[ix, ..., 0], cmap='gray', alpha=0.5)

        ax[2].set_title('Predicted')
    
        # save the image
        fig.savefig('./static/output.png')


    # Predicciones

    plot_sample(X, y, preds_val)

    








@app.route('/computeImage', methods=['POST'])
def computeImage():
    data = request.get_json()

    imagen = data['imgBase64']
    name = data['filename']["path"]
    name = name.split(".")[0]
    # print(imagen)
    # remove data:
    imagen = imagen.replace("data:image/jpeg;base64,", "")
    imagen = imagen.replace("data:image/png;base64,", "")
    imagen = imagen.replace("data:image/jpg;base64,", "")
    imagen = imagen.replace("data:image/tiff;base64,", "")
    imgdata = base64.b64decode(imagen)


    filename = 'image.jpg'  # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)
    
    img = load_img(filename, color_mode='grayscale')

    try:
        create_image(name,img)
        image = Image.open('./static/output.png')

        # convert image to base64
        data = base64.b64encode(open('./static/output.png', 'rb').read())

        # send data in base 64
        return jsonify({"data": data})
    except:
        return jsonify({"data": "error"})




if __name__ == '__main__':
    app.run(debug=True)
    
