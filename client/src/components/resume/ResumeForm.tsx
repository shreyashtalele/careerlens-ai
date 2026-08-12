import { useState } from "react";
import { Resume } from "@/types/models";

interface ResumeFormProps {
  resume: Resume;
  onSave: (data: Resume) => void;
  onCancel: () => void;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

interface SkillsInputProps {
  skills: string[];
  skillInput: string;
  setSkillInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (skill: string) => void;
}

interface ListManagerProps<T> {
  items: T[];
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export function ResumeForm({ resume, onSave, onCancel }: ResumeFormProps) {
  const [formData, setFormData] = useState<Resume>(resume);
  const [skillInput, setSkillInput] = useState("");
  const [newExperience, setNewExperience] = useState<Experience>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newEducation, setNewEducation] = useState<Education>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });
  const [newProject, setNewProject] = useState<
    Omit<Project, "technologies"> & { technologies: string }
  >({
    name: "",
    description: "",
    technologies: "",
    link: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field: string, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const updatePersonalDetails = (field: string, value: string) => {
    setFormData({
      ...formData,
      personalDetails: { ...formData.personalDetails, [field]: value },
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s: string) => s !== skill),
    });
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setFormData({
        ...formData,
        experience: [...formData.experience, newExperience],
      });
      setNewExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter(
        (_: Experience, i: number) => i !== index,
      ),
    });
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setFormData({
        ...formData,
        education: [...formData.education, newEducation],
      });
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter(
        (_: Education, i: number) => i !== index,
      ),
    });
  };

  const addProject = () => {
    if (newProject.name && newProject.description) {
      const technologies = newProject.technologies
        .split(",")
        .map((t: string) => t.trim())
        .filter((t: string) => t);
      setFormData({
        ...formData,
        projects: [...formData.projects, { ...newProject, technologies }],
      });
      setNewProject({
        name: "",
        description: "",
        technologies: "",
        link: "",
      });
    }
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter(
        (_: Project, i: number) => i !== index,
      ),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resume Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Personal Details */}
      <Section title="Personal Details">
        <Grid cols={2}>
          <Input
            label="Full Name"
            value={formData.personalDetails.fullName || ""}
            onChange={(v: string) => updatePersonalDetails("fullName", v)}
          />
          <Input
            label="Email"
            value={formData.personalDetails.email || ""}
            onChange={(v: string) => updatePersonalDetails("email", v)}
            type="email"
          />
          <Input
            label="Phone"
            value={formData.personalDetails.phone || ""}
            onChange={(v: string) => updatePersonalDetails("phone", v)}
          />
          <Input
            label="Location"
            value={formData.personalDetails.location || ""}
            onChange={(v: string) => updatePersonalDetails("location", v)}
          />
          <Input
            label="LinkedIn"
            value={formData.personalDetails.linkedin || ""}
            onChange={(v: string) => updatePersonalDetails("linkedin", v)}
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            label="GitHub"
            value={formData.personalDetails.github || ""}
            onChange={(v: string) => updatePersonalDetails("github", v)}
            placeholder="https://github.com/username"
          />
        </Grid>
      </Section>

      {/* Summary */}
      <Section title="Summary">
        <textarea
          value={formData.summary || ""}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write a professional summary..."
        />
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <SkillsInput
          skills={formData.skills}
          skillInput={skillInput}
          setSkillInput={setSkillInput}
          onAdd={addSkill}
          onRemove={removeSkill}
        />
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <ListManager<Experience>
          items={formData.experience}
          onRemove={removeExperience}
          renderItem={(exp: Experience) => `${exp.position} at ${exp.company}`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            placeholder="Company"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newExperience.position}
            onChange={(e) =>
              setNewExperience({ ...newExperience, position: e.target.value })
            }
            placeholder="Position"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, startDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            value={newExperience.endDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, endDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
            placeholder="Description"
            className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
            rows={2}
          />
        </div>
        <AddButton onClick={addExperience} label="Add Experience" />
      </Section>

      {/* Education */}
      <Section title="Education">
        <ListManager<Education>
          items={formData.education}
          onRemove={removeEducation}
          renderItem={(edu: Education) => `${edu.degree} at ${edu.institution}`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institution: e.target.value })
            }
            placeholder="Institution"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
            placeholder="Degree"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newEducation.fieldOfStudy}
            onChange={(e) =>
              setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
            }
            placeholder="Field of Study"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            value={newEducation.startDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            value={newEducation.endDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endDate: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <AddButton onClick={addEducation} label="Add Education" />
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <ListManager<Project>
          items={formData.projects}
          onRemove={removeProject}
          renderItem={(project: Project) => project.name}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <input
            type="text"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            placeholder="Project Name"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            placeholder="Description"
            className="px-3 py-2 border border-gray-300 rounded-lg"
            rows={2}
          />
          <input
            type="text"
            value={newProject.technologies}
            onChange={(e) =>
              setNewProject({ ...newProject, technologies: e.target.value })
            }
            placeholder="Technologies (comma separated)"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="url"
            value={newProject.link}
            onChange={(e) =>
              setNewProject({ ...newProject, link: e.target.value })
            }
            placeholder="Project Link"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <AddButton onClick={addProject} label="Add Project" />
      </Section>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Helper Components
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4`}>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function SkillsInput({
  skills,
  skillInput,
  setSkillInput,
  onAdd,
  onRemove,
}: SkillsInputProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[44px]">
        {skills.map((skill: string) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="hover:text-blue-900"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
          placeholder="Add a skill..."
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
        />
      </div>
      <AddButton onClick={onAdd} label="Add Skill" />
    </>
  );
}

function ListManager<T>({ items, onRemove, renderItem }: ListManagerProps<T>) {
  if (items.length === 0)
    return <p className="text-gray-400 text-sm">None added yet</p>;
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2"
        >
          <span className="text-sm text-gray-700">
            {renderItem(item, index)}
          </span>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 text-sm text-blue-600 hover:text-blue-700"
    >
      + {label}
    </button>
  );
}
