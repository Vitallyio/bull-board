const { setQueues, router } = require('./dist/index')
const { Queue: QueueMQ, Worker } = require('bullmq')
const Queue3 = require('bull')
const app = require('express')()

const sleep = t => new Promise(resolve => setTimeout(resolve, t * 1000))

const redisOptions = {
  port: 6379,
  host: 'localhost',
  password: '',
  tls: false,
}

const createQueue3 = name => new Queue3(name, { redis: redisOptions })
const createQueueMQ = name => new QueueMQ(name, { connection: redisOptions })

const run = () => {
  const exampleBullName = 'ExampleBull'
  const exampleBull = createQueue3(exampleBullName)

  const queues = []
  for (const numstr of ['one', 'two', 'three', 'four', 'five']) {
    const exampleBullMqName = 'ExampleBullMQ-' + numstr
    const exampleBullMq = createQueueMQ(exampleBullMqName)
    queues.push(exampleBullMq)
  }

  setQueues(queues)

  exampleBull.process(async job => {
    for (let i = 0; i <= 100; i++) {
      await sleep(Math.random())
      job.progress(i)
      if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
    }
  })

  for (const i of [1, 2, 3, 4, 5]) {
    new Worker(queues[i - 1].name, async job => {
      for (let i = 0; i <= 100; i++) {
        await sleep(Math.random())
        await job.updateProgress(i)

        if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
      }
    })
  }

  app.use('/add', (req, res) => {
    const opts = req.query.opts || {};

    exampleBull.add({ title: req.query.title }, opts)
    queues[0].add('Add', { title: req.query.title }, opts)

    res.json({
      ok: true,
    })
  })

  app.use('/ui', router)
  app.listen(3000, () => {
    console.log('Running on 3000...')
    console.log('For the UI, open http://localhost:3000/ui')
    console.log('Make sure Redis is running on port 6379 by default')
    console.log('To populate the queue, run:')
    console.log('  curl http://localhost:3000/add?title=Example')
    console.log('To populate the queue with custom options (opts), run:')
    console.log('  curl http://localhost:3000/add?title=Test&opts[delay]=900')
  })
}

run()
