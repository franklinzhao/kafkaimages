const produce = require("./produceTest")
const consume = require("./consumeTest")

// call the `produce` function and log an error if it occurs
// produce().catch((err) => {
// 	console.error("error in producer: ", err)
// })

// start the consumer, and log any errors
consume.consume().catch((err) => {
	console.error("error in consumer: ", err)
})
