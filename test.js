(async () => {

    const is = (name, a, b) => {

        if (a !== b) throw `Error : ${ name } (${ typeof a === 'object' ? JSON.stringify(a) : a })`
        else console.log(`Success : ${ name }`)
    
    }

})()