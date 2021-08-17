up-rmq-daemon:
	docker-compose -f docker-compose.rmq.yaml up -d 
    
up-rmq:
	docker-compose -f docker-compose.rmq.yaml up 

down:
	docker-compose -f docker-compose.rmq.yaml down

logs:
	docker-compose -f docker-compose.rmq.yaml logs

producer:
	node producer.js 

worker:
	node worker.js
