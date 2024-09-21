export interface ServerInterface {
    middlewares(): void
    routes(): void
    config(): void
    listen(): void
}