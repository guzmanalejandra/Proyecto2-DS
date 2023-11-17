import React from 'react'
import styled from "styled-components";


export default function MainScreen() {
  return (
    <MyContainer>
      <MyHeader>UVG Medical AI assistance</MyHeader>
      <MyForm>
        <label for="myfile">Select an image iniciate calculation:????</label>
        <input type="file" id="myfile" name="myfile" multiple/>
        <input type="submit"/>
      </MyForm>
      <ContentContainer>
        
      </ContentContainer>
    </MyContainer>
  )
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