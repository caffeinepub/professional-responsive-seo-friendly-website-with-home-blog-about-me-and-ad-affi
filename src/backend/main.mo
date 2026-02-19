import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";

(with migration = Migration.run)
actor {
  // Initialize access control and approval state
  let accessControlState = AccessControl.initState();
  let approvalState = UserApproval.initState(accessControlState);

  include MixinAuthorization(accessControlState);

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

  type User = {
    username : Text;
    whatsappNumber : Text;
    groupNumber : Text;
    email : Text;
    passwordHash : Text;
    registeredAt : Int;
    principal : Principal;
  };

  type UserPublicProfile = {
    username : Text;
    whatsappNumber : Text;
    groupNumber : Text;
    email : Text;
    registeredAt : Int;
  };

  type UserLoginProfile = {
    username : Text;
    whatsappNumber : Text;
    groupNumber : Text;
    email : Text;
    registeredAt : Int;
  };

  type UserRegistrationResponse = {
    #success : Text;
    #error : Text;
  };

  type UserLoginResponse = {
    #success : UserLoginProfile;
    #error : Text;
  };

  let posts = Map.empty<Text, BlogPost>();
  let users = Map.empty<Text, User>();
  let userProfiles = Map.empty<Principal, UserPublicProfile>();

  public shared ({ caller }) func registerUser(
    username : Text,
    whatsappNumber : Text,
    groupNumber : Text,
    email : Text,
    password : Text,
  ) : async UserRegistrationResponse {
    if (users.containsKey(email)) {
      return #error("User with this email already exists");
    };

    if (username == "" or email == "" or password == "") {
      return #error("Username, email, and password are required");
    };

    let newUser : User = {
      username;
      whatsappNumber;
      groupNumber;
      email;
      passwordHash = password;
      registeredAt = Time.now();
      principal = caller;
    };

    users.add(email, newUser);
    await requestApproval();
    #success("User registered successfully. Awaiting approval.");
  };

  public shared ({ caller }) func loginUser(
    emailOrUsername : Text,
    password : Text,
  ) : async UserLoginResponse {
    var foundUser : ?User = users.get(emailOrUsername);

    if (foundUser == null) {
      for ((email, user) in users.entries()) {
        if (user.username == emailOrUsername) {
          foundUser := ?user;
        };
      };
    };

    switch (foundUser) {
      case (null) {
        #error("Invalid credentials");
      };
      case (?user) {
        if (user.passwordHash != password) {
          return #error("Invalid credentials");
        };

        if (not (await isCallerApproved())) {
          return #error("Account pending approval");
        };

        let profile : UserLoginProfile = {
          username = user.username;
          whatsappNumber = user.whatsappNumber;
          groupNumber = user.groupNumber;
          email = user.email;
          registeredAt = user.registeredAt;
        };

        #success(profile);
      };
    };
  };

  public query ({ caller }) func getAllUsers() : async [UserPublicProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };

    users.values().toArray().map(
      func(user : User) : UserPublicProfile {
        {
          username = user.username;
          whatsappNumber = user.whatsappNumber;
          groupNumber = user.groupNumber;
          email = user.email;
          registeredAt = user.registeredAt;
        };
      }
    );
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve users");
    };
    UserApproval.setApproval(approvalState, user, status);
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserPublicProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserPublicProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserPublicProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createPost(title : Text, slug : Text, excerpt : Text, content : Text) : async Text {
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

  public query ({ caller }) func getPost(slug : Text) : async BlogPost {
    switch (posts.get(slug)) {
      case (null) { Runtime.trap("Blog post with slug " # slug # " does not exist") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getPosts() : async [BlogPost] {
    posts.values().toArray().sort(BlogPost.compareByPublished);
  };

  public query ({ caller }) func searchPosts(term : Text) : async [BlogPost] {
    posts.values().toArray().filter(
      func(post) {
        post.title.contains(#text term) or post.content.contains(#text term);
      }
    );
  };

  public query ({ caller }) func getAllPostSlugs() : async [Text] {
    posts.keys().toArray();
  };

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };
};
