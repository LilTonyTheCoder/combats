var personage = {
	hp: 0, 
	mg: 0, 
	place: "нет",
	canCreateFight: false,
	needToRefresh: 0,
	needToCheckArrows: true,
	needToCheckPet: true,
	petNoFood: false,
	oneTimePet: true,
	createByMyself: false,
};

fightStats = {
	needToRefreshFight: 0,
	exitFightStage: 0,
}
function startFi() {
	checkPlace();

	if ( personage.place == "в бою" ) {
		personage.canCreateFight = false;
		personage.needToCheckArrows = true;
		personage.needToCheckPet = true;
		createStats.stage = 0;
		dungeonL3.needToScan = true;

		if ( fightStats.needToRefreshFight>0 ) {	//когда нужно только обновиться
			fightStats.needToRefreshFight--;
			console.log("ждем");
			return;
		}
		checkMyStats();
		if ( myHp < 1) {	//выход из боя
			if ( fightStats.exitFightStage == 0 ) {
				fightStats.exitFightStage++;
				$(".UserBattleKick")[1].click(); UserBattleEnd
				// fightStats.needToRefreshFight=2;
				return;
			}
			if ( fightStats.exitFightStage == 1 ) {
				fightStats.exitFightStage++;
				$(".WindowOk")[0].click();
				fightStats.needToRefreshFight=2;
				return;
			}
			if ( fightStats.exitFightStage == 2 ) {
				fightStats.exitFightStage++;
				$(".UserBattleKick")[0].click();
				fightStats.needToRefreshFight=2;
				return;
			}
			if ( fightStats.exitFightStage == 3 ) {
				fightStats.exitFightStage=0;
				$(".UserBattleEnd")[0].click();
				personage.oneTimePet= true;
				console.log("Вышел из боя");
				return;
			}
			
		}
		// if (!personage.petNoFood && personage.oneTimePet) {
		// 	if ( useRes("http://img.combats.ru/i/misc/icons/pet_unleash.gif") ) {	//вызвать животное
		// 		personage.oneTimePet= false;
		// 		return;
		// 	}
		// }
		if ( $(".UserBattleEnd").css("visibility") == "visible" ) {	// выход из боя
			$(".UserBattleEnd")[0].click();
			console.log("вышел из боя");
			return;
		}
		if ( $(".UserBattleKick").css("visibility") == "visible" ) {	// кликаем обновить
			$(".UserBattleKick")[0].click();
			console.log("обновляем");
		}
		if ( useRes("http://img.combats.ru/i/misc/icons/preparation.gif") ) {	//тактический расчет
			return;
		}
		if ( useRes("http://img.combats.ru/i/misc/icons/block_aftershock.gif") ) {	//контузия
			return;
		}
		if ( useRes("http://img.combats.ru/i/misc/icons/hit_restrike.gif") ) {	//прорыв
			return;
		}
		if ( useRes("http://img.combats.ru/i/misc/icons/hp_defence.gif") ) {	//стойкость
			return;
		}
		if ( useRes("http://img.combats.ru/i/misc/icons/multi_agressiveshield.gif") ) {	//агрессивная защита
			return;
		}
		if ( useRes("http://img.combats.ru/i/misc/icons/block_path.gif") ) {	//путь щита
			return;
		}
		// if ( useRes("http://img.combats.ru/i/misc/icons/precise.gif") ) {	//точный выстрел
		// 	$(".WindowOk")[0].click();
		// 	return;
		// }
		// if ( useRes("http://img.combats.ru/i/misc/icons/counter_deathwalk.gif") ) {	//Поступь смерти
		// 	return;
		// }
		// if ( useRes("http://img.combats.ru/i/misc/icons/hp_enrage.gif") ) {	//Ярость
		// 	return;
		// }
		
		// if ( myMg<30 ) {	//если закончилась мана
		// 	if ( useRes("http://img.combats.ru/i/misc/icons/attack_manaboost.gif") ) {	//Восстанавливаем Ману
		// 	return;
		// 	}
		// }
		

		$(".UserBattleCommit")[0].click(); // нажимаем ударить
		console.log("Ударил");
	}
}


createStats = {
	needToRefresh: 0,
	stage: 0,
	betterChoise: -1,
	betterChoiseTime: 0,
	stageArrows: 0,
	stagePet: 0,
}
function createFight() {
	// return; // заглушка
	checkPlace();

	if ( personage.place == "нет" ) {	// если не в бою
		if (personage.canCreateFight == false) {	//вступ в бой только после проверки хп
			checkHP();
			return;
		}
		if ( createStats.needToRefresh > 0 ) {
			createStats.needToRefresh--;
			console.log("ждем");
			return;
		}
		/*if (personage.needToCheckArrows == true && false) {	//проверка чтобы стрел хватало и надевание
			if (createStats.stageArrows == 0) {
				frames[10].document.location.href = "/main.pl?edit=";
				personage.needToRefresh = 2;
				console.log("заходим в инвентарь");
				createStats.stageArrows++;
				return;
			}
			if (createStats.stageArrows == 1) {
				var arrowStr = frames[10].document.getElementById("w10").title;
				var arrowResult = arrowStr.match( /Количество: (\d{1,3})/ );
				if ( arrowResult == null ) {	// стрелы не одеты почему то
					console.log("стрелы не одеты почему то");
					createStats.stageArrows = 0;
					personage.needToCheckArrows = false;
					return;
				}
				if ( +arrowResult[1]>100 ) {
					console.log("стрел достаточно. идем в бой");
					createStats.stageArrows = 0;
					personage.needToCheckArrows = false;
					return;
				}
				frames[10].document.location.href = "main.pl?edit=4";
				console.log("заходим в Прочее");
				personage.needToRefresh = 2;
				createStats.stageArrows++;
				return;
			}
			if ( createStats.stageArrows == 2 ) {
				var neededBlock;
				for (var i=0; i< frames[10].document.getElementById("box").children.length-1;i++ ) {
					if (!neededBlock) {
						if (frames[10].document.getElementById("box").children[i].children[0].children[0].src == "http://img.combats.ru/i/items/arrow_common100.gif") {
						neededBlock = i;
						}
					}
				}
				if (neededBlock) {
					frames[10].document.getElementById("box").children[neededBlock].children[0].children[4].click();
					console.log("Надели стрелы");
				} else {
					console.log("Нет стрел");
					createStats.stageArrows = 0;
					personage.needToCheckArrows = false;
					return;
				}
				personage.needToRefresh = 2;
				createStats.stageArrows = 1;
				return;
			}
		}*/
		/*if ( personage.needToCheckPet && !personage.petNoFood && false) {	//какая-то проверка со зверем
			if (createStats.stagePet == 0) {
				frames[10].document.location.href = "main.pl?pet=1";
				personage.needToRefresh = 2;
				createStats.stagePet++;
				console.log("Заходим в животное");
				return
			}
			if ( createStats.stagePet == 1 ) {
				var petStr = frames[10].document.getElementsByTagName("SPAN")[7].nextSibling;
				var food = +petStr.data.slice(2);
				if ( food < 20 ) {
					if ( frames[10].document.getElementsByClassName("thing_txt")[0] && frames[10].document.getElementsByClassName("thing_txt")[0].innerText.match( /Кошачья Похлебка/ )) { //есть еда
						frames[10].document.getElementsByTagName("SPAN")[8].nextElementSibling.nextElementSibling.click();
						console.log("покормил");
						createStats.stagePet=0;
						personage.needToCheckPet = false;
						return;
					} else {
						personage.petNoFood = true;
						console.log("нет еды. Животное больше не пользуем");
						createStats.stagePet=0;
						personage.needToCheckPet = false;
					}
				} else {
					console.log("Животное сыто");
					createStats.stagePet=0;
					personage.needToCheckPet = false;
					return;
				}
			}
		}*/
		if ( createStats.stage == 0 ) {
			createStats.stage++;
			frames[10].document.location.href = "zayavka.pl?level=haos"; //заходим в хаоты
			console.log("заходим в хаоты");
			createStats.needToRefresh = 2;
			return;
		}



		if ( personage.createByMyself ) {	// сам создаю заявку ( только после того, как проверил, что других нет или не подходят )
			frames[10].document.getElementById("dv2").children[0].click();
			frames[10].document.getElementsByName("startime2")[0].selectedIndex= 0;
			frames[10].document.getElementsByName("levellogin1")[0].selectedIndex= 1;
			frames[10].document.getElementById("dv1").children[0].getElementsByTagName("input")[6].click();
			personage.createByMyself = false;
			console.log("Создал заявку сам");
			createStats.needToRefresh = 2;
			return;
		}



		if ( frames[10].document.getElementsByTagName("I").length == 0 ) {	// если заявок нет
			// createStats.stage=1;
			createStats.needToRefresh = 2;
			console.log("заявок нет...");
			personage.createByMyself = true; // можем создавать сами
			return;
		}
		if ( frames[10].document.getElementsByName("gocombat")[0].disabled ) {	// уже подал заявку
			createStats.stage = 0;
			createStats.needToRefresh = 20;
			frames[10].document.location.href = "zayavka.pl?level=haos";
			console.log("уже в заявке");
			return;
		}
		if ( createStats.stage == 1 ) {
			createStats.stage++;
			for (var i=0; i< frames[10].document.getElementsByTagName("I").length; i++) {
				if ( frames[10].document.getElementsByTagName("I")[i].getElementsByTagName("B")[0] ) {	//если не NaN
					if ( +frames[10].document.getElementsByTagName("I")[i].getElementsByTagName("B")[0].innerText < createStats.betterChoiseTime || createStats.betterChoiseTime==0 ) {
					createStats.betterChoiseTime = +frames[10].document.getElementsByTagName("I")[i].getElementsByTagName("B")[0].innerText;
					createStats.betterChoise = i;
					}
				}
				
			}
			console.log(createStats.betterChoise);
			console.log(createStats.betterChoiseTime);
			if ( createStats.betterChoise == -1 || createStats.betterChoiseTime > 5 ) {	// нет нормальных заявок
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

			frames[10].document.getElementsByName("confirm1")[0].click();	// нажал принять участие
			console.log("принял заявку");
			createStats.needToRefresh = 30;

			createStats.betterChoiseTime = 0;
			createStats.betterChoise = -1;
			return;
		}

	}
}

function rand(min, max){
return (max-min)*Math.random()+min;
}


var timerBK = setInterval(function() {
	// console.log("работаем");
	startFi();	// выполняется, когда персонаж в бою
	createFight();
	// goDungeonK3();
} ,   rand(500, 1000) );

// clearInterval(timerBK);


// $(".UserBattleEnd").is(":visible")
var myHp= 0;
var myMg= 0;

function useRes(e) {
	var allRes = $(".UserBattleResources")[1].children.length;
	var srcIMG = e;
	var whatToReturn;
	for (var i=0; i<allRes; i++) {
		if ($(".UserBattleResources")[1].children[i].children[0]) {
			if ( $(".UserBattleResources")[1].children[i].children[0].src == srcIMG) {

				if ( $(".UserBattleResources")[1].children[i].classList.value == "UserBattleMethod" ) {
					whatToReturn = true; // прием был доступен
					$(".UserBattleResources")[1].children[i].click();
				}
			
			}
		}
		
	}
	return whatToReturn;
}
function checkMyStats() {
	// myMg = +$("span.UserSlotMagic")[0].children[0].innerText;
	// var strCache = frames[10].document.getElementById("HP").innerText;
	// var regCache = strCache.match( /\d{1,}/ );
	// myHp = +regCache[0];
	myHp = +$("span.UserSlotHP")[0].children[0].innerText;
}
function checkPlace() {
	if ( $(".UserBattleError").parent().parent().parent().parent().parent().css("display") == "block" ) {	// $(".UserBattleList")[0] && $(".UserBattleList")[0].children.length > 1
		personage.place = "в бою";
		return;
	}
	personage.place = "нет";
}

function checkHP() {
	if ( personage.needToRefresh > 0 ) {
		personage.needToRefresh--;
		console.log("ждем");
		return;
	}
	if ( !frames[10].document.getElementById("HP1") ) {	// если не отображаются жизни
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

dungeonL3 = {
	stage: 0, 
	needToRefresh: 0,
	needToGetItems: true,
	needToOpen: true,
	needToScan: true,
}
// var movesL3 = ["up","le","up","ri","up","up","ri","up","up","le","ri","ri","le","up","le","up","le","ri","up","up","ri","up","ri","ri","up","le","up","up","up","le","up","ri","le","up","ri","up","up","le","ri","ri","up","le","up","up","up","le","up","ri","up","ri","up","le","up","ri","up","ri","ri","up","le","up","up","le","up","up","le","up","ri","up","up","up","le","up","le","le","up","le","up","up","le","up","ri","ri","up","le","up","le","le","up","le","up","le","le","up","le","up","up","le","up","up","up","le","up","le","le","up","up","le","le","up","ri","up","up","up","up","le","ri","up","le","up","ri","up","le","up","up","le","up","ri","ri","up","up","le","le","up","ri","up","up","le","up","up","up","up","up","le","up","up","up","up","ri","up","up","ri","up","le","up","ri","up","up","le","up","ri","ri","up","up","le","le","up","ri","up","up","ri","up","up","up","up","le","up","ri","up","up","ri"];

var movesL3 = ["up","up","le","up","le","up","up","up","le","up","ri","up","up","up","up","up","up","ri","up","up","up","up","ri","up","up","up","up","ri","up","up","up","le","ri","ri","up","up","up","ri","up","ri","up","le","le","up","le","up","le","up","up","up","le","up","up","up","le","up","up","ri","up","le","up","ri","up","up","le","up","ri","up","up","ri","up","up","ri","up"];
var areaCache = [];

function goDungeonK3() {
	checkPlace();
	if ( personage.place == "в бою" ) {
		return;
	}
	doMove(dungeonL3.stage);
}
function doMove(e) {
	// console.log(dungeonL3.stage);
	if (e>movesL3.length-1) {	//	если закончились ходы
		console.log("Пройдено");
		return;
	}
		if ( dungeonL3.needToRefresh>0 ) {	//когда нужно только обновиться
		dungeonL3.needToRefresh--;
		console.log("ждем");
		return;
	}
	// checkMyStats();	// обновляем инфу о ХП
	// if ( myHp < 600) {
	// 	console.log("Жизней мало");
	// 	dungeonL3.needToRefresh = 5;	//ждем, пока жизни восстановятся
	// 	frames[10].document.location.href = "javascript:dung_link('')";	//обновляем
	// 	return;
	// }
	if ( dungeonL3.needToOpen ) {	//если нужно все открыть
		if ( dungeonL3.needToScan ) {
			scanArea();
			dungeonL3.needToScan = false;
		}
		if (areaCache.length == 0) {
			dungeonL3.needToOpen = false;
			console.log("нет активных предметов");
		}
		if (areaCache.length != 0) {
			frames[10].document.getElementById("ObjectsMap").children[areaCache[areaCache.length-1]].click();
			areaCache.pop();	//удаляем последний элемент
			console.log("Открыли что-то");
			if ( frames[10].document.getElementById("pmenu").children[0] ) {	// если нужно подтвердить атаку по монстру
				var timerId2 = setTimeout( frames[10].document.getElementById("pmenu").children[0].click(), 200);
			}
			dungeonL3.needToRefresh = 2;
			return;
		}
	}
	if ( dungeonL3.needToGetItems ) {	//	берем то, что разбросано
		dungeonL3.needToGetItems = false;
		if ( frames[10].document.getElementById("items").children.length > 0 ) {	//если есть кнопка слева взять все
			frames[10].document.location.href = "javascript:dung_link('getall=1')";
			console.log("Подбираем вещи");
			dungeonL3.needToRefresh = 2;
			return;
		}
	}
	if (movesL3[e] == "up") {
		doFirst();
		frames[10].document.location.href = "javascript:dung_link('path=m1','m1')";
	} 
	if (movesL3[e] == "le") {
		doFirst();
		frames[10].document.location.href = "javascript:dung_link('path=rl')";
	} 
	if (movesL3[e] == "ri") {
		doFirst();
		frames[10].document.location.href = "javascript:dung_link('path=rr')";
	} 
	dungeonL3.stage++;
}
function doFirst() {
	dungeonL3.needToRefresh = 2;
	dungeonL3.needToGetItems = true;
	dungeonL3.needToOpen = true;
	areaCache = [];	// обновляем кеш действий в конце хода
	dungeonL3.needToScan = true;
}
function scanArea() {
	var countObjM = frames[10].document.getElementById("ObjectsMap").children.length;	// количество объектов на карте
	for (var i = 0; i< countObjM; i++) {
		if ( frames[10].document.getElementById("ObjectsMap").children[i].href != "" ) {	//если есть активные вещи (на которые можно нажать)
			areaCache[areaCache.length] = i;
			// frames[10].document.getElementById("ObjectsMap").children[i].click();
			/*if ( frames[10].document.getElementById("pmenu").children[0] ) {
				var timerId2 = setTimeout( frames[10].document.getElementById("pmenu").children[0].click(), 200);
			}*/
		}
	}
}
