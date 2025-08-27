// app/api/newsletter/route.ts
export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const { email, consent } = await req.json();

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Podaj poprawny adres e-mail." }), { status: 400 });
    }
    if (!consent) {
      return new Response(JSON.stringify({ error: "Zaznacz zgodę na otrzymywanie newslettera." }), { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    const dcMatch = API_KEY?.match(/-(\w+)$/);
    const DC = dcMatch?.[1];

    if (!API_KEY || !AUDIENCE_ID || !DC) {
      return new Response(JSON.stringify({ error: "Brak konfiguracji serwera (ENV)." }), { status: 500 });
    }

    const url = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
    const auth = Buffer.from(`anystring:${API_KEY}`).toString("base64");

    const mcRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        email_address: email.toLowerCase(),
        status: "pending", // double opt-in
      }),
    });

    const data = await mcRes.json();

    if (mcRes.ok || data?.title === "Member Exists") {
      return Response.json({ ok: true });
    }

    return new Response(JSON.stringify({ error: data?.detail || "Mailchimp odrzucił żądanie." }), {
      status: 400,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Błąd serwera." }), { status: 500 });
  }
}
