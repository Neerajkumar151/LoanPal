# 🚀 LoanPal – AI-Powered Loan Assistant

LoanPal is a **modern, AI-powered personal loan platform** that simplifies the loan application process using a **chat-based interface**, **instant AI-driven decisions**, and **transparent feedback**.

It helps users apply for loans, understand approval or rejection reasons, and download official **loan sanction letters** — all in one place.

---

## 🌟 Key Features
### 💬 AI Homepage Chatbot
- Always available on the homepage for instant assistance
- Helps users understand eligibility, documents, interest rates, and process steps
- Provides personalized responses based on login status & loan history
- Guides first-time users who have no applications yet
- Redirects or assists in starting a new loan application seamlessly

### 🤖 AI Loan Assistant
- Conversational, chat-based loan application
- Context-aware responses (not rigid form flows)
- Understands user history and previous applications

### ⚡ Instant Loan Decisions
- AI-based eligibility checks
- Immediate approval / rejection / manual review
- Clear rejection reasons with improvement guidance

### 💸 Smart Loan Disbursement
- **Sanction Letter Verification:** Users upload their approved letter to unlock funds
- **Secure Disbursement:** Checks against approved loan records before releasing money
- **Instant Transfer:** Simulates real-time fund transfer to the user's bank account

### 💳 EMI Repayment System
- **Razorpay Integration:** Secure monthly EMI payments (Test Mode)
- **Multi-Loan Support:** Manage and repay multiple active loans from a single dashboard
- **Smart Penalty Logic:** Automatically calculates late fees (₹500 + 2%) for overdue payments
- **Visual Progress:** Track remaining balance and repayment progress bars

### 📄 Document Generation
- **Sanction Letters:** Auto-generated PDF upon loan approval
- **Payment Receipts:** Professional PDF receipts generated instantly after every EMI payment
- All documents downloadable anytime from the dashboard

### 📊 Loan Application History
- View all past applications
- Status tracking: **Approved / Rejected / Under Review**
- Detailed view with reasons and timestamps

### 🎨 Modern UI & UX
- Fully responsive (mobile + desktop)
- Dark / Light mode support
- Smooth animations and clean layout

### 🔐 Secure & Reliable
- Supabase authentication
- Protected routes
- User-specific data isolation

---

## 🧠 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend & Services
- Supabase (Authentication & Database)
- Edge Functions
- AI-based decision logic

### Utilities
- jsPDF – PDF sanction letter generation
- next-themes – Dark / Light mode
- react-router-dom – Routing

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── chat/              # AI loan chatbot
│   ├── landing/           # Landing page sections
│   ├── ui/                # shadcn UI components
│   └── ThemeToggle.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Apply.tsx
│   ├── Profile.tsx
│   ├── Auth.tsx
│   └── Contact.tsx
│
├── hooks/
│   ├── useAuth.ts
│   └── useLoanChat.ts
│   └── use-toast.ts
│   └── use-mobile.ts
│
├── lib/
│   ├── generateSanctionLetterPDF.ts
│   └── utils.ts
│
├── integrations/
│   └── supabase/
├── Types/
|   └── loan.ts/
|   └── txt/
│
└── main.tsx
```

---

### 🔁 User Flow

1. User signs up or logs in using secure authentication  
2. User applies for a loan via the AI-powered chatbot  
3. AI evaluates loan details and eligibility  
4. User receives one of the following outcomes:
   - ✅ **Approved** → Sanction letter is generated
   - ❌ **Rejected** → Clear rejection reason is shown
5. Users can download the sanction letter anytime  
6. All applications are visible in **Profile → Loan History**

---

## 🔐 Authentication & Security

- Supabase email/password authentication
- Protected routes (`Apply`, `Profile`)
- Data accessible only to authenticated users
- User-specific data isolation

---

## 📄 Sanction Letter (PDF)

- Auto-generated upon loan approval
- Contains:
  - Loan amount
  - EMI
  - Interest rate
  - Tenure
  - Validity date
- Downloadable anytime from the Profile page

---

## 🧪 Setup & Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/loanpal.git
cd loanpal
```


### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
```bash

Create a .env file in the root directory:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run the application
```bash
npm run dev
```

---

### 📌 Future Enhancements

**1) Admin dashboard** 

**2) Multi-bank loan offers** 

**3) WhatsApp / Email notifications**

**4) Credit score integration**

**5) Support ticket system**

---

### 👨‍💻 Author

Made by Neeraj Kumar, Alankrit Agarwal, Tushar Sharma, Udit N. Pandey, Sohit K. Sharma 
LoanPal – AI-driven loan approval platform
Built with ❤️ using React, Supabase & AI
