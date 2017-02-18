var ss = SpreadsheetApp.getActiveSpreadsheet();
var sVariables = ss.getSheetByName("Variables");

function onOpen() {
    SpreadsheetApp.getUi().createMenu('Refresh').addItem('Refresh All', 'refreshAll').addSeparator().addItem('Refresh Default Values', 'refreshDefaultValues').addToUi();
}

function refreshAll() {
    refreshDefaultValues();
}