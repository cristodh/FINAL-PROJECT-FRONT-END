async function postData(obj,endpoint) {
  try {
      const request = await fetch (`http://localhost:3000/${endpoint}`,{
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
          },
          body: JSON.stringify(obj)
      })
      const response = request.json()
      return response
  } catch (error) {
    console.error(error);
    
  }
}

async function getData(endpoint) {
    try {
        const request = await fetch(`http://localhost:3000/${endpoint}`)
            return await request.json();
    } catch (error) {
        console.error(error);   
    }  
    }

async function delData(endpoint,id) {
    try {
        const request = await fetch(`http://localhost:3000/${endpoint}/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await request.json()
        return response
    }
     catch (error) {
        console.error(error); 
    }}

async function patchData(endpoint, obj,id) {
  try {
    const peticion = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj) // pasa info al db.json **api
    });
    return await peticion.json();
  } catch (error) {
    console.error(error);
  }
}

export {postData,getData,delData,patchData}
    