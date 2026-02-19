import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import UserApproval "user-approval/approval";

// Main actor for the backend logic

actor {
  // Initialize access control and approval states
  let accessControlState = AccessControl.initState();
  let approvalState = UserApproval.initState(accessControlState);

  // Integrate access control mixin
  include MixinAuthorization(accessControlState);

  //---------------------------------------------
  // User management types
  //---------------------------------------------
  public type UserStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  public type User = {
    username : Text;
    passwordHash : Text;
    status : UserStatus;
    registeredAt : Time.Time;
  };

  public type UserProfile = {
    username : Text;
    status : UserStatus;
    registeredAt : Time.Time;
  };

  //---------------------------------------------
  // Blog post types
  //---------------------------------------------
  type BlogPost = {
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    published : Time.Time;
  };

  module BlogPost {
    public func compareByPublished(p1 : BlogPost, p2 : BlogPost) : Order.Order {
      Int.compare(p1.published, p2.published);
    };
  };

  //---------------------------------------------
  // Data stores
  //---------------------------------------------
  let posts = Map.empty<Text, BlogPost>();
  let users = Map.empty<Principal, User>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  //---------------------------------------------
  // Helper functions
  //---------------------------------------------
  func hashPassword(password : Text) : Text {
    // Simple hash implementation (in production, use proper cryptographic hashing)
    let hash = password.size();
    hash.toText();
  };

  func userToProfile(user : User) : UserProfile {
    {
      username = user.username;
      status = user.status;
      registeredAt = user.registeredAt;
    };
  };

  //---------------------------------------------
  // User management endpoints
  //---------------------------------------------
  public shared ({ caller }) func registerUser(username : Text, password : Text) : async Text {
    // Anyone (including guests) can register
    if (users.containsKey(caller)) {
      Runtime.trap("User already registered");
    };

    let passwordHash = hashPassword(password);
    let user : User = {
      username;
      passwordHash;
      status = #Pending;
      registeredAt = Time.now();
    };

    users.add(caller, user);

    let profile = userToProfile(user);
    userProfiles.add(caller, profile);

    "User registered successfully with Pending status";
  };

  public shared ({ caller }) func loginUser(password : Text) : async UserProfile {
    // Anyone can attempt to login
    switch (users.get(caller)) {
      case null {
        Runtime.trap("User not found");
      };
      case (?user) {
        let passwordHash = hashPassword(password);
        if (passwordHash != user.passwordHash) {
          Runtime.trap("Invalid credentials");
        };

        switch (user.status) {
          case (#Pending) {
            Runtime.trap("User account is pending approval");
          };
          case (#Rejected) {
            Runtime.trap("User account has been rejected");
          };
          case (#Approved) {
            userToProfile(user);
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };

    users.values().map(userToProfile).toArray();
  };

  public shared ({ caller }) func approveUser(userPrincipal : Principal) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can approve users");
    };

    switch (users.get(userPrincipal)) {
      case null {
        Runtime.trap("User not found");
      };
      case (?user) {
        let approvedUser : User = {
          username = user.username;
          passwordHash = user.passwordHash;
          status = #Approved;
          registeredAt = user.registeredAt;
        };
        users.add(userPrincipal, approvedUser);

        let profile = userToProfile(approvedUser);
        userProfiles.add(userPrincipal, profile);

        // Assign user role upon approval
        AccessControl.assignRole(accessControlState, caller, userPrincipal, #user);

        "User approved successfully";
      };
    };
  };

  //---------------------------------------------
  // User profile endpoints
  //---------------------------------------------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    // Allow any registered user (including pending) to view their own profile
    // Guests (anonymous) are blocked by checking if they exist in users map
    if (not users.containsKey(caller)) {
      Runtime.trap("Unauthorized: User not registered");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Users can view their own profile regardless of approval status
    // Only admins can view other users' profiles
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    // Additional check: non-admins must be registered to view any profile
    if (caller != user and not users.containsKey(caller)) {
      Runtime.trap("Unauthorized: User not registered");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  //---------------------------------------------
  // Blog endpoints
  //---------------------------------------------
  public query ({ caller }) func getPosts() : async [BlogPost] {
    // Anyone (including guests) can view posts
    posts.values().toArray().sort(BlogPost.compareByPublished);
  };

  public query ({ caller }) func getPost(slug : Text) : async ?BlogPost {
    // Anyone (including guests) can view a post
    posts.get(slug);
  };

  public shared ({ caller }) func createPost(
    title : Text,
    slug : Text,
    excerpt : Text,
    content : Text,
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create blog posts");
    };

    if (posts.containsKey(slug)) {
      Runtime.trap("Blog post with slug " # slug # " already exists");
    };

    let blogPost : BlogPost = {
      title;
      slug;
      excerpt;
      content;
      published = Time.now();
    };

    posts.add(slug, blogPost);
    "Blog post created";
  };

  //---------------------------------------------
  // Approval endpoints (required for component compatibility)
  //---------------------------------------------
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };
};
