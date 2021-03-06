const RE2 = require('re2')

const makeMatcher = ({ type, words, regex, status, condition }) => {
    const func = {
        'and': 'every',
        'or': 'some'
    }[condition || 'and'] || 'every'

    return ({ responseCode, responseBody }) => {
        let source

        switch (type) {
            case 'status':
                return (Array.isArray(status) ? status : status ? [status] : [])[func]((status) => status == responseCode)

            case 'word':
                source = responseBody.toString()

                return (Array.isArray(words) ? words : words ? [words] : [])[func]((word) => responseBody.indexOf(word) >= 0)

            case 'regex':
                source = responseBody.toString()

                return (Array.isArray(regex) ? regex : regex ? [regex] : [])[func]((regex) => (new RE2(regex)).test(source))

            default:
                throw new Error(`Unsupported matcher type ${type}`)
        }
    }
}

const makeMatacherSuite = ({ matchers, condition }) => {
    const func = {
        'and': 'every',
        'or': 'some'
    }[condition || 'and'] || 'every'

    return (response) => {
        return matchers[func]((matcher) => {
            matcher = makeMatcher(matcher)

            return matcher(response)
        })
    }
}

module.exports = { makeMatacherSuite, makeMatcher }
