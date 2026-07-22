import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from "mongoose";
import { USER_ROLES, UserRole } from "../constants/user.constants.js";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  phone?: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills: string[];
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },

    headline: {
      type: String,
      trim: true,
      maxlength: [120, "Headline cannot exceed 120 characters"],
    },

    bio: {
      type: String,
      trim: true,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },

    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    website: {
      type: String,
      trim: true,
      maxlength: [300, "Website URL cannot exceed 300 characters"],
    },

    linkedin: {
      type: String,
      trim: true,
      maxlength: [300, "LinkedIn URL cannot exceed 300 characters"],
    },

    github: {
      type: String,
      trim: true,
      maxlength: [300, "GitHub URL cannot exceed 300 characters"],
    },

    portfolio: {
      type: String,
      trim: true,
      maxlength: [300, "Portfolio URL cannot exceed 300 characters"],
    },

    skills: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [50, "Each skill cannot exceed 50 characters"],
        },
      ],
      default: [],
      validate: {
        validator: (skills: string[]) => skills.length <= 30,
        message: "You can add a maximum of 30 skills",
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
