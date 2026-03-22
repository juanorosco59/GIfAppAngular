
//Esta es la propia implementacion de lo que necesito de un gif, es decir, el id, 
// el titulo y la url, lo cual me permite tener una estructura clara y definida de lo que es un gif en mi aplicación, y me facilita el trabajo con los datos de los gifs que obtengo desde la API de Giphy.

//Esta interfaz me permite definir la estructura de un gif, 
//lo cual me facilita el trabajo con los datos de los gifs que 
//obtengo desde la API de Giphy, y me permite tener una estructura 
//clara y definida de lo que es un gif en mi aplicación.

export interface Gif {
    id: string;
    title: string;
    url: string;
}