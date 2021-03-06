const { transpileManyMatchersToTestFunction } = require('./matcher')

const transpileRequest = (request) => {
    // const requests = ${JSON.stringify(requests.map(({ method, path, matchers }) => ({ method, paths: path, matchers })), '', '    ')}

    const { method, path, 'matcher-condition': matcherCondition, matchers } = request

    if (method && path) {
        let paths

        if (Array.isArray(path)) {
            paths = path
        }
        else {
            paths = [path]
        }

        return `
        ${transpileManyMatchersToTestFunction(matcherCondition, matchers)}
        
        const response = await Promise.all(${JSON.stringify(paths)}.map((path) => {
            return scheduler.request({ method, uri: path.replace('{{BaseURL}}', uri) })
        }))
        
        
        `
    }
    else {
        return `return false`
    }

    return `
            for (let { method, paths, matchers } of requests) {
                if (method && paths) {
                    const responses = await Promise.all(paths.map((path) => {
                        return scheduler.request({ method, uri: path.replace('{{BaseURL}}', uri) })
                    })

                    if (!matchers.some(matcher => match(match, responses))) {
                        return false
                    }
                }
            }

            return true
        }
`
}

const transpileTemplate = (template) => {
    const { id, info, requests } = template

    return `module.exports = {
        id: ${JSON.stringify(id)},

        info: ${JSON.stringify(info)}

        run: async(uri, { scheduler }) => {
            ${requests.map(request => transpileRequest(request)).join('\n\n')}

            return true
        }
    }`
}

module.exports = { transpileTemplate }
