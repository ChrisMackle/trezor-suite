// all tests have same UTC timezone
process.env.TZ = 'UTC';

module.exports = {
    roots: ['./src'],
    setupFiles: ['<rootDir>/src/support/tests/setupJest.ts'],
    moduleNameMapper: {
        '^@suite/(.+)': '<rootDir>/src/$1',
        '^@(.+)-views/(.+)': '<rootDir>/src/views/$1/$2',
        '^@(.+)-views': '<rootDir>/src/views/$1/index',
        '^@(.+)-components/(.+)': '<rootDir>/src/components/$1/$2',
        '^@(.+)-components': '<rootDir>/src/components/$1/index',
        '^@(.+)-actions/(.+)': '<rootDir>/src/actions/$1/$2',
        '^@(.+)-actions': '<rootDir>/src/actions/$1/index',
        '^@(.+)-reducers/(.+)': '<rootDir>/src/reducers/$1/$2',
        '^@(.+)-reducers': '<rootDir>/src/reducers/$1/index',
        '^@(.+)-config/(.+)': '<rootDir>/src/config/$1/$2',
        '^@(.+)-config': '<rootDir>/src/config/$1/index',
        '^@(.+)-constants/(.+)': '<rootDir>/src/constants/$1/$2',
        '^@(.+)-constants': '<rootDir>/src/constants/$1/index',
        '^@(.+)-support/(.+)': '<rootDir>/src/support/$1/$2',
        '^@(.+)-support': '<rootDir>/src/support/$1/index',
        '^@(.+)-utils/(.+)': '<rootDir>/src/utils/$1/$2',
        '^@(.+)-utils': '<rootDir>/src/utils/$1/index',
        '^@(.+)-types/(.+)': '<rootDir>/src/types/$1/$2',
        '^@(.+)-types': '<rootDir>/src/types/$1/index',
        '^@(.+)-middlewares/(.+)': '<rootDir>/src/middlewares/$1/$2',
        '^@(.+)-middlewares': '<rootDir>/src/middlewares/$1/index',
        '^@(.+)-services/(.+)': '<rootDir>/src/services/$1/$2',
        '^@(.+)-services': '<rootDir>/src/services/$1/index',
        '^@(dashboard|suite|wallet)-hooks/(.+)': '<rootDir>/src/hooks/$1/$2',
        '^@(dashboard|suite|wallet)-hooks': '<rootDir>/src/hooks/$1/index',
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/reducers/**',
        '<rootDir>/src/utils/**',
        '<rootDir>/src/actions/**',
        '<rootDir>/src/middlewares/**',
        '<rootDir>/src/hooks/suite/useDebounce.ts',
        '<rootDir>/src/hooks/wallet/useSendForm.ts',
        '<rootDir>/src/hooks/wallet/useSendFormCompose.ts',
        '<rootDir>/src/hooks/wallet/useSendFormFields.ts',
        '<rootDir>/src/hooks/wallet/useSendFormOutputs.ts',
        // '<rootDir>/src/views/wallet/send/**',
        '!**/constants/**',
        '!**/__tests__/**',
        '!**/__fixtures__/**',
        '!<rootDir>/src/actions/wallet/sendFormActions.ts', // TODO write tests
        '!<rootDir>/src/actions/wallet/send/**', // TODO write tests
    ],
    coverageThreshold: {
        global: {
            statements: 60,
            branches: 53,
            functions: 60,
            lines: 60,
        },
    },
    modulePathIgnorePatterns: [
        'node_modules',
        '<rootDir>/src/utils/suite/dom',
        '<rootDir>/src/utils/wallet/promiseUtils',
    ],
    transformIgnorePatterns: [
        '/node_modules/',
        '/node_modules/(?!intl-messageformat|intl-messageformat-parser).+\\.js$',
    ],
    testMatch: ['**/*.test.(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/src/support/tests/svgTransform.js', // https://stackoverflow.com/questions/46791263/jest-test-fail-syntaxerror-unexpected-token
    },
    verbose: false,
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
