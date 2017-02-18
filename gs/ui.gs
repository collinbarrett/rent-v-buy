function onOpen(e) {
    //Update the date in the README to use as a cache purge parameter for custom functions
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("README").getRange('A2').setValue(new Date().toJSON().slice(0, 10).replace(/-/g, '/'));
}