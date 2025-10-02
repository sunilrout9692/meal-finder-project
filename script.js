// Load categories on homepage load
window.onload = function () {
  loadCategories();
};

function loadCategories() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("meals");
      const sidebarList = document.getElementById("category-list");
      container.innerHTML = "";
      sidebarList.innerHTML = "";

      data.categories.forEach(category => {
        // Card in main area
        const div = document.createElement("div");
        div.className = "col-md-3 mb-4";
        div.innerHTML = `
          <div class="card h-100">
            <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
            <div class="card-body text-center">
              <h5 class="card-title">${category.strCategory}</h5>
              <p class="card-text">${category.strCategoryDescription.substring(0, 80)}...</p>
            </div>
          </div>`;
        container.appendChild(div);

        // Sidebar link
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<a href="#">${category.strCategory}</a>`;
        sidebarList.appendChild(li);
      });
    });
}


function searchMeal() {
  const searchInput = document.getElementById("search").value.trim();
  if (!searchInput) return;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(res => res.json())
    .then(data => {
      const mealsContainer = document.getElementById('meals');
      mealsContainer.innerHTML = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          const div = document.createElement('div');
          div.className = "col-md-3 mb-4";
          div.innerHTML = `
            <div class="card h-100" onclick="openMealDetails(${meal.idMeal})" style="cursor:pointer;">
              <img src="${meal.strMealThumb}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
              </div>
            </div>`;
          mealsContainer.appendChild(div);
        });
      } else {
        mealsContainer.innerHTML = "<p>No meals found.</p>";
      }
    });
}


function openMealDetails(mealId) {
  localStorage.setItem("mealId", mealId);
  window.location.href = "meal.html";
}
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
}

