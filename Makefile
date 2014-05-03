SRC = $(wildcard lib/*/*.js)
STYL = $(wildcard lib/*/*.styl)
JSON = $(wildcard lib/*/component.json)

build: components $(SRC) $(STYL) $(JSON)
	@n use 0.11.11 --harmony ./node_modules/mnml-build/bin/builder

components: component.json
	@component install --dev

serve:
	@NODE_PATH=lib n use 0.11.11 --harmony server.js

start:
	@NODE_PATH=lib NODE_ENV=production PORT=4100 forever start -c ./start-up.sh sfpc.js

stop:
	@forever stop -c ./start-up.sh sfpc.js


install: package.json
	@npm install

clean:
	rm -fr build components

.PHONY: clean
