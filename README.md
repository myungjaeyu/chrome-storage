# chrome-storage
> A helper library for chrome.storage API.

## Example use

```js
(async () => {


    const cs = new ChromeStorage()



    await cs.getAll()
    /* { } */



    await cs.set('aa/bb/cc', 'coco')
    await cs.getAll()
    /*
        { aa : { bb : { cc : "coco" } } }
    */



    await cs.get('aa/bb/cc')
    /*
        "coco"
    */



    await cs.push('aa/users', 'human')
    await cs.push('aa/users', { aa : { bb : 'exam' }})
    await cs.getAll()
    /*
        { 
            aa : { 
                bb : { cc : "coco" } 
                users : [
                    "human",
                    { aa : { bb : "exam' } }
                ]
            } 
        }
    */



    await cs.remove('aa/users')
    /*
        { aa : { bb : { cc : "coco" } } }
    */



   await cs.push('aa/bb', 1)
   /*
        err : must be an array type. (key data: { cc : "coco" })
   */

   await cs.push('aa/bb/cc', 1)
   /*
        err : must be an array type. (key data: "coco")
   */



   await cs.clear()
    /* { } */


})()
```

## API

---

#### getAll

> getAll(): object

```js
cs.getAll()
```

---

#### get

> get(key: string): any

```js
cs.get('aa/bb/cc')
```

---

#### set

> set(key: string, value: any): void

```js
cs.set('aa/bb/cc', 'coco')
```

---

#### push

> push(key: string, value: any): void

```js
cs.push('aa/users', 'human')
```

---

#### remove

> remove(key: string): void

```js
cs.remove('aa/users')
```

#### clear

> clear(): void

```js
cs.clear()
```

---