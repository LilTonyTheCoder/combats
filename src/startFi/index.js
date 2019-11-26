let fightCacheParams = {
    hadIUseSkills: false,
}

let fightStats = {
    needToRefreshFight: 0,
    exitFightStage: 0,
}

export default function startFi(personage) {
    personage.canCreateFight = false;
    fightCacheParams.hadIUseSkills = false;

    scanMyStats(personage);
    let currentFightStage = getCurrentFightStage(personage);

    switch(currentFightStage) {
        case 'waiting':
            fightStats.needToRefreshFight--;
            console.log("ждем");
            break
        case 'endBattle':
            exitBattle();
            break;
        case 'endBattlePopup':
            $(".UserBattleEnd")[0].click();
            console.log("вышел из боя");
            break;
        case 'waitingForOpponentMove':
            $(".UserBattleKick")[0].click();
            console.log("обновляем");
        case 'hitOpponent':
            useSkillsInBattle(personage);
            hitOpponent();
    }
}

function getCurrentFightStage(personage) {
    if (fightStats.needToRefreshFight>0) return 'waiting';
    if ( personage.hp < 1) return 'endBattle';
    if ($(".UserBattleEnd").css("visibility") == "visible") return 'endBattlePopup';
    if ($(".UserBattleKick").css("visibility") == "visible") return 'waitingForOpponentMove';
    return 'hitOpponent';
}

function useSkillsInBattle(personage) {
    if ( personage.hp < 200) {
        useRes(["spirit_survive"]) // выжить
    }
    useRes([
        "preparation", // тактический расчет
        'block_path', // путь щита
        'multi_agressiveshield', // агрессивная защита
        'hit_shock', // ошеломить
        'block_aftershock', // контузия
        'block_activeshield', // активная защита
        'hp_defence' // стойкость
    ]);
}

function hitOpponent() {
    if (fightCacheParams.hadIUseSkills) return;

    $(".UserBattleCommit")[0].click(); // нажимаем ударить
    console.log("Ударил");
}

function useRes(imgArray) {
    imgArray.forEach(src => {
        let srcIMG = `http://img.combats.com/i/misc/icons/${src}.gif`;
        let skillsBar = $(".UserBattleResources")[1];
        let totalSkillsCount = skillsBar.children;
        totalSkillsCount = [...totalSkillsCount];

        totalSkillsCount.forEach((nodeEl, num) => {
            let imgNode = skillsBar.children[num].children[0];
            if ( 
                imgNode
                && imgNode.src == srcIMG
                && imgNode.parentNode.classList.value == "UserBattleMethod"
            ) {
                fightCacheParams.hadIUseSkills = true;
                skillsBar.children[num].click();
                return
            }
        })
    })
}

function exitBattle() {
    switch(fightStats.exitFightStage) {
        case 0:
            $(".UserBattleKick")[1].click();
            break;
        case 1:
            $(".WindowOk")[0].click();
            break;
        case 2:
            $(".UserBattleKick")[0].click();
            break;
        case 3:
            $(".UserBattleEnd")[0].click();
            break;
    }
    if (fightStats.exitFightStage === 3) {
        fightStats.exitFightStage = 0;
        console.log("Вышел из боя");
    } else {
        fightStats.needToRefreshFight = 2;
        fightStats.exitFightStage++;
    }
}

function scanMyStats(personage) {
    // myMg = +$("span.UserSlotMagic")[0].children[0].innerText;
    // var strCache = frames[10].document.getElementById("HP").innerText;
    // var regCache = strCache.match( /\d{1,}/ );
    // personage.hp = +regCache[0];
    personage.hp = $("span.UserSlotHP")[0].children[0].innerText;
}
