import mongoose, { Document, Schema, Types } from "mongoose";

interface IResumePersonalDetails {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
}

interface IResumeEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  location?: string;
  description?: string;
}

interface IResumeExperience {
  company: string;
  jobTitle: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking: boolean;
  description?: string;
  achievements: string[];
}

interface IResumeProject {
  title: string;
  description?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

interface IResumeCertification {
  name: string;
  issuingOrganization?: string;
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface IResumeLanguage {
  name: string;
  proficiency?: string;
}

export interface IResume extends Document {
  owner: Types.ObjectId;
  title: string;
  personalDetails: IResumePersonalDetails;
  professionalSummary?: string;
  skills: string[];
  education: IResumeEducation[];
  experience: IResumeExperience[];
  projects: IResumeProject[];
  certifications: IResumeCertification[];
  achievements: string[];
  languages: IResumeLanguage[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const personalDetailsSchema = new Schema<IResumePersonalDetails>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters"],
    },

    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone cannot exceed 20 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
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

    website: {
      type: String,
      trim: true,
      maxlength: [300, "Website URL cannot exceed 300 characters"],
    },
  },
  { _id: false },
);

const educationSchema = new Schema<IResumeEducation>(
  {
    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
      maxlength: [150, "Institution cannot exceed 150 characters"],
    },

    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      maxlength: [100, "Degree cannot exceed 100 characters"],
    },

    fieldOfStudy: {
      type: String,
      trim: true,
      maxlength: [100, "Field of study cannot exceed 100 characters"],
    },

    startDate: {
      type: String,
      trim: true,
      maxlength: [30, "Start date cannot exceed 30 characters"],
    },

    endDate: {
      type: String,
      trim: true,
      maxlength: [30, "End date cannot exceed 30 characters"],
    },

    grade: {
      type: String,
      trim: true,
      maxlength: [30, "Grade cannot exceed 30 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
  },
  { _id: true },
);

const experienceSchema = new Schema<IResumeExperience>(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: [150, "Company cannot exceed 150 characters"],
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },

    employmentType: {
      type: String,
      trim: true,
      maxlength: [50, "Employment type cannot exceed 50 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    startDate: {
      type: String,
      trim: true,
      maxlength: [30, "Start date cannot exceed 30 characters"],
    },

    endDate: {
      type: String,
      trim: true,
      maxlength: [30, "End date cannot exceed 30 characters"],
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    achievements: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [500, "Achievement cannot exceed 500 characters"],
        },
      ],
      default: [],
    },
  },
  { _id: true },
);

const projectSchema = new Schema<IResumeProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [150, "Project title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    technologies: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [50, "Technology cannot exceed 50 characters"],
        },
      ],
      default: [],
    },

    projectUrl: {
      type: String,
      trim: true,
      maxlength: [300, "Project URL cannot exceed 300 characters"],
    },

    githubUrl: {
      type: String,
      trim: true,
      maxlength: [300, "GitHub URL cannot exceed 300 characters"],
    },

    startDate: {
      type: String,
      trim: true,
      maxlength: [30, "Start date cannot exceed 30 characters"],
    },

    endDate: {
      type: String,
      trim: true,
      maxlength: [30, "End date cannot exceed 30 characters"],
    },
  },
  { _id: true },
);

const certificationSchema = new Schema<IResumeCertification>(
  {
    name: {
      type: String,
      required: [true, "Certification name is required"],
      trim: true,
      maxlength: [150, "Certification name cannot exceed 150 characters"],
    },

    issuingOrganization: {
      type: String,
      trim: true,
      maxlength: [150, "Issuing organization cannot exceed 150 characters"],
    },

    issueDate: {
      type: String,
      trim: true,
      maxlength: [30, "Issue date cannot exceed 30 characters"],
    },

    expirationDate: {
      type: String,
      trim: true,
      maxlength: [30, "Expiration date cannot exceed 30 characters"],
    },

    credentialId: {
      type: String,
      trim: true,
      maxlength: [100, "Credential ID cannot exceed 100 characters"],
    },

    credentialUrl: {
      type: String,
      trim: true,
      maxlength: [300, "Credential URL cannot exceed 300 characters"],
    },
  },
  { _id: true },
);

const languageSchema = new Schema<IResumeLanguage>(
  {
    name: {
      type: String,
      required: [true, "Language name is required"],
      trim: true,
      maxlength: [50, "Language name cannot exceed 50 characters"],
    },

    proficiency: {
      type: String,
      trim: true,
      maxlength: [50, "Proficiency cannot exceed 50 characters"],
    },
  },
  { _id: true },
);

const resumeSchema = new Schema<IResume>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
      maxlength: [100, "Resume title cannot exceed 100 characters"],
    },

    personalDetails: {
      type: personalDetailsSchema,
      required: true,
    },

    professionalSummary: {
      type: String,
      trim: true,
      maxlength: [2000, "Professional summary cannot exceed 2000 characters"],
    },

    skills: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [50, "Skill cannot exceed 50 characters"],
        },
      ],
      default: [],
      validate: {
        validator: (skills: string[]) => skills.length <= 50,
        message: "A resume cannot contain more than 50 skills",
      },
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    experience: {
      type: [experienceSchema],
      default: [],
    },

    projects: {
      type: [projectSchema],
      default: [],
    },

    certifications: {
      type: [certificationSchema],
      default: [],
    },

    achievements: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [500, "Achievement cannot exceed 500 characters"],
        },
      ],
      default: [],
    },

    languages: {
      type: [languageSchema],
      default: [],
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

resumeSchema.index({ owner: 1, createdAt: -1 });
resumeSchema.index(
  {
    owner: 1,
    title: 1,
  },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  },
);

const Resume = mongoose.model<IResume>("Resume", resumeSchema);

export default Resume;
