document.addEventListener('DOMContentLoaded', eventos);

function eventos() {
    const buscar = document.getElementById("buscar");
    buscar.addEventListener("click", peticionPelicula)
}

function peticionPelicula () {
    let tituloUsuario = document.getElementById("titulo").value;
    consultarPelicula(tituloUsuario);
}

function consultarPelicula(peliculaUsuario) {
    const main = document.getElementById("main-content");
    fetch(`http://www.omdbapi.com/?apikey=97ba8b09&t=${peliculaUsuario}&plot=full`)
    .then(response => response.json())
    .then(pelicula => {

    let generos = pelicula.Genre;
    arrayGeneros =  generos.split(",");
    let generosLabels = "";
    arrayGeneros.forEach(genero => {
        generosLabels += `<small class='px-1.5 py-0.5 bg-yellow-400/20 border text-yellow-400 border-yellow-400 rounded-full uppercase text-xs tracking-wide mr-2'>${genero}</small>`;
    });

    let rotten, metascore, imdb;

    if(typeof pelicula.Ratings[1] !== 'undefined'){
        rotten = pelicula.Ratings[1].value;
    }else{
        rotten = "-";
    }

    if(typeof pelicula.Metascore !== 'undefined'){
        metascore = pelicula.Metascore;
    }else{
        metascore = "-";
    }

    if(typeof pelicula.imdbRating !== 'undefined'){
        imdb = pelicula.imdbRating;
    }else{
        imdb = "-";
    }

    main.innerHTML = `
    <div class="container grid grid-cols-4 gap-0 lg:gap-12 md:gap-8 mx-auto bg-slate-800 relative bottom-5 lg:bottom-32 md:bottom-16 rounded-lg p-8 lg:p-16 text-white">
        <img class="hidden lg:block md:block rounded-lg" src="${pelicula.Poster}" alt="Poster for ${pelicula.title}">
        <div class="col-span-4 lg:col-span-3 md:col-span-3 py-0 lg:py-5 md:py-0">
            <div class="flex flex-wrap">
                ${generosLabels}
            </div>
            <h2 class="text-2xl lg:text-3xl font-semibold mt-2 mb-2">${pelicula.Title}</h2>
            <div class="flex flex-wrap">
                <p class="mr-2 text-sm text-slate-300 font-medium">Year: <span class="font-normal text-slate-300">${pelicula.Year}</span></p>
                <p class="mr-2 text-sm text-slate-300 font-medium">Runtime: <span class="font-normal text-slate-300">${pelicula.Runtime}</span></p>
                <p class="mr-2 text-sm text-slate-300 font-medium">Rated: <span class="font-normal text-slate-300">${pelicula.Rated}</span></p>
            </div>
            <div class="grid grid-cols-4 my-5 gap-8">
                <div class="col-span-4 lg:col-span-3">
                    <div class="flex flex-wrap gap-3 mb-5">
                        <div class="bg-slate-700 px-4 py-3 rounded-lg">
                            <p class="text-xs text-slate-400">Director</p>
                            <p class="text-sm font-medium">${pelicula.Director}</p>
                        </div>
                        <div class="bg-slate-700 px-4 py-3 rounded-lg">
                            <p class="text-xs text-slate-400">Writer</p>
                            <p class="text-sm font-medium">${pelicula.Writer}</p>
                        </div>
                    </div>
                    <p class="text-slate-400">${pelicula.Plot}</p>
                </div>
                
                <div class="gap-5 lg:py-5 flex flex-row lg:flex-col pr-0 pl-0 lg:pl-8 border-t pt-8 lg:border-t-0 lg:border-l border-slate-600 w-full">
                    <div class="flex items-center gap-2 mr-5 lg:mr-0">
                        <img width="18" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/1200px-Rotten_Tomatoes.svg.png" alt="Rotten Tomatoes">
                        <p class="text-sm">${rotten}</p>
                    </div>
                    <div class="flex items-center gap-2 mr-5 lg:mr-0">
                        <img width="18" src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Metascore.png" alt="Metascore">
                        <p class="text-sm">${metascore}</p>
                    </div>
                    <div class="flex items-center gap-2 mr-5 lg:mr-0">
                        <img width="18" src="https://m.media-amazon.com/images/G/01/imdb/images/social/imdb_logo.png" alt="IMDB">
                        <p class="text-sm">${imdb}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    })
}