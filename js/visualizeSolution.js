(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution() {
        // todo: визуализировать работу алгоритма
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
