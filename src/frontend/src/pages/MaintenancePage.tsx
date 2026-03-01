import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitMaintenance } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import {
  Building,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { PropertyType } from "../backend";

const propertyTypes = [
  { value: PropertyType.residential, label: "Residential", icon: "🏠" },
  { value: PropertyType.commercial, label: "Commercial", icon: "🏢" },
  { value: PropertyType.industrial, label: "Industrial/Land", icon: "🌿" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: PropertyType | "";
  propertySize: string;
  notes: string;
}

export function MaintenancePage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    propertySize: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitMaintenance();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.propertyType) return;

    mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        propertyAddress: form.propertyAddress,
        propertyType: form.propertyType as PropertyType,
        notes: form.notes.trim() || null,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) => {
          toast.error("Failed to submit. Please try again.", {
            description: err.message,
          });
        },
      },
    );
  };

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
            Request Received!
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed mb-2">
            Thank you, <strong>{form.name}</strong>. We've received your
            property details.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-2">
            Our team at Williams Homes will review your property information and
            send a personalised quote to <strong>{form.email}</strong> shortly.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
            You can also reach us directly at{" "}
            <a href="tel:+919820785232" className="text-accent font-medium">
              +91 98207 85232
            </a>
            .
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="font-heading font-semibold"
          >
            Submit Another Property
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div
        className="relative bg-primary pt-32 pb-16"
        style={{
          backgroundImage:
            "url(/assets/generated/goa-villa-property.dim_800x600.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-heading text-xs uppercase tracking-widest text-accent font-semibold mb-3">
              Property Maintenance
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground mb-4">
              Get a Free Quote
            </h1>
            <p className="font-body text-primary-foreground/65 max-w-xl leading-relaxed">
              Share your property details and we'll send you a tailored
              maintenance quote directly to your email — no obligations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-2xl mx-auto">
          {/* Info notice */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-accent/8 border border-accent/20 mb-8"
          >
            <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-foreground/75 leading-relaxed">
              Once you submit your property details, the Williams Homes team
              will review them and email you a personalised maintenance quote
              within 24–48 hours.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-heading font-semibold text-foreground">
                      Your Property Details
                    </h2>
                    <p className="font-body text-xs text-muted-foreground">
                      A quote will be mailed to you by Williams Homes
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
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
                          placeholder="Your full name"
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
                          placeholder="you@example.com"
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

                  {/* Phone */}
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
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                        className="pl-9 font-body"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Property Address */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="font-heading font-medium text-sm"
                    >
                      Property Address in Goa{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="e.g. Villa No. 5, Calangute, North Goa"
                        value={form.propertyAddress}
                        onChange={(e) =>
                          handleChange("propertyAddress", e.target.value)
                        }
                        required
                        className="pl-9 font-body"
                        autoComplete="street-address"
                      />
                    </div>
                  </div>

                  {/* Property Size */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="propertySize"
                      className="font-heading font-medium text-sm"
                    >
                      Approximate Property Size
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="propertySize"
                        placeholder="e.g. 2 BHK, 1200 sq ft, 3-acre plot"
                        value={form.propertySize}
                        onChange={(e) =>
                          handleChange("propertySize", e.target.value)
                        }
                        className="pl-9 font-body"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <Label className="font-heading font-medium text-sm">
                      Property Type <span className="text-destructive">*</span>
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {propertyTypes.map((pt) => (
                        <button
                          key={pt.value}
                          type="button"
                          onClick={() => handleChange("propertyType", pt.value)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer",
                            form.propertyType === pt.value
                              ? "border-accent bg-accent/8 shadow-glow"
                              : "border-border bg-card hover:border-accent/30",
                          )}
                        >
                          <span className="text-xl">{pt.icon}</span>
                          <span className="font-heading text-xs font-semibold text-foreground">
                            {pt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes / Special Requirements */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="font-heading font-medium text-sm"
                    >
                      Notes / Special Requirements
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific maintenance concerns, current issues, or special requirements you'd like us to know about..."
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={4}
                      className="font-body resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !form.propertyType}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold text-base h-12 shadow-glow"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Request My Quote
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center font-body">
                    We'll review your property details and email you a
                    personalised quote within 24–48 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
