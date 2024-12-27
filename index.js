// const user = {
//     name: 'Raj',
//     location: {
//     city: 'RR',
//     state: 'Telangana'
//     }
//     };
    
//     const copy = Object.assign({}, user);
//     // OR
//     // const copy = { ...user };
    
//     copy.location.city = 'Hyd';
//     copy.name = 'Tej';
    
//     console.log('original: ', user);
//     console.log('copy:', copy);


//     // OUTPUT:
// #16: {
//     name: 'Raj',
//     location: {
//     city: 'Hyd',
//     state: 'Telangana'
//     }
//     };

//     #17: {
//         name: 'Tej',
//         location: {
//         city: 'Hyd',
//         state: 'Telangana'
//         }
//         };









// const promise1 = Promise.resolve('First');
// const promise2 = Promise.resolve('Second');
// const promise3 = Promise.reject('Third');
// const promise4 = Promise.resolve('Fourth');

// const runPromises = async () => {
// const res1 = await Promise.all([promise1, promise2]);
// const res2  = await Promise.all([promise3, promise4]);
// return [res1, res2];
// }

// runPromises()
// .then(res => console.log(res))
// .catch(err => console.log(err))


// // index.js
// console.log('running index.js');
// import { sum } from './sum.js';
// console.log(sum(1, 2));

// // sum.js
// console.log('running sum.js');
// export const sum = (a, b) => a + b;

// running sum.js
// Running index.js
// 3



// get tasks from API
const getTasks = async()=> {
    try {
        const result = await fetch('https://interview.adpeai.com/api/v2/get-task');
        return await result.json();
    }
    catch(error){
        //Error handling
        console.log("Error while fetching tasks data", error);
    }
}

// get Year from timeStamp
const getYear = (input) => {
    return (new Date(input)).getFullYear();
}

getTasks().then((res) =>{ 
    const preparedTransactionsPerEmployee = {}
    //filtering based on previous Year
    const filteredTransactions = res.transactions.filter( t => getYear(t.timeStamp) === getYear(new Date())-1);

    for(const ele of filteredTransactions){
        //Keeping employee transaction track
        if(preparedTransactionsPerEmployee[ele.employee.id]){
            preparedTransactionsPerEmployee[ele.employee.id].amount += ele.amount;
            preparedTransactionsPerEmployee[ele.employee.id].transactions.push(ele);
        } else {
            preparedTransactionsPerEmployee[ele.employee.id] = {
                amount: ele.amount,
                transactions: [ele]
            }
        }
    };
    
    let topEarnerTransactoins = {};
    //Finding top earner's employee transactions
    for(const key in preparedTransactionsPerEmployee){
        if(Object.keys(topEarnerTransactoins).length){
            topEarnerTransactoins = preparedTransactionsPerEmployee[key].amount > topEarnerTransactoins.amount ? preparedTransactionsPerEmployee[key] : topEarnerTransactoins;
        } else {
            topEarnerTransactoins = preparedTransactionsPerEmployee[key];
        }
    }
    console.log("response Of top earner's ALL trransactions: ", topEarnerTransactoins.transactions);
    return topEarnerTransactoins.transactions
    
}

).then( (data) => {
    //Filtering based on Type alpha
    const filteredTramnsaction = data.filter( e => e.type === 'alpha');
    console.log("Response after filter on TYPE APLHA", filteredTramnsaction)
    return filteredTramnsaction;
})
.catch(err => console.log(err))