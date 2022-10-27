import {filterByDate, filterByFood, filterByType, filterByCategory} from '../filters/filters.js'

// -------------------------- test data------------------------------------------
const testLogs = [
    {
        "_id": "63470e9c2bf61c6266e88bcd",
        "user_name": "Matt",
        "user_id": "63470e9c2bf61c6266e88bcb",
        "org_id": "63470e9c2bf61c6266e88bcc",
        "produce": "Artichoke",
        "type": "Flower",
        "yield": 10,
        "date": "2022-01-01T00:00:00.000Z",
        "description": "Jan Artichoke",
        "category": "Flower"
    },
    {
        "_id": "63470f102bf61c6266e88be2",
        "user_name": null,
        "user_id": "63470f102bf61c6266e88be0",
        "org_id": "63470f102bf61c6266e88be1",
        "produce": "Sage",
        "type": "Hard Herb",
        "yield": 5,
        "date": "2022-03-01T00:00:00.000Z",
        "description": "March Sage",
        "category": "Herb"
    },
    {
        "_id": "63470ed92bf61c6266e88bd9",
        "user_name": null,
        "user_id": "63470ed92bf61c6266e88bd7",
        "org_id": "63470ed92bf61c6266e88bd8",
        "produce": "Apple (Granny Smith)",
        "type": "Pome Fruit",
        "yield": 30,
        "date": "2022-02-01T00:00:00.000Z",
        "description": "Feb Apple",
        "category": "Fruit"
    }];
//---------------------------------------------------------------------------------------

//----------------------------- test category--------------------------------------------
test('filter by Herb category', () => {
    const filteredLogs = filterByCategory(testLogs, "Herb");
    expect(filteredLogs[0].category).toBe("Herb")
  });

test('filter by Flower category', () => {
    const filteredLogs = filterByCategory(testLogs, "Flower");
    expect(filteredLogs[0].category).toBe("Flower")
  });

test('filter by Fruit category', () => {
    const filteredLogs = filterByCategory(testLogs, "Fruit");
    expect(filteredLogs[0].category).toBe("Fruit")
  });

//--------------------------------------------------------------------------------------


//----------------------------- test type-----------------------------------------------
test('filter by Flower Type', () => {
    const filteredLogs = filterByType(testLogs, "Flower");
    expect(filteredLogs[0].type).toBe("Flower")
  });
  
test('filter by Hard Herb Type', () => {
    const filteredLogs = filterByType(testLogs, "Hard Herb");
    expect(filteredLogs[0].type).toBe("Hard Herb")
  });

test('filter by Pome Fruit Type', () => {
    const filteredLogs = filterByType(testLogs, "Pome Fruit");
    expect(filteredLogs[0].type).toBe("Pome Fruit")
  });

//--------------------------------------------------------------------------------------

//----------------------------- test food/produce---------------------------------------
test('filter by Artichoke food', () => {
    const filteredLogs = filterByFood(testLogs, "Artichoke");
    expect(filteredLogs[0].produce).toBe("Artichoke")
});

test('filter by Sage food', () => {
    const filteredLogs = filterByFood(testLogs, "Sage");
    expect(filteredLogs[0].produce).toBe("Sage")
});

test('filter by Apple (Granny Smith) food', () => {
    const filteredLogs = filterByFood(testLogs, "Apple (Granny Smith)");
    expect(filteredLogs[0].produce).toBe("Apple (Granny Smith)")
});

//--------------------------------------------------------------------------------------

//----------------------------- test date ----------------------------------------------

test('filter by start and end date', () => {
    const filteredLogs = filterByDate(testLogs, "2022-02-01", "2022-03-02");
    expect(filteredLogs[0].date).toBe("2022-03-01T00:00:00.000Z")
});

test('filter by start date only', () => {
    const filteredLogs = filterByDate(testLogs, "2022-02-01", null);
    expect(filteredLogs[0].date).toBe("2022-03-01T00:00:00.000Z")
});

test('filter by end date only', () => {
    const filteredLogs = filterByDate(testLogs, null, "2022-10-01");
    expect(filteredLogs[0].date).toBe("2022-01-01T00:00:00.000Z")
});

//--------------------------------------------------------------------------------------
