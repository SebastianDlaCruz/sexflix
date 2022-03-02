import {moverScroll,preVistaDeImagenes,buscarPelicula} from './funcionesGenerales.js' 

const doc = document;

const $estrenos = doc.getElementById("estrenos-ul"),
$series = doc.getElementById("series-ul"),
$animes = doc.getElementById("animes-ul"),
$botonSiguiente = doc.getElementById("ul-boton__siguiente"),
$botonAnterior = doc.getElementById("ul-boton__anterior"),
$fragament = doc.createDocumentFragment(),
$link = doc.getElementById("link");




/ --------------------------------  FUCNCION QUE CARGA LAS IMAGENES EN LA SECCION  --------------------------------- /

const cargarContenidoSeccion = () =>{


    fetch("https://api.themoviedb.org/3/discover/movie?api_key=07472988e2a65a1e19ffb820effa112b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    .then( res => res.ok ? res.json() : Promise.reject(res))
    .then(json=> {

        Object.entries(json).forEach(([key,value]) =>{

            if(key === "results"){

                for(let i = 0; i < value.length; i++){

                    const $img = doc.createElement("img"),
                    $li = doc.createElement("li"),
                    $h1 = doc.createElement("h1"),
                    $p = doc.createElement("p");

            
                    $img.src = `https://image.tmdb.org/t/p/w500/${value[i].poster_path}`;
                    $img.title = value[i].title;
                    $img.setAttribute("data-scroll", value[i].id);
                    $li.appendChild($img);

                    let $clone = doc.importNode($li,true);
                    $fragament.appendChild($clone);

                     /* console.log(value[i]); */ 
                     buscarPelicula($clone,"search","container");
                }

            }
            
        });

        $estrenos.appendChild($fragament);

        moverScroll($botonSiguiente,$botonAnterior,$estrenos);
    
        preVistaDeImagenes("[data-scroll]","vista-texto","vista-img");
        

                        
    })
    .catch(err =>{

        let message  = err.statusText ||"Error en la peticion";

        alert("Error:" + message);

    });

    

}



doc.addEventListener("DOMContentLoaded",(event)=>{

    cargarContenidoSeccion();

});


