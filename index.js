
const search = document.querySelector('.search__input');
const popUpMenu = document.querySelector('.search__pop-up-menu');
const searchList = document.querySelector('.search__list');

//search github repositories

let repoList = [];

function onChange(e) {
    fetch('https://api.github.com/search/repositories?q=' + e.target.value)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then((result) => {

            popUpMenu.innerHTML = '';
            repoList.length = 0;
            for (let i = 0; i < 5; i++) {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(result.items[i].name));
                li.classList.add(i);
                popUpMenu.appendChild(li);
                repoList.push(result.items[i]);
            }
        });
}

function debounce(cb, time) {
    let timeout = null;

    return function () {
        const func = () => cb.apply(this, arguments);

        clearTimeout(timeout);

        timeout = setTimeout(func, time);
    }
}

search.addEventListener("keyup", debounce(onChange, 300));

//add github repositories to the list

popUpMenu.addEventListener('click', (e) => {
    let id = +e.target.className;
    let li = document.createElement('li');
    li.classList.add('search__list-item');
    let div = document.createElement('div');
    div.classList.add('repo-card');
    let nameDiv = document.createElement('div');
    nameDiv.classList.add('repo-card__title');
    nameDiv.appendChild(document.createTextNode('Name:    ' + repoList[id].name));
    let ownerDiv = document.createElement('div');
    ownerDiv.classList.add('repo-card__owner');
    ownerDiv.appendChild(document.createTextNode('Owner:    ' + repoList[id].owner.login));
    let starsDiv = document.createElement('div');
    starsDiv.classList.add('repo-card__stars');
    starsDiv.appendChild(document.createTextNode('Stars:    ' + repoList[id].stargazers_count))
    div.appendChild(nameDiv);
    div.appendChild(ownerDiv);
    div.appendChild(starsDiv);
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('search__list-item-remove');
    removeBtn.appendChild(document.createTextNode('X'))
    li.appendChild(div);
    li.appendChild(removeBtn);
    searchList.appendChild(li);
    search.value = '';
    popUpMenu.innerHTML = '';
})

searchList.addEventListener('click', (e) => {
    if (e.target.className === 'search__list-item-remove') {
        console.log(e.target.className);
        console.log(e.target.parentElement);
        e.target.parentElement.remove();
    }
})


