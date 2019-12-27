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

        // GET: api/Users
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
