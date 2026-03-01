import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ConsultationBooking,
  ConsultationStatus,
  ConsultationType,
  MaintenanceSignUp,
  MaintenanceStatus,
  PropertyType,
} from "../backend";
import { useActor } from "./useActor";

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllConsultations() {
  const { actor, isFetching } = useActor();
  return useQuery<ConsultationBooking[], Error>({
    queryKey: ["consultations"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not connected");
      try {
        return await actor.getAllConsultations();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("Unauthorized") || msg.includes("rejected")) {
          throw new Error(
            "Backend authorization error: not logged in as admin via Internet Identity",
          );
        }
        throw new Error(msg);
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useAllMaintenanceSignUps() {
  const { actor, isFetching } = useActor();
  return useQuery<MaintenanceSignUp[], Error>({
    queryKey: ["maintenanceSignUps"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend not connected");
      try {
        return await actor.getAllMaintenanceSignUps();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("Unauthorized") || msg.includes("rejected")) {
          throw new Error(
            "Backend authorization error: not logged in as admin via Internet Identity",
          );
        }
        throw new Error(msg);
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useSubmitConsultation() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  return {
    ...useMutation<
      bigint,
      Error,
      {
        name: string;
        email: string;
        phone: string;
        preferredDate: string;
        consultationType: ConsultationType;
        message: string | null;
      }
    >({
      mutationFn: async (data) => {
        // Wait up to 15 seconds for actor to be available
        let resolvedActor = actor;
        if (!resolvedActor) {
          for (let i = 0; i < 30; i++) {
            await new Promise((r) => setTimeout(r, 500));
            const entries = queryClient.getQueriesData<
              import("../backend").backendInterface
            >({ queryKey: ["actor"] });
            const found = entries.map(([, v]) => v).find((v) => v != null);
            if (found) {
              resolvedActor = found;
              break;
            }
          }
        }
        if (!resolvedActor)
          throw new Error(
            "Could not connect to the backend. Please refresh and try again.",
          );
        return resolvedActor.submitConsultationBooking(
          data.name,
          data.email,
          data.phone,
          data.preferredDate,
          data.consultationType,
          data.message,
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["consultations"] });
      },
    }),
    actorLoading: isFetching,
  };
}

export function useSubmitMaintenance() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  return {
    ...useMutation<
      bigint,
      Error,
      {
        name: string;
        email: string;
        phone: string;
        propertyAddress: string;
        propertyType: PropertyType;
        notes: string | null;
      }
    >({
      mutationFn: async (data) => {
        // Wait up to 15 seconds for actor to be available
        let resolvedActor = actor;
        if (!resolvedActor) {
          for (let i = 0; i < 30; i++) {
            await new Promise((r) => setTimeout(r, 500));
            const entries = queryClient.getQueriesData<
              import("../backend").backendInterface
            >({ queryKey: ["actor"] });
            const found = entries.map(([, v]) => v).find((v) => v != null);
            if (found) {
              resolvedActor = found;
              break;
            }
          }
        }
        if (!resolvedActor)
          throw new Error(
            "Could not connect to the backend. Please refresh and try again.",
          );
        return resolvedActor.submitMaintenanceSignUp(
          data.name,
          data.email,
          data.phone,
          data.propertyAddress,
          data.propertyType,
          data.notes,
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["maintenanceSignUps"] });
      },
    }),
    actorLoading: isFetching,
  };
}

export function useUpdateConsultationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: bigint; status: ConsultationStatus }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateConsultationStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
  });
}

export function useUpdateMaintenanceStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: bigint; status: MaintenanceStatus }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMaintenanceStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenanceSignUps"] });
    },
  });
}

export function useRegisterUser() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["registerUser"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Attempt to initialize access control: registers user and optionally grants admin
// Returns true if caller is now admin, false otherwise
export function useInitializeAccess() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (token: string) => {
      // Wait up to 15 seconds for actor to be available
      let resolvedActor = actor;
      if (!resolvedActor) {
        for (let i = 0; i < 30; i++) {
          await new Promise((r) => setTimeout(r, 500));
          const entries = queryClient.getQueriesData<
            import("../backend").backendInterface
          >({
            queryKey: ["actor"],
          });
          const found = entries.map(([, v]) => v).find((v) => v != null);
          if (found) {
            resolvedActor = found;
            break;
          }
        }
      }
      if (!resolvedActor) throw new Error("Actor not available");
      // Call initialize to register/upgrade the user with the provided token
      await resolvedActor._initializeAccessControlWithSecret(token);
      return resolvedActor.isCallerAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}
