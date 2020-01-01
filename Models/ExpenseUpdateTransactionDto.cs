using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace expense_react_app.Models
{
    public class ExpenseUpdateTransactionDto
    {
        public TransactionStatus[] ExpenseItems { get; set; }
    }
}
