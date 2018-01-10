
test:
	DEBUG=*api* mocha --recursive test/bootstrap test
test_small:
	mocha  --recursive test/small 

test_big:
	DEBUG=*api* mocha --recursive test/bootstrap test/big
start:
	DEBUG=*error pm2 start index.js --name pointers-app
restart:
	pm2 restart pointers-app --update-env
stop:
	pm2 stop pointers-app 

.PHONY: test start test_small stop restart
