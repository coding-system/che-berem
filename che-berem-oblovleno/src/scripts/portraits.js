////////////////////////////////////
/////  Диалог списка героев  ///////
////////////////////////////////////
import {
   portraitsList,
   cardPortraitTemplate,
   portraitsstrengthList,
   portraitsagilityList,
   portraitsintelligenceList,
   portraitsuniversalList,
} from "../index.js";

// document.addEventListener("DOMContentLoaded", function () {
//    heroesListButton.addEventListener("click", function () {
//       heroesList.classList.add("popup_is-opened");
//    });

//    heroesListcloseButton.addEventListener("click", function () {
//       heroesList.classList.remove("popup_is-opened");
//    });
// });

function renderPortraits(heroes) {
   // Очищаем списки перед добавлением новых элементов
   portraitsstrengthList.innerHTML = "";
   portraitsagilityList.innerHTML = "";
   portraitsintelligenceList.innerHTML = "";
   portraitsuniversalList.innerHTML = "";

   heroes.forEach((hero) => {
      const cardPortraitItem = cardPortraitTemplate.cloneNode(true); // Клонируем шаблон для каждого героя
      const cardPortraitVideo = cardPortraitItem.querySelector(".card-portrait-video-content");
      const cardPortraitButton = cardPortraitItem.querySelector(".card-portrait-item");
      const cardPortraitName = cardPortraitItem.querySelector(".card-portrait-video-name");
      const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
      const cardLine = cardPortraitItem.querySelector(".line");
      
      // Задаем видео src на основе имени героя
      const videoSource = document.createElement('source');
      videoSource.type = 'video/webm';

      // Заменяем .jpg на .webm и добавляем npc_dota_hero_
      const heroName = hero.image.replace('.jpg', '');
      videoSource.src = `./assets/heroes/portraits/npc_dota_hero_${heroName}.webm`;
      cardPortraitVideo.appendChild(videoSource);

      cardPortraitName.textContent = hero.name;

      // Обработчики событий для воспроизведения видео при наведении
      cardPortraitButton.addEventListener('mouseenter', () => {
         cardPortraitVideo.play();
      });

      cardPortraitButton.addEventListener('mouseleave', () => {
         cardPortraitVideo.pause();
      });

      // Обновляем отображение стилей в зависимости от состояния hero.selected
      updateHeroDisplay(hero, cardBanned, cardLine);

      // Обработчик клика на элемент видео для переключения состояния героя
      cardPortraitButton.addEventListener("click", () => {
         hero.selected = !hero.selected;
         updateHeroDisplay(hero, cardBanned, cardLine);
         console.log(`${hero.name} => ${hero.selected}`);
      });

      switch (hero.attribute) {
         case "strength":
            portraitsstrengthList.appendChild(cardPortraitItem);
            break;
         case "agility":
            portraitsagilityList.appendChild(cardPortraitItem);
            break;
         case "intelligence":
            portraitsintelligenceList.appendChild(cardPortraitItem);
            break;
         case "universal":
            portraitsuniversalList.appendChild(cardPortraitItem);
            break;
      }
   });

   // Функция обновления отображения героя
   function updateHeroDisplay(hero, cardBanned, cardLine) {
      if (hero.selected) {
         cardBanned.style.opacity = "0";
         cardLine.style.opacity = "0";
      } else {
         cardBanned.style.opacity = "1";
         cardLine.style.opacity = "0.5";
      }
   }

   // Функция массового изменения состояния героев
   function updateAllHeroes(selectAll = true) {
      heroes.forEach((hero) => {
         hero.selected = selectAll;
      });

      // Обновляем отображение всех героев
      heroes.forEach((hero) => {
         let cardPortraitItem;
         switch (hero.attribute) {
            case "strength":
               cardPortraitItem = Array.from(portraitsstrengthList.children).find((item) =>
                  item
                     .querySelector(".card-portrait-video-name")
                     .textContent.includes(hero.name)
               );
               break;
            case "agility":
               cardPortraitItem = Array.from(portraitsagilityList.children).find((item) =>
                  item
                     .querySelector(".card-portrait-video-name")
                     .textContent.includes(hero.name)
               );
               break;
            case "intelligence":
               cardPortraitItem = Array.from(portraitsintelligenceList.children).find(
                  (item) =>
                     item
                        .querySelector(".card-portrait-video-name")
                        .textContent.includes(hero.name)
               );
               break;
            case "universal":
               cardPortraitItem = Array.from(portraitsuniversalList.children).find((item) =>
                  item
                     .querySelector(".card-portrait-video-name")
                     .textContent.includes(hero.name)
               );
               break;
         }

         if (cardPortraitItem) {
            const cardBanned = cardPortraitItem.querySelector(".banned-overlay");
            const cardLine = cardPortraitItem.querySelector(".line");
            updateHeroDisplay(hero, cardBanned, cardLine);
         }
      });
   }

   const selectAllButton = portraitsList.querySelector(".select-all");
   const banAllButton = portraitsList.querySelector(".ban-all");
   
   // Выбор всех героев
   selectAllButton.addEventListener("click", () => updateAllHeroes(true));

   // Бан всех героев
   banAllButton.addEventListener("click", () => updateAllHeroes(false));
}

export { renderPortraits };




// ////////////////////////////////////
// /////  Диалог списка героев  ///////
// ////////////////////////////////////
// import {
//    portraitsList,
//    cardHeroTemplate,
//    portraitsstrengthList,
//    portraitsagilityList,
//    portraitsintelligenceList,
//    portraitsuniversalList,
// } from "../index.js";

// // document.addEventListener("DOMContentLoaded", function () {
// //    heroesListButton.addEventListener("click", function () {
// //       heroesList.classList.add("popup_is-opened");
// //    });

// //    heroesListcloseButton.addEventListener("click", function () {
// //       heroesList.classList.remove("popup_is-opened");
// //    });
// // });

// function renderPortraits(heroes) {
//    // Очищаем списки перед добавлением новых элементов
//    portraitsstrengthList.innerHTML = "";
//    portraitsagilityList.innerHTML = "";
//    portraitsintelligenceList.innerHTML = "";
//    portraitsuniversalList.innerHTML = "";

//    heroes.forEach((hero) => {
//       const cardHeroItem = cardHeroTemplate.cloneNode(true); // Клонируем шаблон для каждого героя
//       const cardHeroButton = cardHeroItem.querySelector(".card-hero-button");
//       const cardBanned = cardHeroItem.querySelector(".banned-overlay");
//       const cardLine = cardHeroItem.querySelector(".line");
//       cardHeroButton.style.backgroundImage = `url("./assets/heroes/${hero.image}")`;

//       cardBanned.style.opacity = "0";
//       cardLine.style.opacity = "0";

//       // Обновляем отображение стилей в зависимости от состояния hero.selected
//       updateHeroDisplay(hero, cardBanned, cardLine);

//       cardHeroButton.addEventListener("click", () => {
//          hero.selected = !hero.selected;
//          updateHeroDisplay(hero, cardBanned, cardLine);
//          console.log(hero.name);
//          console.log(hero.selected);
//       });

//       switch (hero.attribute) {
//          case "strength":
//             portraitsstrengthList.appendChild(cardHeroItem);
//             break;
//          case "agility":
//             portraitsagilityList.appendChild(cardHeroItem);
//             break;
//          case "intelligence":
//             portraitsintelligenceList.appendChild(cardHeroItem);
//             break;
//          case "universal":
//             portraitsuniversalList.appendChild(cardHeroItem);
//             break;
//       }
//    });

//    // Функция обновления отображения героя
//    function updateHeroDisplay(hero, cardBanned, cardLine) {
//       if (hero.selected) {
//          cardBanned.style.opacity = "0";
//          cardLine.style.opacity = "0";
//       } else {
//          cardBanned.style.opacity = "1";
//          cardLine.style.opacity = "1";
//       }
//    }

//    // Функция массового изменения состояния героев
//    function updateAllHeroes(selectAll = true) {
//       heroes.forEach((hero) => {
//          hero.selected = selectAll;
//       });

//       // Обновляем отображение всех героев
//       heroes.forEach((hero) => {
//          let cardHeroItem;
//          switch (hero.attribute) {
//             case "strength":
//                cardHeroItem = Array.from(portraitsstrengthList.children).find((item) =>
//                   item
//                      .querySelector(".card-hero-button")
//                      .style.backgroundImage.includes(hero.image)
//                );
//                break;
//             case "agility":
//                cardHeroItem = Array.from(portraitsagilityList.children).find((item) =>
//                   item
//                      .querySelector(".card-hero-button")
//                      .style.backgroundImage.includes(hero.image)
//                );
//                break;
//             case "intelligence":
//                cardHeroItem = Array.from(portraitsintelligenceList.children).find(
//                   (item) =>
//                      item
//                         .querySelector(".card-hero-button")
//                         .style.backgroundImage.includes(hero.image)
//                );
//                break;
//             case "universal":
//                cardHeroItem = Array.from(portraitsuniversalList.children).find((item) =>
//                   item
//                      .querySelector(".card-hero-button")
//                      .style.backgroundImage.includes(hero.image)
//                );
//                break;
//          }

//          if (cardHeroItem) {
//             const cardBanned = cardHeroItem.querySelector(".banned-overlay");
//             const cardLine = cardHeroItem.querySelector(".line");
//             updateHeroDisplay(hero, cardBanned, cardLine);
//          }
//       });
//    }

//    const selectAllButton = portraitsList.querySelector(".select-all");
//    const banAllButton = portraitsList.querySelector(".ban-all");
//    // Выбор всех героев
//    selectAllButton.addEventListener("click", () => updateAllHeroes(true));

//    // Бан всех героев
//    banAllButton.addEventListener("click", () => updateAllHeroes(false));
// }

// export { renderPortraits };



