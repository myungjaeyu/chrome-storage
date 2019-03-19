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
        return new Promise(resolve => this._set({ [key] : value }, resolve))
    }

}