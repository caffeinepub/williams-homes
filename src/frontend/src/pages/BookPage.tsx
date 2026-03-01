import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitConsultation } from "@/hooks/useQueries";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ConsultationType } from "../backend";

const consultationTypes = [
  {
    value: ConsultationType.propertyAssessment,
    label: "Property Assessment",
    desc: "On-site evaluation of your Goa property's condition and value",
  },
  {
    value: ConsultationType.investmentAdvice,
    label: "NRI Investment Advice",
    desc: "Expert guidance for NRIs investing in Goa real estate",
  },
  {
    value: ConsultationType.generalInquiry,
    label: "General Inquiry",
    desc: "Any questions about Goa property ownership or maintenance",
  },
];

const steps = [
  { num: "01", label: "Fill your details" },
  { num: "02", label: "Choose date & type" },
  { num: "03", label: "Confirm booking" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  consultationType: ConsultationType | "";
  message: string;
}

export function BookPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    consultationType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitConsultation();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consultationType) return;

    mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredDate: form.preferredDate,
        consultationType: form.consultationType as ConsultationType,
        message: form.message.trim() || null,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: (err) => {
          toast.error("Failed to submit booking. Please try again.", {
            description: err.message,
          });
        },
      },
    );
  };

  // Today's date as min
  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
            Booking Confirmed!
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed mb-2">
            Thank you, <strong>{form.name}</strong>. Your consultation request
            has been received.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            We'll reach out to you at <strong>{form.email}</strong> within 24
            hours to confirm your appointment on{" "}
            {new Date(`${form.preferredDate}T12:00:00`).toLocaleDateString(
              "en-US",
              { weekday: "long", month: "long", day: "numeric" },
            )}
            .
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="font-heading font-semibold mr-3"
          >
            Book Another
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Consultations
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground mb-4">
              Book a Consultation
            </h1>
            <p className="font-body text-primary-foreground/65 max-w-xl leading-relaxed">
              Schedule time with our Goa-based property experts. Whether you're
              an NRI or a local owner, we'll assess your needs and provide
              tailored recommendations for your Goa property.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xs font-bold text-accent">
                    {step.num}
                  </span>
                </div>
                <span className="font-body text-sm text-primary-foreground/70">
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block w-8 h-px bg-white/15 flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="font-heading font-medium text-sm"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Margaret Holloway"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          className="pl-9 font-body"
                          autoComplete="name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="font-heading font-medium text-sm"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="margaret@example.com"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          required
                          className="pl-9 font-body"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Date row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="font-heading font-medium text-sm"
                      >
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98207 85232"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          required
                          className="pl-9 font-body"
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="preferredDate"
                        className="font-heading font-medium text-sm"
                      >
                        Preferred Date{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="preferredDate"
                          type="date"
                          min={today}
                          value={form.preferredDate}
                          onChange={(e) =>
                            handleChange("preferredDate", e.target.value)
                          }
                          required
                          className="pl-9 font-body"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-2">
                    <Label className="font-heading font-medium text-sm">
                      Consultation Type{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.consultationType}
                      onValueChange={(v) => handleChange("consultationType", v)}
                      required
                    >
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Select a consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTypes.map((ct) => (
                          <SelectItem
                            key={ct.value}
                            value={ct.value}
                            className="font-body"
                          >
                            <div>
                              <div className="font-medium">{ct.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {ct.desc}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="font-heading font-medium text-sm"
                    >
                      Additional Message{" "}
                      <span className="text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your property or what you'd like to discuss..."
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        className="pl-9 min-h-[100px] font-body resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !form.consultationType}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold text-base h-12 shadow-glow"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Book Consultation"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center font-body">
                    We'll confirm your appointment within 24 hours. No
                    obligation.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-5"
          >
            <Card className="border-border shadow-card">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3.5">
                  {[
                    {
                      icon: "🏡",
                      text: "30–60 minute session with a certified property expert",
                    },
                    {
                      icon: "📋",
                      text: "Detailed written report delivered after your consultation",
                    },
                    {
                      icon: "💡",
                      text: "Actionable recommendations tailored to your goals",
                    },
                    {
                      icon: "🔒",
                      text: "All information kept strictly confidential",
                    },
                  ].map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-sm font-body text-foreground/80"
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-primary-foreground mb-2">
                  Prefer to call?
                </h3>
                <p className="font-body text-sm text-primary-foreground/65 mb-4">
                  Speak directly with our Goa-based team during business hours.
                </p>
                <div className="font-display text-xl text-accent">
                  +91 98207 85232
                </div>
                <div className="font-display text-xl text-accent mt-1">
                  +91 86928 30424
                </div>
                <p className="font-body text-xs text-primary-foreground/45 mt-1">
                  Mon–Sat, 9am–6pm IST
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
