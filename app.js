const containerMovies = document.querySelector('#contenedor')
let page = 1
let lastMovie
let htmlMovies = ''

const observer = new IntersectionObserver(
  entries => {
    const { isIntersecting } = entries[0]

    if (isIntersecting) {
      page++
      loadMovies()
    }
  },
  {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
  }
)

const loadMovies = async () => {
  let URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`
  try {
    const res = await fetch(URL_API)
    const { results, page } = await res.json()

    renderMovies(results)
  } catch (error) {
    console.error(error)
  }
}

const renderMovies = (movies = []) => {
  if (movies.length === 0) {
    htmlMovies = `
		<div class="pelicula">
			<img class="poster" src="https://i.pinimg.com/originals/24/58/5f/24585fc9b7433a224a6ff5506e346969.png">
			<h3 class="titulo">Bad request</h3>
		</div>
	 
	  `
  }
  movies.forEach(movie => {
    htmlMovies += `
		<div class="pelicula">
			<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
			<h3 class="titulo">${movie.title}</h3>
		</div>
	`
  })

  containerMovies.innerHTML = htmlMovies

  if(lastMovie){
	  observer.unobserve(lastMovie);
  }

  activateIntersectionObserver(
    document.querySelectorAll('#contenedor .pelicula')
  )
}

const activateIntersectionObserver = elements => {
  lastMovie = elements[elements.length - 1]

  observer.observe(lastMovie)
}

document.addEventListener('DOMContentLoaded', loadMovies)
