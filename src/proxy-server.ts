import express, { type Request, type Response } from "express";

export class ProxyServer {
    cache = new Map<string, string>();
    app = express();

    async start(port: number, origin: string) {
        this.app.get("/*any", async (req, res) =>
            this.handleRequest(req, res, origin),
        );

        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }

    async handleRequest(req: Request, res: Response, origin: string) {
        const params = new URLSearchParams({
            url: req.url,
            cacheKey: req.url,
        });

        const result = this.cache.get(params.get("cacheKey")!);

        if (result) {
            console.log("cache hit");
            res.setHeader("X-Cache", "HIT");
            res.send(JSON.parse(result));
            return;
        }

        console.log("cache miss");

        try {
            const data = await fetch(`${origin}${params.get("cacheKey")}`);

            const text = JSON.stringify(await data.json());

            console.log(text, `${origin}${params.get("cacheKey")}`);

            this.cache.set(params.get("cacheKey")!, text);

            res.setHeader("X-Cache", "MISS");

            res.send(JSON.parse(text));
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
    }

    clearCache() {
        this.cache.clear();
        console.log("Cache cleared");
    }
}
