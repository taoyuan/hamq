/* eslint-disable @typescript-eslint/no-explicit-any */

import {MarkRequired} from 'ts-essentials';

export interface QueueDeclarationOptions {
  exclusive?: boolean;
  durable?: boolean;
  autoDelete?: boolean;
  arguments?: any;
  messageTtl?: number;
  expires?: number;
  deadLetterExchange?: string;
  maxLength?: number;
  prefetch?: number;
  noCreate?: boolean;
}

export interface QueueConsumeOptions {
  consumerTag?: string;
  noLocal?: boolean;
  noAck?: boolean;
  manualAck?: boolean;
  exclusive?: boolean;
  priority?: number;
  arguments?: Object;
}

export interface QueueConsumeResult {
  consumerTag: string;
}

export interface QueueDeclareResult {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

export interface QueueDeleteResult {
  messageCount: number;
}

export interface TopologyExchange {
  name: string;
  type?: string;
  options?: any;
}

export interface TopologyQueue {
  name: string;
  options?: any;
}

export interface TopologyBinding {
  source: string;
  queue?: string;
  exchange?: string;
  pattern?: string;
  args?: any;
}

export type TopologyBindingQueue = MarkRequired<TopologyBinding, 'queue'>;
export type TopologyBindingExchange = MarkRequired<TopologyBinding, 'exchange'>;

export interface Topology {
  exchanges: TopologyExchange[];
  queues: TopologyQueue[];
  bindings: (TopologyBindingQueue | TopologyBindingExchange)[];
}

export interface ExchangeDeclareOptions {
  durable?: boolean;
  internal?: boolean;
  autoDelete?: boolean;
  alternateExchange?: string;
  arguments?: any;
  noCreate?: boolean;
}

export interface ExchangeDeclareResult {
  exchange: string;
}
