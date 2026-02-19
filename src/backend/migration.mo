import Map "mo:core/Map";

module {
  type OldActor = {
    posts : Map.Map<Text, { title : Text; slug : Text; excerpt : Text; content : Text; published : Int }>;
  };

  type NewActor = {
    posts : Map.Map<Text, { title : Text; slug : Text; excerpt : Text; content : Text; published : Int }>;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
