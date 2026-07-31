import { OpenAPIV3 } from "openapi-types";

export const resumeSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  ResumePersonalDetails: {
    type: "object",
    additionalProperties: false,
    required: ["fullName", "email"],
    properties: {
      fullName: {
        type: "string",
        maxLength: 100,
        example: "Shreyash Talele",
      },

      email: {
        type: "string",
        format: "email",
        maxLength: 150,
        example: "shreyash@example.com",
      },

      phone: {
        type: "string",
        maxLength: 20,
        example: "+91 9876543210",
      },

      location: {
        type: "string",
        maxLength: 100,
        example: "Pune, Maharashtra",
      },

      linkedin: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://www.linkedin.com/in/shreyash",
      },

      github: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://github.com/shreyash",
      },

      portfolio: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://shreyash.dev",
      },

      website: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://example.com",
      },
    },
  },

  ResumeEducation: {
    type: "object",
    additionalProperties: false,
    required: ["institution", "degree"],
    properties: {
      id: {
        type: "string",
        readOnly: true,
        description: "MongoDB identifier generated for the education entry.",
        example: "66ac156de531fa006a123456",
      },

      institution: {
        type: "string",
        maxLength: 150,
        example: "D. Y. Patil Institute of MCA and Management",
      },

      degree: {
        type: "string",
        maxLength: 100,
        example: "Master of Computer Applications",
      },

      fieldOfStudy: {
        type: "string",
        maxLength: 100,
        example: "Computer Applications",
      },

      startDate: {
        type: "string",
        maxLength: 30,
        description:
          "User-provided date text. The API does not enforce a fixed date format.",
        example: "2023",
      },

      endDate: {
        type: "string",
        maxLength: 30,
        description:
          "User-provided date text. The API does not enforce a fixed date format.",
        example: "2025",
      },

      grade: {
        type: "string",
        maxLength: 30,
        example: "8.5 CGPA",
      },

      location: {
        type: "string",
        maxLength: 100,
        example: "Pune, Maharashtra",
      },

      description: {
        type: "string",
        maxLength: 1000,
        example:
          "Studied software engineering, database management, web development, and cloud fundamentals.",
      },
    },
  },
  ResumeExperience: {
    type: "object",
    additionalProperties: false,
    required: ["company", "jobTitle"],
    properties: {
      _id: {
        type: "string",
        readOnly: true,
        description: "MongoDB identifier generated for the experience entry.",
        example: "66ac156de531fa006a123457",
      },

      company: {
        type: "string",
        maxLength: 150,
        example: "Simtrak Solutions",
      },

      jobTitle: {
        type: "string",
        maxLength: 100,
        example: "Software Development Trainee",
      },

      employmentType: {
        type: "string",
        maxLength: 50,
        example: "Internship",
      },

      location: {
        type: "string",
        maxLength: 100,
        example: "Pune, Maharashtra",
      },

      startDate: {
        type: "string",
        maxLength: 30,
        description:
          "User-provided date text. The API does not enforce a fixed date format.",
        example: "January 2025",
      },

      endDate: {
        type: "string",
        maxLength: 30,
        description:
          "User-provided date text. The API does not enforce a fixed date format.",
        example: "June 2025",
      },

      currentlyWorking: {
        type: "boolean",
        default: false,
        example: false,
      },

      description: {
        type: "string",
        maxLength: 2000,
        example:
          "Developed responsive modules and integrated REST APIs for a shipment management platform.",
      },

      achievements: {
        type: "array",
        default: [],
        items: {
          type: "string",
          maxLength: 500,
        },
        example: [
          "Built a reusable CSV upload and field-mapping module.",
          "Developed dashboard search, filtering, and pagination features.",
        ],
      },
    },
  },

  ResumeProject: {
    type: "object",
    additionalProperties: false,
    required: ["title"],
    properties: {
      _id: {
        type: "string",
        readOnly: true,
        description: "MongoDB identifier generated for the project entry.",
        example: "66ac156de531fa006a123458",
      },

      title: {
        type: "string",
        maxLength: 150,
        example: "CareerLens AI",
      },

      description: {
        type: "string",
        maxLength: 2000,
        example:
          "An AI-powered platform for resume management, ATS analysis, resume review, and interview preparation.",
      },

      technologies: {
        type: "array",
        default: [],
        items: {
          type: "string",
          maxLength: 50,
        },
        example: ["Next.js", "Node.js", "Express", "TypeScript", "MongoDB"],
      },

      projectUrl: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://careerlens.example.com",
      },

      githubUrl: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://github.com/shreyashtalele/careerlens-ai",
      },

      startDate: {
        type: "string",
        maxLength: 30,
        description:
          "User-provided date text. The API does not enforce a fixed date format.",
        example: "July 2026",
      },

      endDate: {
        type: "string",
        maxLength: 30,
        description:
          "User-provided date text. The API does not enforce a fixed date format.",
        example: "Present",
      },
    },
  },
  ResumeCertification: {
    type: "object",
    additionalProperties: false,
    required: ["name"],
    properties: {
      _id: {
        type: "string",
        readOnly: true,
        example: "66ac156de531fa006a123459",
      },

      name: {
        type: "string",
        maxLength: 150,
        example: "AWS Certified Cloud Practitioner",
      },

      issuingOrganization: {
        type: "string",
        maxLength: 150,
        example: "Amazon Web Services",
      },

      issueDate: {
        type: "string",
        maxLength: 30,
        example: "2026",
      },

      expirationDate: {
        type: "string",
        maxLength: 30,
        example: "2029",
      },

      credentialId: {
        type: "string",
        maxLength: 100,
        example: "AWS-ABC123456",
      },

      credentialUrl: {
        type: "string",
        format: "uri",
        maxLength: 300,
        example: "https://www.credly.com/badges/example",
      },
    },
  },
  ResumeLanguage: {
    type: "object",
    additionalProperties: false,
    required: ["name"],
    properties: {
      _id: {
        type: "string",
        readOnly: true,
        example: "66ac156de531fa006a123460",
      },

      name: {
        type: "string",
        maxLength: 50,
        example: "English",
      },

      proficiency: {
        type: "string",
        maxLength: 50,
        example: "Professional Working Proficiency",
      },
    },
  },
  Resume: {
    type: "object",
    required: [
      "id",
      "owner",
      "title",
      "personalDetails",
      "skills",
      "education",
      "experience",
      "projects",
      "certifications",
      "achievements",
      "languages",
      "isDefault",
      "createdAt",
      "updatedAt",
    ],

    properties: {
      id: {
        type: "string",
        example: "66ac1209e531fa006a123456",
      },

      owner: {
        type: "string",
        example: "66abf4bce531fa006a111111",
      },

      title: {
        type: "string",
        maxLength: 100,
        example: "Software Engineer Resume",
      },

      personalDetails: {
        $ref: "#/components/schemas/ResumePersonalDetails",
      },

      professionalSummary: {
        type: "string",
        maxLength: 2000,
        example:
          "Full-stack developer with experience in React, Node.js and TypeScript.",
      },

      skills: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["JavaScript", "TypeScript", "React", "Node.js"],
      },

      education: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeEducation",
        },
      },

      experience: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeExperience",
        },
      },

      projects: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeProject",
        },
      },

      certifications: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeCertification",
        },
      },

      achievements: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["Employee of the Month", "Won National Hackathon"],
      },

      languages: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeLanguage",
        },
      },

      isDefault: {
        type: "boolean",
        example: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  CreateResumeRequest: {
    type: "object",
    additionalProperties: false,
    required: ["title", "personalDetails"],
    properties: {
      title: {
        type: "string",
        maxLength: 100,
        example: "Software Engineer Resume",
      },

      personalDetails: {
        $ref: "#/components/schemas/ResumePersonalDetails",
      },

      professionalSummary: {
        type: "string",
        maxLength: 2000,
      },

      skills: {
        type: "array",
        items: {
          type: "string",
        },
      },

      education: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeEducation",
        },
      },

      experience: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeExperience",
        },
      },

      projects: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeProject",
        },
      },

      certifications: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeCertification",
        },
      },

      achievements: {
        type: "array",
        items: {
          type: "string",
        },
      },

      languages: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeLanguage",
        },
      },
    },
  },
  UpdateResumeRequest: {
    type: "object",
    additionalProperties: false,
    properties: {
      title: {
        type: "string",
        maxLength: 100,
      },

      personalDetails: {
        $ref: "#/components/schemas/ResumePersonalDetails",
      },

      professionalSummary: {
        type: "string",
        maxLength: 2000,
      },

      skills: {
        type: "array",
        items: {
          type: "string",
        },
      },

      education: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeEducation",
        },
      },

      experience: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeExperience",
        },
      },

      projects: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeProject",
        },
      },

      certifications: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeCertification",
        },
      },

      achievements: {
        type: "array",
        items: {
          type: "string",
        },
      },

      languages: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ResumeLanguage",
        },
      },
    },
  },

  ResumeResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      statusCode: {
        type: "integer",
        example: 200,
      },

      message: {
        type: "string",
        example: "Resume fetched successfully",
      },

      data: {
        $ref: "#/components/schemas/Resume",
      },
    },
  },
  ResumeListResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      statusCode: {
        type: "integer",
        example: 200,
      },

      message: {
        type: "string",
        example: "Resumes fetched successfully",
      },

      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Resume",
        },
      },
    },
  },
  DeleteResumeResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      statusCode: {
        type: "integer",
        example: 200,
      },

      message: {
        type: "string",
        example: "Resume deleted successfully",
      },

      data: {
        nullable: true,
        example: null,
      },
    },
  },
};
