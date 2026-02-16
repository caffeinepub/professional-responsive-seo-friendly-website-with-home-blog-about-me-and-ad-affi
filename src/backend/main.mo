import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

actor {
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

  let posts = Map.empty<Text, BlogPost>();

  public shared ({ caller }) func createPost(title : Text, slug : Text, excerpt : Text, content : Text) : async Text {
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
};
