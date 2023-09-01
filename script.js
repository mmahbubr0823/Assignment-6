// header part 

const headerContainer = document.getElementById('header');
const div = document.createElement('div');
div.innerHTML = `
<div class="navbar bg-base-100 max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-2 my-8 flex justify-center items-center ">
            <div class="navbar-start flex items-center">
                <span class="text-red-400"><i class="fa-solid fa-circle-play"></i></span>
              <a class="btn btn-ghost normal-case text-xl"><span class="text-red-500">PH</span> Tube</a>
            </div>
            <div class="navbar-center hidden lg:flex">
              <button class="btn">Sort by view</button>
            </div>
            <div class="navbar-end">
              <a class="btn bg-red-400">Blog</a>
            </div>
          </div>
`;
headerContainer.appendChild(div);

// API part  

const loadTube = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const phTubes = data.data;
    displayTube(phTubes)
}

const displayTube = (phTubes) => {
    // console.log(phTubes);

    phTubes.forEach(phTube => {
        const tubeContainer = document.getElementById('tube-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="my-2 btn" onclick="handleCategory(${phTube.category_id})" class="btn">${phTube.category}</button>

        `;
        tubeContainer.appendChild(div);
    });
}

const handleCategory = async (id=1000) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const categories = data.data;
    // console.log(categories);
    displayCards(categories);
}

const displayCards = (categories) =>{
  // console.log(categories);
  const categoryContainer = document.getElementById('card-container');

  // drawing category part 
  const categoryContainer2 = document.getElementById('card-container2');
  if (categories.length === 0) {
    categoryContainer.innerHTML = '';
    categoryContainer2.innerHTML = '';
    categoryContainer2.classList.remove('hidden')
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="text-center my-10">
    <img class="mx-auto" src="./images/Icon.png" alt="">
    <p class="font-bold text-2xl">Oops!! Sorry, There is no <br> content here</p>
</div>
    `
    categoryContainer2.appendChild(div);
  }
  
    else{

      categoryContainer2.classList.add('hidden');
    }

    // all categories part 

      categoryContainer.innerHTML = '';
 
      categories.forEach(category => {
          console.log(category);
          const div = document.createElement('div');
          div.innerHTML = `
          <div class="card w-[215px] mx-auto h-96 bg-base-100 shadow-xl mb-4">
              <figure class="px-2 pt-3 ">
                <img class="w-52 h-40 rounded-lg" src="${category.thumbnail}" alt="Shoes"/>
              </figure>
              <div class="card-body flex flex-row">
                <img class="w-[50px] h-[50px] rounded-[50%]" src="${category.authors[0].profile_picture}" alt="">
                <div>
                  <h1 class="">${category.title}</h1>
                  <p>${category.authors[0].profile_name}</p>
                  <span>${category.authors[0].verified=== false ? ' ' : '<i class="fa-solid fa-certificate"></i>'}</span>
                  <p>${category.others.views}</p>
                </div>
              </div>
            </div>
          `
          categoryContainer.appendChild(div)
      });
    
  
  
}

loadTube()
handleCategory()