var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term")

var getUserRepos = function(user) {
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make request to url
    fetch(apiUrl)
        .then(function(response) {
            //request successful
            if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
            } else {
            alert("Error: GitHub User Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
      });
  };
  
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
  };

var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    console.log(repos);
    console.log(searchTerm);
    //clearing old form content while displaying search term
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop over repos
    for (var i = 0; i< repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classlist = "list-item flex-row justify-space-between align-center";

        //create element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to parent container
        repoEl.appendChild(titleEl);

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classlist = "flex-row align-center";

        //check if repo has issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append parent container to DOM
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);