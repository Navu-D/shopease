import Debug "mo:core/Debug";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
  stripeConfig : { var value : ?Stripe.StripeConfiguration },
) {
  public query func isStripeConfigured() : async Bool {
    Debug.todo();
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    Debug.todo();
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    Debug.todo();
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    Debug.todo();
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    Debug.todo();
  };
};
