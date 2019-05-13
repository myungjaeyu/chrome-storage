(async () => {

    const is = (name, a, b) => {

        if (a !== b) throw `Error : ${ name } (${ typeof a === 'object' ? JSON.stringify(a) : a })`
        else console.log(`Success : ${ name }`)
    
    }

    cs = new ChromeStorage()


    is('Tests whether the localStorage type is local.', cs.STORAGE_TYPE, 'local')


    let parser = cs.parser('aa')

    is(`Tests whether the length of the parser('aa') is 1`, parser.length, 1)
    is(`Tests whether the first parameter of the parser('aa') is 'aa'`, parser[0], 'aa')
    is('headKey : aa', cs.headKey(parser), 'aa')
    is('is_nestedKey : aa', cs.is_nestedKey(parser), false)


    parser = cs.parser('aa/aa')

    is(`parser length 2 : aa.aa`, parser.length, 2)
    is('parser 0 : aa.aa', parser[0], 'aa')
    is('parser 1 : aa.aa', parser[1], 'aa')
    is('headKey : aa.aa', cs.headKey(parser), 'aa')
    is('is_nestedKey : aa.aa', cs.is_nestedKey(parser), true)


    parser = cs.parser('aa/aa/aa/aa/aa/aa')

    is('parser length 6 : aa.aa.aa.aa.aa.aa', parser.length, 6)
    is('parser 0 : aa.aa.aa.aa.aa.aa', parser[0], 'aa')
    is('parser 1 : aa.aa.aa.aa.aa.aa', parser[1], 'aa')
    is('parser 2 : aa.aa.aa.aa.aa.aa', parser[2], 'aa')
    is('parser 3 : aa.aa.aa.aa.aa.aa', parser[3], 'aa')
    is('parser 4 : aa.aa.aa.aa.aa.aa', parser[4], 'aa')
    is('parser 5 : aa.aa.aa.aa.aa.aa', parser[5], 'aa')        


    parser = cs.parser('obj/obj/obj/3/obj/2/obj/aa/bb/3')

    is('parser length 10 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser.length, 10)
    is('parser 0 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[0], 'obj')
    is('parser 1 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[1], 'obj')
    is('parser 2 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[2], 'obj')
    is('parser 3 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[3], '3')
    is('parser 4 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[4], 'obj')
    is('parser 5 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[5], '2')
    is('parser 6 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[6], 'obj')
    is('parser 7 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[7], 'aa')
    is('parser 8 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[8], 'bb')
    is('parser 9 : obj.obj.obj[3].obj[2].obj.aa.bb[3]', parser[9], '3')

    parser = cs.parser('obj/0/1/2/3/4/5/6/7/8')

    is('parser length 10 : obj[0][1][2][3][4][5][6][7][8]', parser.length, 10)
    is('parser 0 : obj[0][1][2][3][4][5][6][7][8]', parser[0], 'obj')
    is('parser 1 : obj[0][1][2][3][4][5][6][7][8]', parser[1], '0')
    is('parser 2 : obj[0][1][2][3][4][5][6][7][8]', parser[2], '1')
    is('parser 3 : obj[0][1][2][3][4][5][6][7][8]', parser[3], '2')
    is('parser 4 : obj[0][1][2][3][4][5][6][7][8]', parser[4], '3')
    is('parser 5 : obj[0][1][2][3][4][5][6][7][8]', parser[5], '4')
    is('parser 6 : obj[0][1][2][3][4][5][6][7][8]', parser[6], '5')
    is('parser 7 : obj[0][1][2][3][4][5][6][7][8]', parser[7], '6')
    is('parser 8 : obj[0][1][2][3][4][5][6][7][8]', parser[8], '7')
    is('parser 9 : obj[0][1][2][3][4][5][6][7][8]', parser[9], '8')


    await cs.clear()
    is('Tests whether the storage is all emptied', Object.keys(await cs.getAll()).length, 0)


    await cs.set('aa/bb/cc', 'coco')
    is(`Tests whether the 'coco' is added to the 'aa.bb.cc' key in the Storage`, await cs.get('aa/bb/cc'), 'coco')


    let aa = await cs.get('aa')
    is(`aa === Object`, aa.constructor, Object)
    is(`aa.bb === Object`, aa.bb.constructor, Object)
    is(`aa.bb.cc === String`, aa.bb.cc.constructor, String)
    is(`aa.bb.cc === 'coco'`, aa.bb.cc, 'coco')


    await cs.set('aa', { bb2 : { cc2 : 'codi' } })
    is(`aa === aa.bb2.cc2, aa.bb2.cc2 === 'codi'`, await cs.get('aa/bb2/cc2'), 'codi')

    aa = await cs.get('aa')
    is(`aa === Object`, aa.constructor, Object)

    is(`aa.bb2 === Object`, aa.bb2.constructor, Object)
    is(`aa.bb === undefined`, aa.bb, undefined)

    is(`aa.bb2 === String`, aa.bb2.cc2.constructor, String)
    is(`aa.bb2.cc2 === 'codi'`, aa.bb2.cc2, 'codi')


    await cs.set('info/items', ['ak47', 'glock', 'knife'])
    let infoItems = await cs.get('info/items')

    is(`info.items === Array`, infoItems.constructor, Array)
    is(`info.items[0] === 'ak47'`, infoItems[0], 'ak47')
    is(`info.items[1] === 'glock'`, infoItems[1], 'glock')
    is(`info.items[2] === 'knife'`, infoItems[2], 'knife')


    await cs.push('info/items', 'knuckle')
    infoItems = await cs.get('info/items')


    is(`info.items lenth === 4`, infoItems.length, 4)
    is(`info.items[4] === 'knuckle'`, infoItems[3], 'knuckle')


    await cs.set('not_arr_0', 1)
    await cs.set('not_arr_1', 'a')
    await cs.set('not_arr_2', {})
    await cs.set('not_arr_3', 0)

    try {
        await cs.push('not_arr_0', 1)

        is('not_arr_0', (await cs.get('not_arr_0')).constructor, Number)
    } catch (err) {
        is('not_arr_0 / catch', err, `must be an array type. (key data: 1)`)
    }

    try {
        await cs.push('not_arr_1', 1)

        is('not_arr_1', (await cs.get('not_arr_0')).constructor, String)
    } catch (err) {
        is('not_arr_1', err, `must be an array type. (key data: "a")`)
    }

    try {
        await cs.push('not_arr_2', 1)

        is('not_arr_2', (await cs.get('not_arr_0')).constructor, Object)
    } catch (err) {
        is('not_arr_2', err, `must be an array type. (key data: {})`)
    }

    try {
        await cs.push('not_arr_3', 1)

        is('not_arr_3', (await cs.get('not_arr_3')).constructor, Number)
    } catch (err) {
        is('not_arr_3', err, `must be an array type. (key data: 0)`)
    }

})()