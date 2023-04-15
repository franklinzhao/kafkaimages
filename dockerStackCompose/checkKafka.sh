    echo "Testing Kafka"
    topic="testtopic"
    if grep -q kafka3 $1; then replication_factor="3"; else replication_factor="1"; fi
    for i in 1 2 3 4 5; do echo "trying to create test topic" && kafka-topics --create --topic $topic --replication-factor $replication_factor --partitions 12 --zookeeper $DOCKER_HOST_IP:2181 && break || sleep 5; done
    sleep 5
    for x in {1..100}; do echo $x; done | kafka-console-producer --broker-list $DOCKER_HOST_IP:9092 --topic $topic
    sleep 5
    rows=`kafka-console-consumer --bootstrap-server $DOCKER_HOST_IP:9092 --topic $topic --from-beginning --timeout-ms 10000 | wc -l`
    # rows=`kafkacat -C -b $DOCKER_HOST_IP:9092 -t $topic -o beginning -e | wc -l `
    if [ "$rows" != "100" ]; then
        kafka-console-consumer --bootstrap-server $DOCKER_HOST_IP:9092 --topic test-topic --from-beginning --timeout-ms 10000 | wc -l
        exit 1
    else
        echo "Kafka Test Success!"
    fi