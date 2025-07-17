// import mongoose from 'mongoose';

// const enquirySchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     from: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     to: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String, // e.g., "10:00 AM"
//       required: true,
//     },
//     serviceType: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Enquiry = mongoose.model('Enquiry', enquirySchema);

// export default Enquiry;




import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "10:00 AM"
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    // New fields for enhanced functionality
    status: {
      type: String,
      enum: ['Not Confirmed', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Not Confirmed',
    },
    allocatedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      default: null,
    },
    allocatedCar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      default: null,
    },
    allocatedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null,
    },
    estimatedRate: {
      type: Number,
      default: 0,
    },
    estimatedDistance: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    // Messages between admin and customer
    messages: [{
      sender: {
        type: String,
        enum: ['Admin', 'Customer'],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    }],
    // Customer notification preferences
    customerNotifications: [{
      type: {
        type: String,
        enum: ['Rate Quote', 'Driver Assigned', 'Booking Confirmed', 'Trip Started', 'Trip Completed', 'Custom Message'],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      sentAt: {
        type: Date,
        default: Date.now,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    }],
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    assignedAt: {
      type: Date,
    },
    confirmedAt: {
      type: Date,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    // Additional trip details
    tripDetails: {
      pickupAddress: String,
      dropAddress: String,
      stops: [String],
      specialRequests: String,
      passengerCount: {
        type: Number,
        default: 1,
      },
      luggageCount: {
        type: Number,
        default: 0,
      },
    },
    // Payment information
    paymentInfo: {
      method: {
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Net Banking', 'Wallet'],
        default: 'Cash',
      },
      status: {
        type: String,
        enum: ['Pending', 'Paid', 'Partially Paid', 'Refunded'],
        default: 'Pending',
      },
      paidAmount: {
        type: Number,
        default: 0,
      },
      paymentDate: Date,
    },
    // Customer feedback
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      feedbackDate: Date,
    },
    // System flags
    isArchived: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    hasUnreadMessages: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
enquirySchema.index({ status: 1 });
enquirySchema.index({ allocatedDriver: 1 });
enquirySchema.index({ allocatedVehicle: 1 });
enquirySchema.index({ phoneNumber: 1 });
enquirySchema.index({ date: 1 });
enquirySchema.index({ createdAt: -1 });

// Virtual for generating enquiry ID
enquirySchema.virtual('enquiryId').get(function() {
  return `ENQ-${this._id.toString().slice(-6).toUpperCase()}`;
});

// Method to add message
enquirySchema.methods.addMessage = function(sender, message) {
  this.messages.push({
    sender,
    message,
    timestamp: new Date(),
    isRead: false,
  });
  this.hasUnreadMessages = true;
  return this.save();
};

// Method to add customer notification
enquirySchema.methods.addNotification = function(type, message) {
  this.customerNotifications.push({
    type,
    message,
    sentAt: new Date(),
    isRead: false,
  });
  return this.save();
};

// Method to update status with timestamp
enquirySchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  
  switch(newStatus) {
    case 'Confirmed':
      this.confirmedAt = new Date();
      break;
    case 'Ongoing':
      this.startedAt = new Date();
      break;
    case 'Completed':
      this.completedAt = new Date();
      break;
  }
  
  return this.save();
};

// Method to allocate driver
enquirySchema.methods.allocateDriver = function(driverId) {
  this.allocatedDriver = driverId;
  this.assignedAt = new Date();
  return this.save();
};

// Method to allocate vehicle
enquirySchema.methods.allocateVehicle = function(carId, vehicleId) {
  this.allocatedCar = carId;
  this.allocatedVehicle = vehicleId;
  this.assignedAt = new Date();
  return this.save();
};

// Static method to get enquiry statistics
enquirySchema.statics.getEnquiryStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalEnquiries: { $sum: 1 },
        notConfirmed: {
          $sum: { $cond: [{ $eq: ['$status', 'Not Confirmed'] }, 1, 0] }
        },
        confirmed: {
          $sum: { $cond: [{ $eq: ['$status', 'Confirmed'] }, 1, 0] }
        },
        ongoing: {
          $sum: { $cond: [{ $eq: ['$status', 'Ongoing'] }, 1, 0] }
        },
        completed: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
        },
        cancelled: {
          $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] }
        },
        totalRevenue: { $sum: '$totalAmount' },
        averageAmount: { $avg: '$totalAmount' },
        todayEnquiries: {
          $sum: {
            $cond: [
              {
                $gte: [
                  '$createdAt',
                  new Date(new Date().setHours(0, 0, 0, 0))
                ]
              },
              1,
              0
            ]
          }
        },
        unreadMessages: {
          $sum: { $cond: ['$hasUnreadMessages', 1, 0] }
        },
      }
    }
  ]);

  return stats[0] || {
    totalEnquiries: 0,
    notConfirmed: 0,
    confirmed: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
    averageAmount: 0,
    todayEnquiries: 0,
    unreadMessages: 0,
  };
};

// Pre-save middleware to update hasUnreadMessages
enquirySchema.pre('save', function(next) {
  if (this.messages && this.messages.length > 0) {
    this.hasUnreadMessages = this.messages.some(msg => !msg.isRead);
  }
  next();
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;