document.addEventListener('DOMContentLoaded',() => {

    const form = document.getElementById('github-form');
    const search = document. getElementById('search');
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    form.addEventListener('submit', (event) => {
        userList.innerHTML = ""
        reposList.innerHTML = ""
        fetchGitUsers(search.value)
        search.value = ""
        event.preventDefault();
    })



});

function fetchGitUsers(user) {
    const fetchUrl = `https://api.github.com/search/users?q=${user}`;
    configObj = {
        headers: {
            "Accept": "application/vnd.github.v3+json"
          }
    };
    fetch(fetchUrl, configObj)
        .then(resp => resp.json())
        .then(data => displayGitUsers(data.items))
        .catch(error => console.log(error));

   
}

function displayGitUsers(data) {
    const userList = document.getElementById("user-list");
    
    if (data) {
        const h2 = document.createElement("h2");
        h2.textContent = "Github Users";
        userList.appendChild(h2);
        data.forEach((user) =>{
            createUser(user);
            
        });
    }
}

function createUser(user) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const h3 = document.createElement('h3')
    const repo = document.createElement('h3')
    const userList = document.getElementById("user-list");

    img.src = user.avatar_url;
    img.alt = "GitHub user avatar";
    a.href = user.html_url;

    h3.textContent = user.login;
    repo.textContent = "Display Repositories"

    li.appendChild(img);
    li.appendChild(a);
    a.appendChild(h3);
    li.appendChild(repo)
    userList.appendChild(li);
    li.addEventListener('click',() => {
        const repoList = document.getElementById("repos-list");
        repoList.innerHTML = ""
        fetchUserRepos(user.login)
    });
}


function fetchUserRepos(user) {
    const fetchUrl = `https://api.github.com/users/${user}/repos`;
    configObj = {
        headers: {
            "Accept": "application/vnd.github.v3+json"
          }
    };
    fetch(fetchUrl, configObj)
        .then(resp => resp.json())
        .then(data => displayRepos(data,user))
        .catch(error => console.log(error));
                
}

function displayRepos(data,user) {
    const reposList = document.getElementById("repos-list");
    
    if (data) {
        const h2 = document.createElement("h2");
        h2.textContent = `${user}'s Repositories`;
        reposList.appendChild(h2);
        
        data.forEach((repo) =>{
            createRepo(repo);
            
        });
    }

}

function createRepo(repo) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const h3 = document.createElement('h3')
    const h4 = document.createElement('h4')
    li.classList.add("repo")
    const reposList = document.getElementById("repos-list");
    li.appendChild(a)
    a.href = repo.html_url;
    h3.textContent = repo.name;
    h4.textContent = `Repository last updated on: ${repo.updated_at}`
    a.appendChild(h3);
    li.appendChild(h4);
    reposList.append(li)
}
