// API res
fetch('https://kep.uz/api/problems')
    .then(response => response.json())
    .then(json => getData(json))

let dates = [];
let pagination = document.getElementsByClassName("pagination");
let tbodyElement = document.getElementById("my_table");

function searchFunction(event) {
    title = event.value;
    fetchDataAndRender();
}

function getData(data) {
    dates = data.data;
    console.log(data);
    dates.forEach(date => {
        let newRow = document.createElement("tr");
        let tagsNames = date.tags.map(tag => tag.name).join(', ');

        newRow.innerHTML = `
            <td>${date.id}</td>
            <td>${date.title}</td>
            <td>${date.difficultyTitle}</td>
            <td><button class="tagName">${tagsNames}</button></td>
            <td>likes - ${date.likesCount} / disLikes - ${date.dislikesCount}</td>
            <td><span class="solved">${date.solved}</span> / <span class="attempCount">${date.attemptsCount}</span></td>
            <!-- Add more td elements as needed for other properties -->
        `;

        tbodyElement.appendChild(newRow);
    });
}

function searchFunction() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let searchResult = document.getElementById("searchResult");

    searchResult.innerHTML = "";
    searchResult.style.display = "none";

    if (searchValue.trim() !== "") {
        let Url = 'https://kep.uz/api/problems';
        fetch(Url)
            .then(response => response.json())
            .then(data => {
                let matchingItems = data.filter(function (item) {
                    return item.toLowerCase().includes(searchValue);
                });

                if (matchingItems.length > 0) {
                    searchResult.style.display = "block";
                    matchingItems.forEach(function (item) {
                        let resultItem = document.createElement("div");
                        resultItem.textContent = item;
                        searchResult.appendChild(resultItem);
                    });
                } else {
                    searchResult.textContent = "Hech nima topilmadi.";
                }
            })
            .catch(error => console.error('Error fetching data:', (error)));
    }
}

let currentPage = 1;

const pageSize = 20;

let totalPages = 1;

let title = '';

// let tbodyElement = document.getElementById("my_table");

let prevPageButton = document.getElementById("backPage");

let nextPageButton = document.getElementById("nextPage");

function fetchDataAndRender() {
let url = ``;
if(title){
url = `https://kep.uz/api/problems?page=${currentPage}&page_size=${pageSize}&title=${title}`;
}else{
url = `https://kep.uz/api/problems?page=${currentPage}&page_size=${pageSize}`;
}    
    
  fetch(url)
    .then(response => response.json())
    .then(json => {
            getData(json);
            totalPages = json.totalPages;
            let data = json.data;
            let size = data.length;
            if(size < 20){
            if (nextPageButton && !nextPageButton.disabled) {
                nextPageButton.classList.add('disabled-btn');
                nextPageButton.disabled = true;
            }else{
                nextPageButton.classList.remove('disabled-btn');
                update();
            }
        }
                });
}
function update() {
    document.getElementById("currentPage").innerText = currentPage;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

fetchDataAndRender();
