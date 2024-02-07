
// The point of this class is increasing readability and maintainability of the rest of the code. 
// It should be extended and refactord as needed.

export class HTTPCodes {

    static SuccesfullResponse = {
        Ok: 200, // Request Succeded
        Created: 201, // Request Succeded, and a new resource was created
        Accepted: 202, // Request Recieved, but not yet acted upon
        NonAuthoritativeInformation: 203, // The returned metadata is not exactly the same as is available from the origin server
        NoContent: 204, // There is no content to send for this request
        ResetContent: 205, // Tells the user agent to reset the document which sent this request
    }

    static ClientSideError = {
        BadRequest: 400, // The server cannot or will not process the request due to something that is perceived to be a client error
        Unauthorized: 401, // The client must authenticate itself to get the requested response
        Forbidden: 403, // The client does not have access rights to the content
        NotFound: 404, // The server cannot find the requested resource
        MethodNotAllowed: 405, // The request method is known by the server but is not supported by the target resource
    }

    static ServerSideError = {
        InternalServerError: 500, // The server has encountered a situation it does not know how to handle
        NotImplemented: 501, // The request method is not supported by the server and cannot be handled
        BadGateway: 502, // The server, while working as a gateway to get a response needed to handle the request, got an invalid response
        ServiceUnavailable: 503, // The server is not ready to handle the request
        GatewayTimeout: 504, // The server is acting as a gateway and cannot get a response in time
        HttpVersionNotSupported: 505, // The HTTP version used in the request is not supported by the server
    }
    
}

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export const HTTPMethods = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
}