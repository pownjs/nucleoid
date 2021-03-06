exports.yargs = {
    command: 'download <dir>',
    describe: 'Download the latest templates into a directory.',
    aliases: ['d'],

    builder: {},

    handler: async(argv) => {
        const { dir } = argv

        const os = require('os')
        const fs = require('fs')
        const util = require('util')
        const path = require('path')
        const rimraf = require('rimraf')
        const git = require('isomorphic-git')

        const rimrafAsync = util.promisify(rimraf)

        const statAsync = util.promisify(fs.stat)
        const readdirAsync = util.promisify(fs.readdir)
        const mkdtempAsync = util.promisify(fs.mkdtemp)

        const gitdir = await mkdtempAsync(path.join(os.tmpdir(), 'pown-'))

        await git.clone({
            fs: fs,
            http: require('isomorphic-git/http/node'),
            dir: dir,
            gitdir: gitdir,
            url: 'https://github.com/projectdiscovery/nuclei-templates.git',
            singleBranch: true,
            depth: 1
        })

        await rimrafAsync(gitdir)
        await rimrafAsync(path.join(dir, '.github'))

        const files = await readdirAsync(dir)

        await Promise.all(files.map(async(file) => {
            file = path.join(dir, file)

            const stat = await statAsync(file)

            if (!stat.isDirectory()) {
                await rimrafAsync(file)
            }
        }))
    }
}
