class ChromeStorage {

    constructor(storageType = 'local') {

        if (!chrome.storage) throw 'invalid chrome.storage'

        this.STORAGE_TYPE = storageType

    }

    _get(...args) {
        chrome.storage[this.STORAGE_TYPE].get(...args)
    }

    _set(...args) {
        chrome.storage[this.STORAGE_TYPE].set(...args)
    }

    headKey(key) {
        return key.replace(/(.*?)(\.\w+|\[.*?\])/g, '$1')
    }

    is_nestedKey(key) {
        return /(\.*)|\[(.*?)\]/.test(key)
    }

    parser(queries) { // obj.obj.obj[3].obj[2].obj.aa.bb[3]
        return queries
            .split('.')
            .reduce((acc, cur) =>
                acc.concat(
                    this.is_nestedKey(cur) ? 
                    cur.replace(/(.*)\[(.*?)\]/, '$1.$2').split('.') 
                    : 
                    cur), [])

    }

    refer(data, keys) {
        return keys.reduce((acc, cur, i) => {

            keys.length -1 !== i && 
                (acc.temp = acc.temp[cur] = typeof acc.temp[cur] !== 'object' ? {} : acc.temp[cur] || {})

            return acc
        }, {
            key : keys.slice(-1)[0],
            temp : data = typeof data === 'object' ? data : {},
            data
        })

    }

    getAll() {
        return new Promise(resolve => this._get(resolve))
    }

    get(key) {
        return new Promise(resolve => 
            this._get(this.headKey(key), e =>
                resolve(
                    this.is_nestedKey(key) ? 
                    this.parser(key)
                        .reduce((acc, cur) => acc[cur], e)
                    :
                    e[key])))

    }

    set(key, value) {

        if (typeof key !== 'string' || !key) throw 'invalid key'

        return new Promise(resolve => {

            let head = this.headKey(key),
                keys = this.parser(key).filter(e => e !== head),
                set = data => this._set({ [head] : data }, resolve)

            this.get(head)
                .then(e =>
                    set(!keys.length ? 
                        value 
                        : 
                        (({ data, temp, key}) => {
                            temp[key] = value
                            return data
                        })
                        (this.refer(e, keys))))

        })

    }

}