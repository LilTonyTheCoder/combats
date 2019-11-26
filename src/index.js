import startFi from './startFi/index.js';
import createFight from './createFight/index.js';
import dungeonWalker from './dungeonWalker/index.js';
import movesList from './maps.js';

import rand from './utils/rand.js';
import checkPlace from './utils/checkPlace.js';

let personage = {
    hp: 0,
    place: "нет",
    canCreateFight: false,
    needToRefresh: 0,
    createByMyself: false,
};

let needToRefreshDungeonData = false;
let needToRefreshCreateData = false;

let mainTimer = setInterval(function() {
    checkPlace(personage);
    switch(personage.place) {
        case 'в бою':
            startFi(personage);    // выполняется, когда персонаж в бою
            needToRefreshCreateData = true;
            needToRefreshDungeonData = true;
            break;
        case 'в подземелье':
            dungeonWalker(movesList, needToRefreshDungeonData);    // бродилка по лабиринтам //
            needToRefreshDungeonData = false;
            break;
        // case 'нет':
        //     createFight(personage, needToRefreshDungeonData); // подает заявку на бой
        //     needToRefreshDungeonData = false;
    }
} ,   rand(500, 1000) );
