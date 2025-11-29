import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments] || PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(request: Request) {
  try {
    const { public_token } = await request.json();

    // Exchange public token for access token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const access_token = tokenResponse.data.access_token;

    // Get all accounts and their balances
    const accountsResponse = await plaidClient.accountsGet({ access_token });
    const accounts = accountsResponse.data.accounts;

    // Calculate total net worth from all accounts
    // Include checking, savings, investment, and other asset accounts
    let totalNetWorth = 0;
    for (const account of accounts) {
      const balance = account.balances.current || account.balances.available || 0;

      // For credit cards and loans, these are liabilities (negative)
      if (account.type === "credit" || account.type === "loan") {
        totalNetWorth -= balance;
      } else {
        // For depository, investment, and other accounts (positive)
        totalNetWorth += balance;
      }
    }

    return NextResponse.json({
      netWorth: Math.round(totalNetWorth),
      accounts: accounts.map((a) => ({
        name: a.name,
        type: a.type,
        subtype: a.subtype,
        balance: a.balances.current || a.balances.available || 0,
      })),
    });
  } catch (error: any) {
    console.error("Error exchanging token:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to verify accounts" },
      { status: 500 }
    );
  }
}
