const bookmarksContainer = document.querySelector(".bookmarks");
const categorySuggestionsContainer = document.querySelector(".category-suggestions div");

const categoryButtonsContainer = document.querySelector(".category-buttons div");
const showAll =  document.querySelector(".all");
/*
showAll.addEventListener("click" , function() {
displayBookmarks()
Location.reload()

})
*/

localStorage.removeItem("active-category");
showAll.addEventListener("click", function () {
  displayBookmarks();
  const categoryButtons = document.querySelectorAll(".category-buttons div span");
  categoryButtons.forEach((button) => button.classList.remove("active"));
  localStorage.removeItem("active-category");

});

function saveBookmark() {
    var category = document.querySelector(".category").value.trim();
    var title = document.querySelector(".title").value.trim();
    var url = document.querySelector(".url").value.trim();
    //التحقق من ان الحقول مش فاضيه
    if (!title || !url || !category) {
        alert("Please FIll All Fields");
        return
    }
    // اعمل متغير في مساحه التخزين علشان نضيف فيه الداتا
    const allBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || {}
    // ادخل انواع الداتا
    //و لو نوع الاتا جديد اعمل له مساحه فاضيه
    if (!allBookMarks[category]) allBookMarks[category] = []
    //نخزن الداتا الي دخلتها و نحفظها في مساحه التخزين
    allBookMarks[category].push({ title, url });
    localStorage.setItem("bookmarks", JSON.stringify(allBookMarks));

    // console.log(allBookMarks);
    //نفضي الحقول بعد تشغيل الفانكشن
    document.querySelectorAll("input").forEach((input) => (input.value = ""))
    //عند اضافه بيانات جديد يتم تشغيل الفانكشن
    displayBookmarks()
}

function displayBookmarks() {
  bookmarksContainer.innerHTML = "";
  const allBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || {}
  for (const category in allBookMarks) {
      const categoryBookmarks = allBookMarks[category]
      categoryBookmarks.forEach((bookmark, index) => {

          const bookmarkElement = document.createElement("div")
          bookmarkElement.innerHTML = `
<div class="cat">${category}</div>
<div class="link"><a href="${bookmark.url}" target= "-blank">${bookmark.title}</a></div>
<button onclick ="deleteBookmark ('${category}' , ${index})>Delete</button>
`
bookmarksContainer.appendChild(bookmarkElement);
      })

  }
}

function filterBookmarks(category) {
    const allBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    const categoryBookmarks = allBookMarks[category];
      bookmarksContainer.innerHTML = "";
      categoryBookmarks.forEach((bookmark, index) => {
        const bookmarkElement = document.createElement("div");
        bookmarkElement.innerHTML = `
          <div class="number">${index + 1}</div>
          <div class="link"><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></div>
          <button onclick="deleteBookmark('${category}', ${index})">Delete</button>
        `;
        bookmarksContainer.appendChild(bookmarkElement);
      });
    }


function displayCategorySuggestions() {

    const allBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || {}
    const categories = Object.keys(allBookMarks);
    categorySuggestionsContainer.innerHTML = "";
    categories.forEach((category => {
        const categoryElement = document.createElement("span");
        categoryElement.textContent = category;
        categoryElement.onclick = () => (document.querySelector(".category").value = category)

        categorySuggestionsContainer.appendChild(categoryElement);

    } ) )
  }


function displayCategoryButtons (){
        const allBookMarks = JSON.parse(localStorage.getItem("bookmarks")) || {}
        const categories = Object.keys(allBookMarks);
categoryButtonsContainer.innerHTML=""
        categories.forEach((category) => {
            const categoryElement = document.createElement("span");
            categoryElement.textContent = category;


categoryElement.addEventListener("click" , function(){
    filterBookmarks(category)
    localStorage.setItem("active-category" , category)
const categoryButtons = document.querySelectorAll(".category-buttons div span")
categoryButtons.forEach((button)=> button.classList.remove("active"))
this.classList.add("active")
})
const activeCategory =localStorage.getItem("active-category");
if (activeCategory === category)categoryElement.classList.add("active")
categoryButtonsContainer.appendChild(categoryElement);
        })

      }


function deleteBookmark(category, index) {
  const allBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
  allBookmarks[category].splice(index, 1);

  if (allBookmarks[category].length === 0) delete allBookmarks[category];
  localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));

  if (allBookmarks[category] && localStorage.getItem("active-category")) {
    filterBookmarks(category);
  } else {
    displayBookmarks();
  }
  displayBookmarks()
displayCategorySuggestions()
displayCategoryButtons();
}




displayBookmarks()
displayCategorySuggestions()
displayCategoryButtons();






