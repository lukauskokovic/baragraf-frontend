export const SERVER_IP = "10.30.25.165"
export const API_ENDPOINT = `http://${SERVER_IP}:3000`

export interface APIResponse<T>{
    failed:boolean
    error?:string
    responseCode:number
    body?:T
}

export async function performApiRequest<T>(endpoint:string, method:"GET"|"POST"|"DELETE"|"PUT", data?:any, token?:string) : Promise<APIResponse<T>>{
    let response:APIResponse<T> = {
        failed: true,
        body: undefined,
        error: undefined,
        responseCode: 200
    }
    let serverResponse:Response|undefined = undefined
    try{
        serverResponse = await fetch(API_ENDPOINT + endpoint, {
            body: data === undefined? undefined: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
                'Authorization': `Bearer ${token}`
            },
            method
        })
        response.responseCode = serverResponse.status
        response.body = (await serverResponse.json()) as T
        response.failed = false
        return response
    }catch(e:any){
        response.responseCode = serverResponse?.status ?? 400
        response.failed = true
        response.error = serverResponse?.statusText ?? e.toString()
        return response
    }
}