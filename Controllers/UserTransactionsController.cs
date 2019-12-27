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
    public class UserTransactionsController : ControllerBase
    {
        private IConfiguration _config;

        public UserTransactionsController(IConfiguration config)
        {
            _config = config;
        }

        // GET api/users/{user1}/transactions
        [HttpGet]
        [Route("/api/users/{userid}/transactions")]
        public async Task<ActionResult<Result<Transaction[]>>> GetTransactionsByUserId(string userid)
        {
            try
            {
                string resourceUri = string.Format(_config.GetSection("api:transaction").GetSection("getUserTransactions").Value, userid);
                string url = $"{ _config.GetSection("api:transaction").GetSection("baseUrl").Value}{resourceUri}";

                HttpClient client = new HttpClient();
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    Result<Transaction[]> body = await response.Content.ReadAsAsync<Result<Transaction[]>>();
                    return body;
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Error fetching user transactions");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting UserTransaction data. " + ex.Message);
            }
        }

    }
}
