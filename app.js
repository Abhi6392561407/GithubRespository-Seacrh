const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search")

const toggle = document.getElementById('toggleDark')
const body = document.querySelector('body')
toggle.addEventListener('click',function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.backgroundColor = 'white';
        body.style.Color= 'black';
        body.style.transition = '2s';
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';

    }
    
})
const getUser = async(username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json()
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                  
                </div>
            </div>
        </div>
    `
    main.innerHTML = card;
    getRepos(username)
}


// init call
getUser("Abhi6392561407")


const getRepos = async(username) => {
    const repos = document.querySelector("#repos")
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json();
    data.forEach(
        (item) => {

            const elem = document.createElement("a")
            elem.classList.add("repo")
            elem.href = item.html_url
            elem.innerText = item.name
            elem.target = "_blank"
            repos.appendChild(elem)
        }
    )
}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}


searchBox.addEventListener(
        "focusout",
        function() {
            formSubmit()
        }
    )
