
const nomePokemon = document.querySelector('.nome_pokemon');

const numeroPokemon = document.querySelector('.numero_pokemon');

const gifPokemon = document.querySelector('.gif_pokemon');

const form = document.querySelector('.form');

const input = document.querySelector('.barra_busca');

const botaoAntes = document.querySelector('.btn-antes');

const botaoProximo= document.querySelector('.btn-depois');

let procuraPokemon = 1;











const buscaPokemon = async (pokemon) => {
  const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (respostaAPI.status === 200) {
    const dados = await respostaAPI.json()
  return dados; 
  } 
}

const renderPokemon = async (pokemon) => {
  nomePokemon.innerHTML = "Procurando"
  numeroPokemon.innerHTML = ""
  gifPokemon.src = ""
  const dados = await buscaPokemon(pokemon)  
    
    if (dados) {
    nomePokemon.innerHTML = dados.name

    numeroPokemon.innerHTML = dados.id

    gifPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    procuraPokemon = dados.id
  }

    else {
    nomePokemon.innerHTML = "Não encontrado"
    numeroPokemon.innerHTML = "?"

  }

}


form.addEventListener('submit',(event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase())
  input.value = ''

});

botaoAntes.addEventListener('click',() => {
  if (procuraPokemon > 1) {
    procuraPokemon -= 1;
    renderPokemon(procuraPokemon)
  }
  
});


botaoProximo.addEventListener('click',() => {
  procuraPokemon += 1;
  renderPokemon(procuraPokemon)
});

renderPokemon(procuraPokemon)
