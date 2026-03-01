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
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
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
      if (!actor) throw new Error("Actor not available");
      return actor.submitConsultationBooking(
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
  });
}

export function useSubmitMaintenance() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
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
      if (!actor) throw new Error("Actor not available");
      return actor.submitMaintenanceSignUp(
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
  });
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
