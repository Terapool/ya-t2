(function (root) {
    
    

    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;  
    var map = root.SHRI_ISLANDS.MAP;
    var count = root.SHRI_ISLANDS.solution(map);
    var buildMap = root.SHRI_ISLANDS.buildMap;

    
    
    
    //page elements
    var colsInput = document.getElementById('colsInput');
    var rowsInput = document.getElementById('rowsInput');
    var buttonBuild = document.getElementById('buttonBuild');
    var buildArea = document.getElementById('buildArea');
    var myConsole = document.getElementById("myConsole");
    
    
    
    
    
    //Section - map
    
    drawMapInBuidArea(map);
    myCon('Построена карта по умолчанию. Кликните по сегментам для редактирования или постройте новую.');
    buttonBuild.addEventListener("click", buttonBuildClick, false);
    buildArea.addEventListener("click", mapCellClick, false);
    root.SHRI_ISLANDS.customMap = map;
    
    
    function mapCellClick(e){
        var target = e.target;
        var elId = target.id;
        var elClass = target.className;
        var row, col, dashIndex;
        var newMap = root.SHRI_ISLANDS.customMap;
        
        
        if(~elClass.indexOf('map__cell') && elId){ // только для ячеек
            dashIndex = elId.indexOf('-'); // позиция тире для расшифровки номера строки и столбца
            
            row = elId.substr(0,dashIndex);
            col = elId.substr(dashIndex + 1, elId.length - dashIndex - 1);
            
            
            if (elClass == 'map__cell map__cell_island'){
                target.className = 'map__cell map__cell_water';
                newMap[row][col] = WATER;
                myCon('Теперь в позиции ' + col +',' + row + ' сплошное море');
                
            }
            else {
                target.className = 'map__cell map__cell_island';
                newMap[row][col] = ISLAND;
                myCon('Теперь в позиции ' + col +',' + row + ' видна земля');
            }
            
        root.SHRI_ISLANDS.customMap = newMap; // Записываем карту в объект SHRI_ISLANDS   
        console.log(newMap);
        }
            
        console.log(target.className);
        
    }
    
    function drawMapInBuidArea(mapToBuild) {
        buildArea.innerHTML = "";
        buildArea.appendChild(root.SHRI_ISLANDS.render(mapToBuild, count));

        
    }
    
    function correctInput() {
        
        colsInput.value = colsInput.value > 0 ? colsInput.value : 2;
        rowsInput.value = rowsInput.value > 0 ? rowsInput.value : 2;
    }
    
    
    function buttonBuildClick() {
        var newMap;
        correctInput();
        newMap = buildMap(colsInput.value, rowsInput.value);
        drawMapInBuidArea(newMap);
        myCon('Построена карта ' + colsInput.value + '&times;' + rowsInput.value + ". Кликните по сегментам для редактирования");
        root.SHRI_ISLANDS.customMap = newMap; // Записываем карту в объект SHRI_ISLANDS
    }
    
    function myCon (msg) { // выводит сообщения с датой в нашу "консоль"
        var br = '<br/>';
        var space = ' ';
        var separator = ':';
        var data = new Date();
        var hour = data.getHours();
        var minutes = data.getMinutes();
        var seconds = data.getSeconds();
        var time;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        time = '<i>' + hour + separator + minutes + separator + seconds + '</i>'; 
        myConsole.innerHTML = time + space + msg + br + myConsole.innerHTML;
        
    }
    
    
    
    
    
    
    
    
})(this);
