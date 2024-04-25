function ele(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

const container = ele("div", "container", "", "");
const h1 = ele("h1", "text-center", "title", "Rest Country Weather Check");
const row = ele("div", "row", "", "");

const res = fetch("https://restcountries.com/v3.1/all");
res
  .then((data) => data.json())
  .then((e) => {
    for (var i = 0; i < e.length; i++) {
      let col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4 g-3";
      col.innerHTML = `
      <div class="card h-100   ">
        <div class="card-header mb-2  bg-black co">
        <h5 class="card-title text-center">${e[i].name.common}</h5>
        </div>
        <div class="img-box">
        <img src="${e[i].flags.png}" class="card-img-top"/></div>
        <div class="card-body">
        <div class="card-text text-center">Region: ${e[i].region}</div>
        <div class="card-text text-center">capital: ${e[i].capital}</div>
        <div class="card-text text-center">country code: ${e[i].cca3}</div>
        <div class="card-text text-center">
        <button class="btn  btn-primary  text center">Click for Weather</button></div>
        </div>
        </div>
        `;
      row.append(col);
    }

    let button = document.querySelectorAll("button");
    button.forEach((btn, ind) => {
      btn.addEventListener("click", () => {
        let latlng = e[ind].latlng;
        let lat = latlng[0];
        let log = latlng[1];

        let weatherApi = fetch(
          ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=0e569bf25103a5a18363f85245fa26ba`
        );
        weatherApi
          .then((ele1) => ele1.json())
          .then((deg) => {
            alert(
              `The weather report of ${e[ind].name.common} is : ${Math.floor(
                deg.main.temp
              )} °C`
            );
          });
      });
    });
  });
container.append(row);
document.body.append(h1, container);
