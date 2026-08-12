import { Resume } from "@/types/models";

interface ResumeViewProps {
  resume: Resume;
}

export function ResumeView({ resume }: ResumeViewProps) {
  const { personalDetails, summary, skills, experience, education, projects } =
    resume;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Personal Details */}
      <Section title="Personal Details">
        <Grid cols={2}>
          <Info label="Full Name" value={personalDetails.fullName} />
          <Info label="Email" value={personalDetails.email} />
          <Info label="Phone" value={personalDetails.phone} />
          <Info label="Location" value={personalDetails.location} />
          <Info label="LinkedIn" value={personalDetails.linkedin} isLink />
          <Info label="GitHub" value={personalDetails.github} isLink />
        </Grid>
      </Section>

      {/* Summary */}
      <Section title="Summary">
        <p className="text-gray-700">{summary || "No summary yet"}</p>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No skills added</p>
        )}
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {experience.length > 0 ? (
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <ExperienceItem key={i} experience={exp} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No experience added</p>
        )}
      </Section>

      {/* Education */}
      <Section title="Education">
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu, i) => (
              <EducationItem key={i} education={edu} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No education added</p>
        )}
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project, i) => (
              <ProjectItem key={i} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No projects added</p>
        )}
      </Section>
    </div>
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

function Info({
  label,
  value,
  isLink,
}: {
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  if (!value)
    return (
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-400 text-sm">Not set</p>
      </div>
    );

  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  );
}

function ExperienceItem({ experience }: { experience: any }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900">{experience.position}</h3>
      <p className="text-gray-700">{experience.company}</p>
      <p className="text-sm text-gray-500">
        {experience.startDate} - {experience.endDate || "Present"}
      </p>
      <p className="text-gray-600 mt-1">{experience.description}</p>
    </div>
  );
}

function EducationItem({ education }: { education: any }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900">{education.degree}</h3>
      <p className="text-gray-700">{education.institution}</p>
      <p className="text-sm text-gray-500">
        {education.fieldOfStudy} • {education.startDate} - {education.endDate}
      </p>
    </div>
  );
}

function ProjectItem({ project }: { project: any }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900">{project.name}</h3>
      <p className="text-gray-600">{project.description}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {project.technologies.map((tech: string, j: number) => (
          <span
            key={j}
            className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-1 block"
        >
          View Project →
        </a>
      )}
    </div>
  );
}
