import React, { useState } from "react";
import {
  CreditCard, Wallet, X, Shield, Lock,
  CheckCircle, AlertCircle, ExternalLink, Copy
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PAYMENT_RECIPIENT =
  process.env.REACT_APP_PAYMENT_RECIPIENT ||
  "0xAa12924790268f4A498fC6bFE7A3377A3074a219";

const calcEthPrice = (totalBytes) => {
  const mb = totalBytes / (1024 * 1024);
  return Math.max(0.001, 0.001 + mb * 0.0001).toFixed(6);
};

const shortenAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

const StripeForm = ({ usdCost, onConfirm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [stripeError, setStripeError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setStripeError("");

    try {
      // Step 1: validate form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setStripeError(submitError.message);
        return;
      }

      // Step 2: create PaymentIntent on backend
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents: Math.round(parseFloat(usdCost) * 100) }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to create payment intent.");
      }
      const { clientSecret } = await res.json();

      // Step 3: confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });

      if (error) {
        setStripeError(error.message);
        return;
      }

      // Step 4: verify server-side and get upload token
      const authRes = await fetch("/api/authorize-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
      });

      if (!authRes.ok) {
        const body = await authRes.json().catch(() => ({}));
        setStripeError(body.error || "Payment verification failed.");
        return;
      }

      const { uploadToken } = await authRes.json();
      onConfirm("credit_card", uploadToken);
    } catch (err) {
      setStripeError(err.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6">
      <div className="bg-slate-800 border border-slate-600 rounded-xl p-4">
        <PaymentElement
          options={{
            layout: "tabs",
            appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#a78bfa",
                colorBackground: "#1e293b",
                colorText: "#f1f5f9",
                colorDanger: "#f87171",
                borderRadius: "8px",
              },
            },
          }}
        />
      </div>

      {stripeError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-300 text-xs">{stripeError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3.5 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" /> Pay ${usdCost} &amp; Upload
          </>
        )}
      </button>
    </form>
  );
};

export const PaymentModal = ({ files, onConfirm, onCancel }) => {
  const [method, setMethod] = useState("credit_card");

  const [mmStep, setMmStep]       = useState("idle");
  const [mmAddress, setMmAddress] = useState("");
  const [mmBalance, setMmBalance] = useState("");
  const [mmTxHash, setMmTxHash]   = useState("");
  const [mmError, setMmError]     = useState("");
  const [mmNetwork, setMmNetwork] = useState("");

  const totalSize = files.reduce((a, f) => a + f.size, 0);
  const usdCost   = Math.max(0.50, totalSize / (1024 * 1024) * 0.002 + 0.01).toFixed(4);
  const ethCost   = calcEthPrice(totalSize);

  const connectMetaMask = async () => {
    setMmError("");
    if (!window.ethereum) {
      setMmError("MetaMask is not installed. Please install it from metamask.io and refresh the page.");
      return;
    }
    try {
      setMmStep("connecting");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setMmAddress(accounts[0]);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const networks = {
        "0x1": "Ethereum Mainnet", "0x5": "Goerli Testnet",
        "0xaa36a7": "Sepolia Testnet", "0x89": "Polygon",
        "0xa": "Optimism", "0xa4b1": "Arbitrum",
      };
      setMmNetwork(networks[chainId] || `Chain ${parseInt(chainId, 16)}`);

      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      setMmBalance((parseInt(balanceHex, 16) / 1e18).toFixed(4));
      setMmStep("confirm");
    } catch (err) {
      setMmError(err.code === 4001
        ? "Connection rejected. Please accept the MetaMask request to continue."
        : err.message || "Failed to connect MetaMask.");
      setMmStep("idle");
    }
  };

  const sendPayment = async () => {
    setMmError("");
    try {
      setMmStep("sending");
      const weiHex = "0x" + Math.floor(parseFloat(ethCost) * 1e18).toString(16);
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: mmAddress, to: PAYMENT_RECIPIENT, value: weiHex, gas: "0x5208" }],
      });
      setMmTxHash(txHash);
      setMmStep("confirming");

      let receipt = null;
      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [txHash],
        });
        if (receipt) break;
      }

      if (!receipt || receipt.status === "0x1") {
        setMmStep("done");
        setTimeout(() => onConfirm("metamask"), 1000);
      } else {
        setMmError("Transaction failed on-chain. Please try again.");
        setMmStep("confirm");
      }
    } catch (err) {
      setMmError(err.code === 4001
        ? "Transaction rejected. Please confirm the transaction in MetaMask."
        : err.message || "Transaction failed.");
      setMmStep("confirm");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upload Payment</h2>
              <p className="text-sm text-gray-400">One-time permanent storage fee</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 bg-slate-800/40 border-b border-slate-800">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{files.length} file{files.length !== 1 ? "s" : ""} · {(totalSize / 1024 / 1024).toFixed(2)} MB</span>
            <span className="text-white font-semibold">
              {method === "metamask" ? `${ethCost} ETH` : `$${usdCost} USD`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400">
            <CheckCircle className="w-3 h-3" />
            <span>Permanent storage — pay once, stored forever on Arweave</span>
          </div>
        </div>

        <div className="px-6 pt-5">
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => { setMethod("credit_card"); setMmStep("idle"); setMmError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                method === "credit_card"
                  ? "bg-purple-500/20 border-purple-500/60 text-purple-300"
                  : "border-slate-700 text-gray-400 hover:border-slate-600"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Credit Card
            </button>
            <button
              onClick={() => setMethod("metamask")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                method === "metamask"
                  ? "bg-orange-500/20 border-orange-500/60 text-orange-300"
                  : "border-slate-700 text-gray-400 hover:border-slate-600"
              }`}
            >
              <Wallet className="w-4 h-4" />
              MetaMask
            </button>
          </div>

          {method === "credit_card" && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(parseFloat(usdCost) * 100),
                currency: "usd",
              }}
            >
              <StripeForm usdCost={usdCost} onConfirm={onConfirm} />
            </Elements>
          )}

          {method === "metamask" && (
            <div className="pb-6 space-y-4">

              {mmError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{mmError}</p>
                </div>
              )}

              {mmStep === "idle" && (
                <>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-sm text-orange-200 space-y-1">
                    <p className="font-semibold">What will happen:</p>
                    <ol className="list-decimal list-inside space-y-1 text-orange-300/80">
                      <li>MetaMask will ask you to connect your wallet</li>
                      <li>You'll approve a transaction of <strong>{ethCost} ETH</strong></li>
                      <li>Once confirmed, your files will be uploaded</li>
                    </ol>
                  </div>
                  <button onClick={connectMetaMask}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Connect MetaMask Wallet
                  </button>
                </>
              )}

              {mmStep === "connecting" && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-2 border-orange-500/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-orange-300 font-semibold">Connecting to MetaMask...</p>
                  <p className="text-gray-400 text-sm mt-1">Check the MetaMask popup and approve the connection</p>
                </div>
              )}

              {mmStep === "confirm" && (
                <div className="space-y-4">
                  <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-5 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-green-300 text-sm font-medium">Wallet Connected</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Address</span>
                      <span className="text-white font-mono">{shortenAddress(mmAddress)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Network</span>
                      <span className="text-white">{mmNetwork}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Balance</span>
                      <span className={parseFloat(mmBalance) < parseFloat(ethCost) ? "text-red-400" : "text-white"}>
                        {mmBalance} ETH
                      </span>
                    </div>
                    <div className="border-t border-slate-700 pt-3 flex justify-between text-sm font-semibold">
                      <span className="text-gray-300">Amount to Pay</span>
                      <span className="text-orange-300">{ethCost} ETH</span>
                    </div>
                  </div>

                  {parseFloat(mmBalance) < parseFloat(ethCost) && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-xs">Insufficient balance. You need at least {ethCost} ETH.</p>
                    </div>
                  )}

                  <button onClick={sendPayment}
                    disabled={parseFloat(mmBalance) < parseFloat(ethCost)}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm &amp; Pay {ethCost} ETH
                  </button>
                </div>
              )}

              {mmStep === "sending" && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-2 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-yellow-300 font-semibold">Waiting for MetaMask approval...</p>
                  <p className="text-gray-400 text-sm mt-1">Confirm the transaction in MetaMask popup</p>
                </div>
              )}

              {mmStep === "confirming" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-blue-300 font-semibold">Transaction sent — awaiting confirmation...</p>
                    <p className="text-gray-400 text-sm mt-1">Usually takes 15–30 seconds</p>
                  </div>
                  {mmTxHash && (
                    <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                      <p className="text-gray-400 text-xs mb-2">Transaction Hash</p>
                      <div className="flex items-center gap-2">
                        <code className="text-green-300 text-xs font-mono truncate flex-1">{mmTxHash}</code>
                        <button onClick={() => navigator.clipboard.writeText(mmTxHash)}
                          className="text-gray-500 hover:text-white transition-colors flex-shrink-0">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <a href={`https://etherscan.io/tx/${mmTxHash}`} target="_blank" rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-400 transition-colors flex-shrink-0">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mmStep === "done" && (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-green-300 font-semibold text-lg">Payment Confirmed!</p>
                  <p className="text-gray-400 text-sm mt-1">Starting encrypted upload...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 pb-5 flex items-center gap-2 text-xs text-gray-500 border-t border-slate-800 pt-4">
          <Lock className="w-3 h-3" />
          <span>Payment is processed securely via Stripe. No card data touches our servers.</span>
        </div>
      </div>
    </div>
  );
};