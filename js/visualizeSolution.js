(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */


        function visualizeSolution(map) {
            var mapRows =  map.length; // Кол-во рядов на исходной карте
            var mapCols =  map[0].length; // Кол-во столбцов на исходной карте
            var islandCount = 0; // Кол-во островов. На протяжении выполнения данной функции это число будет корректироваться 
            var waterBound = true; // Индикатор берега, boolean. Если предыдущая клетка была WATER, то true, иначе false.
        
            var mapClone = new Array(mapRows); // Начинаем создавать дубликат карты, где будем нумеровать острова
            var neighborList = [0]; // В этом массиве будет список номеров островов. 
            var minIslandVal = 0; 
            var maxIslandVal = 0;
            var animation =[]; // Двумерный массив для анимации. В каждом подмассиве: "0" - row, "1" - col, "2" - текст элемента, "3" - цвет рамки, "4" - сообщение в консоль
            var animationFrame =-1;
            
         
        function animate(){
            var counter = 0;
            var animate = setInterval(animateFrame, 300); 
            function animateFrame () {
                renderEl(counter);
                counter++;
                if (counter == animationFrame + 1) {
                    clearInterval(animate);
                }
            }
            function renderEl(index) {
                var el = document.getElementById('vis_' + animation[index][0] + '-' + animation[index][1]);
                if (animation[index][3]) { // Если надо рисуем рамку
                    el.style = "border: 1px solid " + animation[index][3] ;
                }
                
               if(animation[index][2]){
                  el.innerText = animation[index][2]; 
                } 
                
                if (animation[index][4]) {
                    
                    root.SHRI_ISLANDS.myCon(animation[index][4]);
                    console.log('1')
                }
                
            }
        }
    
        //Start
            
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
                    //--------------------------------------------------------------------------------Анимация
                    animation.push(new Array(i,j,neighborList[islandCount],'coral')); //Нумеруем остров
                    animationFrame++;
                    //--------------------------------------------------------------------------------Конец анимации

                } else { //если клетка - вода..
                    mapClone[i].push(WATER); // ..продолжаем достраивать mapClone - ставим WATER в соответствующее место
                    waterBound = true; // показатель наличия воды 
                    //--------------------------------------------------------------------------------Анимация
                    animation.push(new Array(i,j,'','blue'));
                    animationFrame++;
                    //--------------------------------------------------------------------------------Конец анимации
                }     
            }
        }   //--------------------------------------------------------------------------------Анимация
            animation.push(new Array(0,0,'','','В горизонтальном направлении вижу ' + islandCount + ' островов'));
            animationFrame++;
            animation.push(new Array(0,0,'','','Уточняю количество островов - начинаю обход в вертикальном направлении'));
            animationFrame++;
            //--------------------------------------------------------------------------------Конец анимации
            
            
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
                
                //--------------------------------------------------------------------------------Анимация
                animation.push(new Array(i,j,'','dark',''));
                animationFrame++;
                //--------------------------------------------------------------------------------Конец анимации
                
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
                        
                        //--------------------------------------------------------------------------------Анимация
                        animation.push(new Array(i-1,j,'','#D900D9',''));
                        animationFrame++;
                        
                        for (var m = 0; m < mapRows; m++){
                            
                            for(n =0; n < mapCols; n++){
                               
                                if (mapClone[m][n] == maxIslandVal) {
                                    mapClone[m][n] = minIslandVal;
                                    animation.push(new Array(m,n, minIslandVal,'#D900D9',''));
                                    animationFrame++;
                                }
                            }
                        }
           
                        animation.push(new Array(i,j,'','#D900D9','Остров №' + minIslandVal + ' поглотил остров №' + maxIslandVal));
                        animationFrame++;
                        
                        //--------------------------------------------------------------------------------Конец анимации
                        
                        
                    }
                } else if (mapClone[i][j] && waterBound) {//..если клетка остров, а предыдущая была водой
                    waterBound = false; // убираем индикатор берега, т.к. мы идем по суше
                } else if (!mapClone[i][j]) { // если клетка - вода
                    waterBound = true; 
                }
            }
           
        }
                    //--------------------------------------------------------------------------------Анимация
                        animation.push(new Array(0,0,'','','Подсчет окончен, островов найдено ' + islandCount));
                        animationFrame++;
                        
                    //--------------------------------------------------------------------------------Конец анимации
            
        animate(); // Проигрываем записанные фреймы   
            
    }
    
    function buildMap(cols, rows) { // Строит карту полностью из воды
        var newMap = new Array(rows);
        for(var i = 0; i < rows; i++) {
            newMap[i] = [];
            for(var j = 0; j < cols; j++) {
                newMap[i][j] = WATER; 
            } 
        } 
        return newMap;
    }
    

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
    root.SHRI_ISLANDS.buildMap = buildMap;
})(this);
