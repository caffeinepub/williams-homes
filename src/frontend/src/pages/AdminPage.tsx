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
  useUpdateConsultationStatus,
  useUpdateMaintenanceStatus,
} from "@/hooks/useQueries";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  LogOut,
  RefreshCw,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ConsultationStatus, MaintenanceStatus } from "../backend";
import type { ConsultationBooking, MaintenanceSignUp } from "../backend.d.ts";

const ADMIN_PASSWORD = "williamshomesgoa_2526";
const STORAGE_KEY = "wh_admin_auth";

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

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === ADMIN_PASSWORD,
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { identity, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isIILoggedIn = !!identity;

  const {
    data: consultations = [],
    isLoading: loadingConsultations,
    error: consultationsError,
    refetch: refetchConsultations,
  } = useAllConsultations();
  const {
    data: maintenanceSignUps = [],
    isLoading: loadingMaintenance,
    error: maintenanceError,
    refetch: refetchMaintenance,
  } = useAllMaintenanceSignUps();

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, ADMIN_PASSWORD);
      setIsAuthenticated(true);
      setPasswordError(false);
      toast.success("Welcome to the Williams Homes admin dashboard!");
    } else {
      setPasswordError(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    setPasswordError(false);
  };

  const handleRefresh = () => {
    void refetchConsultations();
    void refetchMaintenance();
  };

  // Password login screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed text-sm">
              Enter the admin password to access the dashboard
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                className={`font-body pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {passwordError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-sm text-destructive"
              >
                Incorrect password. Please try again.
              </motion.p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold"
            >
              Login
            </Button>
          </form>
        </motion.div>
      </main>
    );
  }

  // Admin dashboard
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
                  Admin: Williams Homes
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-white/20 text-primary-foreground hover:bg-white/10 font-heading"
              >
                <LogOut className="mr-2 h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          </motion.div>

          {/* Internet Identity login notice */}
          {!isIILoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-500/15 border border-amber-400/30"
            >
              <AlertCircle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-heading font-semibold text-sm text-amber-200 mb-1">
                  Internet Identity login required to view bookings
                </p>
                <p className="font-body text-xs text-amber-200/70 mb-3">
                  The backend requires you to be logged in with Internet
                  Identity (ICP) to fetch data. Click below to connect your
                  identity.
                </p>
                <Button
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  size="sm"
                  className="bg-amber-400 text-amber-900 hover:bg-amber-300 font-heading font-semibold"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-3.5 w-3.5" />
                      Login with Internet Identity
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

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
              ) : consultationsError ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                  <AlertCircle className="w-10 h-10 text-amber-500 opacity-70" />
                  <p className="font-heading font-semibold text-foreground">
                    Could not load bookings
                  </p>
                  <p className="font-body text-sm text-muted-foreground max-w-sm">
                    {isIILoggedIn
                      ? "Your Internet Identity may not have admin permissions. Open this app from your Caffeine dashboard to get admin access."
                      : "You need to login with Internet Identity above to view bookings."}
                  </p>
                  {!isIILoggedIn && (
                    <Button
                      onClick={login}
                      size="sm"
                      className="mt-2 font-heading font-semibold"
                    >
                      <LogIn className="mr-2 h-3.5 w-3.5" />
                      Login with Internet Identity
                    </Button>
                  )}
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
              ) : maintenanceError ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                  <AlertCircle className="w-10 h-10 text-amber-500 opacity-70" />
                  <p className="font-heading font-semibold text-foreground">
                    Could not load maintenance requests
                  </p>
                  <p className="font-body text-sm text-muted-foreground max-w-sm">
                    {isIILoggedIn
                      ? "Your Internet Identity may not have admin permissions. Open this app from your Caffeine dashboard to get admin access."
                      : "You need to login with Internet Identity above to view requests."}
                  </p>
                  {!isIILoggedIn && (
                    <Button
                      onClick={login}
                      size="sm"
                      className="mt-2 font-heading font-semibold"
                    >
                      <LogIn className="mr-2 h-3.5 w-3.5" />
                      Login with Internet Identity
                    </Button>
                  )}
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
