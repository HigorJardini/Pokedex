const api_url       = 'https://pokeapi.co/api/v2';

const pokemonName   = document.querySelector('.pokemon__name');
const pokemonId     = document.querySelector('.pokemon__id');
const pokemonImg    = document.querySelector('.pokemon__image');
const pokemonTitle  = document.querySelector('.pokemon__title__line');

const form          = document.querySelector('.form');
const input         = document.querySelector('.input__search');
const btnPrev       = document.querySelector('.btn-prev');
const btnNext       = document.querySelector('.btn-next');

const btns          = document.querySelector('.button');

const imgDefault    = './imagens/pokeball.gif';

let searchPokemon = 0;

const fetchPokemon = async (pokemon) => {

    const api_endpoint = `${api_url}/pokemon/${pokemon}`;

    const APIResponse = await fetch(api_endpoint);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonId.innerHTML   = '';
    pokemonTitle.classList.add('d-none');
    pokemonName.innerHTML = 'Loading...';
    buttonsActionsPermission('disabled');

    const data = await fetchPokemon(pokemon);

    if(typeof data != 'undefined') {

        searchPokemon = data.id;

        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML   = data.id;
        pokemonTitle.classList.remove('d-none');

        if(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] != null) {
           pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        } else {
           pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        }

        playaudio(data.id);

    } else {
        pokemonName.innerHTML = 'Not Found';
        pokemonId.innerHTML   = '';
        pokemonTitle.classList.add('d-none');

        pokemonImg.src = imgDefault;

        searchPokemon = 0;
    }

    buttonsActionsPermission('enable');
    input.value = '';
}

const playaudio = (id_pokemon) => {

    if(id_pokemon == 25){
        var audio = new Audio('../sounds/pikachu.mp3');
    } else {
        var audio = new Audio('../sounds/pokeball.mp3');
    }
    
    audio.volume = 0.2;
    audio.setAttribute('crossorigin', 'anonymous');
    audio.play();
}

const buttonsActionsPermission = (value) => {
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
        button.disabled =  value == 'disabled'? true : false;
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


