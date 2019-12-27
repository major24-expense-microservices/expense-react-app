using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace expense_react_app.Models
{
    public class ExpenseItem
    {
        public string Id { get; set; }
        public int ExpenseId { get; set; }
        public string TransType { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public decimal Tax { get; set; }
        public string Category { get; set; }
        public DateTime TransDate { get; set; }
    }
}
