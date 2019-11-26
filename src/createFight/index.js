let createStats = {
    needToRefresh: 0,
    stage: 0,
    betterChoise: -1,
    betterChoiseTime: 0,
}

export default function createFight(personage, needToRefreshDungeonData) {
    if (needToRefreshDungeonData) {
        createStats.stage = 0;
    }
    if (personage.canCreateFight == false) {    //вступ в бой только после проверки хп
        checkHP(personage);
        return;
    }
    if ( createStats.needToRefresh > 0 ) {
        createStats.needToRefresh--;
        console.log("ждем");
        return;
    }
    if ( createStats.stage == 0 ) {
        createStats.stage++;
        frames[10].document.location.href = "zayavka.pl?level=haos"; //заходим в хаоты
        console.log("заходим в хаоты");
        createStats.needToRefresh = 2;
        return;
    }
    if ( personage.createByMyself ) {    // сам создаю заявку ( только после того, как проверил, что других нет или не подходят )
        frames[10].document.getElementById("dv2").children[0].click();
        setTimeout(function(){
            frames[10].document.getElementsByName("startime2")[0].selectedIndex= 0;
            frames[10].document.getElementsByName("levellogin1")[0].selectedIndex= 1;
            frames[10].document.getElementById("dv1").children[0].getElementsByTagName("input")[5].click();
            personage.createByMyself = false;
            console.log("Создал заявку сам");
        },1000);
        createStats.needToRefresh = 2;
        return;
    }

    if ( frames[10].document.getElementsByTagName("I").length == 0 ) {    // если заявок нет
        // createStats.stage=1;
        createStats.needToRefresh = 2;
        console.log("заявок нет...");
        personage.createByMyself = true; // можем создавать сами
        return;
    }
    if ( frames[10].document.getElementsByName("gocombat")[0].disabled ) {    // уже подал заявку
        createStats.stage = 0;
        createStats.needToRefresh = 20;
        frames[10].document.location.href = "zayavka.pl?level=haos";
        console.log("уже в заявке");
        return;
    }
    if ( createStats.stage == 1 ) {
        createStats.stage++;
        for (var i=0; i< frames[10].document.getElementsByTagName("I").length; i++) {
            if ( frames[10].document.getElementsByTagName("I")[i].getElementsByTagName("B")[0] ) {    //если не NaN
                if ( +frames[10].document.getElementsByTagName("I")[i].getElementsByTagName("B")[0].innerText < createStats.betterChoiseTime || createStats.betterChoiseTime==0 ) {
                createStats.betterChoiseTime = +frames[10].document.getElementsByTagName("I")[i].getElementsByTagName("B")[0].innerText;
                createStats.betterChoise = i;
                }
            }
            
        }
        console.log(createStats.betterChoise);
        console.log(createStats.betterChoiseTime);
        if ( createStats.betterChoise == -1 || createStats.betterChoiseTime > 5 ) {    // нет нормальных заявок
            console.log("нет нормальных заявок");
            createStats.betterChoiseTime = 0;
            createStats.betterChoise = -1;

            // createStats.stage = 1;
            createStats.needToRefresh = 2;

            personage.createByMyself = true; // можем создавать сами
            return;
        }
        frames[10].document.getElementsByName("gocombat")[createStats.betterChoise].click(); //выбрал самую быструю заявку
        console.log("выбрал заявку");
        // createStats.needToRefresh = 2;
        return;
    }
    if ( createStats.stage == 2 ) {
        createStats.stage=0;

        frames[10].document.getElementsByName("confirm1")[0].click();    // нажал принять участие
        console.log("принял заявку");
        createStats.needToRefresh = 30;

        createStats.betterChoiseTime = 0;
        createStats.betterChoise = -1;
        return;
    }
}

function checkHP(personage) {
    if ( personage.needToRefresh > 0 ) {
        personage.needToRefresh--;
        console.log("ждем");
        return;
    }
    if ( !frames[10].document.getElementById("HP1") ) {    // если не отображаются жизни
        frames[10].document.location.href = "/main.pl?edit=";
        personage.needToRefresh = 2;
        console.log("заходим в инвентарь");
        return;
    }
    if ( frames[10].document.getElementById("HP1").width>50 ) { //120 полные
        personage.canCreateFight = true;
        console.log("Можно создавать поединки! Жизни полные!");
        return;
    }
    if ( frames[10].document.getElementById("HP1").width< 50 ) { //120 полные
        personage.needToRefresh = 30;
        console.log("Жизней не хватает");
        return;
    }
}