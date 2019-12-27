using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using expense_react_app.Models;
using expense_react_app.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace expense_react_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IConfiguration _config;

        public AuthenticationController(IConfiguration config)
        {
            _config = config;
        }

        // POST: api/Authentication
        [HttpPost]
        public async Task<ActionResult<Result>> Post(UserCredential userCredential)
        {
            try
            {
                string resourceUri = _config.GetSection("api:userProfile").GetSection("postAuthentication").Value;
                string url = $"{ _config.GetSection("api:userProfile").GetSection("baseUrl").Value}{resourceUri}";
                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage(HttpMethod.Post, url))
                using (var httpContent = new UtilHttpContent().CreateHttpContent(userCredential))
                {
                    request.Content = httpContent;
                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead))
                    {
                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            Result<bool> body = await response.Content.ReadAsAsync<Result<bool>>();
                            return body;
                        }
                        else
                        {
                            var content = await response.Content.ReadAsStringAsync();
                            Result<bool> result = new Result<bool>();
                            result.Entity = false;
                            result.Error = content;
                            return result;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error posting UserCredentials. " + ex.Message);
            }
        }

    }
}
