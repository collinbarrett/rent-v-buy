var ss = SpreadsheetApp.getActiveSpreadsheet();
var sVariables = ss.getSheetByName("Variables");

function onOpen(e) {
    //refresh all data
    //if quandlApiKey, cache in variable
}

function onEdit(e) {
    //refresh all data affected by edit
    //if quandlApiKey added/updated, cache in variable
}