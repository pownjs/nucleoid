const transpileMatacherToTestFunction = (matcher) => {
    const { type, status } = matcher

    if (type === 'status') {
        if (Array.isArray(status)) {
            return `(response) => {
                return ${JSON.stringify(status)}.some((code) => response.responseCode == code)
            }`
        }
        else {
            return `(response) => {
                return ${JSON.stringify(status)} == response.responseCode
            }`
        }
    }
    else {
        return `(response) => false`
    }
}

const transpileManyMatchersToTestFunction = (condition, matchers) => {
    const arrayFunction = {
        'and': 'all',
        'or': 'some'
    }[condition] || 'all'

    return `(requests) => {
        const tests = [
            ${matchers.map(matcher => transpileMatacherToTestFunction(matcher)).join(',\n')}
        ]

        return requests.some(request => {
            return tests.${arrayFunction}((test) => test(request))
        })
    }`
}

module.exports = { transpileMatacherToTestFunction, transpileManyMatchersToTestFunction }
