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
                //// UpdateTransactions(2, expense);
                // SendEmail(expense.User, 2);
                // return null;
                Result<int> result = await Save(expense);
                if (result.IsSuccess)
                {
                    int expenseId = result.Entity;
                    // Update transactions with 'Processed' flag.
                    // Betterway to be: SQL server should trigger a function call (http trigger)
                    // As of now Azure does not support, so the work around..
                    UpdateTransactions(expenseId, expense);
                    // If success send email as well..
                    SendEmail(expense.User, expenseId);
                }
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

        private async void UpdateTransactions(int expenseId, Expense expense)
        {
            // Fire and forget
            // Create expense items to reflect payload to be sent..
            List<TransactionStatus> list = new List<TransactionStatus>();
            foreach(ExpenseItem item in expense.ExpenseItems)
            {
                if (item.TransType != "OOP")
                {
                    list.Add(new TransactionStatus() { Id = item.Id, Status = "Processed" });
                }
            }

            try
            {
                string resourceUri = _config.GetSection("api:transaction").GetSection("postUpdateTransactionStatus").Value;
                string url = $"{ _config.GetSection("api:transaction").GetSection("baseUrl").Value}{resourceUri}";
                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage(HttpMethod.Post, url))
                using (var httpContent = new UtilHttpContent().CreateHttpContent(list.ToArray()))
                {
                    request.Content = httpContent;
                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead))
                    {
                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            // var content = await response.Content.ReadAsStringAsync();
                            // return StatusCode((int)response.StatusCode, content);
                            // LOG Success
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                // LOG ERROR
            }
        }

        private async void SendEmail(User user, int expenseId)
        {
            // Fire and forget
            try
            {
                string resourceUri = _config.GetSection("api:expense").GetSection("postSendEmail").Value;
                string url = $"{ _config.GetSection("api:expense").GetSection("baseUrl").Value}{resourceUri}";
                RequestSendEmail reqSendEmail = new RequestSendEmail() { user = user, expenseId = expenseId };

                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage(HttpMethod.Post, url))
                using (var httpContent = new UtilHttpContent().CreateHttpContent(reqSendEmail))
                {
                    request.Content = httpContent;
                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead))
                    {
                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            // var content = await response.Content.ReadAsStringAsync();
                            // return StatusCode((int)response.StatusCode, content);
                            // LOG Success
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                // LOG ERROR
            }
        }

    }
}
