import { ResponseError } from '../common/models/ResponseError';
import { BadResponseWithCode, OK } from '../common/models/responses';
import { ErrorCode } from '../shared/types/error/ErrorCodes';
import { Context } from 'aws-lambda';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RouterRoute = {
    method: HttpMethod;
    path: string;
    handler: (event?: any, context?: Context, params?: any) => object;
    params: any;
};

export class Router {
    path: string;
    method: string;
    routes: RouterRoute[] = [];
    event: any;
    context: Context;
    stage: string;

    constructor(event: any, context: Context) {
        // console.log('Event Resource', event);
        context.callbackWaitsForEmptyEventLoop = false;
        this.event = event;
        this.context = context;
        this.path = event.resource;
        this.method = event.httpMethod;
        this.stage = process.env.STAGE!;
        console.log(
            `Routing: ${JSON.stringify({
                path: this.path,
                httpMethod: this.method,
                stage: this.stage
            })}`
        );
    }

    public register(method: HttpMethod, path: string, handler: (event: any, context?: Context) => object, params?: any) {
        if (this.routes.some((x) => x.path === path && x.method === method)) {
            console.log(
                this.routes.map((x) => {
                    x.path, x.method;
                })
            );
            throw new Error('Same routing already added');
        }

        const route =
            this.event.requestContext?.domainName === 'offlineContext_domainName'
                ? { method, path: this.formatPath(path), handler, params }
                : { method, path: `/${path}`, handler, params };
        this.routes.push(route);
    }

    public async route(): Promise<object> {
        if (this.checkWarmUpCallback(this.event)) return OK('Lambda is warm!');
        let route;
        if (this.stage === 'local') {
            route = this.routes.find((x) => x.path === '/local' + this.path && x.method === this.method);
        } else {
            route = this.routes.find((x) => x.path === this.path && x.method === this.method);
        }
        console.log(`Execute action : ${this.method} ${this.path}`);
        if (route) {
            return await route.handler(this.event, this.context, route.params);
        } else {
            console.log(
                `Registered Routes :`,
                this.routes.map((x) => {
                    x.path, x.method;
                })
            );
            return BadResponseWithCode(new ResponseError(ErrorCode.Common_RouteNotFound, 500));
        }
    }

    formatPath = (path: string) => `/${this.stage}/${path}`;

    checkWarmUpCallback = (event: any) => {
        if (event.source === 'serverless-plugin-warmup') {
            console.log('WarmUp - Lambda is warm!');
            return true;
        }
        return false;
    };
}
