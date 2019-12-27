export default {
  courses: [],
  authors: [],
  user: {
    userId: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    costCentre: ''
  },
  transactions: [],
  expense: {},
  expenseResult: '',
  loggedIn: false,
  auth: {
    loggedIn: false,
    userId: '',
    error: ''
  },
  apiCallsInProgress: 0,
  lookup: {
    costCentre: [
      { value: "IT1000", text: "Information Tech" },
      { value: "MK2000", text: "Marketing" }
    ],
    expenseCategory: [
      { value: 'TRVL', text: 'Travel' },
      { value: 'FOOD', text: 'Food and Bev' },
      { value: 'SUPL', text: 'Office Supplies' },
      { value: 'TAXI', text: 'Taxi and Transportation' },
      { value: 'ACCM', text: 'Hotel Accomodation' },
      { value: 'ENT1', text: 'Entertainment' },
      { value: 'PROM', text: 'Business Promotions' },
      { value: 'OTHR', text: 'Other' }
    ]
  }
};
