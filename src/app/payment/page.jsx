"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const createIntent = async () => {
      const res = await fetch("http://localhost:5000/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    createIntent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email: user?.email },
      },
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await fetch("http://localhost:5000/api/payment-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          transactionId: paymentIntent.id,
          amount: 5,
        }),
      });
      toast.success("Payment successful! Premium unlocked.");
      router.push("/dashboard/user");
    }

    setProcessing(false);
  };

  const CARD_STYLE = {
    style: {
      base: {
        color: "#e4e4e7",
        fontFamily: "sans-serif",
        fontSize: "15px",
        "::placeholder": { color: "#52525b" },
      },
      invalid: { color: "#f87171" },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="bg-[#070b13] border border-gray-800 focus-within:border-purple-500 rounded-xl px-4 py-4 transition-colors">
        <CardElement options={CARD_STYLE} />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/20 active:scale-[0.99]"
      >
        {processing ? "Processing..." : "Pay One-time $5.00"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#070b13] text-white flex flex-col items-center justify-center font-sans px-4 py-12">

      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#0d1b2a] border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-4">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Upgrade Your Account</h1>
        <p className="text-gray-400 text-sm md:text-base max-w-md">
          Unlock premium prompt engineering templates and advanced assets
        </p>
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* Left: Plan Benefits */}
        <div className="bg-[#0b132b]/50 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <span className="inline-block bg-cyan-950 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-cyan-800/50">
              Lifetime Plan
            </span>
            <h2 className="text-2xl font-bold mb-4">Aiverse Pro Access</h2>
            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold text-gray-300 align-top">$</span>
              <span className="text-5xl font-black tracking-tight text-white mx-1">5.00</span>
              <span className="text-gray-400 text-sm">/ one-time</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Unlock all locked Private/Premium prompts",
                "Unlimited copy-to-clipboard actions",
                "Engage with rating and feedback reviews",
                "Priority access to future AI engine configurations",
                "One-time payment, lifetime ownership"
              ].map((feature, index) => (
                <li key={index} className="flex items-start space-x-3 text-sm text-gray-300">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-800/80 pt-4 flex items-center text-xs text-gray-400 space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Payments secured and encrypted via Stripe Gateway.</span>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="bg-[#0b132b]/50 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="text-md font-bold tracking-wide uppercase text-gray-200">Card Information</h3>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>

          {/* Test Card Helper */}
          <div className="mt-8 border border-dashed border-purple-900/50 bg-purple-950/10 rounded-xl p-4 text-center">
            <span className="text-[10px] uppercase tracking-widest font-black text-purple-400 block mb-2">
              Stripe Test Card
            </span>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-3 leading-relaxed">
              Use this test card number to simulate a successful payment.
            </p>
            <code className="text-sm font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-900/40 px-3 py-1.5 rounded-lg">
              4242 4242 4242 4242
            </code>
            <p className="text-xs text-gray-500 mt-2">Any future expiry • Any 3-digit CVC</p>
          </div>
        </div>

      </div>
    </div>
  );
}