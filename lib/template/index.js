var RE2 = require('re2')

class Template {
    constructor({ requests }) {
        this.requests = requests
    }

    async run({ scheduler }) {
        const { requests } = this

        // requests are run sequentially

        for (let { raw, method, path, 'matchers-condition': matchersCondition, matchers } of Array.isArray(requests) ? requests : requests ? [requests] : []) {
            if (method && path) {
                path = Array.isArray(path) ? path : path ? [path] : []

                // paths are run concurrently

                const results = await Promise.all(path.map((path) => scheduler.request({ method, path })))

                return results.some(({ responseCode, responseHeaders, responseBody }) => {
                    const func = {
                        'and': 'every',
                        'or': 'some'
                    }[matchersCondition] || 'and'

                    let source

                    return matchers[func](({ type, words, regex, status }) => {
                        switch (type) {
                            case 'status':
                                return (Array.isArray(status) ? status : status ? [status] : []).some((status) => status == responseCode)

                            case 'word':
                                if (!source) {
                                    source = responseBody.toString()
                                }

                                return (Array.isArray(words) ? words : words ? [words] : []).some((word) => responseBody.indexOf(word) >= 0)

                            case 'regex':
                                if (!source) {
                                    source = responseBody.toString()
                                }

                                return (Array.isArray(regex) ? regex : regex ? [regex] : []).some((regex) => (new RE2(regex)).test(source))

                            default:
                                throw new Error(`Unsupported matcher type ${type}`)
                        }
                    })
                })
            }
            else {
                throw new Error(`Not supported`)
            }
        }
    }
}

module.exports = { Template }
