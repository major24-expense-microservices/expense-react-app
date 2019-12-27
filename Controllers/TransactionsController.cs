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
    public class TransactionsController : ControllerBase
    {
        private IConfiguration _config;

        public TransactionsController(IConfiguration config)
        {
            _config = config;
        }

        // New route
        // POST: api/transactions/autoload
        [HttpPost]
        [Route("/api/transactions/autoload")]
        public async Task<ActionResult<Result<string>>> Post([FromBody] AutoloadDto autoloadDto)
        {
            try
            {
                string resourceUri = _config.GetSection("api:transaction").GetSection("postAutoloadTransactions").Value;
                string url = $"{ _config.GetSection("api:transaction").GetSection("baseUrl").Value}{resourceUri}";
                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage(HttpMethod.Post, url))
                using (var httpContent = new UtilHttpContent().CreateHttpContent(autoloadDto))
                {
                    request.Content = httpContent;
                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead))
                    {
                        if (response.StatusCode == System.Net.HttpStatusCode.OK || response.StatusCode == System.Net.HttpStatusCode.Created)
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
            catch(Exception ex)
            {
                Result<string> response = new Result<string>();
                response.Error = ex.Message;
                return response;
            }

        }




    }
}
