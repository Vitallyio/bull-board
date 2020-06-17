"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
const bullmq_1 = require("bullmq");
const supertest_1 = __importDefault(require("supertest"));
const bullBoard = __importStar(require("./index"));
describe('index', () => {
    it('should save the interface', () => {
        expect(bullBoard).toMatchInlineSnapshot(`
      Object {
        "replaceQueues": [Function],
        "router": [Function],
        "setQueues": [Function],
      }
    `);
    });
});
describe('happy', () => {
    const { router, setQueues, replaceQueues } = bullBoard;
    it('should be able to set queue', async () => {
        const paintQueue = new bullmq_1.Queue('Paint', {
            connection: {
                host: 'localhost',
                port: 6379,
            },
        });
        setQueues([paintQueue]);
        await supertest_1.default(router)
            .get('/queues')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(JSON.parse(res.text)).toMatchInlineSnapshot({
                stats: {
                    blocked_clients: expect.any(String),
                    connected_clients: expect.any(String),
                    mem_fragmentation_ratio: expect.any(String),
                    redis_version: expect.any(String),
                    total_system_memory: expect.any(String),
                    used_memory: expect.any(String),
                },
            }, `
          Object {
            "queues": Array [
              Object {
                "counts": Object {
                  "active": 0,
                  "completed": 0,
                  "delayed": 0,
                  "failed": 0,
                  "paused": 0,
                  "waiting": 0,
                },
                "jobs": Array [],
                "name": "bull:Paint:~",
              },
            ],
            "stats": Object {
              "blocked_clients": Any<String>,
              "connected_clients": Any<String>,
              "mem_fragmentation_ratio": Any<String>,
              "redis_version": Any<String>,
              "total_system_memory": Any<String>,
              "used_memory": Any<String>,
            },
          }
        `);
        });
    });
    it('should be able to replace queues', async () => {
        const paintQueue = new bullmq_1.Queue('Paint', {
            connection: {
                host: 'localhost',
                port: 6379,
            },
        });
        const drainQueue = new bullmq_1.Queue('Drain', {
            connection: {
                host: 'localhost',
                port: 6379,
            },
        });
        const codeQueue = new bullmq_1.Queue('Code', {
            connection: {
                host: 'localhost',
                port: 6379,
            },
        });
        setQueues([paintQueue, drainQueue]);
        replaceQueues([codeQueue]);
        await supertest_1.default(router)
            .get('/queues')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(JSON.parse(res.text)).toMatchInlineSnapshot({
                stats: {
                    blocked_clients: expect.any(String),
                    connected_clients: expect.any(String),
                    mem_fragmentation_ratio: expect.any(String),
                    redis_version: expect.any(String),
                    total_system_memory: expect.any(String),
                    used_memory: expect.any(String),
                },
            }, `
          Object {
            "queues": Array [
              Object {
                "counts": Object {
                  "active": 0,
                  "completed": 0,
                  "delayed": 0,
                  "failed": 0,
                  "paused": 0,
                  "waiting": 0,
                },
                "jobs": Array [],
                "name": "bull:Code:~",
              },
            ],
            "stats": Object {
              "blocked_clients": Any<String>,
              "connected_clients": Any<String>,
              "mem_fragmentation_ratio": Any<String>,
              "redis_version": Any<String>,
              "total_system_memory": Any<String>,
              "used_memory": Any<String>,
            },
          }
        `);
        });
    });
    it('should be able to replace queues without initial set', async () => {
        const codeQueue = new bullmq_1.Queue('Code', {
            connection: {
                host: 'localhost',
                port: 6379,
            },
        });
        replaceQueues([codeQueue]);
        await supertest_1.default(router)
            .get('/queues')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(JSON.parse(res.text)).toMatchInlineSnapshot({
                stats: {
                    blocked_clients: expect.any(String),
                    connected_clients: expect.any(String),
                    mem_fragmentation_ratio: expect.any(String),
                    redis_version: expect.any(String),
                    total_system_memory: expect.any(String),
                    used_memory: expect.any(String),
                },
            }, `
          Object {
            "queues": Array [
              Object {
                "counts": Object {
                  "active": 0,
                  "completed": 0,
                  "delayed": 0,
                  "failed": 0,
                  "paused": 0,
                  "waiting": 0,
                },
                "jobs": Array [],
                "name": "bull:Code:~",
              },
            ],
            "stats": Object {
              "blocked_clients": Any<String>,
              "connected_clients": Any<String>,
              "mem_fragmentation_ratio": Any<String>,
              "redis_version": Any<String>,
              "total_system_memory": Any<String>,
              "used_memory": Any<String>,
            },
          }
        `);
        });
    });
});
//# sourceMappingURL=index.spec.js.map