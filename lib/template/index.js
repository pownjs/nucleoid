const { parseRequest } = require('@pown/http')

const { makeMatacherSuite } = require('./matcher')

class Template {
    constructor({ requests }) {
        this.requests = requests
    }

    async run({ scheduler }) {
        const { requests } = this

        // requests run sequentially

        for (let { raw, method, path, matchers, 'matchers-condition': matchersCondition } of Array.isArray(requests) ? requests : requests ? [requests] : []) {
            if (raw) {
                raw = Array.isArray(raw) ? raw : raw ? [raw] : []

                // raw run concurrently

                const results = await Promise.all(raw.map((raw) => scheduler.request(parseRequest(raw))))

                const matckerSuite = makeMatacherSuite({ matchers, condition: matchersCondition })

                return results.some((response) => matckerSuite(response))
            }
            else
            if (method && path) {
                path = Array.isArray(path) ? path : path ? [path] : []

                // paths run concurrently

                const results = await Promise.all(path.map((uri) => scheduler.request({ method, uri })))

                const matckerSuite = makeMatacherSuite({ matchers, condition: matchersCondition })

                return results.some((response) => matckerSuite(response))
            }
            else {
                throw new Error(`Not supported`)
            }
        }
    }
}

module.exports = { Template }
