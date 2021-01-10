const {series} = require('nps-utils');

module.exports = {
    scripts: {
        db: {
            config: {
                script: series('sls export-env', runFast('./src/core/database/orm.config.ts')),
                description: 'Generates ormconfig.json file',
            },
            sync: {
                script: series('nps db.config', runTypeOrm('schema:sync')),
                description: 'Sync models to database. DO NOT USE IN PRODUCTION.',
            },
            migrate: {
                run: {
                    script: series('nps db.config', runTypeOrm('migration:run')),
                    description: 'Migrates database to newest version',
                },
                revert: {
                    script: series('nps db.config', runTypeOrm('migration:revert')),
                    description: 'Reverts the last migration - Run down() method of migration',
                },
            },
            drop: {
                script: series('nps db.config', runTypeOrm('schema:drop')),
                description: 'Drops the schema of the database',
            },
            setup: {
                script: series('nps db.drop', 'nps db.sync', 'nps db.migrate.run'),
                description: 'Recreates database with no data',
            },
        },
        offline: {
            dev: {
                script: 'sls offline',
                description: 'Start serverless offline on dev env',
            },
        },
        deploy: {
            dev: {
                script: 'sls deploy',
                description: 'Deploys service on dev env',
            },
            prod: {
                script: 'sls deploy --stage prod',
                description: 'Deploys service on prod env',
            },
        },
        test: {
            unit: {
                script: 'jest -i ./test/unit',
                description: 'Run unit tests',
            },
        },
    },
};

function runFast(path) {
    return `ts-node ${path}`;
}

function runTypeOrm(command) {
    return runFast(`./node_modules/typeorm/cli.js ${command}`);
}
