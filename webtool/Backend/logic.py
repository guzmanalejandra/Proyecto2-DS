import pickle
from PIL import Image
import numpy as np

# Cargar el modelo
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

# Cargar y procesar una imagen .tiff
image_path = './tests/0a43459733e7.tiff'
image = Image.open(image_path)
processed_image = np.array(image)  # Ejemplo de conversión a un array de numpy

# Utilizar el modelo para hacer una predicción
resultado = loaded_model.predict([processed_image])

print(resultado)
