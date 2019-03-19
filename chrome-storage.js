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

}