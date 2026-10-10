fetch("https://bazaar-dor-plum.vercel.app/api/auth/sign-in/social", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ provider: "github", callbackURL: "/" })
}).then(async r => {
  const text = await r.text();
  console.log(r.status, text);
});
