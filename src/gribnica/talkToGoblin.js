goblinQuestions = {
    'Когда прилетает дракон?' : 'Никогда не прилетает',
    'Какая школа магии есть в этом мире?' : 'Огня/Земли/Воды/Воздуха',
    'Где живут Проклятия Глубин?' : 'В Пещерах Мглы',
    'Какой из этих праздников не отмечают в мире БК?': 'День Космонавтики',
    'Что нужно, чтобы переносить больше вещей?' : 'Сумки',
    'Повелителя чего нет в этом мире?' : 'Повелителя Дорог',
    'Какая пещера расположена в городе AngelsCity?' : 'Бездна',
    'Где можно в городе снять номер?' : 'Гостиница',
    'Какого параметра нет в игре?' : 'Скорость',
    'Какого класса нет в игре?' : 'Разведчик',
    'Кто из этих воинов орудует кинжалами?' : 'Увороты',
    'Кто обычно встречает людей у Фонтана возрождения?' : 'Лич',
    'EastCity — чей это город?' : 'Лорда Разрушителя',
    'В каком городе расположены Туманные низины?' : 'Devilscity',
    'Какой город расположен в районе болот?' : 'Devilscity'
};

    // {
    //     'i' : 'Проверка знаний!',
    //     'center' : 'Что у него в руках?',
    //     'img' : 'http://img.combats.com/i/chars/0/1026_vh8728572092.gif',
    //     'answer' : 'Ковш'
    // }, {
    //     'i' : 'Проверка знаний! Кто это такой?',
    //     'img' : 'http://img.combats.com/i/chars/0/1232_hqfetot.gif',
    //     'answer': 'Повелитель Огня'
    // }

function answerGoblin() {
    if (frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].children[0].innerText !== 'Внезапный Гоблин') return;

    if (frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].getElementsByTagName('a').length === 1) {
        frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].getElementsByTagName('a')[0].click();
    }

    let questionIMG = frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].getElementsByTagName('img')[0].src;
    let questionText;
    if (questionIMG) {
        questionText = frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].getElementsByTagName('i')[0].innerText;
    } else {
        questionText = frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].getElementsByTagName('center')[0].innerText;
    }
    frames[10].document.getElementById('mmoves3').nextSibling.nextSibling.children[0].children[0].children[1].getElementsByTagName('a')[0].click(); // выбираем первый ответ пока
}
