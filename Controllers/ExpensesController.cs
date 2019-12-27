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
    public class ExpensesController : ControllerBase
    {
        private IConfiguration _config;

        public ExpensesController(IConfiguration config)
        {
            _config = config;
        }

        // POST: api/Expenses
        [HttpPost]
        public async Task<ActionResult<Result<int>>> Post([FromBody] Expense expense)
        {
            try
            {
                Result<int> result = await Save(expense);
                return result;
            }
            catch (Exception ex)
            {
                Result<int> result = new Result<int>();
                result.Error = "Error saving expense. " + ex.Message;
                return result;
            }
        }

        private async Task<Result<int>> Save(Expense expense)
        {
            string resourceUri = _config.GetSection("api:expense").GetSection("postExpenses").Value;
            string url = $"{ _config.GetSection("api:expense").GetSection("baseUrl").Value}{resourceUri}";
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, url))
            using (var httpContent = new UtilHttpContent().CreateHttpContent(expense))
            {
                request.Content = httpContent;
                using (var response = await client
                    .SendAsync(request, HttpCompletionOption.ResponseHeadersRead))
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.OK || response.StatusCode == System.Net.HttpStatusCode.Created)
                    {
                        Result<int> result = await response.Content.ReadAsAsync<Result<int>>();
                        return result;

                    }
                    else
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        Result<int> result = new Result<int>();
                        result.Error = content;
                        return result;
                    }
                }
            }
        }



    }
}
