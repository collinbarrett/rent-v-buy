function refreshDefaultValues() {
    getDefaultMedianSalePrice();
    getDefaultMortgageInterestRate();
    getDefaultMortgageFeesAndPoints();
    getDefaultInflationRate10YrExpected();
}

function getDefaultMedianSalePrice() {
    var zipCode = getVariableValue("Zip Code");
    var defaultMedianSalePriceCell = sVariables.getRange(getVariableCellDefault("Sale Price"));
    if (quandlApiKey && zipCode) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/ZILL/Z" + zipCode + "_MSP.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[1]);
            defaultMedianSalePriceCell.setValue(dataNewest);
        } else {
            defaultMedianSalePriceCell.setValue("Data for " + zipCode + " N/A");
        }
    } else {
        defaultMedianSalePriceCell.setValue("Invalid Quandl API Key or Zip Code");
    }
}

function getDefaultMortgageInterestRate() {
    var term = getVariableValue("Term");
    var defaultMortgageRateCell = sVariables.getRange(getVariableCellDefault("Interest Rate"));
    if (quandlApiKey && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[1]) / 100;
            defaultMortgageRateCell.setValue(dataNewest);
        } else {
            defaultMortgageRateCell.setValue("Data N/A");
        }
    } else {
        defaultMortgageRateCell.setValue("Invalid Quandl API Key or Term");
    }
}

function getDefaultMortgageFeesAndPoints() {
    var term = getVariableValue("Term");
    var defaultMortgageFeesAndPointsCell = sVariables.getRange(getVariableCellDefault("Fees & Points"));
    if (quandlApiKey && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[2]) / 100;
            defaultMortgageFeesAndPointsCell.setValue(dataNewest);
        } else {
            defaultMortgageFeesAndPointsCell.setValue("Data N/A");
        }
    } else {
        defaultMortgageFeesAndPointsCell.setValue("Invalid Quandl API Key or Term");
    }
}

function getDefaultInflationRate10YrExpected() {
    var defaultInflationRate10YrExpectedCell = sVariables.getRange(getVariableCellDefault("Inflation Rate"));
    if (quandlApiKey) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FRED/T10YIE.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[1]) / 100;
            defaultInflationRate10YrExpectedCell.setValue(dataNewest);
        } else {
            defaultInflationRate10YrExpectedCell.setValue("Data N/A");
        }
    } else {
        defaultInflationRate10YrExpectedCell.setValue("Invalid Quandl API Key");
    }
}