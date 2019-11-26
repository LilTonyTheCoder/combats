export default function checkPlace(personage) {
    if ( $(".UserBattleError").parent().parent().parent().parent().parent().css("display") == "block" ) {    // $(".UserBattleList")[0] && $(".UserBattleList")[0].children.length > 1
        personage.place = "в бою";
        return;
    }

    let dungeonMapNode = frames[10].document.querySelector("#brodilka");
    if ( dungeonMapNode && dungeonMapNode.getBoundingClientRect() ) {
        personage.place = 'в подземелье';
        return;
    }
    personage.place = "нет";
}
