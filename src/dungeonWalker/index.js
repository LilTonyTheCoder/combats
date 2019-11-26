let dungeonData = {
    stage: 0,
    dungeonName: 'gribnicaL2', // gribnicaL1 , gribnicaL2

    needToRefresh: 0,
    needToGetItems: true,
    needToOpen: true,
    needToScan: true,
    lastMove: 0,
    needToCheckHash: false,
    isFirstMove: true,
    brodilkaLoaderOffset: 0,
}
let thingsDontTouch = [
    'Заросший тайник',
    'Спуск в нору','Мастер Фунгус',
    'Спуск в Глубины Грибницы',
    'Заросший проход',
    'Ниша в стене',
    'Мудрый Гусениц',
    'Внимательное око',
    'Яйцеобразные наросты',
    'Симпатичные поганки',
    'Плоский гриб',
    'Ядовитые корни',
    'Светящийся мох',
    'Логово Грибоеда',
    'Скопление непонятных грибных образований',
    'Светящийся мох',
    'Отверстие в потолке',
    'Ядовитые корни',
    'Плоский гриб',
    'Яйцеобразные наросты',
    'Внимательное око'
];
let thingsThatIOpen = new Set();
var areaCache = [];

function prepareDungeonScript() {
    dungeonData.brodilkaLoaderOffset = frames[10].document.querySelector('#brodilka .MoveLine').getBoundingClientRect().left - 1;
    dungeonData.isFirstMove = false;
}

function doMove(e, movesList) {
    // console.log(dungeonData.stage);
    if (e>movesList[dungeonData.dungeonName].length-1) {    // если закончились ходы
        console.log("Пройдено");
        return;
    }
    if ( dungeonData.needToRefresh>0 ) {    //когда нужно только обновиться
        dungeonData.needToRefresh--;
        console.log("ждем");
        return;
    }
    let currentMoveHash = frames[10].document.getElementById('brodilka').innerHTML.length;
    if (currentMoveHash === dungeonData.lastMove && dungeonData.needToCheckHash) { // не походилось
        console.log('Длина знаков та же');
        return;
    } else {
        dungeonData.needToCheckHash = false;
        dungeonData.lastMove = currentMoveHash;
    }
    let offsetIMG = frames[10].document.querySelector('#brodilka .MoveLine').getBoundingClientRect().left
    if (offsetIMG < dungeonData.brodilkaLoaderOffset) {
        console.log('Не прогрузилось...')
        return;
    }
    // scanMyStats();    // обновляем инфу о ХП
    // if ( personage.hp < 600) {
    //     console.log("Жизней мало");
    //     dungeonData.needToRefresh = 5;    //ждем, пока жизни восстановятся
    //     frames[10].document.location.href = "javascript:dung_link('')";    //обновляем
    //     return;
    // }

    touchEverything();    //если нужно все открыть
    if (dungeonData.needToRefresh > 0) return;

    grabItems(); // подобрать, что разбросано
    if (dungeonData.needToRefresh > 0) return;

    dungeonData.needToCheckHash = true;
    doFirst();

    let currentStep = movesList[dungeonData.dungeonName][e];

    moveOnMap(currentStep);
    addToTouchList(currentStep);
    removeFromTouchList(currentStep);

    dungeonData.needToRefresh = 1;
    
    dungeonData.stage++;
    console.log(dungeonData.stage);
}


function doFirst() {
    // dungeonData.needToRefresh = 2;
    dungeonData.needToGetItems = true;
    dungeonData.needToOpen = true;
    areaCache = [];    // обновляем кеш действий в конце хода
    dungeonData.needToScan = true;
}

function removeFromTouchList(currentStep) {
    if (currentStep.indexOf('ADD:') !== 0 ) return;
    let itemToTouchName = currentStep.substr(5);
    thingsDontTouch.push(itemToTouchName);

    console.log('Больше нельзя открыть: '+itemToTouchName);

    dungeonData.needToRefresh = 2;
    dungeonData.lastMove = 0;
}


function addToTouchList(currentStep) {
    if (currentStep.indexOf('TOUCH:') !== 0 ) return;

    let itemToTouchName = currentStep.substr(7);
    let indexInArray = thingsDontTouch.indexOf(itemToTouchName);

    thingsDontTouch.splice(indexInArray, 1);
    console.log('Теперь можно открыть: '+ itemToTouchName);

    dungeonData.needToRefresh = 2;
    dungeonData.lastMove = 0;
}

function confirmTouch() {
    let confirmMenuNode = frames[10].document.getElementById("pmenu");

    if ( !(confirmMenuNode && confirmMenuNode.style.visibility === 'visible') ) return;

    if (confirmMenuNode.getElementsByTagName('a').length !== 1) {
        console.log('Подтверждаем атаку');
        confirmMenuNode.children[0].children[0].children[0].click();
        dungeonData.needToRefresh = 1;
    } else {
        console.log('Подтверждаем атаку 2 шаг');
        confirmMenuNode.children[0].click();
        dungeonData.needToRefresh = 2;
    }
}

function touchEverything() {
    if (!dungeonData.needToOpen) return

    if ( dungeonData.needToScan ) {
        scanArea();
        dungeonData.needToScan = false;
    }
    if (areaCache.length === 0) {
        dungeonData.needToOpen = false;
        console.log("нет активных предметов");
    }

    confirmTouch(); // если нужно подтвердить атаку по монстру
    if (dungeonData.needToRefresh > 0) return;

    if (areaCache.length !== 0) {
        try {
            let itemNode = frames[10].document.getElementById("ObjectsMap").children[areaCache[areaCache.length-1]];
            let thingsName = itemNode.title;

            itemNode.click();
            areaCache.pop();    //удаляем последний элемент

            console.log("Нажали на: " + thingsName);
            thingsThatIOpen.add(thingsName);

            confirmTouch();
        } catch(err) {
            areaCache.pop();    //удаляем последний элемент
        }
        dungeonData.needToRefresh = 2;
    }
}

function grabItems() {
    if ( !dungeonData.needToGetItems ) return
    dungeonData.needToGetItems = false;
    if ( frames[10].document.getElementById("items").children.length > 0 ) {    //если есть кнопка слева взять все
        frames[10].document.location.href = "javascript:dung_link('getall=1')";
        console.log("Подбираем вещи");
        dungeonData.needToRefresh = 2;
    }
}

function moveOnMap(currentStep) {
    if (currentStep === "up") frames[10].document.location.href = "javascript:dung_link('path=m1','m1')";
    if (currentStep === "le") frames[10].document.location.href = "javascript:dung_link('path=rl')";
    if (currentStep === "ri") frames[10].document.location.href = "javascript:dung_link('path=rr')";
}

function scanArea() {
    var countObjM = frames[10].document.getElementById("ObjectsMap").children.length;    // количество объектов на карте
    for (var i = 0; i< countObjM; i++) {
        if ( frames[10].document.getElementById("ObjectsMap").children[i].href != "" ) {    //если есть активные вещи (на которые можно нажать)
            let currentItemTitle = frames[10].document.getElementById("ObjectsMap").children[i].title;
            let canTouch = thingsDontTouch.indexOf(currentItemTitle) === -1 ? true : false;
            if (canTouch) {
                areaCache[areaCache.length] = i;
            }
        }
    }
}

export default function dungeonWalker(movesList, needToRefreshDungeonData) {
    if (needToRefreshDungeonData) {
        dungeonData.needToScan = true;
    }
    if (dungeonData.isFirstMove) {
        prepareDungeonScript();
        return;
    }
    doMove(dungeonData.stage, movesList);
}