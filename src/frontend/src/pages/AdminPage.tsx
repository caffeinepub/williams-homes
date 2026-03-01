import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAllConsultations,
  useAllMaintenanceSignUps,
  useIsAdmin,
  useUpdateConsultationStatus,
  useUpdateMaintenanceStatus,
} from "@/hooks/useQueries";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Loader2,
  RefreshCw,
  Shield,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ConsultationStatus, MaintenanceStatus } from "../backend";
import type { ConsultationBooking, MaintenanceSignUp } from "../backend.d.ts";

const consultationStatusColors: Record<ConsultationStatus, string> = {
  [ConsultationStatus.pending]: "bg-amber-100 text-amber-800 border-amber-200",
  [ConsultationStatus.confirmed]: "bg-blue-100 text-blue-800 border-blue-200",
  [ConsultationStatus.completed]:
    "bg-green-100 text-green-800 border-green-200",
  [ConsultationStatus.cancelled]: "bg-red-100 text-red-800 border-red-200",
};

const maintenanceStatusColors: Record<MaintenanceStatus, string> = {
  [MaintenanceStatus.pending]: "bg-amber-100 text-amber-800 border-amber-200",
  [MaintenanceStatus.active]: "bg-green-100 text-green-800 border-green-200",
  [MaintenanceStatus.cancelled]: "bg-red-100 text-red-800 border-red-200",
};

function formatDate(nanos: bigint): string {
  const ms = Number(nanos / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ConsultationsTable({ bookings }: { bookings: ConsultationBooking[] }) {
  const { mutate: updateStatus, isPending } = useUpdateConsultationStatus();

  const handleStatusChange = (id: bigint, status: ConsultationStatus) => {
    updateStatus(
      { id, status },
      {
        onSuccess: () => toast.success("Status updated"),
        onError: () => toast.error("Failed to update status"),
      },
    );
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground font-body">
        <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No consultation bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Phone
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Type
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking.id.toString()}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-body font-medium text-sm">
                {booking.name}
              </TableCell>
              <TableCell className="font-body text-sm text-muted-foreground">
                {booking.email}
              </TableCell>
              <TableCell className="font-body text-sm text-muted-foreground">
                {booking.phone}
              </TableCell>
              <TableCell className="font-body text-sm">
                {booking.preferredDate}
              </TableCell>
              <TableCell className="font-body text-sm">
                {booking.consultationType === "propertyAssessment"
                  ? "Property Assessment"
                  : booking.consultationType === "investmentAdvice"
                    ? "Investment Advice"
                    : "General Inquiry"}
              </TableCell>
              <TableCell>
                <Select
                  value={booking.status}
                  onValueChange={(v) =>
                    handleStatusChange(booking.id, v as ConsultationStatus)
                  }
                  disabled={isPending}
                >
                  <SelectTrigger className="w-36 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ConsultationStatus).map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="text-xs font-body"
                      >
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${consultationStatusColors[s as ConsultationStatus]}`}
                        >
                          {capitalize(s)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="font-body text-sm text-muted-foreground">
                {formatDate(booking.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MaintenanceTable({ signUps }: { signUps: MaintenanceSignUp[] }) {
  const { mutate: updateStatus, isPending } = useUpdateMaintenanceStatus();

  const handleStatusChange = (id: bigint, status: MaintenanceStatus) => {
    updateStatus(
      { id, status },
      {
        onSuccess: () => toast.success("Status updated"),
        onError: () => toast.error("Failed to update status"),
      },
    );
  };

  if (signUps.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground font-body">
        <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No maintenance sign-ups yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Address
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Prop. Type
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Notes
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="font-heading font-semibold text-xs uppercase tracking-wider">
              Created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signUps.map((signup) => (
            <TableRow
              key={signup.id.toString()}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-body font-medium text-sm">
                {signup.name}
              </TableCell>
              <TableCell className="font-body text-sm text-muted-foreground">
                {signup.email}
              </TableCell>
              <TableCell
                className="font-body text-sm max-w-[180px] truncate"
                title={signup.propertyAddress}
              >
                {signup.propertyAddress}
              </TableCell>
              <TableCell className="font-body text-sm">
                <Badge variant="outline" className="font-body text-xs">
                  {capitalize(signup.propertyType)}
                </Badge>
              </TableCell>
              <TableCell
                className="font-body text-sm text-muted-foreground max-w-[200px] truncate"
                title={signup.notes ?? ""}
              >
                {signup.notes ?? <span className="italic opacity-50">—</span>}
              </TableCell>
              <TableCell>
                <Select
                  value={signup.status}
                  onValueChange={(v) =>
                    handleStatusChange(signup.id, v as MaintenanceStatus)
                  }
                  disabled={isPending}
                >
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MaintenanceStatus).map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="text-xs font-body"
                      >
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${maintenanceStatusColors[s as MaintenanceStatus]}`}
                        >
                          {capitalize(s)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="font-body text-sm text-muted-foreground">
                {formatDate(signup.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AccessDeniedHelp() {
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState("");
  const currentUrl = `${window.location.origin}/admin`;

  const handleGo = () => {
    if (!token.trim()) {
      toast.error("Please enter your admin token first");
      return;
    }
    window.location.href = `${currentUrl}?caffeineAdminToken=${encodeURIComponent(token.trim())}`;
  };

  const copyUrl = () => {
    const url = `${currentUrl}?caffeineAdminToken=${token.trim() || "YOUR_TOKEN_HERE"}`;
    navigator.clipboard.writeText(url).then(() => toast.success("URL copied!"));
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
            Access Denied
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed">
            Your account isn't registered as an admin yet. Follow the steps
            below to set up admin access.
          </p>
        </div>

        {/* Steps card */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4 space-y-5">
          <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            How to get admin access
          </h2>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <span className="font-heading font-bold text-xs text-primary">
                  1
                </span>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-foreground mb-1">
                  Find your admin token
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Go to your{" "}
                  <strong className="text-foreground">
                    Caffeine dashboard
                  </strong>{" "}
                  → open the{" "}
                  <strong className="text-foreground">Williams Homes</strong>{" "}
                  project → click{" "}
                  <strong className="text-foreground">Settings</strong> or{" "}
                  <strong className="text-foreground">
                    Environment Variables
                  </strong>
                  . Look for the key named:
                </p>
                <div className="mt-2 px-3 py-2 bg-muted rounded-lg font-mono text-sm text-foreground border border-border">
                  CAFFEINE_ADMIN_TOKEN
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <span className="font-heading font-bold text-xs text-primary">
                  2
                </span>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-foreground mb-1">
                  Visit the admin URL with your token
                </p>
                <p className="font-body text-sm text-muted-foreground mb-2">
                  The URL format is:
                </p>
                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border">
                  <code className="font-mono text-xs text-foreground flex-1 break-all">
                    {currentUrl}?caffeineAdminToken=
                    <span className="text-primary">YOUR_TOKEN</span>
                  </code>
                  <button
                    type="button"
                    onClick={copyUrl}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick setup form */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span className="font-heading font-semibold text-sm text-foreground">
                Quick Setup — Enter your token here
              </span>
            </div>
            {showForm ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-1 space-y-3 border-t border-border">
                  <label
                    htmlFor="admin-token-input"
                    className="font-body text-sm text-muted-foreground"
                  >
                    Paste your{" "}
                    <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                      CAFFEINE_ADMIN_TOKEN
                    </code>{" "}
                    value:
                  </label>
                  <Input
                    id="admin-token-input"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="e.g. abc123xyz..."
                    className="font-mono text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleGo()}
                  />
                  <div className="flex gap-2 pt-1">
                    <Button
                      onClick={handleGo}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Go to Admin
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyUrl}
                      className="font-heading"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">
                    This will navigate to the admin URL with your token
                    appended, registering you as admin.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}

export function AdminPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsAdmin();
  const {
    data: consultations = [],
    isLoading: loadingConsultations,
    refetch: refetchConsultations,
  } = useAllConsultations();
  const {
    data: maintenanceSignUps = [],
    isLoading: loadingMaintenance,
    refetch: refetchMaintenance,
  } = useAllMaintenanceSignUps();

  const handleRefresh = () => {
    void refetchConsultations();
    void refetchMaintenance();
  };

  if (!identity) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
            Admin Access
          </h1>
          <p className="font-body text-muted-foreground mb-8 leading-relaxed">
            Please log in to access the admin dashboard. Only authorized
            administrators can view booking and sign-up data.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.div>
      </main>
    );
  }

  if (isCheckingAdmin) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-3" />
          <p className="font-body text-muted-foreground">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedHelp />;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-primary pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between flex-wrap gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="font-heading text-xs uppercase tracking-widest text-accent font-semibold">
                  Admin Dashboard
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-primary-foreground">
                Submissions Overview
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="border-white/20 text-primary-foreground hover:bg-white/10 font-heading"
              >
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Refresh
              </Button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/15 border border-accent/25">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-heading text-xs text-accent font-medium">
                  Admin: {identity.getPrincipal().toString().slice(0, 12)}...
                </span>
              </div>
            </div>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: "Total Consultations", value: consultations.length },
              {
                label: "Pending Consultations",
                value: consultations.filter(
                  (c) => c.status === ConsultationStatus.pending,
                ).length,
              },
              {
                label: "Maintenance Sign-Ups",
                value: maintenanceSignUps.length,
              },
              {
                label: "Active Plans",
                value: maintenanceSignUps.filter(
                  (m) => m.status === MaintenanceStatus.active,
                ).length,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/8 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10"
              >
                <div className="font-display text-2xl font-semibold text-accent">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-primary-foreground/55 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs defaultValue="consultations">
            <TabsList className="mb-6 font-heading">
              <TabsTrigger value="consultations" className="font-heading">
                Consultations
                {consultations.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-accent/15 text-accent font-bold">
                    {consultations.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="font-heading">
                Maintenance Sign-Ups
                {maintenanceSignUps.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-accent/15 text-accent font-bold">
                    {maintenanceSignUps.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consultations">
              {loadingConsultations ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-7 h-7 text-accent animate-spin mr-3" />
                  <span className="font-body text-muted-foreground">
                    Loading consultations...
                  </span>
                </div>
              ) : (
                <ConsultationsTable bookings={consultations} />
              )}
            </TabsContent>

            <TabsContent value="maintenance">
              {loadingMaintenance ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-7 h-7 text-accent animate-spin mr-3" />
                  <span className="font-body text-muted-foreground">
                    Loading sign-ups...
                  </span>
                </div>
              ) : (
                <MaintenanceTable signUps={maintenanceSignUps} />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}
