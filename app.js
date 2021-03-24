const teamContainer = document.querySelector(".container");
const searchBar = document.querySelector("#searchBar");
const westBtn = document.querySelector(".westBtn");
const eastBtn = document.querySelector(".eastBtn");
const allBtn = document.querySelector(".allBtn");
let teams = [];

searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredTeams = teams.filter((team) => {
        return (
            team.name.toLowerCase().includes(searchString) ||
            team.venue.city.toLowerCase().includes(searchString)
        );
    });
    console.log(filteredTeams);
    populateTable(filteredTeams);
});

function westFilter() {
    const westernTeams = teams.filter((team) => {
        return team.conference.name.includes("Western");
    });
    console.log(westernTeams);
    populateTable(westernTeams);
}

function eastFilter() {
    const easterTeams = teams.filter((team) => {
        return team.conference.name.includes("Eastern");
    });
    console.log(easterTeams);
    populateTable(easterTeams);
}

function allFilter() {
    const allTeams = teams.filter((team) => {
        return team.active;
    });
    console.log(allTeams);
    populateTable(allTeams);
}

async function teamFetcher() {
    try {
        const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams`);
        let teamsArr = await res.json();
        teams = teamsArr.teams;
        populateTable(teams);
        console.log(teams);
    } catch (err) {
        console.log(err);
    }
}

const populateTable = (data) => {
    const htmlString = data
        .map((team) => {
            return `
        <tr class="teamRow ">
            <td class = "animate__animated animate__fadeInLeft">${team.name}</td>
            <td class = "animate__animated animate__fadeInLeft ">${team.venue.city}</td>
        </tr>
    `;
        })
        .join("");
    teamContainer.innerHTML = htmlString;
};

teamFetcher();
