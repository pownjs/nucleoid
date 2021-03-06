exports.yargs = {
    command: 'nucleoid <command>',
    describe: '',
    aliases: ['nuc'],

    builder: (yargs) => {
        yargs.command(require('./sub/invoke').yargs)
        yargs.command(require('./sub/download').yargs)
    }
}
