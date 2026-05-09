export const USER_DATA = {
  name: "Moeed Rajput",
  credits: {
    remaining: 1247,
    total: 2000,
    resetDays: 12,
    history: [
      { day: "Mon", used: 120 },
      { day: "Tue", used: 80 },
      { day: "Wed", used: 150 },
      { day: "Thu", used: 200 },
      { day: "Fri", used: 110 },
      { day: "Sat", used: 60 },
      { day: "Sun", used: 90 },
    ]
  },
  plan: {
    name: "Professional",
    price: "$9",
    status: "Active",
    renewsAt: "June 12, 2026",
  },
  paymentMethod: {
    brand: "Visa",
    last4: "4242",
    expiry: "04/27",
  },
  referrals: {
    count: 12,
    link: "https://viraloom.ai/ref/moeed123",
  },
  invoices: [
    { id: "INV-001", date: "May 12, 2026", description: "Professional Plan - Monthly", amount: "$9.00", status: "Paid" },
    { id: "INV-002", date: "April 12, 2026", description: "Professional Plan - Monthly", amount: "$9.00", status: "Paid" },
    { id: "INV-003", date: "March 12, 2026", description: "Credit Top-up (150 credits)", amount: "$12.00", status: "Paid" },
  ]
};
