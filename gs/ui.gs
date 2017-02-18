var ss = SpreadsheetApp.getActiveSpreadsheet();
var sVariables = ss.getSheetByName("Variables");

function onOpen() {
    refreshAll();
    SpreadsheetApp.getUi().createMenu('Refresh').addItem('Refresh All', 'refreshAll').addSeparator().addItem('Refresh Default Values', 'refreshDefaultValues').addToUi();
    //refresh all data
    //if quandlApiKey, cache in variable
}

function refreshAll() {
    refreshDefaultValues();
}

function onEdit(e) {
    //refresh all data affected by edit
    //if quandlApiKey added/updated, cache in variable
}