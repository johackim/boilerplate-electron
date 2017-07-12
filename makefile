.PHONY: build test
.ONESHELL:

check:
	@ command -v node > /dev/null 2>&1 || (echo "node is not available please install" && exit 1)
	@ command -v yarn > /dev/null 2>&1 || (echo "yarn is not available please install: npm i -g yarn" && exit 1)

install: check
	@ yarn

build:
	@ rm -rf public && mkdir -p public
	@ NODE_ENV=production ./node_modules/.bin/babel --minified --no-comments --compact true -d public/ src/server
	@ NODE_ENV=production ./node_modules/.bin/webpack -p --progress --colors

pkg: build
	@ rm -rf dist/
	@ cp package.json public/ && cd public/ && npm install --production && cd ${PWD}
	@ NODE_ENV=production ./node_modules/.bin/electron-packager --icon src/client/images/logo.ico --platform=all --out dist/ --overwrite public/

run:
	@ NODE_ENV=development ./node_modules/.bin/electron -r babel-register src/server/index.js

watch:
	@ mkdir -p public
	@ ./node_modules/.bin/webpack --watch -d

test:
	@ NODE_ENV=test ./node_modules/.bin/mocha -t 9999999 --compilers js:babel-core/register --require babel-polyfill test/setup.js test/specs/*.spec.js

lint:
	@ ./node_modules/.bin/eslint src/

lint-fix:
	@ ./node_modules/.bin/eslint --fix src/
