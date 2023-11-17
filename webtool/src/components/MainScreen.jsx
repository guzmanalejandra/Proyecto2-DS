import React, { useState, useEffect } from 'react';
import styled from "styled-components";


export default function MainScreen() {
  const [imagen, setImagen] = useState();
  const [imagenResultado, setImagenResultado] = useState();

  const handleImageUpload = () => {
    if (imagen) {
      const formData = new FormData();
      formData.append('file', imagen);

      fetch('URL_DEL_SERVIDOR', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setImagenResultado(data.resultado);
        })
        .catch(error => console.error('Error al enviar la imagen:', error));
    }
  };

  return (
    <MyForm>
      <label htmlFor="myfile">Select an image to initiate calculation:</label>
      <input
        type="file"
        id="myfile"
        name="myfile"
        multiple
        onChange={(e) => {
          setImagen(e.target.files[0]);
        }}
      />
      <input type="submit" onClick={handleImageUpload} />
    </MyForm>
  );
}


// God container
const MyContainer = styled.div`
    display: grid;
    gap: 5px;
    place-items: center;
    height: 100vh;
    grid-template-rows: 10% 30% 60% ;
`

const MyHeader = styled.h1`
  display: grid;
  place-items: center;
  color: white;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  width: 95%;
  height: 100%;
  background-color: skyblue;
  border-radius: 10px;
`

const ContentContainer = styled.div`
  background-color: red;
`

const MyForm = styled.form`
  display : grid;
  width: 50%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  gap: 10px;
  grid-template-rows: 1fr 1fr 1fr;
`