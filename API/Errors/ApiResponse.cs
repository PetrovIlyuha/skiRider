namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => " You've made a bad request",
                401 => "You're not authorized",
                404 => "This resource was not found",
                500 => "Server is not working properly. Come and try back in a few minutes.",
                _ => "Something is terribly wrong."
            };
        }
    }
}
