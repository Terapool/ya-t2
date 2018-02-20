(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        var mapRows =  map.length; // Кол-во рядов на исходной карте
        var mapCols =  map[0].length; // Кол-во столбцов на исходной карте
        var islandCount = 0; // Кол-во островов. На протяжении выполнения данной функции это число будет корректироваться 
        var waterBound = true; // Индикатор берега, boolean. Если предыдущая клетка была WATER, то true, иначе false.
        
        var mapClone = new Array(mapRows); // Начинаем создавать дубликат карты, где будем нумеровать острова
        var neighborList = [0]; // В этом массиве будет список номеров островов. 
        var minIslandVal = 0; 
        var maxIslandVal = 0;
        
        //Делаем обход клеток по рядам исходной карты map и строим mapClone
        for(var i = 0; i < mapRows; i++) {
            mapClone[i] = []; // Формируем на дубликате карты пустой массив в данном ряду
            waterBound = true; // для первого элемента ряда граница как с водой (нет соединения с сушей)
            for (var j = 0; j< mapCols; j++) { //перебираем последовательно элементы ряда исходной карты map
                if (map[i][j] == ISLAND) { //если клетка - остров..
                    if (waterBound) { //.. и была граница с водой..
                        neighborList.push(++islandCount); // ..Счетчик острова +1, заносим номер острова в neighborList..
                        waterBound = false; // убираем индикатор берега, т.к. мы идем по суше
                    } 
                    mapClone[i].push(neighborList[islandCount]); // теперь клетка на дубликате карты ссылается на номер элемента массива neighborList

                } else { //если клетка - вода..
                    mapClone[i].push(WATER); // ..продолжаем достраивать mapClone - ставим WATER в соответствующее место
                    waterBound = true; // показатель наличия воды 
                }     
            }
        }
        /* Сформированная карта mapClone соостветствует исходной map,
        но в месте островов теперь хранит ссылку на элемент массива
        со списком номеров островов neighborList 
        */
        
        /* Делаем обход клеток по столбцам уже карты-дубликата mapClone
        с целью объединить те острова, которые соприкасаются по вертикали 
        */
        
        for(var j=0; j < mapCols; j++) {
            waterBound = true; // для первого элемента столбца граница как с водой (нет соединения с сушей)
            for(var i = 0; i < mapRows; i++) {
                if(!waterBound && mapClone[i][j]){ // Если клетка суша - и предыдущая соседняя клетка тоже была сушей
                    if (neighborList[mapClone[i][j]] != neighborList[mapClone[i-1][j]]) { //.. и это помечено разными цифрами..
                        --islandCount; //..то скорректируем счетчик. Уменьшим количество островов на 1.
                        minIslandVal = Math.min(neighborList[mapClone[i][j]], neighborList[mapClone[i-1][j]]);
                        maxIslandVal = Math.max(neighborList[mapClone[i][j]], neighborList[mapClone[i-1][j]]);
                        
                        for(var k=0; k < neighborList.length; k++) {
                            if (neighborList[k] == maxIslandVal) {
                                neighborList[k] = minIslandVal;
                            }
                        }
                        
                        neighborList[maxIslandVal] = minIslandVal; // номер объединенного острова будет наименьшим из доступных
                    }
                } else if (mapClone[i][j] && waterBound) {//..если клетка остров, а предыдущая была водой
                    waterBound = false; // убираем индикатор берега, т.к. мы идем по суше
                } else if (!mapClone[i][j]) { // если клетка - вода
                    waterBound = true; 
                }
            }
           
        }

        return islandCount;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
