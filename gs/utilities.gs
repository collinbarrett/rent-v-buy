function dict2dArrayLookup(key, dict2dArray) {
    for (var i = 0, dict2dArrayHeight = dict2dArray[0].length; i < dict2dArrayHeight; i++) {
        if (dict2dArray[0][i] == key) {
            return i;
        }
    }
}

function getColIndex(sheet, colHeaderRowIndex, colHeader) {
    var headerData = sheet.getRange("A" + colHeaderRowIndex + ":" + colHeaderRowIndex).getValues();
    for (var i = 0, headerDataLength = headerData[0].length; i < headerDataLength; i++) {
        if (headerData[0][i] == colHeader) {
            return String.fromCharCode(65 + i);
        }
    }
    return null;
}

function getRowIndex(sheet, rowHeaderColIndex, rowHeader) {
    var headerData = sheet.getRange(rowHeaderColIndex + "1:" + rowHeaderColIndex).getValues();
    for (var i = 0, headerDataLength = headerData.length; i < headerDataLength; i++) {
        if (headerData[i][0] == rowHeader) {
            return i;
        }
    }
    return null;
}

function getVariableCellDefault(calcVariable) {
    var colIndex = getColIndex(sVariables, 1, "Variable");
    var rowIndex = (getRowIndex(sVariables, colIndex, calcVariable) + 1).toString();
    colIndex = getColIndex(sVariables, 1, "Default Value");
    return colIndex + rowIndex;
}

function getVariableValueDefault(calcVariable) {
    var colIndex = getColIndex(sVariables, 1, "Variable");
    var rowIndex = (getRowIndex(sVariables, colIndex, calcVariable) + 1).toString();
    colIndex = getColIndex(sVariables, 1, "Default Value");
    var value = sVariables.getRange(colIndex + rowIndex).getValue();
    if (value) {
        return value;
    } else {
        return null;
    }
}

function getVariableValue(calcVariable) {
    var colIndex = getColIndex(sVariables, 1, "Variable");
    var rowIndex = (getRowIndex(sVariables, colIndex, calcVariable) + 1).toString();
    colIndex = getColIndex(sVariables, 1, "Value");
    var value = sVariables.getRange(colIndex + rowIndex).getValue();
    if (value) {
        return value;
    } else {
        return getVariableValueDefault(calcVariable);
    }
}