// get date object given a start string
function getStartDate(start){
    if(start === null){
        return new Date(1900, 0, 1)
    }

    let startStringArr = start.split("-")
    let startDate = new Date(startStringArr[0], startStringArr[1]-1, startStringArr[2])

    return startDate
}

// get end date from given end string
function getEndDate(end){
    if(end === null){
        return new Date(3000, 0, 1)
    }

    let endStringArr = end.split("-")
    let endDate = new Date(endStringArr[0], endStringArr[1]-1, endStringArr[2])
    
    return endDate
}

// filter by date given a logs array and start and end date string, returns filtered logs by date
export function filterByDate(logs, start, end){
    let filteredLogs = []
    let startDate = getStartDate(start)
    let endDate = getEndDate(end)

    for(let i = 0; i < logs.length; i++){
        let currLog = logs[i]
        let currDate = new Date(currLog.date)
        
        if(endDate-currDate > 0 && currDate-startDate > 0){
            filteredLogs.push(currLog)
        }
    }
    return filteredLogs
}

// filter by food type given logs array and a produce string, returns filtered logs by food
export function filterByFood(logs, selectedProduce){
    let filteredLogs = []

    for(let i = 0; i < logs.length; i++){
        let currLog = logs[i]
        let currProduce = currLog.produce
        if(currProduce === selectedProduce){
            filteredLogs.push(currLog)
        }
    }

    return filteredLogs
}

// filter by type given logs array and a type string, returns filtered logs by type
export function filterByType(logs, selectedType){
    let filteredLogs = []

    for(let i = 0; i < logs.length; i++){
        let currLog = logs[i]
        let currType = currLog.type
        if(currType === selectedType){
            filteredLogs.push(currLog)
        }
    }

    return filteredLogs
}

// filter by category given logs array and a category string, returns filtered logs by category
export function filterByCategory(logs,selectedCategory){
    let filteredLogs = []
    
    for(let i = 0; i < logs.length; i++){
        let currLog = logs[i]
        let currCategory = currLog.category
        if(currCategory === selectedCategory){
            filteredLogs.push(currLog)
        }
    }

    return filteredLogs
}

// filter by username given logs array and a username, returns filtered logs by username
export function filterByUsername(logs,selectedUsername){
    let filteredLogs = []
    
    for(let i = 0; i < logs.length; i++){
        let currLog = logs[i]
        let currUsername = currLog.user_name
        if(currUsername === selectedUsername){
            filteredLogs.push(currLog)
        }
    }

    return filteredLogs
}