function blogClick() {
     window.location.href = "blog.html";
}

const handleCategory = async () => {
     const response = await fetch(
          "https://openapi.programming-hero.com/api/videos/categories"
     );
     const data = await response.json();

     const tabContainer = document.getElementById("tab-container");
     data.data.forEach((categoryId) => {
          const div = document.createElement("div");
          div.innerHTML = `
          <a onclick="handleLoad('${categoryId.category_id}')" class="tab">${categoryId.category}</a>
          `;
          tabContainer.appendChild(div);
     });
};

const handleLoad = async (id) => {
     const response = await fetch(
          `https://openapi.programming-hero.com/api/videos/category/${id}`
     );
     const data = await response.json();

     const emptyDisplay = document.getElementById("empty-display");
     emptyDisplay.innerHTML = "";
     if (data.data.length === 0) {
          const div2 = document.createElement("div");
          div2.innerHTML = `
               <img class="w-[100px] md:w-auto mx-auto" src="./images/Icon.png" alt="">
               <p class="mt-5 text-xl md:text-2xl lg:text-4xl font-bold">Oops!! Sorry.<br>There is no content here</p>
               `;
          emptyDisplay.appendChild(div2);
     }

     const cardContainer = document.getElementById("cards-container");
     cardContainer.innerHTML = "";

     data.data.forEach((news) => {
          // Time calculation
          const value = news?.others?.posted_date;
          const hours = Math.floor(value / 3600);
          const minuets = Math.floor((value % 3600) / 60);
          const timeShow = document.getElementById("time-show");

          const div = document.createElement("div");
          div.innerHTML = `
          
          <div class="h-[300px] bg-base-100 shadow-xl mx-2">
               <div class="flex justify-center">
                    <img class="w-[300px] h-52 p-2 rounded-xl " src="${
                         news.thumbnail
                    }" />
                    <p id="time-show" class="absolute mt-40 ml-24 text-white bg-black rounded-xl px-2">
                    ${
                         news?.others?.posted_date
                              ? `${hours}hrs ${minuets} min ago`
                              : ""
                    }</p>
               </div>
          <div class="flex gap-5 pl-14 md:pl-12 lg:pl-2 mt-3 ">
               <div>
                    <img
                         class="w-[40px] h-[40px] rounded-full"
                         src="${news?.authors[0]?.profile_picture}"
                         alt=""
                    />
               </div>

               <div>
                    <h1 class="text-xl font-bold ">${news.title}</h1>
                    <div class="flex gap-2">
                         <small>${news?.authors[0]?.profile_name}</small>
                         <p >${
                              news.authors[0]?.verified
                                   ? `<img src="./images/fi_10629607.svg" alt="">`
                                   : ""
                         }
                         </p>
                               </div>
                                    <small>${news?.others?.views} views</small>
                               </div>
                    </div>
               </div>

          `;

          cardContainer.appendChild(div);

     });
     
};
handleCategory();
handleLoad("1000");
