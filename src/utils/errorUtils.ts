type AppErrorTypes = 'conflict' | 'not_found' | 'unauthorized' | 'wrong_schema' | 'bad_request';

interface IAppError {
    type: AppErrorTypes;
    message: string;
}

export function isAppError(error: object): error is IAppError {
    return (error as IAppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
    if (type === 'conflict') return 409;
    if (type === 'not_found') return 404;
    if (type === 'unauthorized') return 401;
    
    return 400;
}

export function conflictError(entity: string): IAppError {
    return { type: "conflict", message: `${entity} already exists!` };
}
  
export function notFoundError(entity: string): IAppError {
    return { type: "not_found", message: `Cannot find ${entity}`  };
}
  
export function unauthorizedError(entity: string): IAppError {
    return { type: "unauthorized", message: `Invalid or non existent ${entity}` };
}

export function badRequestError(message: string): IAppError {
    return { type: "bad_request", message };
}
  
  