import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrdersContext";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Information" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const order = addOrder({ items, subtotal, shipping, total });
    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  const inputClass =
    "w-full h-11 px-4 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors";

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors",
                      currentStep > step.id
                        ? "bg-foreground text-background"
                        : currentStep === step.id
                          ? "bg-foreground text-background"
                          : "bg-card border border-border text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "text-sm hidden sm:block",
                      currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 mx-2 sm:mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-serif font-semibold text-foreground">Contact Information</h2>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      className={inputClass}
                    />
                    <h2 className="text-xl font-serif font-semibold text-foreground pt-2">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={form.address}
                      onChange={(e) => updateForm("address", e.target.value)}
                      className={inputClass}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={form.state}
                        onChange={(e) => updateForm("state", e.target.value)}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={form.zip}
                        onChange={(e) => updateForm("zip", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-serif font-semibold text-foreground">Shipping Method</h2>
                    {[
                      { id: "standard", label: "Standard Shipping", time: "5–7 business days", price: shipping === 0 ? "Free" : "$12.00" },
                      { id: "express", label: "Express Shipping", time: "2–3 business days", price: "$18.00" },
                      { id: "overnight", label: "Overnight Shipping", time: "Next business day", price: "$28.00" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          "flex items-center justify-between p-4 bg-card border rounded-xl cursor-pointer transition-colors",
                          form.shippingMethod === method.id ? "border-foreground" : "border-border hover:border-foreground/30"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              form.shippingMethod === method.id ? "border-foreground" : "border-border"
                            )}
                          >
                            {form.shippingMethod === method.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.time}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{method.price}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Demo checkout — no real payment will be processed</p>
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-foreground">Payment</h2>
                    <input
                      type="text"
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={(e) => updateForm("cardNumber", e.target.value)}
                      className={inputClass}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={form.cardExpiry}
                        onChange={(e) => updateForm("cardExpiry", e.target.value)}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={form.cardCvc}
                        onChange={(e) => updateForm("cardCvc", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={form.cardName}
                      onChange={(e) => updateForm("cardName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-serif font-semibold text-foreground">Review Order</h2>
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shipping to</p>
                        <p className="text-sm text-foreground">
                          {form.firstName} {form.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {form.address}, {form.city} {form.state} {form.zip}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Payment</p>
                        <p className="text-sm text-foreground">
                          •••• •••• •••• {form.cardNumber.slice(-4) || "0000"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                          <div className="w-12 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.color} / {item.size} × {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
              </h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="w-14 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-[9px] font-medium text-background">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.color} / {item.size}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={cn("text-foreground", shipping === 0 && "text-green-600 dark:text-green-400")}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
