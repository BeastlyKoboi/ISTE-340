using System.Data;
using System.Net.Http.Headers;

namespace iSchoolWebApp.Services
{
    public class DataRetrieval
    {
        // build a method to go get my data from my api 
        // we are going to send the endpoint of the url
        public async Task<string> GetData(string endpoint)
        {
            // Task vs Thread 
            // Task has async/awair and a return value 
            // Thread - no direct way to return from a thread, thread can do multiple things at once

            // using statement - at the end of it, it is automagically disposed
            using (var client = new HttpClient())
            {
                // we need to set up our http client 
                // request/response
                client.BaseAddress = new Uri("https://ischool.gccis.rit.edu/api/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                try
                {
                    HttpResponseMessage response = await client.GetAsync(endpoint, HttpCompletionOption.ResponseHeadersRead);
                    response.EnsureSuccessStatusCode();
                    // go get it...
                    var data = await response.Content.ReadAsStringAsync();

                    return data;
                }
                catch (HttpRequestException ex)
                {
                    var msg = ex.Message;
                    return "httpRequest" + msg;
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                    return "Ex: " + msg;
                }
            }

            return "";
        }
    }
}
