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
  return useQuery<ConsultationBooking[]>({
    queryKey: ["consultations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllConsultations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllMaintenanceSignUps() {
  const { actor, isFetching } = useActor();
  return useQuery<MaintenanceSignUp[]>({
    queryKey: ["maintenanceSignUps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMaintenanceSignUps();
    },
    enabled: !!actor && !isFetching,
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
        // Try to get actor from cache if not available yet
        let resolvedActor = actor;
        if (!resolvedActor) {
          // Wait up to 8 seconds for actor to initialize
          for (let i = 0; i < 16; i++) {
            await new Promise((r) => setTimeout(r, 500));
            const cached =
              queryClient.getQueryData<import("../backend").backendInterface>([
                "actor",
                undefined,
              ]) ??
              queryClient.getQueriesData<import("../backend").backendInterface>(
                { queryKey: ["actor"] },
              )[0]?.[1];
            if (cached) {
              resolvedActor = cached;
              break;
            }
          }
        }
        if (!resolvedActor)
          throw new Error(
            "Could not connect to the backend. Please refresh the page and try again.",
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
        // Try to get actor from cache if not available yet
        let resolvedActor = actor;
        if (!resolvedActor) {
          // Wait up to 8 seconds for actor to initialize
          for (let i = 0; i < 16; i++) {
            await new Promise((r) => setTimeout(r, 500));
            const cached =
              queryClient.getQueryData<import("../backend").backendInterface>([
                "actor",
                undefined,
              ]) ??
              queryClient.getQueriesData<import("../backend").backendInterface>(
                { queryKey: ["actor"] },
              )[0]?.[1];
            if (cached) {
              resolvedActor = cached;
              break;
            }
          }
        }
        if (!resolvedActor)
          throw new Error(
            "Could not connect to the backend. Please refresh the page and try again.",
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
      if (!actor) throw new Error("Actor not available");
      await actor._initializeAccessControlWithSecret(token);
      return actor.isCallerAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}
