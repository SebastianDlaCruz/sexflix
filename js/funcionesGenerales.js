const doc = document;

/!* --------------------------------  FUCNCION MOVERSCROLL  --------------------------------- */

export const  moverScroll =  function(btnSiguiente,botonAnterior,estreno) {

    btnSiguiente.addEventListener("click",() => estreno.scrollLeft += estreno.offsetWidth);

    botonAnterior.addEventListener("click",() => {estreno.scrollLeft -= estreno.offsetWidth});

};


/!* --------------------------------  FUCNCION  PREVISTA DE IMAGENES  --------------------------------- */

export const preVistaDeImagenes = function (images,vistaTexto,vistaImg) {
      
    const $vistaTexto = doc.getElementById(vistaTexto),
      $vistaImg  = doc.getElementById(vistaImg),
      $imagenes = doc.querySelectorAll(images);


            
       fetch("https://api.themoviedb.org/3/discover/movie?api_key=07472988e2a65a1e19ffb820effa112b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
      .then( res => res.ok ? res.json() : Promise.reject(res))
      .then(json=> {
  
          Object.entries(json).forEach(([key,value]) =>{
  
              if(key === "results"){
  
                  for(let i = 0; i < value.length; i++){
  
                      const $img = doc.createElement("img"),
                      $h1 =  doc.createElement("h1"),
                      $p = doc.createElement("p");
  
                      $img.src = `https://image.tmdb.org/t/p/w500/${value[i].backdrop_path}`;
                      $img.alt = `${value[i].title}`;
                      $img.setAttribute("class","vista-img__img");
                      $img.setAttribute("id",`${value[i].id}`);
                      $h1.textContent = value[i].title;
                      $h1.setAttribute("class","vista-texto__title");
                      $h1.setAttribute("id",`${value[i].id}`);
                      $p.textContent = value[i].overview;
                      $p.setAttribute("class","vista-texto__paragraph");
                      $p.setAttribute("id",`${value[i].id}`);
  
                      $vistaImg.appendChild($img);
                      $vistaTexto.appendChild($h1);
                      $vistaTexto.appendChild($p);
  
                  }
  
              }
          
  
          });
              
         const vistaImg  = $vistaImg.querySelectorAll("img"),
          texto = $vistaTexto.querySelectorAll("h1"),
          p =  $vistaTexto.querySelectorAll("p");
          
        
          for(let i = 0; i < $imagenes.length; i++){
  
                  $imagenes[i].addEventListener("mouseover",(event)=>{
  
                      for(let a = 0; a < vistaImg.length; a++){
  
                          if($imagenes[i].getAttribute("data-scroll") === vistaImg[a].id){
  
                              vistaImg[a].classList.add("img-active");
                              texto[a].classList.add("title-active");
                              p[a].classList.add("paragraph-active");
                          }else{
                            
                            vistaImg[a].classList.remove("img-active");
                            texto[a].classList.remove("title-active");
                            p[a].classList.remove("paragraph-active");
                          }
  
                      }
                  
                  });
  

  
          }
   
      })
      .catch(err =>{
  
          let message  = err.statusText ||"Error en la peticion";
  
          alert("Error:" + message);
  
      }); 
      
  
  };


  /!* --------------------------------  FUCNCION  BUSCAR PELICULA  --------------------------------- */

export const buscarPelicula = function(pelis,search,container){

    const $template = doc.querySelector("template").content,
    $search = doc.getElementById(search),
    $container  = doc.getElementById(container);

}