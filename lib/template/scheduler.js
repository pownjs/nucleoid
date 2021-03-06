const { Scheduler: PownScheduler } = require('@pown/request/lib/scheduler')

class Scheduler extends PownScheduler {
    constructor(options) {
        super(options)

        const { base, baseUrl, baseUri, baseURL, baseURI } = options

        this.base = base || baseUrl || baseUri || baseURL || baseURI
    }

    request({ path, ...request }) {
        return super.request({ ...request, uri: path.replace('{{BaseURL}}', this.base) })
    }
}

module.exports = { Scheduler }
