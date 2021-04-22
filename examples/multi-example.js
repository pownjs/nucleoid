// example server extractor

module.exports = {
    id: 'test',

    response: {
        extractor: ({ responseHeaders }) => {
            return {
                server: responseHeaders['server']
            }
        }
    }
}

// example title extractor

module.exports = {
    id: 'test',

    response: {
        extractor: ({ responseBody }) => {
            const title = responseBody.toString().match(/<title>(.+?)<\/title>/i)

            if (title) {
                return {
                    title: title[1]
                }
            }
        }
    }
}

// example title extractor

module.exports = {
    id: 'title',

    response: {
        extractor: {
            type: 'regex',
            regex: /<title>(.+?)<\/title>/i,
            group: 1,
            part: 'responseBody',
            name: 'info.title'
        }
    }
}


// example matcher with dependency

module.exports = {
    id: 'dep',

    require: 'title',

    response: {
        matcher: {
            type: 'word',
            word: 'Jamf Pro',
            part: 'info.title'
        }
    }
}

// example crawler

module.exports = {
    id: 'crawler',

    response: {
        extractor: ({ responseBody }) => {
            return {
                inf: {
                    crawler: {
                        requests: extractRequests(responseBody)
                    }
                }
            }
        }
    }
}

// example spider

module.exports = {
    id: 'spider',

    require: 'crawler',

    requestPhase: 'completed',

    request: ({ info }) => {
        const { crawler } = info
        const { requests } = crawler

        return requests.filter(inScope()).filter(alreadySeen(1))
    }
}

// request swagger only if swagger in the url

module.exports = {
    id: 'swagger-enumerator',

    fqdn: {
        matcher: {
            type: 'word',
            word: 'swagger'
        }
    },

    request: {
        path: '/swagger',
        matcher: {
            type: 'word',
            word: '"swagger":"2.0","info":{'
        }
    }
}
