import { models } from "../src/models/models.js";
import ApiError from "../errors/apiError.js"

const { Subscription, User } = models;

class SubscriptionController {
  async createAsync(req, res) {
    res.status(501).json({message: "not implemented"})
  }

  async deleteAsync(req, res, next) {
    try {
      const { id } = req.params;

      const subscription = await Subscription.findByPk(id);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      await subscription.destroy();

      return res.status(200).json({ message: "Subscription deleted" });
    } catch (error) {
      next(ApiError.internal("Error while deleting a subscription: " + error.message))
    }
  }

  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;

      const subscription = await Subscription.findByPk(id);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      return res.status(200).json(subscription); 
    } catch (error) {
      next(ApiError.internal("Error while fetching a subscription: " + error.message))
    }
  }

  async getAllAsync(req, res) {
    try {
      const subscriptions = await Subscription.findAll();

      return res.status(200).json(subscriptions); 
    } catch (error) {
      next(ApiError.internal("Error while fetching subscriptions: " + error.message))
    }
  }

  async updateAsync(req, res) {
    const { subscriptionType, userId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentSubscription = await Subscription.findByPk(user.subscriptionId);

      if (!currentSubscription) {
        var currrentUtc = new Date();
        const newSubscription = await Subscription.create({
          subscriptionType: subscriptionType,
          expiresAt: currrentUtc.setMonth(currrentUtc.getMonth() + 1),
          createdAt: currrentUtc,
          updatedAt: currrentUtc
        }); 
        return newSubscription;
      }

      const currentUtcTime = new Date();

      const newExpiresAt = new Date(currentUtcTime);
      newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);

      currentSubscription.subscriptionType = subscriptionType || currentSubscription.subscriptionType;
      currentSubscription.updatedAt = currentUtcTime;
      currentSubscription.expiresAt = newExpiresAt;

      await currentSubscription.save();

      return res.status(200).json(currentSubscription);
    } catch (error) {
      next(ApiError.internal("Error while creating a subscription: " + error.message))
    }
}

export default new SubscriptionController();