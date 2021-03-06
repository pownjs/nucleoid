exports.yargs = {
    command: 'invoke <template> <target>',
    describe: 'Invokes a single template against a single target.',
    aliases: ['i'],

    builder: {
        ...require('@pown/request/commands/request/options/scheduler'),
        ...require('@pown/request/commands/request/options/output'),
        ...require('@pown/request/commands/request/options/proxy')
    },

    handler: async(argv) => {
        const { template, target } = argv

        const { extname } = require('path')
        const { readFile } = require('fs')
        const { promisify } = require('util')

        const readFileAsync = promisify(readFile)

        const data = await readFileAsync(template)

        let doc

        if (extname(template) === '.json') {
            doc = JSON.parse(template)
        }
        else {
            const jsYaml = require('js-yaml')

            doc = jsYaml.load(data, 'utf-8')
        }

        const { Template } = require('../../../../lib/template')
        const { Scheduler } = require('../../../../lib/template/scheduler')

        const scheduler = new Scheduler({ base: target })

        require('@pown/request/commands/request/options/scheduler/handler').init(argv, scheduler)
        require('@pown/request/commands/request/options/output/handler').init(argv, scheduler)
        require('@pown/request/commands/request/options/proxy/handler').init(argv, scheduler)

        const tpl = new Template(doc)

        await tpl.run({ scheduler })
    }
}
