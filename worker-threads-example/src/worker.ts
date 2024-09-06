// @ts-nocheck
import { parentPort, workerData } from 'worker_threads';
import { fibonacci } from './utils';

const result = fibonacci(workerData);
parentPort.postMessage(result);