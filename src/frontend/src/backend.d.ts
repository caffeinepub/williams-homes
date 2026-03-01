import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConsultationBooking {
    id: bigint;
    status: ConsultationStatus;
    name: string;
    createdAt: bigint;
    email: string;
    message?: string;
    preferredDate: string;
    phone: string;
    consultationType: ConsultationType;
}
export interface MaintenanceSignUp {
    id: bigint;
    status: MaintenanceStatus;
    propertyType: PropertyType;
    name: string;
    createdAt: bigint;
    propertyAddress: string;
    email: string;
    notes?: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum ConsultationStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ConsultationType {
    investmentAdvice = "investmentAdvice",
    propertyAssessment = "propertyAssessment",
    generalInquiry = "generalInquiry"
}
export enum MaintenanceStatus {
    active = "active",
    cancelled = "cancelled",
    pending = "pending"
}
export enum PropertyType {
    commercial = "commercial",
    residential = "residential",
    industrial = "industrial"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllConsultations(): Promise<Array<ConsultationBooking>>;
    getAllMaintenanceSignUps(): Promise<Array<MaintenanceSignUp>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitConsultationBooking(name: string, email: string, phone: string, preferredDate: string, consultationType: ConsultationType, message: string | null): Promise<bigint>;
    submitMaintenanceSignUp(name: string, email: string, phone: string, propertyAddress: string, propertyType: PropertyType, notes: string | null): Promise<bigint>;
    updateConsultationStatus(id: bigint, status: ConsultationStatus): Promise<void>;
    updateMaintenanceStatus(id: bigint, status: MaintenanceStatus): Promise<void>;
}
