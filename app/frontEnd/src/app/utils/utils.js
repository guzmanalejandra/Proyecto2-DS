export function postData(data){
  return fetch('http://127.0.0.1:5000/computeImage', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      }).then(response => response.json())
      
}

