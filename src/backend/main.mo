import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  type ConsultationType = {
    #propertyAssessment;
    #investmentAdvice;
    #generalInquiry;
  };

  type ConsultationStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  type PropertyType = {
    #residential;
    #commercial;
    #industrial;
  };

  type MaintenanceStatus = {
    #pending;
    #active;
    #cancelled;
  };

  type ConsultationBooking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    consultationType : ConsultationType;
    message : ?Text;
    status : ConsultationStatus;
    createdAt : Int;
  };

  type MaintenanceSignUp = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    propertyAddress : Text;
    propertyType : PropertyType;
    notes : ?Text;
    status : MaintenanceStatus;
    createdAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextConsultationId = 1;
  var nextMaintenanceId = 1;

  let consultations = Map.empty<Nat, ConsultationBooking>();
  let maintenanceSignUps = Map.empty<Nat, MaintenanceSignUp>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitConsultationBooking(
    name : Text,
    email : Text,
    phone : Text,
    preferredDate : Text,
    consultationType : ConsultationType,
    message : ?Text,
  ) : async Nat {
    let id = nextConsultationId;
    nextConsultationId += 1;

    let booking : ConsultationBooking = {
      id;
      name;
      email;
      phone;
      preferredDate;
      consultationType;
      message;
      status = #pending;
      createdAt = Time.now();
    };

    consultations.add(id, booking);
    id;
  };

  public query ({ caller }) func getAllConsultations() : async [ConsultationBooking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all consultations");
    };
    consultations.values().toArray();
  };

  public shared ({ caller }) func updateConsultationStatus(id : Nat, status : ConsultationStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update consultation status");
    };
    switch (consultations.get(id)) {
      case (null) { Runtime.trap("Consultation not found") };
      case (?booking) {
        let updatedBooking = {
          id = booking.id;
          name = booking.name;
          email = booking.email;
          phone = booking.phone;
          preferredDate = booking.preferredDate;
          consultationType = booking.consultationType;
          message = booking.message;
          status;
          createdAt = booking.createdAt;
        };
        consultations.add(id, updatedBooking);
      };
    };
  };

  public shared ({ caller }) func submitMaintenanceSignUp(
    name : Text,
    email : Text,
    phone : Text,
    propertyAddress : Text,
    propertyType : PropertyType,
    notes : ?Text,
  ) : async Nat {
    let id = nextMaintenanceId;
    nextMaintenanceId += 1;

    let signUp : MaintenanceSignUp = {
      id;
      name;
      email;
      phone;
      propertyAddress;
      propertyType;
      notes;
      status = #pending;
      createdAt = Time.now();
    };

    maintenanceSignUps.add(id, signUp);
    id;
  };

  public query ({ caller }) func getAllMaintenanceSignUps() : async [MaintenanceSignUp] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all maintenance sign-ups");
    };
    maintenanceSignUps.values().toArray();
  };

  public shared ({ caller }) func updateMaintenanceStatus(id : Nat, status : MaintenanceStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update maintenance status");
    };
    switch (maintenanceSignUps.get(id)) {
      case (null) { Runtime.trap("Maintenance sign-up not found") };
      case (?signUp) {
        let updatedSignUp = {
          id = signUp.id;
          name = signUp.name;
          email = signUp.email;
          phone = signUp.phone;
          propertyAddress = signUp.propertyAddress;
          propertyType = signUp.propertyType;
          notes = signUp.notes;
          status;
          createdAt = signUp.createdAt;
        };
        maintenanceSignUps.add(id, updatedSignUp);
      };
    };
  };
};
