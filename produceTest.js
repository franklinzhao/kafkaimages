// import the `Kafka` instance from the kafkajs library
const { Kafka, logLevel } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092", "localhost:9093", "localhost:9094"]

// this is the topic to which we want to write messages
const topic = "my-kafka-topic-1"

// initialize a new kafka client and initialize a producer from it
// const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.DEBUG })
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer({})

// producer.createTopics(
// 	[
// 	  { topic: "my-kafka-topic-1", paritions: 2 }
// 	], 
// 	true,
// 	function (err, data) {}
//   );

let book = JSON.stringify({
	"bid":"001",
	"bookInfo": {
		title: 'Moby Dick',
		author: {
			name: 'Herman Melville',
			born: 1819
		}
	}
});
// we define an async function that writes a new message each second
const produce = async () => {
	await producer.connect()
	let i = 0

	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
				acks: 1,
				messages: [
					{
						key: String(i),
						value: "this is message of book obj:  "+ book +",  MessageID: " + i,
					},
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("#################### Kafka writes message # : ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 1)
}

module.exports = {produce:produce}
