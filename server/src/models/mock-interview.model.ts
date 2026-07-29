import mongoose, { Schema } from "mongoose";

import {
  MOCK_INTERVIEW_COLLECTION,
  MOCK_INTERVIEW_STATUS,
} from "../constants/mock-interview.constants.js";

const interviewQuestionSchema = new Schema(
  {
    questionId: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const answerEvaluationSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    strengths: {
      type: [String],
      default: [],
    },
    improvements: {
      type: [String],
      default: [],
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const interviewAnswerSchema = new Schema(
  {
    questionId: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    evaluation: {
      type: answerEvaluationSchema,
    },
    answeredAt: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const finalReportSchema = new Schema(
  {
    overallScore: Number,

    scoreBreakdown: {
      technicalScore: Number,
      communicationScore: Number,
      confidenceScore: Number,
      relevanceScore: Number,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    improvementAreas: {
      type: [String],
      default: [],
    },

    hiringRecommendation: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const mockInterviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobDescription: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(MOCK_INTERVIEW_STATUS),
      default: MOCK_INTERVIEW_STATUS.IN_PROGRESS,
    },

    difficulty: {
      type: String,
      required: true,
    },

    questions: {
      type: [interviewQuestionSchema],
      default: [],
    },

    answers: {
      type: [interviewAnswerSchema],
      default: [],
    },

    currentQuestionIndex: {
      type: Number,
      default: 0,
    },

    finalReport: {
      type: finalReportSchema,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: MOCK_INTERVIEW_COLLECTION.NAME,
  },
);

export const MockInterview = mongoose.model(
  "MockInterview",
  mockInterviewSchema,
);
