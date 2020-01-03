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
    public class UsersController : ControllerBase
    {
        private IConfiguration _config;

        public UsersController(IConfiguration config)
        {
            _config = config;
        }

        // GET: api/Users/5
        [HttpGet("{userid}", Name = "GetByUserId")]
        public async Task<ActionResult<Result<User>>> GetByuserId(string userid)
        {
            try
            {
                string resourseUri = string.Format(_config.GetSection("api:userProfile").GetSection("getUserById").Value, userid);
                string url = $"{ _config.GetSection("api:userProfile").GetSection("baseUrl").Value}{resourseUri}";

                HttpClient client = new HttpClient();
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    Result<User> body = await response.Content.ReadAsAsync<Result<User>>();
                    return body;
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Error fetching user");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching user " + ex.Message);
            }
        }



        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<Result<string>>> Post(AddUserDto user)
        {
            try
            {
                string resourseUri = string.Format(_config.GetSection("api:userProfile").GetSection("postUser").Value);
                string url = $"{ _config.GetSection("api:userProfile").GetSection("baseUrl").Value}{resourseUri}";
                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage(HttpMethod.Post, url))
                using (var httpContent = new UtilHttpContent().CreateHttpContent(user))
                {
                    request.Content = httpContent;
                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead))
                    {
                        if (response.StatusCode == System.Net.HttpStatusCode.OK ||
                            response.StatusCode == System.Net.HttpStatusCode.Created)
                        {
                            Result<string> result = await response.Content.ReadAsAsync<Result<string>>();
                            return result;
                        }
                        else
                        {
                            var content = await response.Content.ReadAsStringAsync();
                            Result<string> result = new Result<string>();
                            result.Error = content;
                            return result;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching user " + ex.Message);
            }
        }

    }
}
