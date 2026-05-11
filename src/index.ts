#!/usr/bin/env node

import { Command } from "commander";
import { ProxyServer } from "./proxy-server.js";

const program = new Command();

const proxyServer = new ProxyServer();

program
    .name("my-cli")
    .description("A tool for managing tasks")
    .version("1.0.0");

program
    .option("-p, --port <number>", "Port to run the proxy on", "3000")
    .option("-o, --origin <url>", "The origin server URL")
    .option("-c, --clear-cache", "Clear the application cache")
    .action((options) => {
        const port = options.port;
        const origin = options.origin;

        if (options.clearCache) {
            proxyServer.cache.clear();
            console.log("Cache cleared");
            process.exit(0);
        }

        if (port && origin) {
            proxyServer.start(Number(options.port), options.origin);
        }
    });

program.parse(process.argv);
